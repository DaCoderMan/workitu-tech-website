// File: src/app/api/billing/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { CryptoUtils } from '@/billing/utils/crypto';
import { logger } from '@/billing/utils/logger';
import { env } from '@/billing/utils/env';
import { getEntitlementsForOffering } from '@/billing/billing.config';
import { FirestoreStorageAdapter } from '@/billing/adapters/storage.firebase';
import type { EntitlementStatus } from '@/billing/billing.types';

/**
 * LemonSqueezy Webhook Handler
 *
 * Processes payment events and grants/revokes entitlements via Firestore.
 * Events handled:
 * - order_created: One-time purchase completed
 * - order_refunded: Purchase refunded
 * - subscription_created: Subscription started
 * - subscription_updated: Subscription modified
 * - subscription_cancelled: Subscription cancelled
 * - subscription_expired: Subscription expired
 */

const storage = new FirestoreStorageAdapter();

function emailToUserId(email: string): string {
  return createHash('sha256')
    .update(email.toLowerCase().trim())
    .digest('hex');
}

export async function POST(request: NextRequest) {
  const log = logger.child({ endpoint: 'webhook' });

  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature');
    const eventName = request.headers.get('x-event-name');

    if (!signature || !eventName) {
      log.warn('Missing webhook headers');
      return NextResponse.json(
        { error: 'Missing signature or event name' },
        { status: 400 }
      );
    }

    log.info('Webhook received', { eventName });

    // Verify signature
    const webhookSecret = env.get('LEMONSQUEEZY_WEBHOOK_SECRET');
    if (!webhookSecret) {
      log.error('Webhook secret not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    const isValid = CryptoUtils.verifyHmacSha256({
      data: rawBody,
      signature,
      secret: webhookSecret,
    });

    if (!isValid) {
      log.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse payload
    const payload = JSON.parse(rawBody);
    const { meta, data } = payload;

    // Generate event key for idempotency
    const eventId = meta?.event_name + '_' + data?.id || CryptoUtils.generateNonce();
    const eventKey = CryptoUtils.generateEventKey(eventId, payload);

    // Check if already processed (Firestore-backed)
    const alreadyProcessed = await storage.isWebhookProcessed(eventKey);
    if (alreadyProcessed) {
      log.info('Event already processed (idempotency)', { eventKey });
      return NextResponse.json({ status: 'already_processed' });
    }

    // Extract custom data
    const customData = meta?.custom_data || {};
    const offeringKey = customData.offeringKey;

    if (!offeringKey) {
      log.warn('No offering key in webhook payload', { eventName });
      await storage.markWebhookProcessed(eventKey, { eventName, reason: 'no_offering_key' });
      return NextResponse.json({ status: 'no_offering_key' });
    }

    // Get entitlements to grant
    const entitlements = getEntitlementsForOffering(offeringKey);

    log.info('Processing webhook event', {
      eventName,
      offeringKey,
      entitlements,
      orderId: data?.id,
    });

    // Process event based on type
    switch (eventName) {
      case 'order_created':
        await handleOrderCreated(payload, offeringKey, entitlements, log);
        break;

      case 'order_refunded':
        await handleOrderRefunded(payload, offeringKey, entitlements, log);
        break;

      case 'subscription_created':
        await handleSubscriptionCreated(payload, offeringKey, entitlements, log);
        break;

      case 'subscription_updated':
        await handleSubscriptionUpdated(payload, offeringKey, entitlements, log);
        break;

      case 'subscription_cancelled':
        await handleSubscriptionCancelled(payload, offeringKey, entitlements, log);
        break;

      case 'subscription_expired':
        await handleSubscriptionExpired(payload, offeringKey, entitlements, log);
        break;

      default:
        log.info('Unhandled event type', { eventName });
    }

    // Mark as processed in Firestore
    await storage.markWebhookProcessed(eventKey, {
      eventName,
      offeringKey,
      processedAt: new Date().toISOString(),
    });

    // Audit log
    await storage.logWebhookEvent?.({
      id: eventKey,
      provider: 'lemonsqueezy',
      eventType: eventName,
      payload,
      processedAt: new Date(),
      createdAt: new Date(),
    });

    log.info('Webhook processed successfully', { eventName, eventKey });

    return NextResponse.json({ status: 'success', eventKey });
  } catch (error: any) {
    log.error('Webhook processing failed', error);

    return NextResponse.json(
      {
        error: error.message || 'Webhook processing failed',
        details: env.isDevelopment() ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------

async function handleOrderCreated(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const userEmail = data.attributes.user_email;
  const orderId = String(data.id);
  const amount = data.attributes.total;
  const currency = data.attributes.currency;
  const customData = payload.meta?.custom_data || {};

  if (!userEmail) {
    log.error('No user email in order_created payload', { orderId });
    return;
  }

  const userId = emailToUserId(userEmail);

  log.info('Order created - granting entitlements', {
    orderId, userEmail, userId, amount, currency, entitlements,
  });

  for (const entitlementKey of entitlements) {
    await storage.upsertEntitlement({
      userId,
      entitlementKey,
      status: 'active',
      sourceProvider: 'lemonsqueezy',
      sourceId: orderId,
      sourceType: 'order',
      startsAt: new Date(),
      expiresAt: null, // One-time purchases are lifetime
      metaJson: {
        email: userEmail,
        amount,
        currency,
        offeringKey,
        projectName: customData.projectName || null,
        customAmount: customData.customAmount || null,
      },
    });
  }

  log.info('Entitlements granted for order', { orderId, userId, entitlements });
}

async function handleOrderRefunded(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const orderId = String(data.id);
  const userEmail = data.attributes.user_email;

  if (!userEmail) {
    log.error('No user email in order_refunded payload', { orderId });
    return;
  }

  const userId = emailToUserId(userEmail);

  log.info('Order refunded - revoking entitlements', { orderId, userId, entitlements });

  for (const entitlementKey of entitlements) {
    try {
      await storage.revokeEntitlement({
        userId,
        entitlementKey,
        sourceId: orderId,
      });
    } catch (err: any) {
      log.warn('Failed to revoke entitlement (may not exist)', {
        entitlementKey, orderId, error: err.message,
      });
    }
  }

  log.info('Entitlements revoked for refunded order', { orderId, userId });
}

async function handleSubscriptionCreated(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const subscriptionId = String(data.id);
  const userEmail = data.attributes.user_email;
  const status = data.attributes.status;
  const renewsAt = data.attributes.renews_at;

  if (!userEmail) {
    log.error('No user email in subscription_created payload', { subscriptionId });
    return;
  }

  const userId = emailToUserId(userEmail);

  log.info('Subscription created - granting entitlements', {
    subscriptionId, userEmail, userId, status, renewsAt, entitlements,
  });

  const expiresAt = renewsAt ? new Date(renewsAt) : null;

  for (const entitlementKey of entitlements) {
    await storage.upsertEntitlement({
      userId,
      entitlementKey,
      status: 'active',
      sourceProvider: 'lemonsqueezy',
      sourceId: subscriptionId,
      sourceType: 'subscription',
      startsAt: new Date(),
      expiresAt,
      metaJson: {
        email: userEmail,
        offeringKey,
        subscriptionStatus: status,
        renewsAt,
      },
    });
  }

  log.info('Subscription entitlements granted', { subscriptionId, userId, entitlements });
}

async function handleSubscriptionUpdated(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const subscriptionId = String(data.id);
  const status = data.attributes.status;
  const renewsAt = data.attributes.renews_at;
  const endsAt = data.attributes.ends_at;
  const userEmail = data.attributes.user_email;

  if (!userEmail) {
    log.error('No user email in subscription_updated payload', { subscriptionId });
    return;
  }

  const userId = emailToUserId(userEmail);

  log.info('Subscription updated', { subscriptionId, userId, status, renewsAt });

  // Map LemonSqueezy status to EntitlementStatus
  let entitlementStatus: EntitlementStatus;
  switch (status) {
    case 'active':
    case 'on_trial':
      entitlementStatus = 'active';
      break;
    case 'past_due':
    case 'paused':
      entitlementStatus = 'active';
      break;
    case 'cancelled':
      entitlementStatus = 'canceled';
      break;
    case 'expired':
    case 'unpaid':
      entitlementStatus = 'expired';
      break;
    default:
      entitlementStatus = 'active';
  }

  const expiresAt = renewsAt ? new Date(renewsAt) : (endsAt ? new Date(endsAt) : null);

  for (const entitlementKey of entitlements) {
    await storage.upsertEntitlement({
      userId,
      entitlementKey,
      status: entitlementStatus,
      sourceProvider: 'lemonsqueezy',
      sourceId: subscriptionId,
      sourceType: 'subscription',
      startsAt: new Date(),
      expiresAt,
      metaJson: {
        email: userEmail,
        offeringKey,
        subscriptionStatus: status,
        renewsAt,
        endsAt,
      },
    });
  }
}

async function handleSubscriptionCancelled(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const subscriptionId = String(data.id);
  const endsAt = data.attributes.ends_at;
  const userEmail = data.attributes.user_email;

  if (!userEmail) {
    log.error('No user email in subscription_cancelled payload', { subscriptionId });
    return;
  }

  const userId = emailToUserId(userEmail);

  log.info('Subscription cancelled - keeping access until end date', {
    subscriptionId, userId, endsAt,
  });

  const expiresAt = endsAt ? new Date(endsAt) : null;

  for (const entitlementKey of entitlements) {
    await storage.upsertEntitlement({
      userId,
      entitlementKey,
      status: 'canceled',
      sourceProvider: 'lemonsqueezy',
      sourceId: subscriptionId,
      sourceType: 'subscription',
      startsAt: new Date(),
      expiresAt,
      metaJson: {
        email: userEmail,
        offeringKey,
        subscriptionStatus: 'cancelled',
        endsAt,
        cancelledAt: new Date().toISOString(),
      },
    });
  }
}

async function handleSubscriptionExpired(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const subscriptionId = String(data.id);
  const userEmail = data.attributes.user_email;

  if (!userEmail) {
    log.error('No user email in subscription_expired payload', { subscriptionId });
    return;
  }

  const userId = emailToUserId(userEmail);

  log.info('Subscription expired - revoking entitlements', {
    subscriptionId, userId, entitlements,
  });

  for (const entitlementKey of entitlements) {
    try {
      await storage.revokeEntitlement({
        userId,
        entitlementKey,
        sourceId: subscriptionId,
      });
    } catch (err: any) {
      log.warn('Failed to revoke entitlement on expiry', {
        entitlementKey, subscriptionId, error: err.message,
      });
    }
  }

  log.info('Subscription entitlements revoked', { subscriptionId, userId });
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

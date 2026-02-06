// File: src/app/api/billing/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { CryptoUtils } from '@/billing/utils/crypto';
import { logger } from '@/billing/utils/logger';
import { env } from '@/billing/utils/env';
import { getEntitlementsForOffering } from '@/billing/billing.config';

/**
 * LemonSqueezy Webhook Handler
 *
 * Processes payment events and grants entitlements
 * Events handled:
 * - order_created: One-time purchase completed
 * - order_refunded: Purchase refunded
 * - subscription_created: Subscription started
 * - subscription_updated: Subscription modified
 * - subscription_cancelled: Subscription cancelled
 * - subscription_expired: Subscription expired
 */

// Processed events cache (in-memory for MVP - use Redis/DB in production)
const processedEvents = new Set<string>();

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

    // Check if already processed
    if (processedEvents.has(eventKey)) {
      log.info('Event already processed (idempotency)', { eventKey });
      return NextResponse.json({ status: 'already_processed' });
    }

    // Extract custom data
    const customData = meta?.custom_data || {};
    const offeringKey = customData.offeringKey;

    if (!offeringKey) {
      log.warn('No offering key in webhook payload', { eventName });
      // Still mark as processed to avoid retry loops
      processedEvents.add(eventKey);
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

    // Mark as processed
    processedEvents.add(eventKey);

    // Clean up old events (keep last 1000)
    if (processedEvents.size > 1000) {
      const toDelete = Array.from(processedEvents).slice(0, 100);
      toDelete.forEach(key => processedEvents.delete(key));
    }

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

// Event handlers

async function handleOrderCreated(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const userEmail = data.attributes.user_email;
  const orderId = data.id;
  const amount = data.attributes.total;
  const currency = data.attributes.currency;
  const customData = payload.meta?.custom_data || {};

  log.info('Order created', {
    orderId,
    userEmail,
    amount,
    currency,
    entitlements,
    projectName: customData.projectName,
  });

  // TODO: Grant entitlements to user
  // TODO: Store order in database
  // TODO: Send notification email
  // TODO: Trigger any custom business logic

  // For now, just log
  console.log('✅ Payment received:', {
    orderId,
    email: userEmail,
    amount: `${currency} ${amount}`,
    project: customData.projectName || 'N/A',
    entitlements,
  });

  // You can add Telegram notification here
  if (process.env.TELEGRAM_BOT_TOKEN) {
    // await sendTelegramNotification(...)
  }
}

async function handleOrderRefunded(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const orderId = data.id;

  log.info('Order refunded', { orderId, entitlements });

  // TODO: Revoke entitlements
  // TODO: Update order status
  // TODO: Send notification

  console.log('⚠️ Payment refunded:', { orderId });
}

async function handleSubscriptionCreated(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const subscriptionId = data.id;
  const userEmail = data.attributes.user_email;
  const status = data.attributes.status;
  const renewsAt = data.attributes.renews_at;

  log.info('Subscription created', {
    subscriptionId,
    userEmail,
    status,
    renewsAt,
    entitlements,
  });

  // TODO: Grant subscription entitlements
  // TODO: Store subscription in database
  // TODO: Set expiry to renewsAt

  console.log('✅ Subscription started:', {
    subscriptionId,
    email: userEmail,
    renewsAt,
    entitlements,
  });
}

async function handleSubscriptionUpdated(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const subscriptionId = data.id;
  const status = data.attributes.status;
  const renewsAt = data.attributes.renews_at;

  log.info('Subscription updated', {
    subscriptionId,
    status,
    renewsAt,
  });

  // TODO: Update subscription status
  // TODO: Update renewal date

  console.log('🔄 Subscription updated:', {
    subscriptionId,
    status,
    renewsAt,
  });
}

async function handleSubscriptionCancelled(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const subscriptionId = data.id;
  const endsAt = data.attributes.ends_at;

  log.info('Subscription cancelled', {
    subscriptionId,
    endsAt,
  });

  // TODO: Mark subscription as cancelled
  // TODO: Keep access until endsAt

  console.log('⚠️ Subscription cancelled (access until end):', {
    subscriptionId,
    endsAt,
  });
}

async function handleSubscriptionExpired(
  payload: any,
  offeringKey: string,
  entitlements: string[],
  log: any
) {
  const { data } = payload;
  const subscriptionId = data.id;

  log.info('Subscription expired', {
    subscriptionId,
    entitlements,
  });

  // TODO: Revoke entitlements
  // TODO: Update subscription status

  console.log('❌ Subscription expired:', {
    subscriptionId,
  });
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

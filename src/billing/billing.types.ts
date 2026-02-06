// File: src/billing/billing.types.ts

/**
 * Core billing types - generic and provider-agnostic
 */

// ============================================================================
// PRODUCT & OFFERING CONFIGURATION
// ============================================================================

export type OfferingKind = 'subscription' | 'one_time';

export type EntitlementDuration = {
  value: number;
  unit: 'day' | 'month' | 'year';
} | null;

export interface ProviderMapping {
  lemonsqueezy?: {
    storeId: string;
    variantId: string;
  };
  // Future providers can be added here
  stripe?: {
    priceId: string;
  };
}

export interface Offering {
  offeringKey: string; // Unique identifier (e.g., "pro_monthly")
  displayName: string;
  description?: string;
  kind: OfferingKind;
  priceDisplay: string; // e.g., "$29/month" or "$99"
  entitlementGrants: string[]; // Entitlement keys to grant
  entitlementDuration: EntitlementDuration;
  providerMapping: ProviderMapping;
  metadata?: Record<string, any>; // e.g., { credits: 1000, maxProjects: 10 }
  featured?: boolean;
  popular?: boolean;
}

export interface Product {
  productKey: string; // Unique identifier (e.g., "pro_plan")
  displayName: string;
  description?: string;
  offerings: Offering[];
  metadata?: Record<string, any>;
}

export interface BillingConfig {
  products: Product[];
  defaultReturnUrl?: string;
  defaultCancelUrl?: string;
}

// ============================================================================
// ENTITLEMENTS
// ============================================================================

export type EntitlementStatus =
  | 'active'
  | 'canceled'
  | 'expired'
  | 'refunded'
  | 'pending';

export interface Entitlement {
  id: string;
  userId: string;
  entitlementKey: string;
  status: EntitlementStatus;
  sourceProvider: 'lemonsqueezy' | 'stripe' | 'manual';
  sourceId: string; // Order ID or Subscription ID
  sourceType: 'order' | 'subscription';
  startsAt: Date;
  expiresAt: Date | null; // null = lifetime
  metaJson?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccessCheck {
  hasAccess: boolean;
  activeEntitlements: Entitlement[];
  reason?: string;
}

export interface AccessRequirement {
  anyOf?: string[]; // User needs at least one
  allOf?: string[]; // User needs all
}

// ============================================================================
// CHECKOUT & BILLING SESSION
// ============================================================================

export interface CheckoutRequest {
  userId?: string;
  offeringKey: string;
  quantity?: number;
  returnUrl?: string;
  cancelUrl?: string;
  customData?: Record<string, any>;
}

export interface CheckoutSession {
  url: string;
  sessionId?: string;
  provider: string;
  metadata?: Record<string, any>;
}

export interface PortalSession {
  url: string;
  provider: string;
}

// ============================================================================
// WEBHOOK EVENTS
// ============================================================================

export interface WebhookEvent {
  id: string;
  provider: string;
  eventType: string;
  payload: any;
  signature?: string;
  processedAt?: Date;
  createdAt: Date;
}

export interface WebhookProcessingResult {
  success: boolean;
  eventId: string;
  action: 'created' | 'updated' | 'skipped' | 'failed';
  entitlementsAffected: string[];
  error?: string;
}

// ============================================================================
// BILLING PROVIDER INTERFACE
// ============================================================================

export interface BillingProvider {
  name: string;

  /**
   * Create a checkout session for a specific offering
   */
  createCheckout(params: {
    offering: Offering;
    userId: string;
    quantity: number;
    returnUrl: string;
    cancelUrl: string;
    customData: Record<string, any>;
  }): Promise<CheckoutSession>;

  /**
   * Create a customer portal session (if supported)
   */
  createPortalSession?(params: {
    userId: string;
    customerId?: string;
    returnUrl: string;
  }): Promise<PortalSession>;

  /**
   * Verify webhook signature
   */
  verifyWebhook(params: {
    rawBody: string | Buffer;
    signature: string;
    secret: string;
  }): boolean;

  /**
   * Parse and normalize webhook event
   */
  parseWebhookEvent(params: {
    rawBody: string | Buffer;
    headers: Record<string, string | string[] | undefined>;
  }): WebhookEvent;

  /**
   * Get customer ID from webhook payload (if applicable)
   */
  extractCustomerId?(payload: any): string | null;
}

// ============================================================================
// STORAGE ADAPTER INTERFACE
// ============================================================================

export interface StorageAdapter {
  // Entitlements
  upsertEntitlement(data: {
    userId: string;
    entitlementKey: string;
    status: EntitlementStatus;
    sourceProvider: string;
    sourceId: string;
    sourceType: 'order' | 'subscription';
    startsAt: Date;
    expiresAt: Date | null;
    metaJson?: Record<string, any>;
  }): Promise<Entitlement>;

  revokeEntitlement(params: {
    userId: string;
    entitlementKey: string;
    sourceId: string;
  }): Promise<void>;

  listUserEntitlements(userId: string): Promise<Entitlement[]>;

  hasActiveEntitlement(
    userId: string,
    entitlementKey: string
  ): Promise<boolean>;

  getEntitlementBySourceId(
    sourceId: string,
    sourceProvider: string
  ): Promise<Entitlement | null>;

  // Webhook idempotency
  markWebhookProcessed(eventKey: string, payload?: any): Promise<void>;

  isWebhookProcessed(eventKey: string): Promise<boolean>;

  // Audit log (optional but recommended)
  logWebhookEvent?(event: WebhookEvent): Promise<void>;
}

// ============================================================================
// AUTH ADAPTER INTERFACE
// ============================================================================

export interface AuthAdapter {
  /**
   * Get current user ID from request
   * Returns null if not authenticated
   */
  getCurrentUserId(request: Request): Promise<string | null>;

  /**
   * Verify if user is authenticated
   */
  isAuthenticated(request: Request): Promise<boolean>;

  /**
   * Get user metadata (optional, for enriching checkout)
   */
  getUserMetadata?(
    userId: string
  ): Promise<{ email?: string; name?: string } | null>;
}

// ============================================================================
// BILLING ENGINE OPTIONS
// ============================================================================

export interface BillingEngineOptions {
  config: BillingConfig;
  provider: BillingProvider;
  storage: StorageAdapter;
  auth: AuthAdapter;
  appUrl: string;
  environment?: 'development' | 'staging' | 'production';
}

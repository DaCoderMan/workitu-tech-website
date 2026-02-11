// File: src/billing/providers/lemonsqueezy.client.ts

/**
 * LemonSqueezy API Client
 * Handles HTTP communication with LemonSqueezy API
 */

import { logger } from '../utils/logger';

export interface LemonSqueezyCheckoutOptions {
  storeId: string;
  variantId: string;
  customPrice?: number; // Price in cents for custom amount checkouts
  checkoutData?: {
    email?: string;
    name?: string;
    custom?: Record<string, any>;
  };
  checkoutOptions?: {
    embed?: boolean;
    media?: boolean;
    logo?: boolean;
    desc?: boolean;
    discount?: boolean;
    dark?: boolean;
    subscription_preview?: boolean;
  };
  expiresAt?: string;
  preview?: boolean;
  testMode?: boolean;
}

export interface LemonSqueezyCheckoutResponse {
  data: {
    id: string;
    type: 'checkouts';
    attributes: {
      store_id: number;
      variant_id: number;
      custom_price: number | null;
      product_options: Record<string, any>;
      checkout_options: Record<string, any>;
      checkout_data: Record<string, any>;
      expires_at: string | null;
      created_at: string;
      updated_at: string;
      test_mode: boolean;
      url: string;
    };
  };
}

export class LemonSqueezyClient {
  private apiKey: string;
  private baseUrl = 'https://api.lemonsqueezy.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Create a checkout session
   */
  async createCheckout(
    options: LemonSqueezyCheckoutOptions
  ): Promise<LemonSqueezyCheckoutResponse> {
    const log = logger.child({ method: 'createCheckout' });

    try {
      const payload = {
        data: {
          type: 'checkouts',
          attributes: {
            custom_price: options.customPrice ?? undefined,
            checkout_options: options.checkoutOptions || {},
            checkout_data: options.checkoutData || {},
            expires_at: options.expiresAt,
            preview: options.preview || false,
            test_mode: options.testMode || false,
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: options.storeId,
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: options.variantId,
              },
            },
          },
        },
      };

      log.debug('Creating LemonSqueezy checkout', {
        storeId: options.storeId,
        variantId: options.variantId,
      });

      const response = await fetch(`${this.baseUrl}/checkouts`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        log.error('LemonSqueezy checkout creation failed', new Error(errorText), {
          status: response.status,
          statusText: response.statusText,
        });
        throw new Error(
          `LemonSqueezy API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      log.info('LemonSqueezy checkout created successfully', {
        checkoutId: data.data?.id,
      });

      return data;
    } catch (error) {
      log.error('Failed to create LemonSqueezy checkout', error);
      throw error;
    }
  }

  /**
   * Retrieve a customer
   */
  async getCustomer(customerId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/customers/${customerId}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch customer: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * List subscriptions for a customer
   */
  async listSubscriptions(params?: {
    storeId?: string;
    orderId?: string;
    orderItemId?: string;
  }): Promise<any> {
    const searchParams = new URLSearchParams();
    if (params?.storeId) searchParams.append('filter[store_id]', params.storeId);
    if (params?.orderId) searchParams.append('filter[order_id]', params.orderId);
    if (params?.orderItemId) searchParams.append('filter[order_item_id]', params.orderItemId);

    const url = `${this.baseUrl}/subscriptions?${searchParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to list subscriptions: ${response.statusText}`);
    }

    return response.json();
  }
}

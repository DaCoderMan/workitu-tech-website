// File: src/billing/utils/env.ts

/**
 * Environment variable validation and access
 * Ensures all required billing config is present
 */

export interface BillingEnv {
  LEMONSQUEEZY_API_KEY: string;
  LEMONSQUEEZY_WEBHOOK_SECRET: string;
  LEMONSQUEEZY_STORE_ID: string;
  APP_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

class EnvValidator {
  private cache: Partial<Record<keyof BillingEnv, string>> = {};

  get<K extends keyof BillingEnv>(key: K, required: boolean = true): BillingEnv[K] | undefined {
    if (this.cache[key]) {
      return this.cache[key] as BillingEnv[K];
    }

    const value = process.env[key];

    if (required && !value) {
      throw new Error(
        `Missing required environment variable: ${key}. ` +
          `Please add it to your Vercel environment variables (or .env.local for local dev).`
      );
    }

    if (value) {
      this.cache[key] = value;
    }
    return value as BillingEnv[K] | undefined;
  }

  getAll(required: boolean = false): Partial<BillingEnv> {
    return {
      LEMONSQUEEZY_API_KEY: this.get('LEMONSQUEEZY_API_KEY', required),
      LEMONSQUEEZY_WEBHOOK_SECRET: this.get('LEMONSQUEEZY_WEBHOOK_SECRET', required),
      LEMONSQUEEZY_STORE_ID: this.get('LEMONSQUEEZY_STORE_ID', required),
      APP_URL: this.get('APP_URL', required) || process.env.NEXT_PUBLIC_SITE_URL || 'https://workitu.com',
      NODE_ENV: (this.get('NODE_ENV', false) as any) || 'development',
    };
  }

  validate(): BillingEnv {
    const env = this.getAll(true);

    // Validate APP_URL format
    if (env.APP_URL && !env.APP_URL.startsWith('http')) {
      throw new Error('APP_URL must start with http:// or https://');
    }

    return env as BillingEnv;
  }

  isDevelopment(): boolean {
    return this.get('NODE_ENV', false) === 'development';
  }

  isProduction(): boolean {
    return this.get('NODE_ENV', false) === 'production';
  }
}

export const env = new EnvValidator();

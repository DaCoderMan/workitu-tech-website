// File: src/billing/utils/env.ts

/**
 * Environment variable validation and access
 * Ensures all required billing config is present
 */

import { readFileSync } from 'fs';
import { join } from 'path';

export interface BillingEnv {
  LEMONSQUEEZY_API_KEY: string;
  LEMONSQUEEZY_WEBHOOK_SECRET: string;
  LEMONSQUEEZY_STORE_ID: string;
  APP_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

// Parse .env.local once at startup as a fallback for system env overrides
let envLocalCache: Record<string, string> | null = null;

function readEnvLocal(): Record<string, string> {
  if (envLocalCache) return envLocalCache;
  envLocalCache = {};
  try {
    const content = readFileSync(join(process.cwd(), '.env.local'), 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx);
      let val = trimmed.slice(eqIdx + 1);
      // Strip surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      envLocalCache[key] = val;
    }
  } catch {
    // .env.local may not exist in production
  }
  return envLocalCache;
}

class EnvValidator {
  private cache: Partial<Record<keyof BillingEnv, string>> = {};

  get<K extends keyof BillingEnv>(key: K, required: boolean = true): BillingEnv[K] | undefined {
    if (this.cache[key]) {
      return this.cache[key] as BillingEnv[K];
    }

    let value = process.env[key];

    // For the API key, validate it looks correct (JWT, 100+ chars).
    // If a stale system env var is overriding .env.local, fall back to .env.local.
    if (key === 'LEMONSQUEEZY_API_KEY' && value && (value.length < 100 || value.startsWith('sk_'))) {
      const local = readEnvLocal();
      if (local.LEMONSQUEEZY_API_KEY && local.LEMONSQUEEZY_API_KEY.length > 100) {
        value = local.LEMONSQUEEZY_API_KEY as typeof value;
      }
    }

    if (required && !value) {
      throw new Error(
        `Missing required environment variable: ${key}. ` +
          `Please add it to your .env.local file.`
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
      APP_URL: this.get('APP_URL', required) || 'http://localhost:3000',
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

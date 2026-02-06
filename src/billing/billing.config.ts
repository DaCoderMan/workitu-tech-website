// File: src/billing/billing.config.ts

import { BillingConfig } from './billing.types';

/**
 * GENERIC BILLING CONFIGURATION
 *
 * This file defines ALL products, plans, and offerings.
 * To add a new product or plan, simply add it here - no code changes needed elsewhere.
 *
 * Example use cases:
 * - SaaS subscriptions (monthly, yearly, team plans)
 * - One-time purchases (downloads, credits, add-ons)
 * - Hybrid models (base subscription + one-time add-ons)
 */

export const billingConfig: BillingConfig = {
  products: [
    // ========================================================================
    // PRODUCT 1: WORKITU TECH SERVICES (FLEXIBLE PAYMENT)
    // ========================================================================
    {
      productKey: 'workitu_services',
      displayName: 'Workitu Tech Services',
      description: 'Professional web development, AI solutions, and digital services',
      offerings: [
        {
          offeringKey: 'custom_project_payment',
          displayName: 'Custom Project Payment',
          description: 'Pay for your custom project - you choose the amount',
          kind: 'one_time',
          priceDisplay: 'Custom Amount',
          entitlementGrants: ['project_payment_made'],
          entitlementDuration: null, // Lifetime entitlement
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_CUSTOM_PAYMENT || '',
            },
          },
          metadata: {
            allowCustomAmount: true,
            minAmount: 100, // $1.00 minimum
            maxAmount: 1000000, // $10,000 maximum
            currency: 'USD',
          },
        },
        {
          offeringKey: 'website_basic',
          displayName: 'Basic Website',
          description: 'Professional website starting package',
          kind: 'one_time',
          priceDisplay: '$320',
          entitlementGrants: ['website_basic_access'],
          entitlementDuration: null,
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_WEBSITE_BASIC || '',
            },
          },
          metadata: {
            service: 'website',
            tier: 'basic',
          },
        },
        {
          offeringKey: 'ecommerce_solution',
          displayName: 'E-Commerce Solution',
          description: 'Complete online store setup',
          kind: 'one_time',
          priceDisplay: '$950',
          entitlementGrants: ['ecommerce_access'],
          entitlementDuration: null,
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_ECOMMERCE || '',
            },
          },
          metadata: {
            service: 'ecommerce',
            includes: ['payment_integration', 'inventory_management'],
          },
        },
        {
          offeringKey: 'ai_application',
          displayName: 'AI-Powered Application',
          description: 'Custom AI solution',
          kind: 'one_time',
          priceDisplay: '$670',
          entitlementGrants: ['ai_app_access'],
          entitlementDuration: null,
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_AI_APP || '',
            },
          },
          metadata: {
            service: 'ai_application',
          },
        },
      ],
      metadata: {
        category: 'services',
        flexible: true,
      },
    },

    // ========================================================================
    // PRODUCT 2: SUPPORT & MAINTENANCE PLANS (EXAMPLE)
    // ========================================================================
    {
      productKey: 'support_plans',
      displayName: 'Support & Maintenance',
      description: 'Ongoing support and maintenance plans',
      offerings: [
        {
          offeringKey: 'support_monthly',
          displayName: 'Monthly Support',
          description: 'Ongoing maintenance and support',
          kind: 'subscription',
          priceDisplay: '$270/month',
          entitlementGrants: ['support_access', 'priority_support'],
          entitlementDuration: null, // Auto-renewed
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_SUPPORT_MONTHLY || '',
            },
          },
          metadata: {
            responseTime: '24h',
            includedHours: 5,
          },
          featured: true,
        },
        {
          offeringKey: 'support_yearly',
          displayName: 'Yearly Support',
          description: 'Annual maintenance and support - save 20%',
          kind: 'subscription',
          priceDisplay: '$2,592/year',
          entitlementGrants: ['support_access', 'priority_support', 'yearly_discount'],
          entitlementDuration: null,
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_SUPPORT_YEARLY || '',
            },
          },
          metadata: {
            responseTime: '24h',
            includedHours: 5,
            discount: '20%',
          },
          popular: true,
        },
      ],
      metadata: {
        category: 'subscriptions',
      },
    },

    // ========================================================================
    // PRODUCT 3: EXAMPLE SaaS TIERS (FOR REFERENCE)
    // ========================================================================
    {
      productKey: 'saas_example',
      displayName: 'SaaS Platform',
      description: 'Example multi-tier SaaS product',
      offerings: [
        {
          offeringKey: 'saas_free',
          displayName: 'Free Tier',
          description: 'Get started for free',
          kind: 'one_time',
          priceDisplay: 'Free',
          entitlementGrants: ['saas_free_tier'],
          entitlementDuration: null,
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: 'free', // No actual LemonSqueezy variant
            },
          },
          metadata: {
            maxProjects: 1,
            maxUsers: 1,
            credits: 100,
          },
        },
        {
          offeringKey: 'saas_pro_monthly',
          displayName: 'Pro Monthly',
          description: 'Full access with monthly billing',
          kind: 'subscription',
          priceDisplay: '$29/month',
          entitlementGrants: ['saas_pro_tier', 'api_access'],
          entitlementDuration: null,
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_PRO_MONTHLY || '',
            },
          },
          metadata: {
            maxProjects: 10,
            maxUsers: 5,
            credits: 10000,
          },
          featured: true,
        },
        {
          offeringKey: 'saas_pro_yearly',
          displayName: 'Pro Yearly',
          description: 'Save 20% with annual billing',
          kind: 'subscription',
          priceDisplay: '$279/year',
          entitlementGrants: ['saas_pro_tier', 'api_access', 'yearly_discount'],
          entitlementDuration: null,
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_PRO_YEARLY || '',
            },
          },
          metadata: {
            maxProjects: 10,
            maxUsers: 5,
            credits: 120000,
            discount: '20%',
          },
          popular: true,
        },
        {
          offeringKey: 'saas_team',
          displayName: 'Team Plan',
          description: 'For growing teams',
          kind: 'subscription',
          priceDisplay: '$99/month',
          entitlementGrants: ['saas_team_tier', 'api_access', 'team_features'],
          entitlementDuration: null,
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_TEAM || '',
            },
          },
          metadata: {
            maxProjects: 50,
            maxUsers: 20,
            credits: 50000,
            teamFeatures: true,
          },
        },
      ],
      metadata: {
        category: 'saas',
        freeTierAvailable: true,
      },
    },

    // ========================================================================
    // PRODUCT 4: ONE-TIME ADD-ONS (EXAMPLE)
    // ========================================================================
    {
      productKey: 'addons',
      displayName: 'Add-ons & Credits',
      description: 'One-time purchases for additional features',
      offerings: [
        {
          offeringKey: 'credits_1000',
          displayName: '1,000 Credits',
          description: 'One-time credit purchase',
          kind: 'one_time',
          priceDisplay: '$10',
          entitlementGrants: ['credits_addon'],
          entitlementDuration: null,
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_CREDITS_1000 || '',
            },
          },
          metadata: {
            creditsAmount: 1000,
          },
        },
        {
          offeringKey: 'credits_5000',
          displayName: '5,000 Credits',
          description: 'Bulk credit purchase - save 15%',
          kind: 'one_time',
          priceDisplay: '$42.50',
          entitlementGrants: ['credits_addon'],
          entitlementDuration: null,
          providerMapping: {
            lemonsqueezy: {
              storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
              variantId: process.env.LEMONSQUEEZY_VARIANT_ID_CREDITS_5000 || '',
            },
          },
          metadata: {
            creditsAmount: 5000,
            discount: '15%',
          },
          popular: true,
        },
      ],
      metadata: {
        category: 'addons',
      },
    },
  ],

  defaultReturnUrl: '/billing/success',
  defaultCancelUrl: '/billing/cancel',
};

/**
 * HELPER FUNCTIONS
 */

export function getOfferingByKey(offeringKey: string) {
  for (const product of billingConfig.products) {
    const offering = product.offerings.find((o) => o.offeringKey === offeringKey);
    if (offering) {
      return { product, offering };
    }
  }
  return null;
}

export function getProductByKey(productKey: string) {
  return billingConfig.products.find((p) => p.productKey === productKey);
}

export function getAllOfferings() {
  return billingConfig.products.flatMap((p) => p.offerings);
}

export function getOfferingsByProduct(productKey: string) {
  const product = getProductByKey(productKey);
  return product?.offerings || [];
}

export function getEntitlementsForOffering(offeringKey: string) {
  const result = getOfferingByKey(offeringKey);
  return result?.offering.entitlementGrants || [];
}

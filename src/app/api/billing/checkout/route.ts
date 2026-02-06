// File: src/app/api/billing/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { LemonSqueezyClient } from '@/billing/providers/lemonsqueezy.client';
import { getOfferingByKey } from '@/billing/billing.config';
import { Validator } from '@/billing/utils/validate';
import { logger } from '@/billing/utils/logger';
import { env } from '@/billing/utils/env';

export async function POST(request: NextRequest) {
  const log = logger.child({ endpoint: 'checkout' });

  try {
    // Parse request body
    const body = await request.json();
    const { offeringKey, customData = {} } = body;

    log.info('Checkout request received', { offeringKey });

    // Validate offering key
    const validatedOfferingKey = Validator.validateOfferingKey(offeringKey);
    const result = getOfferingByKey(validatedOfferingKey);

    if (!result) {
      log.warn('Invalid offering key', { offeringKey });
      return NextResponse.json(
        { error: 'Invalid offering key' },
        { status: 400 }
      );
    }

    const { product, offering } = result;

    // Get LemonSqueezy configuration
    const apiKey = env.get('LEMONSQUEEZY_API_KEY');
    const appUrl = env.get('APP_URL') || 'http://localhost:3000';

    if (!apiKey) {
      log.error('LemonSqueezy API key not configured');
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 500 }
      );
    }

    const lemonSqueezy = offering.providerMapping.lemonsqueezy;
    if (!lemonSqueezy) {
      log.error('LemonSqueezy configuration missing for offering', { offeringKey });
      return NextResponse.json(
        { error: 'Payment configuration missing' },
        { status: 500 }
      );
    }

    // Prepare checkout data
    const checkoutData: any = {
      email: customData.email || '',
      name: customData.name || '',
      custom: {
        offeringKey,
        productKey: product.productKey,
        projectName: customData.projectName || '',
        timestamp: new Date().toISOString(),
        environment: env.get('NODE_ENV', false) || 'production',
      },
    };

    // Handle custom amount if specified
    let checkoutOptions: any = {
      embed: false,
      media: true,
      logo: true,
      desc: true,
      discount: true,
      dark: false,
    };

    // For custom payment amounts
    if (customData.amount && offering.metadata?.allowCustomAmount) {
      const amount = Validator.validateCustomAmount(
        customData.amount,
        offering.metadata.minAmount,
        offering.metadata.maxAmount
      );
      checkoutData.custom.customAmount = amount;
    }

    // Create LemonSqueezy client
    const client = new LemonSqueezyClient(apiKey);

    // Create checkout session
    const checkout = await client.createCheckout({
      storeId: lemonSqueezy.storeId,
      variantId: lemonSqueezy.variantId,
      checkoutData,
      checkoutOptions,
      testMode: env.isDevelopment(),
    });

    log.info('Checkout created successfully', {
      checkoutId: checkout.data.id,
      url: checkout.data.attributes.url,
    });

    // Return checkout URL
    return NextResponse.json({
      url: checkout.data.attributes.url,
      checkoutId: checkout.data.id,
    });
  } catch (error: any) {
    log.error('Checkout creation failed', error);

    return NextResponse.json(
      {
        error: error.message || 'Failed to create checkout',
        details: env.isDevelopment() ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

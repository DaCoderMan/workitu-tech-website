# 💳 Payment System Flow Diagram

## Complete Payment Flow (User Journey)

```
┌─────────────────────────────────────────────────────────────────┐
│                         PAYMENT FLOW                             │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   CLIENT     │
│  (Browser)   │
└──────┬───────┘
       │
       │ 1. Clicks "💳 Pay Now" button
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│                     /pay (Payment Page)                           │
│  • Enter amount: $______                                         │
│  • Project name: ___________ (optional)                          │
│  • Email: your@email.com                                         │
│  • [Proceed to Payment] button                                   │
└──────┬───────────────────────────────────────────────────────────┘
       │
       │ 2. Clicks "Proceed to Payment"
       │    Sends: { offeringKey, amount, email, projectName }
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│            /api/billing/checkout (Your API)                       │
│  • Validates offering key                                        │
│  • Validates amount ($1-$10,000)                                 │
│  • Gets LemonSqueezy config from billing.config.ts               │
│  • Creates checkout session                                      │
└──────┬───────────────────────────────────────────────────────────┘
       │
       │ 3. Makes API call to LemonSqueezy
       │    POST /v1/checkouts
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    LemonSqueezy API                               │
│  • Creates checkout session                                      │
│  • Returns checkout URL                                          │
└──────┬───────────────────────────────────────────────────────────┘
       │
       │ 4. Returns checkout URL
       │    { url: "https://checkout.lemonsqueezy.com/..." }
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│                  Redirect to LemonSqueezy                         │
│  Client redirected to secure checkout page                       │
└──────┬───────────────────────────────────────────────────────────┘
       │
       │ 5. User enters payment details
       │    • Credit card information
       │    • Billing address
       │    • Clicks "Pay Now"
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│              LemonSqueezy Processes Payment                       │
│  • Validates card                                                │
│  • Charges customer                                              │
│  • Sends receipt email                                           │
│  • Sends webhook to your site                                    │
└──────┬─────────────────────────────────┬─────────────────────────┘
       │                                 │
       │ 6a. Redirects user              │ 6b. Sends webhook
       │     to success page             │     (async, server-to-server)
       │                                 │
       ▼                                 ▼
┌──────────────────────────┐   ┌──────────────────────────────────┐
│  /billing/success        │   │  /api/billing/webhook (Your API)  │
│  • Order ID              │   │  • Verifies HMAC signature       │
│  • Amount paid           │   │  • Checks idempotency            │
│  • Project name          │   │  • Processes event               │
│  • "What's next" info    │   │  • Grants entitlements           │
│  • [Back to Home]        │   │  • Logs payment                  │
│  • [Contact Us]          │   │  • (Optional) Telegram notify    │
└──────────────────────────┘   └──────────────────────────────────┘

                                         │
                                         │ 7. Returns success
                                         │    { status: "success" }
                                         │
                                         ▼
                                ┌────────────────────┐
                                │  LemonSqueezy      │
                                │  Confirms delivery │
                                └────────────────────┘
```

---

## Webhook Events Handled

```
┌─────────────────────────────────────────────────────────────────┐
│                      WEBHOOK EVENTS                              │
└─────────────────────────────────────────────────────────────────┘

Event: order_created
├─ User completes one-time payment
├─ Webhook handler:
│  ├─ Extracts: email, amount, project name, order ID
│  ├─ Grants entitlements
│  ├─ Logs payment
│  └─ (Optional) Sends Telegram notification
└─ Result: Payment confirmed ✅

Event: order_refunded
├─ Admin issues refund in LemonSqueezy dashboard
├─ Webhook handler:
│  ├─ Revokes entitlements
│  ├─ Updates order status
│  └─ Logs refund
└─ Result: Access revoked ⚠️

Event: subscription_created
├─ User starts subscription (monthly/yearly support)
├─ Webhook handler:
│  ├─ Grants subscription entitlements
│  ├─ Sets renewal date
│  └─ Logs subscription start
└─ Result: Subscription active ✅

Event: subscription_updated
├─ Subscription changed (upgrade/downgrade)
├─ Webhook handler:
│  ├─ Updates entitlements
│  ├─ Updates renewal date
│  └─ Logs change
└─ Result: Subscription modified 🔄

Event: subscription_cancelled
├─ User or admin cancels subscription
├─ Webhook handler:
│  ├─ Marks as cancelled
│  ├─ Keeps access until end date
│  └─ Logs cancellation
└─ Result: Access continues until end ⏳

Event: subscription_expired
├─ Subscription reaches end date
├─ Webhook handler:
│  ├─ Revokes entitlements
│  ├─ Updates status to expired
│  └─ Logs expiration
└─ Result: Access removed ❌
```

---

## Security Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  WEBHOOK SECURITY FLOW                           │
└─────────────────────────────────────────────────────────────────┘

LemonSqueezy sends webhook:
└─ POST /api/billing/webhook
   ├─ Headers:
   │  ├─ X-Signature: [HMAC-SHA256 signature]
   │  └─ X-Event-Name: [event type]
   └─ Body: [JSON payload]

Your API receives webhook:
├─ 1. Extract signature from header
├─ 2. Get raw body (before parsing)
├─ 3. Calculate HMAC-SHA256:
│     hmac = HMAC-SHA256(rawBody, webhookSecret)
├─ 4. Compare signatures (timing-safe):
│     if (signature === expectedSignature) ✅
│     else reject ❌
├─ 5. Check idempotency:
│     eventKey = hash(eventId + payload)
│     if (already_processed) return "already_processed"
├─ 6. Parse payload
├─ 7. Process event
└─ 8. Return success

Security features:
├─ HMAC-SHA256 verification (cryptographic signature)
├─ Timing-safe comparison (prevents timing attacks)
├─ Idempotency checks (prevents duplicate processing)
├─ Input validation (amount limits, email format)
└─ HTTPS only (TLS encryption)
```

---

## Configuration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│               CONFIGURATION ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────┘

1. Environment Variables (.env.local)
   └─ LEMONSQUEEZY_API_KEY
   └─ LEMONSQUEEZY_WEBHOOK_SECRET
   └─ LEMONSQUEEZY_STORE_ID
   └─ LEMONSQUEEZY_VARIANT_ID_CUSTOM_PAYMENT
   └─ APP_URL

2. Billing Config (src/billing/billing.config.ts)
   └─ products[] - All products and offerings
      └─ workitu_services
         └─ custom_project_payment
            ├─ offeringKey: "custom_project_payment"
            ├─ kind: "one_time"
            ├─ priceDisplay: "Custom Amount"
            ├─ entitlementGrants: ["project_payment_made"]
            └─ providerMapping:
               └─ lemonsqueezy:
                  ├─ storeId: process.env.LEMONSQUEEZY_STORE_ID
                  └─ variantId: process.env.LEMONSQUEEZY_VARIANT_ID_CUSTOM_PAYMENT

3. Payment Page (src/app/pay/page.tsx)
   └─ Sends: { offeringKey: "custom_project_payment" }

4. Checkout API (src/app/api/billing/checkout/route.ts)
   └─ Looks up offering using offeringKey
   └─ Gets LemonSqueezy config from offering.providerMapping
   └─ Creates checkout with LemonSqueezy

5. Webhook API (src/app/api/billing/webhook/route.ts)
   └─ Receives payment event
   └─ Extracts offeringKey from custom_data
   └─ Gets entitlements from config
   └─ Grants access based on entitlements
```

---

## File Structure

```
src/
├── billing/                          # Core billing module
│   ├── billing.types.ts             # TypeScript type definitions
│   ├── billing.config.ts            # Product configuration (EDIT THIS)
│   ├── utils/
│   │   ├── env.ts                   # Environment validation
│   │   ├── crypto.ts                # HMAC verification
│   │   ├── logger.ts                # Structured logging
│   │   └── validate.ts              # Input validation
│   └── providers/
│       └── lemonsqueezy.client.ts   # LemonSqueezy API wrapper
│
├── app/
│   ├── pay/
│   │   └── page.tsx                 # Payment form UI
│   ├── billing/
│   │   ├── success/
│   │   │   └── page.tsx             # Success confirmation
│   │   └── cancel/
│   │       └── page.tsx             # Cancellation page
│   └── api/
│       └── billing/
│           ├── checkout/
│           │   └── route.ts         # Checkout API endpoint
│           └── webhook/
│               └── route.ts         # Webhook processor
│
└── components/
    └── layout/
        └── Header.js                # "💳 Pay Now" button added

Documentation/
├── PAYMENT_SYSTEM_STATUS.md         # This is your main guide ⭐
├── PAYMENT_SYSTEM_READY.md          # Setup checklist
├── BILLING_MODULE_README.md         # Technical overview
├── PAYMENT_SETUP_GUIDE.md           # LemonSqueezy setup
└── PAYMENT_FLOW_DIAGRAM.md          # This file (visual guide)
```

---

## Quick Reference Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test payment locally
# → Visit: http://localhost:3000/pay

# Deploy to Vercel
vercel --prod

# Check git status
git status

# View recent commits
git log --oneline -5
```

---

## Environment Setup States

```
┌─────────────────────────────────────────────────────────────────┐
│                  ENVIRONMENT STATES                              │
└─────────────────────────────────────────────────────────────────┘

✅ COMPLETED:
   LEMONSQUEEZY_API_KEY=eyJ0eXAi... (YOUR JWT TOKEN)
   APP_URL=http://localhost:3000
   NODE_ENV=development

⏳ PENDING (Need from LemonSqueezy Dashboard):
   LEMONSQUEEZY_WEBHOOK_SECRET=whsec_xxxxxxx
   LEMONSQUEEZY_STORE_ID=123456
   LEMONSQUEEZY_VARIANT_ID_CUSTOM_PAYMENT=67890

📝 FOR PRODUCTION (Update in Vercel):
   APP_URL=https://workitu.com
   NODE_ENV=production
```

---

## Testing Checklist

```
LOCAL TESTING:
├─ [ ] npm run dev
├─ [ ] Visit http://localhost:3000
├─ [ ] Click "💳 Pay Now" in header
├─ [ ] Enter amount: $10.00
├─ [ ] Enter email: test@example.com
├─ [ ] Click "Proceed to Payment"
└─ [ ] Should show error if LemonSqueezy not configured yet ✅

AFTER LEMONSQUEEZY SETUP:
├─ [ ] Enable Test Mode in LemonSqueezy
├─ [ ] Visit http://localhost:3000/pay
├─ [ ] Enter amount: $10.00
├─ [ ] Enter email: test@example.com
├─ [ ] Click "Proceed to Payment"
├─ [ ] Redirected to LemonSqueezy checkout
├─ [ ] Use test card: 4242 4242 4242 4242
├─ [ ] Complete payment
├─ [ ] Redirected to /billing/success
├─ [ ] Check LemonSqueezy dashboard for webhook event
└─ [ ] Verify webhook processed successfully ✅

PRODUCTION TESTING:
├─ [ ] Deploy to Vercel
├─ [ ] Add environment variables to Vercel
├─ [ ] Visit https://workitu.com/pay
├─ [ ] Complete test payment
├─ [ ] Verify webhook received
└─ [ ] Switch to live mode in LemonSqueezy ✅
```

---

## Common URLs

```
LOCAL:
├─ Payment page:    http://localhost:3000/pay
├─ Success page:    http://localhost:3000/billing/success
├─ Cancel page:     http://localhost:3000/billing/cancel
├─ Checkout API:    http://localhost:3000/api/billing/checkout
└─ Webhook API:     http://localhost:3000/api/billing/webhook

PRODUCTION:
├─ Payment page:    https://workitu.com/pay
├─ Success page:    https://workitu.com/billing/success
├─ Cancel page:     https://workitu.com/billing/cancel
├─ Checkout API:    https://workitu.com/api/billing/checkout
└─ Webhook API:     https://workitu.com/api/billing/webhook

EXTERNAL:
├─ LemonSqueezy:    https://app.lemonsqueezy.com/
└─ Vercel:          https://vercel.com/dashboard
```

---

## 🎯 Next Action

**→ Read [PAYMENT_SYSTEM_READY.md](PAYMENT_SYSTEM_READY.md) for complete setup instructions!**

This file shows you HOW it works.
That file shows you WHAT TO DO NEXT.

Ready to accept your first payment? Let's go! 🚀

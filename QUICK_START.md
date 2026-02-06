# 🚀 Quick Start Guide - Workitu Tech Website

## ✅ What's Been Completed

We've successfully implemented **12 major enterprise-level features** for your website:

### 🌍 Multi-Language Support (3 Languages)
- English 🇺🇸
- Hebrew 🇮🇱 (with RTL support)
- Portuguese 🇧🇷 (NEW!)

### 📊 Advanced Analytics
- Google Analytics 4 integration
- Google Tag Manager integration
- Conversion tracking for contact forms & portfolio clicks

### 📱 Instant Notifications
- Telegram bot notifications for contact form submissions
- Auto-responder emails for users

### 🔐 Enhanced Security
- Password reset functionality
- Sentry error tracking (ready to enable)
- Rate limiting on all forms

### 🔗 Social Media Integration
- Dynamic social icons (LinkedIn, GitHub, Twitter, YouTube, Instagram, Facebook)
- Only shows platforms you've configured

### ⚖️ Legal Compliance
- Complete legal hub with 4 sections:
  - Privacy Policy
  - Terms of Service
  - Cookie Policy
  - GDPR & Data Rights

---

## 🎯 Next Steps (5 minutes)

### 1. Configure Your Services

Open [.env.local](.env.local) and add your credentials:

```bash
# 📧 Email (Required for contact form)
SMTP_USER=contact@workitu.com
SMTP_PASS=your_gmail_app_password_here

# 📊 Google Analytics (Optional - for tracking)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# 📱 Telegram Notifications (Optional - instant alerts)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
NEXT_PUBLIC_ENABLE_TELEGRAM_NOTIFICATIONS=true

# 🔗 Social Media (Update your URLs)
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/jonsamper
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yourhandle
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
```

### 2. Test Locally

```bash
# Run development server
npm run dev

# Visit http://localhost:3000
```

### 3. Test These Features

- [ ] Switch between EN / HE / PT languages (top right dropdown)
- [ ] Submit contact form (you'll get auto-responder email)
- [ ] View portfolio projects
- [ ] Check legal pages at `/legal`
- [ ] Test social media links in footer

### 4. Deploy to Production

```bash
# Option 1: Vercel (Recommended)
npm install -g vercel
vercel --prod

# Option 2: Netlify
npm install -g netlify-cli
netlify deploy --prod
```

---

## 📱 How to Set Up Telegram Notifications (2 minutes)

1. **Create Bot:**
   - Open Telegram and message [@BotFather](https://t.me/botfather)
   - Send `/newbot`
   - Follow instructions
   - Copy the bot token

2. **Get Chat ID:**
   - Start a chat with your new bot
   - Message [@userinfobot](https://t.me/userinfobot)
   - Copy your user ID

3. **Configure:**
   ```bash
   TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
   TELEGRAM_CHAT_ID=123456789
   NEXT_PUBLIC_ENABLE_TELEGRAM_NOTIFICATIONS=true
   ```

4. **Test:**
   - Submit a contact form
   - Check your Telegram for instant notification! 🎉

---

## 📊 How to Set Up Google Analytics (3 minutes)

1. **Create GA4 Property:**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create new property
   - Get Measurement ID (starts with `G-`)

2. **Create GTM Container:**
   - Go to [Google Tag Manager](https://tagmanager.google.com)
   - Create new container
   - Get Container ID (starts with `GTM-`)

3. **Configure:**
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   ```

4. **Verify:**
   - Deploy your site
   - Visit your site
   - Check Google Analytics "Realtime" report

---

## 🔍 Key Features Overview

### 1. Language Switcher
**Location:** Top right of header
- Click to see dropdown with flags
- Instant language switching
- Persisted in localStorage

### 2. Analytics Tracking
**What's Tracked:**
- Page views (automatic)
- Contact form submissions
- Portfolio project clicks
- Pricing CTA clicks
- External link clicks

### 3. Contact Form
**Features:**
- Rate limiting (5 requests per 15 minutes)
- Input sanitization
- Auto-responder email to user
- Notification email to admin
- Telegram notification (if enabled)
- Saves to `src/data/submissions.json`

### 4. Password Reset
**How to Use:**
- POST to `/api/auth/forgot-password`
- Receive email with reset link
- Click link to reset password
- Get new password hash
- Update `.env.local`

### 5. Legal Pages
**Access:** `/legal` or footer link
**Sections:**
- Privacy Policy (data collection & usage)
- Terms of Service (user agreements)
- Cookie Policy (cookie usage)
- GDPR Rights (data request procedures)

### 6. Social Media
**Configuration:**
- Set URLs in `.env.local`
- Icons appear automatically
- Unset URLs = hidden icons
- Supports 6 platforms

---

## 🐛 Troubleshooting

### Contact Form Not Sending Emails

**Problem:** Form submits but no email received

**Solution:**
1. Check SMTP credentials in `.env.local`
2. For Gmail, use App Password (not regular password)
3. Enable "Less secure app access" or use OAuth2
4. Check spam folder

### Telegram Notifications Not Working

**Problem:** No Telegram message received

**Solution:**
1. Verify bot token is correct
2. Ensure you started a chat with your bot
3. Check chat ID is correct
4. Set `NEXT_PUBLIC_ENABLE_TELEGRAM_NOTIFICATIONS=true`
5. Check console for errors

### Build Errors

**Problem:** `npm run build` fails

**Solution:**
1. Delete `.next` folder
2. Delete `node_modules`
3. Run `npm install`
4. Run `npm run build` again

### Environment Variables Not Working

**Problem:** Features not working in production

**Solution:**
1. Ensure `.env.local` is configured
2. For Vercel/Netlify, add env vars in dashboard
3. Variables starting with `NEXT_PUBLIC_` are client-side
4. Others are server-side only

---

## 📂 Important Files

| File | Purpose | When to Edit |
|------|---------|--------------|
| `.env.local` | Configuration | Add credentials |
| `src/lib/translations.js` | All translations | Add/change text |
| `src/data/content.json` | Page content | Update content |
| `src/data/projects.json` | Portfolio items | Add projects |
| `src/components/Analytics.js` | Tracking code | Add custom events |
| `src/app/legal/page.js` | Legal pages | Update policies |

---

## 🎨 Customization

### Add a New Language

1. Edit `src/lib/translations.js`:
   ```js
   export const translations = {
     en: { ... },
     he: { ... },
     pt: { ... },
     es: { /* Spanish translations */ }
   }
   ```

2. Edit `src/components/LanguageToggle.js`:
   ```js
   const languages = [
     { code: 'en', name: 'English', flag: '🇺🇸' },
     { code: 'he', name: 'עברית', flag: '🇮🇱' },
     { code: 'pt', name: 'Português', flag: '🇧🇷' },
     { code: 'es', name: 'Español', flag: '🇪🇸' }
   ];
   ```

### Track Custom Events

```js
import { trackEvent } from '@/components/Analytics';

// Example: Track button click
const handleClick = () => {
  trackEvent('button_click', {
    event_category: 'engagement',
    event_label: 'Download Brochure',
    value: 'brochure.pdf'
  });
};
```

### Add a New Social Platform

1. Add URL to `.env.local`:
   ```bash
   NEXT_PUBLIC_TIKTOK_URL=https://tiktok.com/@yourusername
   ```

2. Edit `src/components/layout/Footer.js`:
   ```jsx
   {process.env.NEXT_PUBLIC_TIKTOK_URL && (
     <a href={process.env.NEXT_PUBLIC_TIKTOK_URL}>
       {/* TikTok SVG icon */}
     </a>
   )}
   ```

---

## 📞 Support

- **Email:** contact@workitu.com
- **Documentation:** [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
- **README:** [README.md](README.md)

---

## 🎉 You're All Set!

Your website now has:
- ✅ Professional multi-language support
- ✅ Enterprise-grade analytics
- ✅ Instant notifications
- ✅ Legal compliance
- ✅ Social media integration
- ✅ Secure authentication
- ✅ And much more!

**Next:** Deploy to production and start getting leads! 🚀

---

*Made with ❤️ for Workitu Tech*
*Where Imagination Meets Innovation*

# 🚀 Workitu.com Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Gmail App Password ⏳ (Action Required)
**Status:** ⚠️ **ACTION NEEDED**

**Steps:**
1. Go to: https://myaccount.google.com/security
2. Enable 2-Factor Authentication (if not enabled)
3. Go to: https://myaccount.google.com/apppasswords
4. Create new app password for "Workitu Website"
5. Copy the 16-character password
6. Update `.env.local`:
   ```env
   SMTP_USER=jonathanperlin@gmail.com
   SMTP_PASS=your_16_char_password_here
   ```

---

### 2. Google Analytics ⏳ (Action Required)
**Status:** ⚠️ **ACTION NEEDED**

**Quick Setup (5 minutes):**
1. Visit: https://analytics.google.com/
2. Create account → "Workitu Tech"
3. Create property → "Workitu.com"
4. Add web stream → https://workitu.com
5. Copy Measurement ID (format: G-XXXXXXXXXX)
6. Update `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   ```

---

### 3. Portfolio Images ✅
**Status:** ✅ **COMPLETED**

All images optimized:
- 11 images processed
- Total size reduced by ~70%
- From ~5.5MB to ~1.4MB
- Ready for production!

**Results:**
- cleareight-screenshot.png: 1.5MB → 199KB (87% reduction) 🎉
- adventuresai-screenshot.png: 959KB → 150KB (84% reduction)
- helpmewithtaxes-screenshot.png: 488KB → 78KB (84% reduction)
- polyplayer-screenshot.png: 45KB → 7KB (84% reduction)
- And 7 more optimized files...

---

### 4. Social Media Links ✅
**Status:** ✅ **CONFIGURED**

Current configuration in `.env.local`:
```env
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/jonsamper
```

**To add more platforms later:**
```env
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yourhandle
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@yourchannel
```

---

### 5. Domain Setup ✅
**Status:** ✅ **READY**

- Domain: **workitu.com**
- Platform: **Vercel**
- DNS: Will configure after Vercel deployment

---

## 🚀 Deployment Steps

### Step 1: Update Environment Variables

Open [.env.local](.env.local) and complete these fields:

```env
# ⚠️ REQUIRED - Update these first:
SMTP_PASS=your_app_password_here_from_step_1

# ⚠️ REQUIRED - Update after GA setup:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# ✅ Already configured - no changes needed:
SMTP_USER=jonathanperlin@gmail.com
ADMIN_EMAIL=jonathanperlin@gmail.com
NEXT_PUBLIC_SITE_URL=https://workitu.com
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/jonsamper
```

---

### Step 2: Test Locally

```bash
# Install dependencies (if not done)
npm install

# Run development server
npm run dev
```

**Test these features:**
- [ ] Visit http://localhost:3000
- [ ] Test language switcher (EN/HE/PT)
- [ ] Submit contact form (check email)
- [ ] View portfolio projects
- [ ] Check /legal page
- [ ] Verify social links in footer

---

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**During deployment, Vercel will ask:**
- "Set up and deploy?" → **Yes**
- "Which scope?" → **Your account**
- "Link to existing project?" → **No**
- "Project name?" → **workitu-com**
- "Directory?" → **./ (press Enter)**
- "Want to override settings?" → **No**

#### Option B: Using Vercel Dashboard

1. Go to: https://vercel.com/new
2. Import your Git repository
3. Configure project:
   - **Project Name:** workitu-com
   - **Framework:** Next.js
   - **Root Directory:** ./
   - **Build Command:** npm run build
   - **Output Directory:** .next

---

### Step 4: Configure Environment Variables on Vercel

In Vercel Dashboard → Your Project → Settings → Environment Variables:

**Add these variables:**

```plaintext
Key: ADMIN_EMAIL
Value: jonathanperlin@gmail.com

Key: ADMIN_PASSWORD_HASH
Value: [copy from .env.local]

Key: JWT_SECRET
Value: [copy from .env.local]

Key: SMTP_HOST
Value: smtp.gmail.com

Key: SMTP_PORT
Value: 587

Key: SMTP_USER
Value: jonathanperlin@gmail.com

Key: SMTP_PASS
Value: [your Gmail app password]

Key: AUTO_RESPONDER_ENABLED
Value: true

Key: AUTO_RESPONDER_FROM
Value: Workitu Tech <contact@workitu.com>

Key: AUTO_RESPONDER_SUBJECT
Value: Thank you for contacting Workitu Tech!

Key: NEXT_PUBLIC_SITE_URL
Value: https://workitu.com

Key: NEXT_PUBLIC_GA_MEASUREMENT_ID
Value: [your GA4 measurement ID]

Key: NEXT_PUBLIC_ENABLE_ANALYTICS
Value: true

Key: NEXT_PUBLIC_LINKEDIN_URL
Value: https://www.linkedin.com/in/jonsamper

Key: DATA_RETENTION_DAYS
Value: 365

Key: ANALYTICS_RETENTION_DAYS
Value: 730
```

**Important:** Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser (safe for analytics IDs). Others are server-side only (safe for secrets).

---

### Step 5: Configure Custom Domain

1. **In Vercel Dashboard:**
   - Go to: Project → Settings → Domains
   - Click "Add Domain"
   - Enter: **workitu.com**
   - Click "Add"

2. **In Your DNS Provider (where you bought workitu.com):**

   Add these DNS records:

   **For Root Domain (workitu.com):**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 76.76.21.21
   TTL: 3600
   ```

   **For WWW subdomain (www.workitu.com):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

3. **Wait for DNS Propagation** (5-30 minutes)

4. **Verify SSL Certificate:**
   - Vercel will automatically provision SSL
   - Your site will be available at https://workitu.com

---

### Step 6: Post-Deployment Verification

**Test Production Site:**
- [ ] Visit https://workitu.com
- [ ] Test contact form (you should receive email)
- [ ] Check Google Analytics Real-time reports
- [ ] Test all 3 languages
- [ ] Verify portfolio images load fast
- [ ] Check social links work
- [ ] Visit /legal page
- [ ] Test on mobile device

**Google Analytics Verification:**
1. Go to: https://analytics.google.com/
2. Open your property
3. Go to: Reports → Realtime
4. Visit your site in another tab
5. You should see yourself as an active user!

---

## 📊 What's Tracking?

Once deployed, your site will automatically track:

✅ **Page Views** (all pages)
✅ **Contact Form Submissions** (conversions)
✅ **Portfolio Project Clicks** (engagement)
✅ **Pricing CTA Clicks** (interest)
✅ **External Link Clicks** (outbound)
✅ **User Demographics** (location, device, browser)
✅ **User Behavior** (session duration, bounce rate)

**View Reports:**
- Real-time: https://analytics.google.com/ → Realtime
- Traffic: Reports → Traffic Acquisition
- Engagement: Reports → Engagement
- Conversions: Reports → Events

---

## 🔧 Troubleshooting

### Issue: Email Not Sending

**Check:**
1. ✅ SMTP_PASS is the App Password (not regular password)
2. ✅ 2FA is enabled on Gmail
3. ✅ Environment variables are set in Vercel
4. ✅ Check spam folder

**Test Command:**
```bash
# On local machine
npm run dev
# Submit contact form
# Check terminal for error messages
```

---

### Issue: Analytics Not Tracking

**Check:**
1. ✅ GA_MEASUREMENT_ID is correct (starts with G-)
2. ✅ NEXT_PUBLIC_ENABLE_ANALYTICS=true
3. ✅ Visit site and wait 30 seconds
4. ✅ Check browser console for errors (F12)
5. ✅ Verify in GA Realtime report

**Debug Mode:**
Open browser console (F12) and type:
```javascript
gtag('config', 'G-XXXXXXXXXX', { debug_mode: true });
```

---

### Issue: Domain Not Resolving

**Check:**
1. ✅ DNS records are correct
2. ✅ Wait 30 minutes for propagation
3. ✅ Check DNS: https://dnschecker.org/
4. ✅ Clear browser cache (Ctrl+F5)

---

### Issue: Build Fails on Vercel

**Solution:**
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Run `npm run build` locally first
4. Check for TypeScript/ESLint errors

---

## 📈 Next Steps After Deployment

### Week 1: Monitor & Optimize
- [ ] Check Google Analytics daily
- [ ] Monitor contact form submissions
- [ ] Test on different devices/browsers
- [ ] Ask friends/colleagues to test

### Week 2: SEO Setup
- [ ] Submit sitemap to Google Search Console
  - URL: https://workitu.com/sitemap.xml
- [ ] Add site to Bing Webmaster Tools
- [ ] Set up Google Business Profile
- [ ] Create social media posts about launch

### Week 3: Content & Marketing
- [ ] Write blog posts (if adding blog)
- [ ] Share on LinkedIn
- [ ] Update email signature with website
- [ ] Add website to all social profiles

### Month 2: Advanced Features
- [ ] Add testimonials section
- [ ] Create case studies
- [ ] Set up Sentry error tracking
- [ ] Consider adding blog functionality
- [ ] Add newsletter signup (Mailchimp/ConvertKit)

---

## 🎯 Performance Metrics

**Current Optimization Status:**

| Metric | Target | Status |
|--------|--------|--------|
| Portfolio Images | <500KB | ✅ Optimized (70% reduction) |
| Mobile Responsive | 100% | ✅ Complete |
| Language Support | 3 languages | ✅ EN, HE, PT |
| Analytics | Installed | ⏳ Pending GA setup |
| Legal Compliance | GDPR | ✅ Complete |
| Email System | Working | ⏳ Pending SMTP config |

---

## 📞 Support

**Need Help?**
- Email: contact@workitu.com
- Documentation: [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
- Quick Reference: [QUICK_START.md](QUICK_START.md)

**Useful Links:**
- Vercel Dashboard: https://vercel.com/dashboard
- Google Analytics: https://analytics.google.com/
- Gmail App Passwords: https://myaccount.google.com/apppasswords
- DNS Checker: https://dnschecker.org/

---

## ✅ Deployment Checklist

Print this and check off as you complete:

```
Pre-Deploy:
[ ] Created Gmail App Password
[ ] Updated SMTP_PASS in .env.local
[ ] Created Google Analytics property
[ ] Updated GA_MEASUREMENT_ID in .env.local
[ ] Tested locally (npm run dev)
[ ] All features working locally

Deploy:
[ ] Installed Vercel CLI
[ ] Ran: vercel --prod
[ ] Added all environment variables to Vercel
[ ] Configured custom domain (workitu.com)
[ ] Updated DNS records
[ ] Waited for DNS propagation

Post-Deploy:
[ ] Site accessible at https://workitu.com
[ ] SSL certificate active (https working)
[ ] Contact form sends emails
[ ] Google Analytics tracking
[ ] Mobile responsive check
[ ] All languages working
[ ] Portfolio images loading fast
[ ] Legal pages accessible

Marketing:
[ ] Submitted sitemap to Google
[ ] Posted on LinkedIn
[ ] Updated email signature
[ ] Told friends and colleagues
```

---

## 🎉 You're Ready to Launch!

Once you complete the **2 action items** (Gmail App Password + Google Analytics), you're ready to deploy!

**Estimated Time:**
- Gmail setup: 5 minutes
- GA4 setup: 5 minutes
- Vercel deployment: 10 minutes
- DNS configuration: 5 minutes
- **Total: ~25 minutes**

**Then you'll have a live, professional website with:**
- ✅ 3 languages
- ✅ Contact form with auto-responder
- ✅ Analytics tracking
- ✅ Optimized images
- ✅ Legal compliance
- ✅ Professional design
- ✅ Fast loading
- ✅ Mobile responsive

---

*Let's launch Workitu.com! 🚀*

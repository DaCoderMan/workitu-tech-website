# Workitu Tech Website - Site Context

**Quick Reference for AI Fixer Function**

---

## Site Overview

**Name:** Workitu Tech
**URL:** https://workitu.tech
**Type:** Tech portfolio and services website
**Languages:** English, Hebrew (RTL support)

---

## Pages & Routes

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/app/page.js` | Home page - hero, mission, CTA |
| `/about` | `src/app/about/page.js` | About the company |
| `/services` | `src/app/services/page.js` | Service offerings |
| `/portfolio` | `src/app/portfolio/page.js` | Project showcase |
| `/pricing` | `src/app/pricing/page.js` | Pricing cards |
| `/contact` | `src/app/contact/page.js` | Contact form |
| `/admin` | `src/app/admin/page.js` | Admin dashboard |

---

## Data Files

### projects.json
**Path:** `src/data/projects.json`
**Purpose:** Portfolio projects storage
**Current Count:** 7 projects

**Project Types:**
- Standard projects (image + link)
- Video projects (YouTube embed)
- Website projects (live preview)

**Categories Used:**
- AI Education
- AI Solutions
- AI Fintech
- AI Gaming
- Web Development
- Web Tools

### content.json
**Path:** `src/data/content.json`
**Purpose:** Editable page content
**Sections:** home, pricing, contact

### submissions.json
**Path:** `src/data/submissions.json`
**Purpose:** Contact form submissions
**Generated:** On form submit

### analytics.json
**Path:** `src/data/analytics.json`
**Purpose:** Site analytics data
**Note:** In-memory during runtime

---

## Components Map

```
src/components/
├── layout/
│   ├── Header.js          # Navigation bar
│   └── Footer.js          # Site footer
├── animations/
│   ├── VideoBackground.js # Background video
│   ├── HomeAnimation.js   # Home animations
│   ├── PortfolioAnimation.js
│   ├── PricingAnimation.js
│   └── ContactAnimation.js
├── audio/
│   └── MusicPlayer.js     # Floating player
├── LanguageProvider.js    # i18n wrapper
├── LanguageToggle.js      # EN/HE switch
└── StructuredData.js      # SEO schema
```

---

## API Endpoints Summary

### Public (No Auth)
```
GET  /api/projects     → Portfolio projects
POST /api/contact      → Submit contact form
```

### Admin (JWT Required)
```
GET/POST/PUT/DELETE /api/admin/projects
GET/PUT             /api/admin/content
GET                 /api/admin/submissions
GET                 /api/admin/backup
POST                /api/admin/upload
```

### Auth
```
POST /api/auth/login   → Get JWT token
POST /api/auth/logout  → Clear token
GET  /api/auth/session → Check auth status
```

---

## Utility Functions

### validation.js
```javascript
validateEmail(email)           // Email format check
validateProject(project)       // Project schema validation
validateContactForm(formData)  // Form validation
sanitizeInput(input)          // XSS prevention
sanitizeUrl(url)              // URL safety check
```

### auth.js
```javascript
hashPassword(password)         // bcrypt hash
verifyPassword(pass, hash)     // bcrypt compare
generateToken(payload)         // JWT sign
verifyToken(token)            // JWT verify
authenticateAdmin(email, pwd)  // Login check
requireAuth(handler)          // Auth middleware
```

### analytics.js
```javascript
trackPageView(page)           // Track page visit
trackProjectClick(id)         // Track project click
getAnalytics()               // Get all analytics
saveAnalytics(data)          // Save analytics
```

---

## Key Dependencies

| Package | Use |
|---------|-----|
| next@14.0.4 | Framework |
| react@18 | UI Library |
| tailwindcss@3.3.0 | Styling |
| zustand@5.0.10 | State management |
| framer-motion@10.16.16 | Animations |
| react-hook-form@7.48.2 | Forms |
| bcryptjs@2.4.3 | Password hashing |
| jsonwebtoken@9.0.2 | JWT tokens |
| @playwright/test@1.56.1 | E2E testing |

---

## Environment Variables

```
NEXT_PUBLIC_SITE_URL    # Public site URL
ADMIN_EMAIL             # Admin login email
ADMIN_PASSWORD_HASH     # bcrypt hashed password
JWT_SECRET              # JWT signing secret
SMTP_HOST               # Email server host
SMTP_PORT               # Email server port
SMTP_USER               # Email username
SMTP_PASS               # Email password
RATE_LIMIT_MAX          # Max requests (default: 5)
RATE_LIMIT_WINDOW       # Time window ms (default: 900000)
```

---

## Testing

### Run Tests
```bash
npx playwright test
```

### Test File
`tests/site.spec.js`

### Covered Scenarios
1. Home page loads
2. Portfolio navigation
3. Pricing navigation
4. Contact navigation
5. Admin panel access
6. Contact form submission

---

## Common Operations

### Add a Project
1. Edit `src/data/projects.json`
2. Add object with required fields:
   - id (use timestamp)
   - title, description, image, link
   - category, dateAdded, featured
   - Optional: videoId, isVideo, websiteUrl, isWebsite

### Update Content
1. Edit `src/data/content.json`
2. Modify relevant section (home/pricing/contact)

### Add Translation
1. Edit `src/lib/translations.js`
2. Add key to both `en` and `he` objects

---

## Build & Deploy

```bash
# Development
npm run dev

# Production build
npm run build

# Start production
npm run start

# Lint check
npm run lint
```

### Deployment Targets
- Vercel (vercel.json)
- Netlify (netlify.toml)
- Docker (Dockerfile + docker-compose.yml)

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Pages | lowercase | `page.js` |
| Components | PascalCase | `Header.js` |
| Utilities | camelCase | `validation.js` |
| Data | lowercase | `projects.json` |
| Styles | lowercase | `globals.css` |

---

## Quick Fixes Reference

### Broken Image
Check `image` field in projects.json - must be valid URL or path

### Missing Translation
Add key to both `en` and `he` in `src/lib/translations.js`

### API Error
Check endpoint file in `src/app/api/[route]/route.js`

### Style Issue
Global styles in `src/styles/globals.css`
Tailwind config in `tailwind.config.js`

### Build Error
Run `npm run lint` to find issues
Check for missing dependencies

---

**Last Updated:** 2026-01-28

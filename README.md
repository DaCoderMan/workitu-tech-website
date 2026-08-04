# Workitu Tech Website

Workitu Tech Website - Modern Next.js portfolio with admin panel, analytics, and music player

## Overview

- Repository: `DaCoderMan/workitu-tech-website`
- Primary language: `JavaScript`
- Project type: Next.js application / Shell automation
- Visibility: public
- Default branch: `main`

This README was generated after a static review of the repository structure, package files, scripts, source files, and existing documentation.

## What this project contains

- Application routes/pages detected from the app/pages directory structure.
- API/server endpoints or route handlers are present.
- Package scripts are available for local development and project tasks.
- Workitu/Bee/Life OS operational tooling or business workflow context.

## Repository profile

- Files scanned: 162
- Estimated source/config lines reviewed: 9366
- Top-level directories: `public`, `scripts`, `src`, `tests`
- File-type mix: .js: 74, .png: 19, .ts: 17, .md: 13, .json: 7, .txt: 5, .svg: 4, .jpg: 3, .css: 3, .tsx: 3

## Key files and folders

- `Dockerfile`
- `README.md`
- `docker-compose.yml`
- `netlify.toml`
- `next.config.js`
- `package.json`
- `tailwind.config.js`
- `tsconfig.json`
- `vercel.json`

## Available npm scripts

- `dev`: `next dev --turbopack`
- `build`: `next build`
- `start`: `next start`
- `lint`: `next lint`
- `deploy:vercel`: `vercel --prod`
- `deploy:netlify`: `netlify deploy --prod`
- `preview`: `next build && next start`
- `update-portfolio`: `node .agent/scripts/portfolio-manager.js`
- `business-agent`: `node .agent/scripts/business-agent.js`
- `qa-check`: `node .agent/scripts/qa-agent.js`

## Main dependencies detected

- `@playwright/test`
- `@types/bcryptjs`
- `@types/jsonwebtoken`
- `@types/node`
- `@types/nodemailer`
- `@types/papaparse`
- `@types/react`
- `@types/react-dom`
- `@vercel/analytics`
- `@vercel/speed-insights`
- `autoprefixer`
- `bcryptjs`
- `eslint`
- `eslint-config-next`
- `firebase-admin`
- `framer-motion`
- `jose`
- `jsonwebtoken`
- `mongodb`
- `next`
- `nodemailer`
- `papaparse`
- `playwright`
- `postcss`
- `puppeteer`
- `react`
- `react-dnd`
- `react-dnd-html5-backend`
- `react-dom`
- `react-hook-form`
- `react-hot-toast`
- `selenium-webdriver`
- `sharp`
- `tailwindcss`
- `twilio`

## Web application map

Routes/pages:

- `/`
- `/about`
- `/about/layout`
- `/admin`
- `/api/admin/backup/route`
- `/api/admin/content/route`
- `/api/admin/projects/route`
- `/api/admin/submissions/route`
- `/api/admin/upload/route`
- `/api/analytics/export/route`
- `/api/analytics/track/route`
- `/api/auth/forgot-password/route`
- `/api/auth/login/route`
- `/api/auth/logout/route`
- `/api/auth/reset-password/route`
- `/api/auth/session/route`
- `/api/billing/checkout/route`
- `/api/billing/webhook/route`
- `/api/contact/route`
- `/api/cron/daily-coaching/route`
- `/api/projects/route`
- `/api/telegram/route`
- `/api/telegram/setup/route`
- `/api/whatsroute`
- `/billing/cancel`
- `/billing/success`
- `/contact`
- `/contact/layout`
- `/layout`
- `/legal`
- `/legal/layout`
- `/loading`
- `/not-found`
- `/pay`
- `/pay/layout`
- `/portfolio`
- `/portfolio/PortfolioClient`
- `/portfolio/layout`
- `/pricing`
- `/pricing/layout`

API/route files:

- `src/app/api/admin/backup/route.js`
- `src/app/api/admin/content/route.js`
- `src/app/api/admin/projects/route.js`
- `src/app/api/admin/submissions/route.js`
- `src/app/api/admin/upload/route.js`
- `src/app/api/analytics/export/route.js`
- `src/app/api/analytics/track/route.js`
- `src/app/api/auth/forgot-password/route.js`
- `src/app/api/auth/login/route.js`
- `src/app/api/auth/logout/route.js`
- `src/app/api/auth/reset-password/route.js`
- `src/app/api/auth/session/route.js`
- `src/app/api/billing/checkout/route.ts`
- `src/app/api/billing/webhook/route.ts`
- `src/app/api/contact/route.js`
- `src/app/api/cron/daily-coaching/route.ts`
- `src/app/api/projects/route.js`
- `src/app/api/telegram/route.ts`
- `src/app/api/telegram/setup/route.ts`
- `src/app/api/whatsapp/route.js`

Components sampled:

- `src/components/Analytics.js`
- `src/components/LanguageProvider.js`
- `src/components/LanguageToggle.js`
- `src/components/StructuredData.js`
- `src/components/animations/ContactAnimation.js`
- `src/components/animations/HomeAnimation.js`
- `src/components/animations/PortfolioAnimation.js`
- `src/components/animations/PricingAnimation.js`
- `src/components/animations/ScrollReveal.js`
- `src/components/animations/VideoBackground.js`
- `src/components/animations/WLogoBackground.js`
- `src/components/layout/Footer.js`
- `src/components/layout/Header.js`

## Getting started

```bash
git clone https://github.com/DaCoderMan/workitu-tech-website
cd workitu-tech-website
```

Common commands inferred from the repository:

```bash
npm install
npm run dev
npm start
npm run build
npm run lint
```

## Configuration clues

Environment/configuration names referenced in the codebase include:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `API`
- `APP_URL`
- `AUTH`
- `BASE_URL`
- `CONTACT_EMAIL`
- `CRON_SECRET`
- `DEEPSEEK_API_KEY`
- `EMAIL`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `GOOGLE_AI_API_KEY`
- `INVALID_URL`
- `JWT_SECRET`
- `LEMONSQUEEZY_API_KEY`
- `LEMONSQUEEZY_VARIANT_ID_SUPPORT_MONTHLY`
- `LEMONSQUEEZY_VARIANT_ID_SUPPORT_YEARLY`
- `LEMONSQUEEZY_WEBHOOK_SECRET`
- `MONGO_URI`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_TIKTOK_URL`
- `NEXT_PUBLIC_TWITTER_URL`
- `NEXT_PUBLIC_YOUTUBE_URL`
- `PASSWORD`
- `SECURITY`
- `SENTRY_AUTH_TOKEN`
- `SETUP_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SUPPORT`
- `TELEGRAM_API`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_SETUP_SECRET`
- `TELEGRAM_TOKEN`
- `TWILIO_AUTH_TOKEN`

Create a local `.env` file only if the project expects one, and never commit real secrets.

## Security and maintenance notes

No obvious hardcoded secret patterns were detected during this lightweight static pass. This is not a full security audit.

- Keep README setup instructions aligned with actual scripts and deployment steps.
- Document required environment variables in `.env.example` rather than committing real values.
- Run the project-specific test/build command before merging future code changes.

## Generated documentation note

This README was prepared by Hermes Agent from repository analysis. Review the wording and project-specific assumptions before merging.

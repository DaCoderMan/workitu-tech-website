# Workitu Tech Website

A modern, responsive website for Workitu Tech built with Next.js 14, featuring a black and gold theme, portfolio management, analytics, and an admin panel.

## Features

### Public Pages
- **Home**: Company introduction with mission and vision
- **Portfolio**: Dynamic project showcase with external links
- **Pricing**: Service tiers and pricing information
- **Contact**: Contact form with email integration
- **404**: Custom error page

### Admin Panel
- **Authentication**: Secure login with bcrypt password hashing
- **Portfolio Management**: Add, edit, delete, and reorder projects
- **Content Management**: Edit all site content
- **Analytics Dashboard**: View site statistics and export data
- **Contact Submissions**: View and manage form submissions
- **Data Backup**: Download complete site backup

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Background Animations**: Unique animations for each page section
- **Music Player**: Floating audio player for the Workitu Song
- **Analytics Tracking**: Custom analytics with page views, device types, and project clicks
- **Rate Limiting**: Protection against brute force attacks
- **Image Optimization**: Automatic image handling and optimization
- **SEO Optimized**: Meta tags, sitemap, and structured data

## Project Structure

```
/src
  /app
    /page.js (Home)
    /portfolio/page.js
    /pricing/page.js
    /contact/page.js
    /admin/page.js
    /not-found.js (404 page)
    /api
      /auth (authentication routes)
      /analytics (tracking and export)
      /admin (CRUD operations)
      /contact (form handling)
  /components
    /layout (Header, Footer, Navigation)
    /animations (Background animations)
    /portfolio (Project components)
    /forms (Contact and admin forms)
    /admin (Admin panel components)
    /audio (Music player)
    /ui (Toast notifications, loading states)
  /data
    /projects.json (portfolio data)
    /analytics.json (site analytics)
    /content.json (editable content)
    /submissions.json (contact form data)
  /styles
    /globals.css (main styles)
    /animations.css (animation styles)
  /utils
    /auth.js (authentication utilities)
    /analytics.js (tracking utilities)
    /rateLimit.js (rate limiting)
    /validation.js (form validation)
/public
  /images/projects (portfolio images)
  /images/company (company assets)
  /audio (music files)
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the `env.example` file to `.env.local` in the root directory:

```bash
cp env.example .env.local
```

Then edit `.env.local` with your actual values:

```env
# Admin Credentials
ADMIN_EMAIL=jonathanperlin@gmail.com
ADMIN_PASSWORD_HASH=$2a$10$rQZ8K9mN2pL3sT4uV5wX6yA7bC8dE9fG0hI1jK2lM3nO4pQ5rS6tU7vW8xY9zA

# JWT Secret
JWT_SECRET=workitu_tech_super_secret_key_2024

# Email Configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@workitu.com
SMTP_PASS=your_email_password_here

# Rate Limiting
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW=900000

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google AI API Key
GOOGLE_AI_API_KEY=AIzaSyCe5BhA0HACaCaHOKMfWgluX1DR7KO1-kU
```

### 3. Add Your Media Files
- Place your "Workitu Song" audio file in `/public/audio/workitu-song.m4a`
- Add your background video in `/public/videos/workitu-reloaded.mp4`
- Add project images to `/public/images/projects/`
- Add a favicon.ico to `/public/favicon.ico`

### 4. Run Development Server
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Admin Access

- **URL**: `/admin`
- **Email**: `jonathanperlin@gmail.com`
- **Password**: `Shandydog225`

## Admin Features

### Portfolio Management
- Add new projects with title, description, image, and external link
- Edit existing projects
- Delete projects
- Mark projects as featured
- All external links open in new windows

### Content Management
- Edit Home page content (title, mission, services)
- Edit Pricing page content (services, descriptions)
- Edit Contact page information

### Analytics
- View total page views and unique visitors
- Track device types (desktop, mobile, tablet)
- Monitor project click rates
- Export analytics data as CSV

### Media Management
- Upload and replace the Workitu Song
- Upload and replace background animations
- Automatic image optimization

### Data Management
- View all contact form submissions
- Download complete site backup
- Export analytics data

## Customization

### Colors
The site uses a black and gold color scheme defined in `tailwind.config.js`:
- Primary: Gold (#f59e0b)
- Background: Black (#000000)
- Text: Gold variations

### Animations
Background animations are defined in `/src/styles/animations.css` and can be easily customized or replaced.

### Content
All site content can be edited through the admin panel or by modifying `/src/data/content.json`.

## Security Features

- Bcrypt password hashing
- JWT-based session management
- Rate limiting on login attempts
- Input sanitization and validation
- Secure cookie handling
- CSRF protection

## Performance Features

- Next.js Image optimization
- Static generation with ISR
- Lazy loading
- Optimized animations (GPU-accelerated)
- Responsive images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚀 Deployment (No Localhost Needed!)

Due to Windows 11 localhost issues, here are the best deployment options:

### **Quick Deploy Options:**

1. **Vercel (Recommended - Free)**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Netlify (Free)**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. **Railway (Free)**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repo
   - Auto-deploys!

4. **Render (Free)**
   - Go to [render.com](https://render.com)
   - Connect GitHub repo
   - Auto-deploys!

### **Alternative Development:**
- **Docker**: `docker-compose up` (runs on different port)
- **GitHub Codespaces**: Cloud development environment
- **Gitpod**: Free cloud IDE
- **Replit**: Online development

### **Environment Variables:**
Set these in your deployment platform:
```env
ADMIN_EMAIL=jonathanperlin@gmail.com
ADMIN_PASSWORD_HASH=$2a$10$rQZ8K9mN2pL3sT4uV5wX6yA7bC8dE9fG0hI1jK2lM3nO4pQ5rS6tU7vW8xY9zA
JWT_SECRET=workitu_tech_super_secret_key_2024
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@workitu.com
SMTP_PASS=your_email_password_here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

📖 **See DEPLOYMENT.md for detailed instructions!**

## Support

For questions or issues, contact: contact@workitu.com

## Current Status

✅ **Completed Features:**
- All public pages (Home, Portfolio, Pricing, Contact)
- Admin panel with authentication
- Portfolio management (CRUD operations)
- Content management system
- Analytics tracking and export
- Contact form with email integration
- Music player component
- Video background with fallbacks
- Responsive design with Tailwind CSS
- Security features (rate limiting, input validation)
- Data backup functionality

✅ **Recently Fixed:**
- Created missing public directory structure
- Fixed authentication middleware for Next.js 14 App Router
- Added missing API routes (admin/submissions)
- Created required data files (analytics.json, submissions.json)
- Added placeholder media files
- Updated documentation

🚧 **Next Steps:**
- Add actual media files (video, audio, images)
- Configure email settings for contact form
- Test all functionality thoroughly
- Deploy to production

## License

© 2024 Workitu Tech. All rights reserved.

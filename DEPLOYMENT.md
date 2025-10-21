# 🚀 Deployment Guide - Workitu Tech Website

## Windows 11 Localhost Issues? No Problem!

Since Windows 11 has localhost issues, here are the best deployment options:

## Option 1: Vercel (Recommended - Free)

### Quick Deploy:
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/workitu-tech.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js and deploys!

### Manual Deploy:
```bash
npm install -g vercel
vercel login
vercel --prod
```

## Option 2: Netlify (Free)

### Quick Deploy:
1. **Push to GitHub** (same as above)
2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Connect your repository
   - Build settings: `npm run build`
   - Publish directory: `.next`

### Manual Deploy:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Option 3: Railway (Free Tier)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Next.js and deploys!

## Option 4: Render (Free Tier)

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Build command: `npm run build`
6. Start command: `npm start`

## Environment Variables

Set these in your deployment platform:

```env
# Admin Credentials
ADMIN_EMAIL=jonathanperlin@gmail.com
ADMIN_PASSWORD_HASH=$2a$10$rQZ8K9mN2pL3sT4uV5wX6yA7bC8dE9fG0hI1jK2lM3nO4pQ5rS6tU7vW8xY9zA

# JWT Secret
JWT_SECRET=workitu_tech_super_secret_key_2024

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@workitu.com
SMTP_PASS=your_email_password_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Alternative Development (No Localhost)

### 1. Use Cloud Development:
- **GitHub Codespaces** (Free for public repos)
- **Gitpod** (Free tier)
- **Replit** (Free tier)

### 2. Use Different Port:
```bash
# Try these ports instead of localhost
npx next dev -p 3001
npx next dev -p 8080
npx next dev -p 9000
```

### 3. Use Network IP:
```bash
# Use your network IP instead of localhost
npx next dev -H 0.0.0.0 -p 3000
# Then access via: http://192.168.1.xxx:3000
```

## Quick Start Commands

```bash
# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy to Vercel
npm run deploy:vercel

# Deploy to Netlify
npm run deploy:netlify
```

## 🎯 Recommended Workflow

1. **Develop locally** (when localhost works)
2. **Push to GitHub** frequently
3. **Deploy to Vercel** for testing
4. **Use production URL** for testing
5. **Share production URL** with clients

## Troubleshooting Windows 11 Localhost

### Fix 1: Reset Network Stack
```cmd
netsh winsock reset
netsh int ip reset
ipconfig /flushdns
```

### Fix 2: Disable IPv6
- Go to Network Settings
- Disable IPv6 for your network adapter

### Fix 3: Use Different Browser
- Try Edge instead of Chrome
- Clear browser cache

### Fix 4: Use Docker
```bash
# Create Dockerfile
# Run in container
docker run -p 3000:3000 your-app
```

## 🚀 Ready to Deploy?

Choose your preferred platform and follow the steps above. All platforms offer free tiers perfect for development and testing!

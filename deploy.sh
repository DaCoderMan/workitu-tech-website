#!/bin/bash
echo "🐝 Workitu Tech — Deploy to Vercel"
echo "=================================="
echo ""
echo "Step 1: Login to Vercel (one-time only)"
vercel login
echo ""
echo "Step 2: Link project (one-time only)"
cd /var/www/workitu-tech-website
vercel link
echo ""
echo "Step 3: Deploy to production"
vercel --prod
echo ""
echo "✅ Done! Check workitu.com"

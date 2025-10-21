#!/bin/bash

# GitHub Repository Setup Script
# Run this to push your project to GitHub and deploy

echo "🚀 Setting up GitHub repository and deployment..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Workitu Tech Website

- Complete Next.js 14 website with black and gold theme
- Admin panel with authentication
- Portfolio management system
- Contact form with email integration
- Analytics tracking
- Music player component
- Video background with mobile optimizations
- Responsive design with Tailwind CSS
- Ready for deployment"

# Create main branch
echo "🌿 Creating main branch..."
git branch -M main

echo "✅ Git repository ready!"
echo ""
echo "🔗 Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Copy the repository URL"
echo "3. Run: git remote add origin <your-repo-url>"
echo "4. Run: git push -u origin main"
echo ""
echo "🚀 Then deploy to:"
echo "- Vercel: https://vercel.com"
echo "- Netlify: https://netlify.com"
echo "- Railway: https://railway.app"
echo "- Render: https://render.com"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions!"

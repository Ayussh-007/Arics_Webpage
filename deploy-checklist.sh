#!/bin/bash

# Arics Deployment Preparation Script
echo "🌸 Arics Flower Boutique - Deployment Preparation"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized"
    echo "   Run: git init"
    exit 1
fi

echo "✅ Git repository found"
echo ""

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes:"
    git status -s
    echo ""
    read -p "Do you want to commit these changes? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Enter commit message: " commit_msg
        git commit -m "$commit_msg"
        echo "✅ Changes committed"
    fi
else
    echo "✅ No uncommitted changes"
fi

echo ""
echo "📋 Pre-Deployment Checklist:"
echo ""

# Check for required files
files=("package.json" "vercel.json" ".gitignore" "server/package.json")
all_files_exist=true

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
        all_files_exist=false
    fi
done

echo ""

# Check for environment example files
if [ -f ".env.example" ]; then
    echo "✅ .env.example exists"
else
    echo "⚠️  .env.example not found (optional)"
fi

if [ -f "server/.env.example" ]; then
    echo "✅ server/.env.example exists"
else
    echo "⚠️  server/.env.example not found (optional)"
fi

echo ""
echo "🔑 Environment Variables Needed:"
echo ""
echo "Frontend (.env):"
echo "  - VITE_API_URL"
echo ""
echo "Backend (server/.env):"
echo "  - MONGODB_URI (MongoDB Atlas)"
echo "  - JWT_SECRET"
echo "  - ADMIN_EMAIL"
echo "  - ADMIN_PASSWORD"
echo "  - SMTP_HOST"
echo "  - SMTP_PORT"
echo "  - SMTP_USER"
echo "  - SMTP_PASS"
echo "  - MAIL_FROM"
echo "  - PAYMENT_UPI_ID"
echo "  - PAYMENT_UPI_NAME"
echo ""

read -p "Have you set up MongoDB Atlas? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "⚠️  Please set up MongoDB Atlas first:"
    echo "   1. Go to https://www.mongodb.com/cloud/atlas"
    echo "   2. Create a free cluster"
    echo "   3. Create a database user"
    echo "   4. Whitelist IP: 0.0.0.0/0"
    echo "   5. Get connection string"
    echo ""
fi

echo ""
read -p "Have you created a GitHub repository? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 Create GitHub repository:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Name: arics-webpage (or your preferred name)"
    echo "   3. Keep it private (for now)"
    echo "   4. Don't initialize with README"
    echo ""
    echo "   Then run:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/arics-webpage.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    exit 0
fi

echo ""
echo "🚀 Ready to Deploy!"
echo ""
echo "Next Steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Go to https://vercel.com"
echo "3. Click 'Add New Project'"
echo "4. Import your GitHub repository"
echo "5. Add environment variables"
echo "6. Click 'Deploy'"
echo ""
echo "📖 See VERCEL_DEPLOYMENT.md for detailed instructions"
echo ""

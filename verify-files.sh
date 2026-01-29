#!/bin/bash

# Aric's Webpage - Pre-Launch Verification Script
# This script checks if all required files exist and are properly configured

echo "🌸 Aric's Webpage - Verification Script 🌸"
echo "=========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for issues
ISSUES=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1 - MISSING"
        ISSUES=$((ISSUES + 1))
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        return 0
    else
        echo -e "${RED}✗${NC} $1/ - MISSING"
        ISSUES=$((ISSUES + 1))
        return 1
    fi
}

echo "📁 Checking Core Files..."
echo "------------------------"
check_file "package.json"
check_file "index.html"
check_file "vite.config.js"
check_file "tailwind.config.js"
check_file ".env.example"
echo ""

echo "📄 Checking Main App Files..."
echo "----------------------------"
check_file "src/App.jsx"
check_file "src/main.jsx"
check_file "src/index.css"
check_file "src/App.css"
echo ""

echo "🧭 Checking Navigation Components..."
echo "-----------------------------------"
check_file "src/components/Navbar.jsx"
check_file "src/components/HeroSection.jsx"
check_file "src/components/SEO.jsx"
check_file "src/components/WhatsAppButton.jsx"
echo ""

echo "📱 Checking Page Components..."
echo "-----------------------------"
check_file "src/pages/AboutUs.jsx"
check_file "src/pages/ProductsPage.jsx"
check_file "src/pages/AdminPortal.jsx"
check_file "src/pages/CartPage.jsx"
check_file "src/pages/CheckoutPage.jsx"
check_file "src/pages/WishlistPage.jsx"
check_file "src/pages/ReferralPage.jsx"
check_file "src/pages/OccasionRemindersPage.jsx"
check_file "src/pages/CorporateGiftingPage.jsx"
echo ""

echo "🎨 Checking Customization Module..."
echo "----------------------------------"
check_file "src/customisation/CustomisationApp.jsx"
check_file "src/customisation/index.js"
check_dir "src/customisation/components"
check_dir "src/customisation/pages"
echo ""

echo "💾 Checking Store Files..."
echo "-------------------------"
check_file "src/store/useCartStore.js"
check_file "src/store/useWishlistStore.js"
check_file "src/store/useAbandonedCartStore.js"
check_file "src/store/useOccasionStore.js"
check_file "src/store/useReferralStore.js"
check_file "src/store/useReviewStore.js"
echo ""

echo "🖼️ Checking Assets..."
echo "-------------------"
check_file "src/assets/logo.svg"
check_file "src/assets/bhagyashree.jpeg"
check_file "src/assets/ayush.jpeg"
check_file "src/assets/manthan.jpeg"
echo ""

echo "🔧 Checking Additional Components..."
echo "-----------------------------------"
check_file "src/components/ProductCard.jsx"
check_file "src/components/ProductDetailModal.jsx"
check_file "src/components/WishlistButton.jsx"
check_file "src/components/EnhancedSearchBar.jsx"
echo ""

echo ""
echo "=========================================="
if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✨ All checks passed! No issues found.${NC}"
    echo -e "${GREEN}✓ Ready to run 'npm run dev'${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm install (if not done already)"
    echo "2. Run: npm run dev"
    echo "3. Test all pages and features"
    exit 0
else
    echo -e "${RED}⚠️  Found $ISSUES issue(s)${NC}"
    echo "Please fix the missing files before running the app."
    exit 1
fi

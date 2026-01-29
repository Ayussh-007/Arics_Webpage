#!/bin/bash

# Arics Project Cleanup Script
# This script removes unnecessary and redundant files from the Arics project
# Run this from the project root directory: bash cleanup_arics_project.sh

echo "================================================"
echo "Arics Project Cleanup Script"
echo "================================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for deleted files
DELETED_COUNT=0
FAILED_COUNT=0

# Function to delete a file
delete_file() {
    local file=$1
    if [ -f "$file" ]; then
        rm "$file"
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Deleted:${NC} $file"
            ((DELETED_COUNT++))
        else
            echo -e "${RED}✗ Failed to delete:${NC} $file"
            ((FAILED_COUNT++))
        fi
    else
        echo -e "${YELLOW}⚠ Not found:${NC} $file"
    fi
}

echo "Starting cleanup..."
echo ""

# ============================================
# 1. REDUNDANT DOCUMENTATION FILES
# ============================================
echo "Removing redundant documentation files..."

delete_file "BUGFIX_SUMMARY.md"
delete_file "DEPLOYMENT_SUMMARY.md"
delete_file "ERROR_FIX_CHECKLIST.md"
delete_file "ERROR_FIX_SUMMARY.md"
delete_file "HOMEPAGE_FIX.md"
delete_file "IMPLEMENTATION_PHASE1.md"
delete_file "NEXT_STEPS_QUICK_REF.md"
delete_file "PHASE4_QUICK_INSTALL.md"
delete_file "PRODUCTS_CHECKLIST.md"
delete_file "REMAINING_PHASES.md"
delete_file "ROADMAP_VISUAL.txt"
delete_file "VISUAL_SUMMARY.txt"
delete_file "QUICK_START.md"
delete_file "QUICK_WINS_GUIDE.md"

echo ""

# ============================================
# 2. TEMPORARY SETUP SCRIPTS
# ============================================
echo "Removing temporary setup scripts..."

delete_file "install_phase4.sh"
delete_file "deploy-checklist.sh"
delete_file "verify-files.sh"

echo ""

# ============================================
# 3. SYSTEM FILES
# ============================================
echo "Removing system files..."

delete_file ".DS_Store"

# Find and delete all .DS_Store files in subdirectories
echo "Searching for .DS_Store files in subdirectories..."
DS_STORE_FILES=$(find . -name ".DS_Store" 2>/dev/null)
if [ -n "$DS_STORE_FILES" ]; then
    while IFS= read -r file; do
        delete_file "$file"
    done <<< "$DS_STORE_FILES"
fi

echo ""

# ============================================
# 4. UNUSED ASSETS (Optional - Commented Out)
# ============================================
echo "Checking for unused QR code files..."
echo -e "${YELLOW}Note: These files are kept as backups but not used in emails:${NC}"
echo "  - server/src/assets/qr.png"
echo "  - src/assets/qr.png"
echo ""
echo -e "${YELLOW}To delete these QR backup files, uncomment the lines in this script.${NC}"

# Uncomment these lines if you want to delete the local QR files
# delete_file "server/src/assets/qr.png"
# delete_file "src/assets/qr.png"

echo ""

# ============================================
# 5. DUPLICATE/BACKUP FILES
# ============================================
echo "Checking for duplicate files..."

# Check for backup copies of AdminDashboard
if [ -f "src/customisation/pages/AdminDashboard copy.jsx" ]; then
    echo -e "${YELLOW}Found:${NC} src/customisation/pages/AdminDashboard copy.jsx"
    delete_file "src/customisation/pages/AdminDashboard copy.jsx"
fi

echo ""

# ============================================
# SUMMARY
# ============================================
echo "================================================"
echo "Cleanup Summary"
echo "================================================"
echo -e "Files deleted: ${GREEN}$DELETED_COUNT${NC}"
echo -e "Failed deletions: ${RED}$FAILED_COUNT${NC}"
echo ""

if [ $DELETED_COUNT -gt 0 ]; then
    echo -e "${GREEN}✓ Cleanup completed successfully!${NC}"
else
    echo -e "${YELLOW}⚠ No files were deleted.${NC}"
fi

echo ""
echo "Recommended next steps:"
echo "  1. Review the remaining documentation in DOCUMENTATION_INDEX.md"
echo "  2. Run 'git status' to see what changed"
echo "  3. Commit the cleanup: git add -A && git commit -m 'Clean up unnecessary files'"
echo ""

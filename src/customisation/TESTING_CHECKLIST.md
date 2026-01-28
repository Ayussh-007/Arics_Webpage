# ✅ Integration Test Checklist

## Pre-Flight Checks

### Environment Setup
- [ ] Node.js installed (v16+)
- [ ] npm/yarn installed
- [ ] Backend server exists in `/server` directory
- [ ] `.env` file configured with `VITE_API_URL`
- [ ] Dependencies installed: `npm install`

---

## 🧪 Manual Testing Guide

### Test 1: Navigation ✅
**Steps:**
1. Start dev server: `npm run dev`
2. Open `http://localhost:5173`
3. Click "CUSTOMIZE" in navbar
4. Verify customization page loads
5. Click "HOME" or logo
6. Verify returns to home page

**Expected:**
- Smooth navigation
- No console errors
- Pages render correctly

---

### Test 2: Bouquet Builder - Step 1 (Quantity) ✅
**Steps:**
1. Navigate to customize page
2. Click different quantity options (5, 7, 9)
3. Click "Custom (≥ 8)"
4. Click "Continue" button

**Expected:**
- Active option highlights in pink
- Price updates in sidebar
- Advances to Step 2

---

### Test 3: Bouquet Builder - Step 2 (Flowers) ✅
**Steps:**
1. Complete Step 1
2. Click "+" button on a flower
3. Click "-" button to decrease
4. Try multiple different flowers
5. Watch price update
6. Click "Continue"

**Expected:**
- Stem count increases/decreases
- Cannot go below 0
- Price updates in real-time
- Advances to Step 3

---

### Test 4: Bouquet Builder - Step 3 (Customization) ✅
**Steps:**
1. Complete Steps 1 & 2
2. Click different wrapping options
3. Click add-ons (ribbon, vase, etc.)
4. Try selecting/deselecting
5. Watch price update
6. Click "Continue"

**Expected:**
- Options toggle on/off
- Multiple selections for checkboxes
- Single selection for radio buttons
- Price updates correctly
- Advances to Step 4

---

### Test 5: Bouquet Builder - Step 4 (Preview) ✅
**Steps:**
1. Complete Steps 1-3
2. Review selected items in preview
3. Check price summary
4. Click "Proceed to Checkout"

**Expected:**
- All selections displayed
- Correct flower names & counts
- Correct customizations listed
- Accurate total price
- Navigates to checkout

---

### Test 6: Checkout Form ✅
**Steps:**
1. Complete builder steps
2. Try submitting empty form
3. Fill in name (too short, e.g., "A")
4. Enter invalid email
5. Enter invalid phone
6. Fill all fields correctly
7. Click "Place Order"

**Expected:**
- Validation errors show for invalid inputs
- Form won't submit with errors
- Successful submission with valid data
- Loading state during submission
- Navigates to confirmation

---

### Test 7: Order Confirmation ✅
**Steps:**
1. Complete checkout successfully
2. View confirmation message
3. Click "Create another bouquet"

**Expected:**
- Success message displays
- Button resets builder
- Returns to Step 1
- Selection cleared

---

### Test 8: Back Navigation ✅
**Steps:**
1. Progress through steps
2. Click "Back" buttons
3. Verify data persists
4. Navigate forward again

**Expected:**
- Back button works at each step
- Selections persist
- No data loss
- Smooth transitions

---

### Test 9: Price Calculations ✅
**Test Case 1: Base Price**
- Select 5 roses at $3 each
- Expected: Base = $15

**Test Case 2: With Add-ons**
- Base: $15
- Wrapping: $5
- Ribbon: $3
- Expected: Base = $15, Add-ons = $8

**Test Case 3: With Tax**
- Subtotal: $23
- Tax (5%): $1.15
- Delivery: $4.99
- Expected: Total = $29.14

---

### Test 10: State Management ✅
**Steps:**
1. Add flowers in Step 2
2. Navigate to Step 3
3. Navigate back to Step 2
4. Verify flowers still selected
5. Navigate forward again
6. Verify customizations persist

**Expected:**
- State persists across navigation
- No data loss
- Consistent behavior

---

### Test 11: API Integration ✅
**Prerequisites:** Backend server running

**Steps:**
1. Open Network tab in DevTools
2. Load customize page
3. Watch for API calls:
   - GET /api/flowers
   - GET /api/customizations
   - GET /api/admin/settings
4. Complete checkout
5. Watch for POST /api/orders

**Expected:**
- All requests return 200
- Data loads correctly
- Order submits successfully
- Toast notifications show

---

### Test 12: Error Handling ✅
**Test Case 1: API Down**
- Stop backend server
- Try loading customize page
- Expected: Error toast, fallback data

**Test Case 2: Network Error**
- Simulate slow network
- Try checkout
- Expected: Loading state, timeout handling

**Test Case 3: Invalid Form**
- Submit checkout with bad data
- Expected: Validation errors, clear messages

---

### Test 13: Edge Cases ✅

**Empty Selection:**
- Don't select any flowers
- Try to proceed
- Expected: Handle gracefully

**High Quantity:**
- Select 100+ flowers
- Watch performance
- Expected: No lag, correct pricing

**Multiple Selections:**
- Select 10 different flowers
- Verify all show in preview
- Expected: All displayed correctly

---

### Test 14: Mobile Responsiveness ✅
**Steps:**
1. Open DevTools
2. Toggle device toolbar
3. Test on different sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1440px)

**Expected:**
- Layout adapts
- Buttons accessible
- Text readable
- No horizontal scroll

---

### Test 15: Browser Compatibility ✅
**Test on:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Expected:**
- Consistent behavior
- No rendering issues
- All features work

---

## 🔍 Console Check

### No Errors Should Appear For:
- [ ] Component mounting
- [ ] State updates
- [ ] API calls
- [ ] Form submissions
- [ ] Navigation

### Expected Warnings (Safe to Ignore):
- PropTypes warnings (if not using TypeScript)
- Development mode warnings

---

## 📊 Performance Checks

### Load Time
- [ ] Initial page load < 3s
- [ ] Component render < 500ms
- [ ] API responses < 2s

### Memory
- [ ] No memory leaks
- [ ] State cleans up properly
- [ ] No zombie listeners

---

## 🎯 Integration Points

### App.jsx Integration
- [ ] CustomisationApp imports correctly
- [ ] Navigation state works
- [ ] No conflicts with other pages

### Navbar Integration
- [ ] CUSTOMIZE button works
- [ ] Active state highlights
- [ ] HOME button returns

### Backend Integration
- [ ] All endpoints accessible
- [ ] Data formats match
- [ ] Authentication works (if required)

---

## 🐛 Known Issues (Document Any)

### Issue Template:
```
**Issue:** [Description]
**Steps to Reproduce:** [1, 2, 3...]
**Expected:** [What should happen]
**Actual:** [What actually happens]
**Severity:** [Low/Medium/High/Critical]
**Status:** [Open/In Progress/Resolved]
```

### Example:
```
**Issue:** Price doesn't update immediately when changing quantity
**Steps:** 1. Select 5 flowers, 2. Change to 7
**Expected:** Price updates instantly
**Actual:** Updates after 500ms delay
**Severity:** Low
**Status:** Open (intentional debounce for performance)
```

---

## ✅ Sign-Off Checklist

### Functionality
- [ ] All 4 builder steps work
- [ ] Navigation between pages works
- [ ] Form validation works
- [ ] API calls succeed
- [ ] Orders can be placed
- [ ] Confirmations display

### UI/UX
- [ ] No visual glitches
- [ ] Consistent styling
- [ ] Smooth animations
- [ ] Proper loading states
- [ ] Clear error messages

### Code Quality
- [ ] No console errors
- [ ] No warnings (except known)
- [ ] Clean imports
- [ ] Proper file structure
- [ ] Documentation complete

### Performance
- [ ] Fast load times
- [ ] No lag during interactions
- [ ] Efficient re-renders
- [ ] Optimized API calls

---

## 📝 Test Results

**Tested By:** _________________
**Date:** _________________
**Environment:** _________________

### Summary
- **Tests Passed:** _____ / 15
- **Tests Failed:** _____ / 15
- **Blocked:** _____ / 15

### Notes:
```
[Add any additional observations, issues, or recommendations here]
```

---

## 🚀 Ready for Production?

Final checks before deploying:
- [ ] All tests passed
- [ ] No critical issues
- [ ] Performance acceptable
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Backend deployed and accessible
- [ ] Error monitoring set up
- [ ] Analytics configured (optional)

**Approved By:** _________________
**Date:** _________________

---

**Testing Complete! 🎉**

If all checkboxes are marked, your customisation module is fully integrated and ready to use!

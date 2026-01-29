# 🔧 Homepage Not Loading - Quick Fix Guide

## Issue: Homepage shows blank or error page on Vercel

This is a common issue when deploying React apps to Vercel. Let's fix it!

---

## **Quick Diagnostic Check**

### Step 1: Check what error you're seeing

Visit your Vercel URL and check:

**A) Blank white page?**
- This is usually a routing issue
- Follow Solution A below

**B) 404 Error page?**
- Vercel can't find your files
- Follow Solution B below

**C) "Application error" or 500 error?**
- Backend issue
- Follow Solution C below

**D) Shows content but API calls fail?**
- Environment variables issue
- Follow Solution D below

---

## **Solution A: Blank White Page (Most Common)**

This happens because the vercel.json is incorrectly configured.

### Fix 1: Update vercel.json

I've already updated your `vercel.json` file. Now you need to redeploy:

```bash
# In your project directory
cd /Users/ayushop27/Desktop/projects/Arics_Webpage

# Commit the changes
git add .
git commit -m "Fix vercel.json for homepage routing"
git push origin main
```

Vercel will automatically redeploy. Wait 2-3 minutes and refresh your site.

### Fix 2: Check Vercel Build Logs

1. Go to Vercel Dashboard
2. Click your project
3. Go to "Deployments"
4. Click on the latest deployment
5. Check the "Build Logs" tab
6. Look for any errors in red

**Common errors:**
- "Module not found" → Missing dependency
- "Build failed" → Syntax error in code
- "Out of memory" → Too large build

---

## **Solution B: 404 Error**

### Check Build Output Directory

1. Vercel Dashboard → Your Project
2. Settings → General
3. Check **"Output Directory"** is set to: `dist`
4. If not, change it and redeploy

### Check if dist folder exists locally

```bash
cd /Users/ayushop27/Desktop/projects/Arics_Webpage

# Build locally to test
npm run build

# Check if dist folder was created
ls -la dist
```

If build fails locally, fix the errors first, then push to GitHub.

---

## **Solution C: Backend/API Error (500)**

### Check Environment Variables

1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify ALL these are set:

**Required Variables:**
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Random secure string
- `NODE_ENV` = `production`
- `VITE_API_URL` = `https://your-project.vercel.app/api`

### Check Function Logs

1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Go to "Functions" tab
4. Look for errors in the logs

**Common backend errors:**
- "MONGODB_URI is not defined" → Add MongoDB URI env variable
- "Cannot connect to MongoDB" → Check MongoDB Atlas IP whitelist (should include 0.0.0.0/0)
- "Module not found" → Missing dependency in server/package.json

---

## **Solution D: API Calls Failing**

### Check VITE_API_URL

Open browser console (F12) and check network tab:

**If API calls go to localhost:**
1. Environment variable not set correctly
2. Go to Vercel → Settings → Environment Variables
3. Make sure `VITE_API_URL` = `https://your-actual-url.vercel.app/api`
4. Important: Must match your actual Vercel URL!
5. After updating, go to Deployments → Redeploy

**If API calls return 404:**
1. Backend not deployed properly
2. Check if `api` folder exists in your repo
3. Make sure `api/index.js` is committed to GitHub
4. Push and redeploy

---

## **Complete Fresh Deployment (Nuclear Option)**

If nothing works, let's start fresh:

### Step 1: Delete Vercel Project

1. Vercel Dashboard
2. Your Project → Settings
3. Scroll to bottom → "Delete Project"
4. Confirm deletion

### Step 2: Fix Local Files

```bash
cd /Users/ayushop27/Desktop/projects/Arics_Webpage

# Make sure latest changes are committed
git add .
git commit -m "Fix deployment configuration"
git push origin main
```

### Step 3: Redeploy from Scratch

1. Go to Vercel Dashboard
2. "Add New Project"
3. Import your GitHub repo again
4. Configure settings:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** npm run build
   - **Output Directory:** dist
5. Add ALL environment variables
6. Deploy

---

## **Quick Test Checklist**

After deploying, test these:

```
✅ Visit: https://your-project.vercel.app
   → Should show homepage

✅ Visit: https://your-project.vercel.app/products
   → Should show products page

✅ Visit: https://your-project.vercel.app/api/health
   → Should return: {"status":"ok","message":"Arics API is running"}

✅ Open browser console (F12)
   → No red errors

✅ Check Network tab
   → API calls go to correct URL
```

---

## **Debugging Steps**

### Check Browser Console

Press F12 → Console tab

**Look for:**
- Red error messages
- "Failed to fetch" → API issue
- "Cannot read property of undefined" → JavaScript error
- CORS errors → Backend CORS config issue

### Check Network Tab

Press F12 → Network tab

**Check API calls:**
- Status: Should be 200 (green)
- If 404 → API endpoint doesn't exist
- If 500 → Backend error
- If failed → Can't reach backend

### Check Vercel Logs

1. Vercel Dashboard → Your Project
2. Click "View Function Logs"
3. Real-time logs of backend

---

## **Common Issues & Fixes**

### Issue: "Failed to compile" error

**Cause:** Syntax error in code

**Fix:**
```bash
# Test build locally
npm run build

# Fix any errors shown
# Then commit and push
git add .
git commit -m "Fix build errors"
git push origin main
```

### Issue: Images not loading

**Cause:** Wrong image paths

**Fix:** Images should be imported:
```javascript
import logo from './assets/logo.svg'

// Use in component:
<img src={logo} alt="Logo" />
```

### Issue: Products not showing

**Cause:** Database not seeded

**Fix:**
```bash
# Make sure .env has MongoDB Atlas URI
cd /Users/ayushop27/Desktop/projects/Arics_Webpage/server
npm run seed
```

---

## **Need More Help?**

### Share These Details:

1. **Your Vercel URL:** https://_____.vercel.app
2. **Error you see:** (screenshot or description)
3. **Browser console errors:** (screenshot of F12 console)
4. **Vercel build logs:** (from deployment page)

### Quick Commands to Check:

```bash
# Test local build
npm run build

# Check if dist exists
ls -la dist

# Test local server
npm run dev

# Check git status
git status
```

---

## **Success Indicators**

When it's working correctly:

✅ Homepage loads with hero section and animations
✅ Navigation menu works
✅ Products page shows products from database
✅ About page shows team photos
✅ No console errors (F12)
✅ API calls return 200 status
✅ Admin login works

---

**Still having issues? Let me know what error you're seeing and I'll help you fix it!**

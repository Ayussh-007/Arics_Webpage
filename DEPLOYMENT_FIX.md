# Arics Deployment Guide - Quick Fix

## Problem
Your Vercel deployment is failing because the serverless function structure is too complex and doesn't work well with Vercel's serverless architecture.

## Solution: Two-Tier Deployment

### Option 1: Frontend on Vercel + Backend on Render (RECOMMENDED)

This is the simplest and most reliable solution.

#### Step 1: Deploy Backend to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: arics-api
   - **Root Directory**: server
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://aricsadmin:Bhagyashree123@arics.rrowtvv.mongodb.net/?appName=arics
   JWT_SECRET=replace_with_strong_secret
   PORT=5002
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=arics.sale@gmail.com
   SMTP_PASS=viyq adkg bhja vitx
   MAIL_FROM=Arics <no-reply@arics.com>
   PAYMENT_QR_MODE=upi
   PAYMENT_UPI_ID=your-upi-id@bank
   PAYMENT_UPI_NAME=Arics
   ```

6. Click "Create Web Service"
7. Wait for deployment (you'll get a URL like: https://arics-api.onrender.com)

#### Step 2: Update Frontend Environment Variables

Update your `.env` file:

```env
VITE_API_URL=https://arics-api.onrender.com/api
VITE_QR_IMAGE_URL=https://arics-webpage.vercel.app/assets/qr.png
```

#### Step 3: Update Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://arics-api.onrender.com/api
   VITE_QR_IMAGE_URL=https://arics-webpage.vercel.app/assets/qr.png
   ```

#### Step 4: Update Backend CORS

Edit `server/src/index.js` and update CORS to allow your Vercel domain:

```javascript
app.use(cors({
  origin: ['https://arics-webpage.vercel.app', 'http://localhost:5173'],
  credentials: true
}))
```

#### Step 5: Redeploy

```bash
git add .
git commit -m "Update deployment configuration"
git push
```

Both services will automatically redeploy.

---

### Option 2: Frontend on Vercel + Backend on Railway

Similar to Render but using Railway.app:

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Configure:
   - **Root Directory**: server
   - **Start Command**: `npm start`
5. Add same environment variables as above
6. Follow steps 2-5 from Option 1

---

### Option 3: Everything on Vercel (Complex)

This requires restructuring your entire API into individual serverless functions. Not recommended unless you're experienced with serverless architecture.

---

## Quick Test

After deployment, test your API:

```bash
# Test backend health
curl https://arics-api.onrender.com/api/health

# Test frontend
curl https://arics-webpage.vercel.app
```

---

## MongoDB Network Access

**IMPORTANT**: Make sure MongoDB allows connections:

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

---

## Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Network Access allows 0.0.0.0/0
- Verify MONGODB_URI in Render/Railway environment variables
- Check Render/Railway logs for errors

### Frontend can't reach backend
- Verify VITE_API_URL is correct in Vercel
- Check CORS settings in backend
- Check backend is running (visit the health endpoint)

### CORS errors
- Update backend CORS origin to include your Vercel URL
- Redeploy backend after CORS changes

---

## Estimated Costs

- **Vercel**: Free tier (frontend static hosting)
- **Render**: Free tier (backend with 750 hours/month, sleeps after 15 min inactivity)
- **Railway**: $5/month minimum (better performance, no sleep)
- **MongoDB Atlas**: Free tier (512MB storage)

**Total**: $0-5/month depending on backend choice

---

## Alternative: All-in-One Deployment

If you prefer everything in one place, consider:

1. **Railway** - Deploy entire monorepo (frontend + backend)
2. **Render** - Use Render for both static site + web service
3. **DigitalOcean App Platform** - Similar to above
4. **Heroku** - Classic option (now paid)

These handle both frontend and backend but may cost more.

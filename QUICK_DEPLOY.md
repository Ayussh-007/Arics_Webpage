# 🚀 Quick Deployment Guide - Arics to Vercel

## Prerequisites Checklist
- [ ] GitHub account
- [ ] Vercel account (sign up with GitHub)
- [ ] MongoDB Atlas account (free tier)

## Step 1: Setup MongoDB Atlas (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create a **FREE** cluster:
   - Click "Create" → "Deploy a cluster"
   - Choose **M0 FREE** tier
   - Choose a cloud provider & region (closest to you)
   - Click "Create Cluster"

4. Create database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `arics_admin`
   - Password: Generate a strong password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

5. Whitelist all IPs:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. Get connection string:
   - Go back to "Database"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://arics_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://arics_admin:yourpassword@cluster0.xxxxx.mongodb.net/arics?retryWrites=true&w=majority`

**Save this connection string - you'll need it for Vercel!**

## Step 2: Push to GitHub (2 minutes)

```bash
# Navigate to your project
cd /Users/ayushop27/Desktop/projects/Arics_Webpage

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create GitHub repo at: https://github.com/new
# Name it: arics-webpage
# Keep it private
# Don't initialize with README

# Add remote and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/arics-webpage.git
git push -u origin main
```

## Step 3: Deploy to Vercel (5 minutes)

1. Go to https://vercel.com
2. Click "Sign Up" → Continue with GitHub
3. Click "Add New Project"
4. Find and select your `arics-webpage` repository
5. Click "Import"

### Configure Build Settings:
- **Framework Preset:** Vite
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- Leave everything else as default

### Add Environment Variables:
Click "Environment Variables" and add these **ONE BY ONE**:

```
VITE_API_URL
https://your-project-name.vercel.app/api
(Replace your-project-name with actual project name after you see it)

NODE_ENV
production

MONGODB_URI
[Paste your MongoDB Atlas connection string from Step 1]

JWT_SECRET
[Generate one: type 'openssl rand -base64 32' in terminal]

ADMIN_EMAIL
admin@arics.com

ADMIN_PASSWORD
YourSecurePassword123!

SMTP_HOST
smtp.gmail.com

SMTP_PORT
587

SMTP_SECURE
false

SMTP_USER
your-email@gmail.com

SMTP_PASS
[Your Gmail App Password - see below]

MAIL_FROM
Arics <your-email@gmail.com>

PAYMENT_QR_MODE
upi

PAYMENT_UPI_ID
your-upi-id@bank

PAYMENT_UPI_NAME
Arics
```

### Gmail App Password Setup:
1. Go to https://myaccount.google.com/apppasswords
2. Sign in
3. Click "Select app" → "Mail"
4. Click "Select device" → "Other"
5. Type "Arics Website"
6. Click "Generate"
7. Copy the 16-character password (no spaces)
8. Use this as `SMTP_PASS`

6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment to complete

## Step 4: Update Frontend API URL

After deployment completes:

1. Copy your Vercel URL (e.g., `https://arics-webpage-xyz.vercel.app`)
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Find `VITE_API_URL`
4. Update it to: `https://arics-webpage-xyz.vercel.app/api` (use your actual URL)
5. Go to "Deployments" tab
6. Click "..." on latest deployment → "Redeploy"
7. Check "Use existing build cache" → Click "Redeploy"

## Step 5: Seed the Database (2 minutes)

On your local machine:

```bash
# Update server/.env with MongoDB Atlas URI
cd /Users/ayushop27/Desktop/projects/Arics_Webpage/server

# Create/edit .env file
echo "MONGODB_URI=your_mongodb_atlas_connection_string" > .env

# Run seed script
npm run seed

# Upload QR image to database
cd src
node utils/seedQrImage.js
```

You should see:
```
✅ Connected to MongoDB
✅ Created admin user
✅ Created 12 products
✅ QR image saved to database
```

## Step 6: Test Your Website! 🎉

Visit your Vercel URL: `https://arics-webpage-xyz.vercel.app`

Test these:
- [ ] Homepage loads
- [ ] Products page shows products
- [ ] About Us shows team photos
- [ ] Admin login works (admin@arics.com / YourSecurePassword123!)
- [ ] Can view orders in admin
- [ ] Place a test order
- [ ] Receive confirmation email with QR code

## Troubleshooting

### Deployment Failed?
- Check build logs in Vercel dashboard
- Make sure all dependencies are in package.json
- Check for syntax errors

### API not working?
- Verify `VITE_API_URL` is set correctly
- Check backend function logs in Vercel
- Verify MongoDB connection string is correct

### Email not sending?
- Check Gmail App Password is correct
- Make sure 2FA is enabled on Gmail
- Try a different SMTP provider (SendGrid, Mailgun)

### 500 Error?
- Check environment variables are all set
- Look at function logs in Vercel
- Verify MongoDB is accessible

## Success! ✅

Your Arics Flower Boutique is now LIVE on the internet!

**Your URLs:**
- Website: https://your-project-name.vercel.app
- Admin Panel: https://your-project-name.vercel.app/admin
- API: https://your-project-name.vercel.app/api

## What's Next?

1. **Custom Domain** (Optional):
   - Vercel Settings → Domains
   - Add your own domain (e.g., arics.com)

2. **Analytics**:
   - Enable Vercel Analytics
   - Track visitors and performance

3. **Share**:
   - Share your website link!
   - Get feedback from users

4. **Monitor**:
   - Check Vercel logs regularly
   - Monitor MongoDB usage
   - Check email delivery

## Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.atlas.mongodb.com
- Check `VERCEL_DEPLOYMENT.md` for detailed guide

---

**Made with 💐 by the Arics Team**

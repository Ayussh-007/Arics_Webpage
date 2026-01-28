# Vercel Deployment Configuration

## Vercel Project Settings

### Build & Development Settings

**Framework Preset:** Vite
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### Root Directory
Leave as `.` (root)

### Node.js Version
18.x (recommended)

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

### Frontend Variables
```
VITE_API_URL=https://your-app-name.vercel.app/api
```

### Backend Variables
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_secret_key_here
ADMIN_EMAIL=admin@arics.com
ADMIN_PASSWORD=YourSecurePassword123!

# Email Configuration (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-specific-password
MAIL_FROM=Arics <your-gmail@gmail.com>

# Payment QR Configuration
PAYMENT_QR_MODE=upi
PAYMENT_UPI_ID=your-upi-id@bank
PAYMENT_UPI_NAME=Arics
```

## Step-by-Step Deployment Guide

### Step 1: Prepare Your Code

1. **Make sure all changes are committed:**
```bash
cd /Users/ayushop27/Desktop/projects/Arics_Webpage
git add .
git commit -m "Prepare for Vercel deployment"
```

2. **Push to GitHub:**
```bash
git push origin main
```

If you haven't initialized a git repo yet:
```bash
git init
git add .
git commit -m "Initial commit - Arics Flower Boutique"
git branch -M main
git remote add origin https://github.com/your-username/arics-webpage.git
git push -u origin main
```

### Step 2: Set Up MongoDB Atlas (Required)

Since Vercel is serverless, you need a cloud database:

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create a new cluster (Free tier is fine)
4. Create a database user
5. Whitelist all IPs: `0.0.0.0/0` (for Vercel)
6. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/arics?retryWrites=true&w=majority`

### Step 3: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Sign up / Log in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (keep as root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

6. Add Environment Variables:
   - Click "Environment Variables"
   - Add all the variables from the list above
   - Make sure to use your actual MongoDB Atlas URI

7. Click "Deploy"

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd /Users/ayushop27/Desktop/projects/Arics_Webpage
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your username
# - Link to existing project? No
# - Project name? arics-webpage
# - In which directory is your code? ./
# - Override settings? No
```

### Step 4: Configure Environment Variables in Vercel

After deployment, add environment variables:

```bash
vercel env add VITE_API_URL production
# Enter: https://your-project-name.vercel.app/api

vercel env add MONGODB_URI production
# Enter: your MongoDB Atlas connection string

vercel env add JWT_SECRET production
# Enter: a random secure string (use: openssl rand -base64 32)

# Add all other environment variables...
```

Or add them via the Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add each variable for Production

### Step 5: Seed the Database

After first deployment, you need to seed your database:

**Option A: Run seed script locally against MongoDB Atlas**
```bash
cd server
# Update .env to point to MongoDB Atlas
MONGODB_URI=your_atlas_uri node src/seed.js
```

**Option B: Create a temporary serverless function**
Create `api/seed.js`:
```javascript
import '../server/src/seed.js'
export default function handler(req, res) {
  res.status(200).json({ message: 'Check logs' })
}
```
Then visit: `https://your-app.vercel.app/api/seed` (once only)

### Step 6: Upload QR Image to Database

```bash
cd server/src
# Make sure MONGODB_URI points to Atlas
node utils/seedQrImage.js
```

### Step 7: Test Your Deployment

1. Visit your Vercel URL: `https://your-project-name.vercel.app`
2. Test the main pages
3. Try logging in to admin panel
4. Place a test order
5. Check if emails are sent

## Important Notes

### ⚠️ Serverless Limitations

Vercel uses serverless functions, which have some limitations:

1. **Cold Starts:** First request may be slow
2. **Execution Time:** Max 10 seconds per request (Hobby plan)
3. **File System:** Read-only, temporary storage
4. **Environment:** Stateless, no persistent connections

### 🔒 Security

1. **Never commit .env files** - Add to .gitignore
2. **Use strong JWT_SECRET** - Generate with: `openssl rand -base64 32`
3. **Use App Passwords** - For Gmail SMTP, create an App Password (not your regular password)
4. **Restrict MongoDB Access** - In production, consider IP whitelisting

### 📧 Email Setup (Gmail Example)

1. Enable 2-Factor Authentication on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Create an App Password for "Mail"
4. Use this 16-character password as `SMTP_PASS`

### 🔄 Redeployment

Any push to your GitHub main branch will automatically trigger a new deployment.

Or manually redeploy:
```bash
vercel --prod
```

### 📊 Monitoring

View logs in Vercel Dashboard:
- Go to your project
- Click on a deployment
- View "Functions" tab for backend logs
- View "Runtime Logs" for errors

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify build command is correct

### API Not Working
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check function logs for errors

### Email Not Sending
- Verify SMTP credentials
- Check if port 587 is accessible
- Try using an App Password (for Gmail)

### Images Not Loading
- Ensure images are in `/src/assets` or `/public`
- Check import paths are correct
- Verify Vite handles the asset imports

## Success Checklist

- [ ] GitHub repository created and pushed
- [ ] MongoDB Atlas cluster created
- [ ] Vercel project created
- [ ] Environment variables added in Vercel
- [ ] Database seeded with initial data
- [ ] QR image uploaded to database
- [ ] Test order placed successfully
- [ ] Admin panel accessible
- [ ] Emails being sent correctly

## Your Deployment URLs

After deployment, you'll have:
- **Frontend:** `https://your-project-name.vercel.app`
- **Backend API:** `https://your-project-name.vercel.app/api`
- **Admin Panel:** `https://your-project-name.vercel.app/admin`

## Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Check deployment logs in Vercel dashboard
- Vercel Community: https://github.com/vercel/vercel/discussions

---

**🎉 Once deployed, your Arics Flower Boutique will be live on the internet!**

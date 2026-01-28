# Arics Bouquet Builder (MERN)

Luxury, glassmorphism-inspired bouquet customisation experience with a dynamic admin panel and products catalog.

## 🌸 Features

- **🏠 Homepage** - Beautiful hero section with bloom animation
- **🛍️ Products Page** - Browse and shop luxury bouquets
- **🎨 Customization** - Build your own custom bouquets
- **👑 Admin Dashboard** - Manage products, flowers, and settings
- **📱 Responsive Design** - Works on all devices
- **✨ Glassmorphism UI** - Modern, elegant aesthetic
- **📧 Email Notifications** - Order confirmations with payment QR codes
- **💳 Payment QR** - Database-stored QR codes for UPI payments
- **🖼️ Team Photos** - Real team member photos in About Us

## Stack
- **Frontend:** React + Vite + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Authentication:** JWT-based admin authentication
- **Deployment:** Vercel (Frontend + Backend)
- **Database:** MongoDB Atlas

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **QUICK_DEPLOY.md** | ⭐ Quick deployment guide for Vercel |
| **VERCEL_DEPLOYMENT.md** | Detailed deployment instructions |
| **QR_IMAGE_MANAGEMENT.md** | QR code management system docs |
| **INSTALLATION_INSTRUCTIONS.md** | QR setup instructions |
| **PRODUCTS_QUICKSTART.md** | Quick setup guide for Products feature |
| **PRODUCTS_IMPLEMENTATION.md** | Complete technical documentation |
| **PRODUCTS_UI_GUIDE.md** | Visual component reference |
| **PRODUCTS_SUMMARY.md** | Executive overview |
| **PRODUCT_REFERENCE.json** | API reference and examples |
| **CHANGES_SUMMARY.md** | Recent updates and changes |
| **ADMIN_ACCESS.md** | Admin features documentation |
| **AGENTS.md** | Architecture and design decisions |

## 🚀 Local Development

### 1) Install frontend dependencies
```bash
npm install
```

### 2) Install backend dependencies
```bash
npm --prefix server install
```

### 3) Configure environment
Copy `server/.env.example` to `server/.env` and update values:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@arics.com
ADMIN_PASSWORD=ChangeMe123!
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_FROM=Arics <your_email@gmail.com>
PAYMENT_UPI_ID=your-upi-id@bank
PAYMENT_UPI_NAME=Arics
```

### 4) Seed database
```bash
npm --prefix server run seed
```
This creates:
- Admin user
- 12 sample products
- Sample flowers
- Customization options

### 5) Upload QR image to database
```bash
cd server/src
node utils/seedQrImage.js
```

### 6) Run both client + server
```bash
npm run dev:all
```

Or run them separately:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm --prefix server start
```

**Access Points:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Products: Click "PRODUCTS" in navbar
- Admin: Click "ADMIN" in navbar

## 🌐 Deploy to Vercel

**Quick Start:** See `QUICK_DEPLOY.md` for step-by-step guide

### Prerequisites
- GitHub account
- Vercel account (sign up with GitHub)
- MongoDB Atlas account (free tier)

### Deployment Steps
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy with one click
5. Seed database with production data

**Detailed Guide:** See `VERCEL_DEPLOYMENT.md`

## 🔐 Admin Login

Default credentials (change in production):
```
Email: admin@arics.com
Password: ChangeMe123!
```

## 🎨 Main Features

### Homepage
- Animated hero section with bloom effect
- Smooth scroll animations
- Social media integration
- Elegant typography and glassmorphism

### Products Page
- Browse all available products
- Search functionality
- Filter by category (Bouquet, Arrangement, Plant, Gift, Subscription)
- Sort by newest, popular, price, or name
- Filter by offers/discounts
- Responsive grid layout
- Product cards with hover effects

### Customization App
Build custom bouquets with:
- Flower selection
- Quantity customization
- Paper and ribbon options
- Add-ons (chocolates, cards, etc.)
- Real-time price calculation
- Order placement with email confirmation

### About Us
- Team member profiles with real photos
- Company story and philosophy
- Services overview
- Contact section

### Admin Dashboard

**Products Management:**
- View all products (including inactive)
- Add new products
- Edit existing products
- Delete products
- Toggle active/inactive status
- Upload product images
- Set pricing and discounts
- Manage stock levels
- Add offer badges
- Mark as featured

**QR Code Management:**
- Upload payment QR codes
- Store in database
- Automatic email embedding
- Admin panel interface

**Dashboard Statistics:**
- Total products count
- Active products
- Out of stock items
- Featured products

**Other Admin Features:**
- Manage flowers inventory
- Configure customization options
- Update site settings
- Order management with status updates
- Email notifications

## 📁 Project Structure

```
arics_webpage/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Bloomanimation.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductForm.jsx
│   │   └── QrImageManager.jsx        # QR management UI
│   ├── pages/
│   │   ├── ProductsPage.jsx
│   │   ├── AboutUs.jsx               # With team photos
│   │   └── AdminDashboard.jsx
│   ├── assets/
│   │   ├── ayush.jpeg                # Team photos
│   │   ├── bhagyashree.jpeg
│   │   ├── manthan.jpeg
│   │   └── qr.png                    # Payment QR
│   ├── customisation/
│   │   ├── CustomisationApp.jsx
│   │   ├── components/
│   │   └── pages/
│   └── App.jsx
├── server/
│   └── src/
│       ├── models/
│       │   ├── Product.js
│       │   ├── Flower.js
│       │   ├── Order.js
│       │   ├── User.js
│       │   └── AdminSettings.js      # With QR storage
│       ├── routes/
│       │   ├── products.js
│       │   ├── flowers.js
│       │   ├── orders.js
│       │   ├── auth.js
│       │   └── adminSettings.js      # QR API routes
│       ├── utils/
│       │   ├── orderEmail.js         # Email with QR
│       │   └── seedQrImage.js        # QR upload script
│       ├── middleware/
│       │   └── auth.js
│       ├── assets/
│       │   └── qr.png
│       ├── index.js
│       └── seed.js
├── vercel.json                       # Vercel config
├── QUICK_DEPLOY.md                   # Deployment guide
└── Documentation/
```

## 🔌 API Endpoints

### Public Routes
```
GET    /api/products              # Get all active products with filters
GET    /api/products/:id          # Get single product
POST   /api/products/:id/view     # Increment popularity
GET    /api/admin-settings/qr-image  # Get QR image
```

### Admin Routes (Protected)
```
GET    /api/products/admin/all    # Get all products
POST   /api/products              # Create new product
PUT    /api/products/:id          # Update product
PATCH  /api/products/:id/toggle   # Toggle active status
DELETE /api/products/:id          # Delete product
POST   /api/admin-settings/qr-upload  # Upload QR code
DELETE /api/admin-settings/qr-image   # Delete QR code
```

### Other Routes
```
POST   /api/auth/login            # Admin login
GET    /api/flowers               # Get flowers
POST   /api/orders                # Place order
GET    /api/orders                # Get all orders (admin)
PATCH  /api/orders/:id/status     # Update order status (admin)
```

## 🎨 Design System

### Colors
- **Primary Gradient:** Pink (50-600) to Rose (50-400)
- **Accent:** Purple (50-400)
- **Text:** Gray (600-900)
- **Background:** Rose-Pink-Purple gradient

### Typography
- **Playfair Display** - Headings
- **Cormorant Garamond** - Elegant text, descriptions
- **Montserrat** - Body text, UI elements
- **Cinzel** - Buttons, labels (uppercase)
- **Italiana** - Logo

### UI Style
- Glassmorphism cards (blur + transparency)
- Rounded corners (3xl for cards)
- Soft shadows
- Smooth animations (Framer Motion)
- Gen-Z luxury aesthetic

## 📱 Responsive Design

- **Mobile:** 1 column grid, stacked filters
- **Tablet (768px+):** 2 columns
- **Desktop (1024px+):** 3 columns

## 🔧 Development

### Available Scripts

```bash
# Frontend
npm run dev              # Start dev server (Vite)
npm run build            # Build for production
npm run preview          # Preview production build

# Backend
npm --prefix server start       # Start backend server
npm --prefix server run seed    # Seed database

# Both
npm run dev:all          # Run both frontend + backend
```

## 🌟 New Features

### QR Code Management System
- Store QR codes in MongoDB
- Admin panel upload interface
- Automatic email embedding (base64)
- Fallback to file system
- See `QR_IMAGE_MANAGEMENT.md` for details

### Team Photos
- Real team member photos in About Us
- Stored in `/src/assets`
- Optimized loading
- Responsive images

### Enhanced Email System
- Order confirmation emails
- Status update emails
- Embedded QR codes (base64)
- Professional templates

## 🐛 Troubleshooting

### Products not displaying?
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Reseed database
npm --prefix server run seed
```

### Images not loading?
- Use valid HTTPS URLs or local imports
- Check image paths are correct
- Verify images exist in assets folder

### QR code not showing in emails?
```bash
# Check if QR is in database
curl http://localhost:5000/api/admin-settings/qr-image --output test-qr.png

# Reseed QR image
cd server/src
node utils/seedQrImage.js
```

### Admin can't login?
- Verify credentials in server/.env
- Reseed database to recreate admin user
- Clear browser localStorage

## 🚀 Production Deployment

### Environment Setup
1. **MongoDB Atlas** - Create free cluster
2. **Vercel** - Connect GitHub repository
3. **Environment Variables** - Add in Vercel dashboard
4. **Database Seeding** - Run seed scripts with production DB
5. **QR Upload** - Upload QR image to production database

See `QUICK_DEPLOY.md` or `VERCEL_DEPLOYMENT.md` for complete guide.

## 📊 Sample Data

The seed script creates:
- **12 sample products** (bouquets, arrangements, plants, gifts, subscriptions)
- **4 sample flowers** (Rose, Lily, Tulip, Orchid)
- **Customization options** (paper types, ribbons, add-ons)
- **Admin user** (admin@arics.com)
- **Payment QR code** (stored in database)

## 🔐 Security

- JWT authentication for admin routes
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Input validation (client + server)
- CORS configuration
- Environment variables for secrets
- Secure QR code storage in database

## ✨ Key Features Summary

### For Customers
✅ Browse luxury products  
✅ Search and filter  
✅ View product details  
✅ See stock availability  
✅ Customize bouquets  
✅ Place orders  
✅ Receive email confirmations with QR  
✅ Responsive design  
✅ Learn about the team

### For Admins
✅ Product CRUD operations  
✅ Real-time statistics  
✅ Stock management  
✅ Pricing control  
✅ Image management  
✅ Featured products  
✅ Offer badges  
✅ Order management  
✅ QR code management  
✅ Email system with status updates

## 🎯 Future Enhancements

Planned features:
- Product reviews and ratings
- Bulk product operations
- Advanced analytics dashboard
- Email notifications for low stock
- Wishlist functionality
- Related products
- SEO optimization
- Multi-language support
- Payment gateway integration
- SMS notifications

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

Built with modern best practices:
- React best practices
- RESTful API design
- Material Design principles
- WCAG accessibility
- Mobile-first design
- Serverless architecture (Vercel)

## 📞 Support

For detailed documentation:
- **Deployment:** `QUICK_DEPLOY.md` or `VERCEL_DEPLOYMENT.md`
- **QR Management:** `QR_IMAGE_MANAGEMENT.md`
- **Products:** `PRODUCTS_QUICKSTART.md`
- **Technical:** `PRODUCTS_IMPLEMENTATION.md`
- **UI Reference:** `PRODUCTS_UI_GUIDE.md`
- **API:** `PRODUCT_REFERENCE.json`

---

**Version:** 2.0.0  
**Status:** Production Ready ✅  
**Last Updated:** January 30, 2025  
**Deployment:** Vercel-optimized

**Built with 💐 for Arics by Bhagyashree, Ayush & Manthan**

# Arics Bouquet Builder (MERN)

Luxury, glassmorphism-inspired bouquet customisation experience with a dynamic admin panel and products catalog.

## 🌸 Features

- **🏠 Homepage** - Beautiful hero section with bloom animation
- **🛍️ Products Page** - Browse and shop luxury bouquets
- **🎨 Customization** - Build your own custom bouquets
- **👑 Admin Dashboard** - Manage products, flowers, and settings
- **📱 Responsive Design** - Works on all devices
- **✨ Glassmorphism UI** - Modern, elegant aesthetic

## Stack
- **Frontend:** React + Vite + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Authentication:** JWT-based admin authentication

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **PRODUCTS_QUICKSTART.md** | Quick setup guide for Products feature |
| **PRODUCTS_IMPLEMENTATION.md** | Complete technical documentation |
| **PRODUCTS_UI_GUIDE.md** | Visual component reference |
| **PRODUCTS_SUMMARY.md** | Executive overview |
| **PRODUCT_REFERENCE.json** | API reference and examples |
| **CHANGES_SUMMARY.md** | Recent updates and changes |
| **ADMIN_ACCESS.md** | Admin features documentation |
| **AGENTS.md** | Architecture and design decisions |

## 🚀 Quick Start

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

### 5) Run both client + server
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
- Order placement

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

**Dashboard Statistics:**
- Total products count
- Active products
- Out of stock items
- Featured products

**Other Admin Features:**
- Manage flowers inventory
- Configure customization options
- Update site settings
- Order management

## 📁 Project Structure

```
arics_webpage/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Bloomanimation.jsx
│   │   ├── ProductCard.jsx           # Product display component
│   │   └── ProductForm.jsx           # Product create/edit form
│   ├── pages/
│   │   ├── ProductsPage.jsx          # Customer product browsing
│   │   └── AdminDashboard.jsx        # Admin product management
│   ├── customisation/                # Bouquet builder
│   │   ├── CustomisationApp.jsx
│   │   ├── components/
│   │   └── pages/
│   └── App.jsx                       # Main app with routing
├── server/
│   └── src/
│       ├── models/
│       │   ├── Product.js            # Product schema
│       │   ├── Flower.js
│       │   ├── Order.js
│       │   └── User.js
│       ├── routes/
│       │   ├── products.js           # Product API endpoints
│       │   ├── flowers.js
│       │   └── auth.js
│       ├── middleware/
│       │   └── auth.js               # JWT authentication
│       └── index.js
└── Documentation/                    # See above table
```

## 🔌 API Endpoints

### Public Routes
```
GET    /api/products              # Get all active products with filters
GET    /api/products/:id          # Get single product
POST   /api/products/:id/view     # Increment popularity
```

### Admin Routes (Protected)
```
GET    /api/products/admin/all    # Get all products
POST   /api/products              # Create new product
PUT    /api/products/:id          # Update product
PATCH  /api/products/:id/toggle   # Toggle active status
DELETE /api/products/:id          # Delete product
```

### Other Routes
```
POST   /api/auth/login            # Admin login
GET    /api/flowers               # Get flowers
POST   /api/orders                # Place order
...and more
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

### Environment Variables

Required in `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/arics
JWT_SECRET=your-secret-key-here
ADMIN_EMAIL=admin@arics.com
ADMIN_PASSWORD=ChangeMe123!
PORT=5000
```

## 🐛 Troubleshooting

### Products not displaying?
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Reseed database
npm --prefix server run seed

# Check browser console for errors
```

### Images not loading?
- Use valid HTTPS URLs (Unsplash, Cloudinary, etc.)
- Avoid local file paths
- Check CORS settings

### Admin can't login?
- Verify credentials in server/.env
- Reseed database to recreate admin user
- Clear browser localStorage

### More troubleshooting?
See `PRODUCTS_QUICKSTART.md` for detailed solutions.

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Deploy with your platform's CLI
```

### Database
- Use MongoDB Atlas for production
- Update MONGODB_URI in environment variables

## 📊 Sample Data

The seed script creates:
- **12 sample products** (bouquets, arrangements, plants, gifts, subscriptions)
- **4 sample flowers** (Rose, Lily, Tulip, Orchid)
- **Customization options** (paper types, ribbons, add-ons)
- **Admin user** (admin@arics.com)

## 🔐 Security

- JWT authentication for admin routes
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Input validation (client + server)
- CORS configuration
- Environment variables for secrets

## ✨ Key Features

### For Customers
✅ Browse luxury products  
✅ Search and filter  
✅ View product details  
✅ See stock availability  
✅ Customize bouquets  
✅ Place orders  
✅ Responsive design  

### For Admins
✅ Product CRUD operations  
✅ Real-time statistics  
✅ Stock management  
✅ Pricing control  
✅ Image management  
✅ Featured products  
✅ Offer badges  
✅ Order management  

## 🎯 Future Enhancements

Planned features:
- Product reviews and ratings
- Bulk product operations
- Advanced analytics dashboard
- Email notifications
- Wishlist functionality
- Related products
- SEO optimization
- Multi-language support

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

Built with modern best practices:
- React best practices
- RESTful API design
- Material Design principles
- WCAG accessibility
- Mobile-first design

## 📞 Support

For detailed documentation:
- **Quick Start:** `PRODUCTS_QUICKSTART.md`
- **Technical Docs:** `PRODUCTS_IMPLEMENTATION.md`
- **UI Reference:** `PRODUCTS_UI_GUIDE.md`
- **API Reference:** `PRODUCT_REFERENCE.json`

---

**Version:** 1.0.0  
**Status:** Production Ready ✅  
**Last Updated:** January 28, 2026

**Built with ❤️ for Arics**

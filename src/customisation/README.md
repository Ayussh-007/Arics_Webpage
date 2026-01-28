# 🌸 Arics Customisation Module

A complete bouquet customization system with multi-step builder, checkout, and admin management.

## ✨ Features

- **4-Step Bouquet Builder**
  - Step 1: Select quantity (5, 7, 9, or custom)
  - Step 2: Choose flowers with individual stem counts
  - Step 3: Pick wrapping style and add-ons
  - Step 4: Preview and proceed to checkout

- **Live Price Calculation**
  - Real-time pricing updates
  - Tax calculation
  - Delivery fee estimation
  - Transparent breakdown

- **Smart Form Validation**
  - Zod schema validation
  - React Hook Form integration
  - Clear error messages

- **State Management**
  - Zustand for global state
  - Persistent selection across steps
  - Easy reset functionality

- **API Integration**
  - RESTful API services
  - Axios with JWT interceptors
  - Error handling with toast notifications

## 🗂️ Project Structure

```
customisation/
├── index.js                    # Main export
├── CustomisationApp.jsx        # Root component with routing
├── ARCHITECTURE.md            # Detailed architecture docs
├── README.md                  # This file
│
├── api/
│   ├── client.js              # Axios config & interceptors
│   └── services.js            # API functions
│
├── components/                # Reusable UI components
│   ├── index.js
│   ├── BouquetPreview.jsx
│   ├── FlowerCard.jsx
│   ├── GlassCard.jsx
│   ├── OptionPill.jsx
│   ├── PriceSummary.jsx
│   ├── SectionHeader.jsx
│   └── Stepper.jsx
│
├── pages/                     # Main page components
│   ├── index.js
│   ├── BouquetBuilder.jsx
│   ├── Checkout.jsx
│   ├── OrderConfirmation.jsx
│   └── AdminDashboard.jsx
│
├── store/
│   └── useBouquetStore.js    # Zustand state management
│
└── utils/
    └── pricing.js            # Price calculation logic
```

## 🚀 Quick Start

### 1. Import in App.jsx
```jsx
import { CustomisationApp } from "./customisation";

// In your component:
<CustomisationApp />
```

### 2. Set Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Backend Server
```bash
cd server
npm run dev
```

### 4. Navigate to Customize
Click "CUSTOMIZE" in the navbar to access the builder.

## 🎨 Component Usage

### GlassCard
```jsx
import { GlassCard } from './components';

<GlassCard className="p-6">
  Your content here
</GlassCard>
```

### FlowerCard
```jsx
import { FlowerCard } from './components';

<FlowerCard
  flower={flowerObject}
  stems={3}
  onChange={(newStems) => handleChange(newStems)}
/>
```

### PriceSummary
```jsx
import { PriceSummary } from './components';

<PriceSummary
  pricing={{ base: 50, addOns: 10, tax: 3, delivery: 5, total: 68 }}
  deliveryDays={3}
/>
```

## 🔄 State Management

### useBouquetStore
```javascript
import { useBouquetStore } from './store/useBouquetStore';

const MyComponent = () => {
  const { 
    step,           // Current step (1-4)
    selection,      // Current selections
    setStep,        // Navigate steps
    setQuantity,    // Set flower quantity
    setFlowerStem,  // Add/remove stems
    toggleCustomization, // Select options
    reset          // Clear everything
  } = useBouquetStore();

  return (
    <button onClick={() => setStep(2)}>
      Next Step
    </button>
  );
};
```

### Selection Object Structure
```javascript
{
  quantity: 7,
  flowers: {
    "flowerId123": 3,  // 3 stems of this flower
    "flowerId456": 4   // 4 stems of another
  },
  customizations: {
    "wrapping": "Kraft Paper",
    "ribbon": ["Silk", "Lace"],  // Multiple selection
    "vase": 1                     // Quantity type
  },
  notes: "Happy Birthday!"
}
```

## 🌐 API Services

### Available Functions
```javascript
import {
  // Flowers
  fetchFlowers,
  createFlower,
  updateFlower,
  deleteFlower,
  
  // Customizations
  fetchCustomizations,
  createCustomization,
  updateCustomization,
  deleteCustomization,
  
  // Settings
  fetchSettings,
  updateSettings,
  
  // Orders
  createOrder,
  fetchOrders,
  
  // Auth
  adminLogin
} from './api/services';

// Usage
const flowers = await fetchFlowers();
const order = await createOrder(orderData);
```

## 💰 Pricing Utilities

### computePricing
```javascript
import { computePricing } from './utils/pricing';

const pricing = computePricing({
  selection: currentSelection,
  flowers: flowersList,
  customizations: customizationsList,
  settings: settingsObject
});

// Returns:
// {
//   base: 50.00,
//   addOns: 15.00,
//   tax: 3.25,
//   delivery: 4.99,
//   total: 73.24
// }
```

### estimateDelivery
```javascript
import { estimateDelivery } from './utils/pricing';

const days = estimateDelivery({
  quantity: 12,
  settings: settingsObject
});
// Returns: 3 (days)
```

## 🎯 User Flow

1. **Select Quantity** → Choose 5, 7, 9 or custom number of flowers
2. **Pick Flowers** → Select different flower types and stem counts
3. **Customize** → Choose wrapping, ribbons, vase, and add-ons
4. **Preview** → Review selections and see live preview
5. **Checkout** → Fill in delivery details
6. **Confirmation** → Order placed successfully!

## 🔧 Customization Options

### Adding New Steps
Edit `BouquetBuilder.jsx`:
```javascript
// Add to step rendering
{step === 5 && (
  <GlassCard className="p-6">
    <h3>New Step Content</h3>
  </GlassCard>
)}
```

### Modify Pricing Logic
Edit `utils/pricing.js`:
```javascript
export const computePricing = ({ selection, flowers, customizations, settings }) => {
  // Add your custom pricing logic
  const customCharge = selection.express ? 10 : 0;
  return { ...pricing, customCharge };
};
```

### Add New API Endpoints
Edit `api/services.js`:
```javascript
export const fetchNewData = () => 
  api.get('/new-endpoint').then((r) => r.data);
```

## 🎨 Styling

Uses **TailwindCSS** with custom glassmorphism:
- Dark theme: `from-[#14030a] via-[#2b0b1b] to-[#4a1430]`
- Glass cards: `bg-white/20 backdrop-blur-xl`
- Accent: Pink/Rose colors

### Custom Styles
```jsx
<GlassCard className="custom-class">
  Inherits glass effects + your custom styles
</GlassCard>
```

## 🐛 Troubleshooting

### Issue: API not responding
- Check if backend server is running
- Verify `VITE_API_URL` in `.env`
- Check network tab in browser devtools

### Issue: State not updating
- Check `useBouquetStore` usage
- Ensure you're calling the correct action
- Use React DevTools to inspect state

### Issue: Pricing incorrect
- Verify `settings` object loaded
- Check `computePricing` input data
- Console log pricing breakdown

### Issue: Form validation failing
- Check Zod schema in `Checkout.jsx`
- Verify field names match schema
- Look at console for error details

## 📦 Dependencies

- `react` - UI framework
- `framer-motion` - Animations
- `zustand` - State management
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@hookform/resolvers` - Form + Zod integration
- `axios` - HTTP client
- `react-hot-toast` - Notifications
- `clsx` - Conditional classes

## 🚀 Performance

- **Lazy Loading**: Components load on demand
- **Memoization**: Uses `useMemo` for pricing
- **Optimized Re-renders**: Zustand prevents unnecessary updates
- **API Caching**: Could add React Query for caching

## 🔐 Security

- JWT tokens stored in localStorage
- Axios interceptor adds auth header
- Input validation with Zod
- API error handling

## 📝 Best Practices

1. **Always validate forms** with Zod schemas
2. **Use toast notifications** for user feedback
3. **Keep components small** and reusable
4. **Centralize API calls** in services.js
5. **Use Zustand** for shared state only
6. **Add loading states** for async operations

## 🤝 Contributing

1. Follow existing file structure
2. Use TypeScript-style JSDoc comments
3. Add PropTypes or TypeScript
4. Update ARCHITECTURE.md for major changes
5. Test all steps before committing

## 📄 License

Part of Arics Flower Boutique project.

---

**Need help?** Check `ARCHITECTURE.md` for detailed technical documentation.

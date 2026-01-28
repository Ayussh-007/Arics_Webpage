# 🚀 Quick Reference Guide

## 🏃‍♂️ Getting Started (60 seconds)

### 1. Start the servers
```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
npm run dev
```

### 2. Open browser
- Go to `http://localhost:5173`
- Click "CUSTOMIZE" in navbar
- Start building!

---

## 📚 Common Tasks

### Import the Main App
```jsx
import { CustomisationApp } from './customisation';
```

### Use a Component
```jsx
import { GlassCard, FlowerCard } from './customisation/components';

<GlassCard className="p-6">
  <FlowerCard 
    flower={{ name: 'Rose', pricePerStem: 5, stock: 100 }} 
    stems={3}
    onChange={(stems) => console.log(stems)}
  />
</GlassCard>
```

### Access Store
```jsx
import { useBouquetStore } from './customisation/store/useBouquetStore';

const { selection, setQuantity, setFlowerStem } = useBouquetStore();

// Set quantity
setQuantity(9);

// Add flowers
setFlowerStem('flowerId123', 5);
```

### Call API
```jsx
import { fetchFlowers, createOrder } from './customisation/api/services';

// Get flowers
const flowers = await fetchFlowers();

// Create order
const order = await createOrder({
  customer: { name: 'John', email: 'john@example.com', ... },
  selection: { quantity: 7, flowers: {...}, customizations: {...} }
});
```

### Calculate Price
```jsx
import { computePricing, estimateDelivery } from './customisation/utils/pricing';

const pricing = computePricing({
  selection: { quantity: 7, flowers: {...} },
  flowers: flowersList,
  customizations: customList,
  settings: settingsObj
});

const days = estimateDelivery({ quantity: 7, settings: settingsObj });
```

---

## 🗂️ File Locations

### Want to edit...

**The main customization app?**
→ `/src/customisation/CustomisationApp.jsx`

**The 4-step builder?**
→ `/src/customisation/pages/BouquetBuilder.jsx`

**The checkout form?**
→ `/src/customisation/pages/Checkout.jsx`

**A component (like FlowerCard)?**
→ `/src/customisation/components/[ComponentName].jsx`

**API calls?**
→ `/src/customisation/api/services.js`

**State management?**
→ `/src/customisation/store/useBouquetStore.js`

**Pricing logic?**
→ `/src/customisation/utils/pricing.js`

**The navbar button?**
→ `/src/components/Navbar.jsx`

---

## 🎯 Component Props

### FlowerCard
```jsx
<FlowerCard
  flower={{ name: string, pricePerStem: number, stock: number, enabled: boolean }}
  stems={number}
  onChange={(newStems) => void}
/>
```

### OptionPill
```jsx
<OptionPill
  label={string}
  active={boolean}
  onClick={() => void}
/>
```

### PriceSummary
```jsx
<PriceSummary
  pricing={{ base: number, addOns: number, tax: number, delivery: number, total: number }}
  deliveryDays={number}
/>
```

### BouquetPreview
```jsx
<BouquetPreview
  selection={{ quantity, flowers, customizations }}
  flowers={[flowerObjects]}
  customizations={[customizationObjects]}
/>
```

---

## 🔄 Store Actions

```jsx
const {
  // State
  step,           // Current step (1-4)
  selection,      // Current selections
  
  // Actions
  setStep,                    // setStep(2)
  setQuantity,                // setQuantity(9)
  setFlowerStem,              // setFlowerStem('id', 5)
  toggleCustomization,        // toggleCustomization('wrapping', 'Kraft')
  setCustomizationQuantity,   // setCustomizationQuantity('vase', 2)
  setNotes,                   // setNotes('Happy Birthday!')
  reset,                      // reset()
} = useBouquetStore();
```

---

## 🌐 API Endpoints

### Flowers
```javascript
fetchFlowers()           // GET /flowers
fetchAllFlowers()        // GET /flowers?all=1
createFlower(data)       // POST /flowers
updateFlower(id, data)   // PUT /flowers/:id
deleteFlower(id)         // DELETE /flowers/:id
```

### Customizations
```javascript
fetchCustomizations()              // GET /customizations
createCustomization(data)          // POST /customizations
updateCustomization(id, data)      // PUT /customizations/:id
deleteCustomization(id)            // DELETE /customizations/:id
```

### Settings
```javascript
fetchSettings()         // GET /admin/settings
updateSettings(data)    // PUT /admin/settings
```

### Orders
```javascript
createOrder(data)       // POST /orders
fetchOrders()           // GET /orders
```

### Auth
```javascript
adminLogin(credentials) // POST /auth/login
```

---

## 🐛 Quick Troubleshooting

### "Cannot find module..."
→ Check import path, ensure file exists

### "API not responding"
→ Start backend server: `cd server && npm run dev`

### "State not updating"
→ Use store actions, don't mutate state directly

### "Form validation failing"
→ Check field names match Zod schema in Checkout.jsx

### "Pricing showing $0"
→ Ensure settings object is loaded from API

### "Components not rendering"
→ Check console for errors, verify imports

---

## 📖 Documentation Files

- **ARCHITECTURE.md** - Deep technical dive
- **README.md** - Complete user guide
- **CONNECTIONS.md** - Visual diagrams
- **SUMMARY.md** - Integration overview
- **QUICK_REFERENCE.md** - This file!

---

## 💡 Pro Tips

1. **Always start with the docs** - Read ARCHITECTURE.md first
2. **Use the store** - Don't pass props through 5 levels
3. **Check console** - Errors will guide you
4. **Test incrementally** - Change one thing at a time
5. **Use React DevTools** - Inspect component state
6. **Check Network tab** - Debug API calls
7. **Read error messages** - They're usually helpful

---

## 🎨 Styling Quick Ref

### Colors
- Pink: `pink-500`, `pink-600`, `rose-500`
- Background: `from-[#14030a] via-[#2b0b1b] to-[#4a1430]`
- Text: `slate-700`, `slate-900`

### Common Classes
```jsx
// Glass card
bg-white/20 border border-white/30 backdrop-blur-xl rounded-2xl

// Button (active)
bg-pink-500 text-white border-pink-400 shadow-lg

// Button (inactive)
bg-white/70 text-slate-700 border-white/60 hover:bg-white

// Input
w-full px-4 py-2 rounded-xl bg-white/80
```

---

## 🔥 Most Common Operations

### 1. Add a new flower type
→ Admin Dashboard → Flowers → Add New

### 2. Change pricing logic
→ Edit `utils/pricing.js`

### 3. Add new customization option
→ Admin Dashboard → Customizations → Add New

### 4. Modify form fields
→ Edit `pages/Checkout.jsx` + Zod schema

### 5. Change step flow
→ Edit `pages/BouquetBuilder.jsx`

---

**Need more help?** Read the full documentation in the other .md files! 📚

# Customisation Module - File Structure & Connections

## Overview
The customisation module is a complete bouquet builder system with multiple pages, components, state management, and API integration.

## Directory Structure

```
src/customisation/
├── index.js                          # Main export file
├── CustomisationApp.jsx              # Root component with navigation
│
├── api/
│   ├── client.js                     # Axios instance with interceptors
│   └── services.js                   # API service functions
│
├── components/
│   ├── BouquetPreview.jsx            # Live preview of selected bouquet
│   ├── FlowerCard.jsx                # Individual flower selection card
│   ├── GlassCard.jsx                 # Reusable glass-morphism card
│   ├── OptionPill.jsx                # Reusable pill button
│   ├── PriceSummary.jsx              # Price breakdown display
│   ├── SectionHeader.jsx             # Page section headers
│   └── Stepper.jsx                   # Multi-step progress indicator
│
├── pages/
│   ├── BouquetBuilder.jsx            # Main builder with 4 steps
│   ├── Checkout.jsx                  # Checkout form page
│   ├── OrderConfirmation.jsx         # Success page
│   └── AdminDashboard.jsx            # Admin management
│
├── store/
│   └── useBouquetStore.js            # Zustand state management
│
└── utils/
    └── pricing.js                    # Price calculation utilities

```

## How Files Are Connected

### 1. Entry Point (App.jsx → CustomisationApp)
```jsx
// src/App.jsx
import { CustomisationApp } from "./customisation";

// When user clicks "CUSTOMIZE" in navbar:
case "customize":
  return <CustomisationApp />;
```

### 2. CustomisationApp.jsx (Root Component)
**Imports:**
- Pages: `BouquetBuilder`, `Checkout`, `OrderConfirmation`, `AdminDashboard`
- API Services: `fetchFlowers`, `fetchCustomizations`, `fetchSettings`
- External: `react-hot-toast` for notifications

**State Management:**
- `view`: Controls which page to show (builder/checkout/confirmation/admin)
- `flowers`, `customizations`, `settings`: Data from API

**Navigation Flow:**
```
Builder → Checkout → Order Confirmation
         ↓
       Admin (separate)
```

### 3. BouquetBuilder.jsx (Main Building Page)
**Imports:**
- **Components:** `GlassCard`, `SectionHeader`, `Stepper`, `FlowerCard`, `OptionPill`, `PriceSummary`, `BouquetPreview`
- **Store:** `useBouquetStore` (Zustand)
- **Utils:** `computePricing`, `estimateDelivery`
- **API:** `fetchFlowers`, `fetchCustomizations`, `fetchSettings`

**4-Step Flow:**
1. **Step 1:** Quantity selection (5, 7, 9, or custom)
2. **Step 2:** Flower selection (FlowerCard components)
3. **Step 3:** Wrapping & add-ons (OptionPill components)
4. **Step 4:** Preview & checkout (BouquetPreview component)

### 4. State Management (useBouquetStore.js)
**Uses Zustand for global state:**
```javascript
{
  step: 1,                    // Current builder step
  selection: {
    quantity: 7,              // Number of flowers
    flowers: {},              // { flowerId: stemCount }
    customizations: {},       // { category: option }
    notes: ''                 // Customer notes
  }
}
```

**Actions:**
- `setStep(step)` - Navigate between steps
- `setQuantity(qty)` - Set flower quantity
- `setFlowerStem(id, stems)` - Add/remove flower stems
- `toggleCustomization(cat, opt)` - Select wrapping/add-ons
- `setNotes(notes)` - Add customer notes
- `reset()` - Clear selection

### 5. Components Integration

#### GlassCard.jsx
- **Used by:** All pages and components
- **Purpose:** Provides glassmorphism styling
- **Props:** `className`, `children`

#### FlowerCard.jsx
- **Used by:** BouquetBuilder (Step 2)
- **Purpose:** Display individual flower with +/- controls
- **Props:** `flower`, `stems`, `onChange`
- **Connects to:** `useBouquetStore.setFlowerStem()`

#### OptionPill.jsx
- **Used by:** BouquetBuilder (Steps 1 & 3)
- **Purpose:** Selectable pill button
- **Props:** `label`, `active`, `onClick`

#### PriceSummary.jsx
- **Used by:** BouquetBuilder, Checkout
- **Purpose:** Display price breakdown
- **Props:** `pricing`, `deliveryDays`
- **Connects to:** `utils/pricing.js`

#### BouquetPreview.jsx
- **Used by:** BouquetBuilder (Step 4)
- **Purpose:** Show selected items summary
- **Props:** `selection`, `flowers`, `customizations`

#### Stepper.jsx
- **Used by:** BouquetBuilder
- **Purpose:** Show progress (4 steps)
- **Props:** `step`

#### SectionHeader.jsx
- **Used by:** All pages
- **Purpose:** Consistent page headers
- **Props:** `title`, `subtitle`

### 6. Checkout.jsx
**Imports:**
- **Components:** `GlassCard`, `PriceSummary`
- **Store:** `useBouquetStore`
- **Utils:** `computePricing`, `estimateDelivery`
- **API:** `createOrder`
- **Form:** `react-hook-form` + `zod` validation

**Form Fields:**
- name, phone, email, address, locationCode

**Flow:**
1. Display price summary (reuses PriceSummary component)
2. Collect customer info
3. Submit order via API
4. Navigate to confirmation page

### 7. OrderConfirmation.jsx
- Simple success message
- Button to start new order (calls `onNewOrder()`)

### 8. API Layer

#### client.js
```javascript
// Creates axios instance
- Base URL: env.VITE_API_URL || 'http://localhost:5000/api'
- Interceptor: Adds admin token from localStorage
```

#### services.js
**All API functions:**
- **Flowers:** `fetchFlowers`, `createFlower`, `updateFlower`, `deleteFlower`
- **Customizations:** `fetchCustomizations`, `createCustomization`, etc.
- **Settings:** `fetchSettings`, `updateSettings`
- **Orders:** `createOrder`, `fetchOrders`
- **Auth:** `adminLogin`

### 9. Utils Layer

#### pricing.js
**Functions:**

1. **computePricing({ selection, flowers, customizations, settings })**
   - Calculates base price (flowers × pricePerStem)
   - Adds customization prices
   - Applies tax (from settings)
   - Adds delivery fee
   - Returns: `{ base, addOns, tax, delivery, total }`

2. **estimateDelivery({ quantity, settings })**
   - Base days + (quantity × perStemDays)
   - Returns estimated delivery days

## Data Flow Example

### Adding a Flower:
```
User clicks "+" on Rose card
  ↓
FlowerCard.onChange(stems + 1)
  ↓
useBouquetStore.setFlowerStem(roseId, 3)
  ↓
Store updates: selection.flowers[roseId] = 3
  ↓
PriceSummary recomputes (useMemo)
  ↓
computePricing calculates new total
  ↓
UI updates with new price
```

### Checkout Flow:
```
User clicks "Proceed to Checkout"
  ↓
CustomisationApp.setView('checkout')
  ↓
Checkout component reads:
  - useBouquetStore.selection
  - pricing from computePricing()
  ↓
User fills form
  ↓
Form submits → createOrder(API)
  ↓
Success → setView('confirmation')
```

## Key Features

1. **State Management:** Zustand for global selection state
2. **Form Validation:** Zod + React Hook Form
3. **API Integration:** Axios with interceptors
4. **Notifications:** react-hot-toast
5. **Animations:** Framer Motion
6. **Styling:** TailwindCSS + Glassmorphism
7. **Type Safety:** Zod schemas

## Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Module
1. Ensure backend server is running
2. Click "CUSTOMIZE" in navbar
3. Navigate through 4-step builder
4. Complete checkout
5. View confirmation

---

## Future Enhancements
- Add image upload for flowers
- Real-time stock updates
- Payment gateway integration
- Email notifications
- Order tracking

# 🌸 Customisation Module - Visual Connection Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.jsx (Main)                          │
│                                                                 │
│  ┌──────────────┐         currentPage State                    │
│  │   Navbar     │────────►["home" | "customize"]               │
│  └──────────────┘                                               │
│         │                                                       │
│         └─────────► When "customize" clicked                   │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│              CustomisationApp.jsx (Root)                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  State: view = "builder" | "checkout" | "confirmation"  │  │
│  │         flowers[], customizations[], settings{}         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────┐   ┌──────────┐   ┌────────────────┐            │
│  │ Builder  │──►│ Checkout │──►│ Confirmation   │            │
│  └──────────┘   └──────────┘   └────────────────┘            │
│       │                                                         │
│       └────────► Fetches data from API                         │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                  BouquetBuilder.jsx                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │          useBouquetStore (Zustand)                      │  │
│  │  ┌────────────────────────────────────────────────┐    │  │
│  │  │ step: 1-4                                      │    │  │
│  │  │ selection: {                                   │    │  │
│  │  │   quantity: 7,                                 │    │  │
│  │  │   flowers: { flowerId: stemCount },            │    │  │
│  │  │   customizations: { category: option }         │    │  │
│  │  │ }                                              │    │  │
│  │  └────────────────────────────────────────────────┘    │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐                        │
│  │   Step 1     │────►│ OptionPill   │  (Quantity)            │
│  │   Quantity   │     │ Component    │                        │
│  └──────────────┘     └──────────────┘                        │
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐                        │
│  │   Step 2     │────►│ FlowerCard   │  (Pick Flowers)        │
│  │   Flowers    │     │ Component    │                        │
│  └──────────────┘     └──────────────┘                        │
│         │                     │                                │
│         │                     └──────► useBouquetStore         │
│         │                              .setFlowerStem()        │
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐                        │
│  │   Step 3     │────►│ OptionPill   │  (Wrapping)            │
│  │   Wrap       │     │ Component    │                        │
│  └──────────────┘     └──────────────┘                        │
│         │                                                       │
│         └──────► useBouquetStore.toggleCustomization()        │
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐                        │
│  │   Step 4     │────►│ BouquetPreview│ (Review)              │
│  │   Preview    │     │ Component     │                        │
│  └──────────────┘     └──────────────┘                        │
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐                        │
│  │  Sidebar     │────►│ PriceSummary │                        │
│  │              │     │ Component    │                        │
│  │              │     └──────────────┘                        │
│  │              │            │                                 │
│  │              │            ▼                                 │
│  │              │     ┌──────────────┐                        │
│  │              │     │  pricing.js  │  (Calculations)        │
│  │              │     └──────────────┘                        │
│  └──────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ▼ Proceed to Checkout
┌─────────────────────────────────────────────────────────────────┐
│                    Checkout.jsx                                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  React Hook Form + Zod Validation                      │  │
│  │  ┌────────────────────────────────────────────────┐    │  │
│  │  │ Fields: name, phone, email, address            │    │  │
│  │  └────────────────────────────────────────────────┘    │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Reads: useBouquetStore.selection                              │
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐                        │
│  │  Form Data   │────►│  API Service │                        │
│  │              │     │  createOrder()│                        │
│  └──────────────┘     └──────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ▼ Success
┌─────────────────────────────────────────────────────────────────┐
│              OrderConfirmation.jsx                              │
│                                                                 │
│  "Your bouquet is on its way!"                                 │
│                                                                 │
│  [Create Another Bouquet] ──► Resets store & returns to Step 1│
└─────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════
                    SUPPORTING SYSTEMS
═══════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│                      API Layer                                  │
│                                                                 │
│  ┌──────────────┐                                               │
│  │  client.js   │  Axios Instance                              │
│  │              │  • Base URL: localhost:5000/api              │
│  │              │  • JWT Interceptor                           │
│  └──────────────┘                                               │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────┐                                               │
│  │ services.js  │  API Functions                               │
│  │              │  • fetchFlowers()                            │
│  │              │  • fetchCustomizations()                     │
│  │              │  • fetchSettings()                           │
│  │              │  • createOrder()                             │
│  │              │  • fetchOrders()                             │
│  │              │  • adminLogin()                              │
│  └──────────────┘                                               │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Backend Server (Express)                       │
│                                                                 │
│  Routes:                                                        │
│  • GET  /api/flowers                                           │
│  • POST /api/flowers                                           │
│  • GET  /api/customizations                                    │
│  • GET  /api/admin/settings                                    │
│  • POST /api/orders                                            │
│  • GET  /api/orders                                            │
└─────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════
                    DATA FLOW EXAMPLE
═══════════════════════════════════════════════════════════════════

USER ACTION: Add 3 Rose stems

    [FlowerCard] User clicks "+" button
          │
          ▼
    onChange(stems + 1) callback
          │
          ▼
    useBouquetStore.setFlowerStem(roseId, 3)
          │
          ▼
    Store updates: selection.flowers[roseId] = 3
          │
          ├──────────────────────────────────┐
          │                                  │
          ▼                                  ▼
    [PriceSummary]                    [BouquetPreview]
    computePricing() recalculates      Shows updated list
          │                                  │
          ▼                                  ▼
    Displays: $68.24                  "Rose × 3"


═══════════════════════════════════════════════════════════════════
                    COMPONENT HIERARCHY
═══════════════════════════════════════════════════════════════════

App.jsx
└── CustomisationApp.jsx
    ├── BouquetBuilder.jsx
    │   ├── Stepper.jsx
    │   ├── SectionHeader.jsx
    │   ├── GlassCard (Step 1)
    │   │   └── OptionPill (multiple)
    │   ├── GlassCard (Step 2)
    │   │   └── FlowerCard (multiple)
    │   ├── GlassCard (Step 3)
    │   │   └── OptionPill (multiple)
    │   ├── BouquetPreview (Step 4)
    │   └── PriceSummary (Sidebar)
    │
    ├── Checkout.jsx
    │   ├── GlassCard (Form)
    │   └── PriceSummary (Sidebar)
    │
    ├── OrderConfirmation.jsx
    │   └── GlassCard (Message)
    │
    └── AdminDashboard.jsx
        └── (Admin components)


═══════════════════════════════════════════════════════════════════
                 SHARED COMPONENTS USAGE
═══════════════════════════════════════════════════════════════════

GlassCard
├── Used in: ALL pages
└── Provides: Glassmorphism styling

FlowerCard
├── Used in: BouquetBuilder (Step 2)
└── Provides: Flower selection with +/- controls

OptionPill
├── Used in: BouquetBuilder (Steps 1 & 3)
└── Provides: Selectable buttons

PriceSummary
├── Used in: BouquetBuilder, Checkout
└── Provides: Price breakdown display

BouquetPreview
├── Used in: BouquetBuilder (Step 4)
└── Provides: Selection summary

Stepper
├── Used in: BouquetBuilder
└── Provides: Progress indicator (1/2/3/4)

SectionHeader
├── Used in: ALL pages
└── Provides: Consistent page headers


═══════════════════════════════════════════════════════════════════
                    FILE IMPORT PATHS
═══════════════════════════════════════════════════════════════════

// Main app import
import { CustomisationApp } from './customisation'

// Component imports
import { 
  GlassCard, 
  FlowerCard, 
  OptionPill 
} from './customisation/components'

// Page imports
import { 
  BouquetBuilder, 
  Checkout 
} from './customisation/pages'

// Store import
import { useBouquetStore } from './customisation/store/useBouquetStore'

// API imports
import { 
  fetchFlowers, 
  createOrder 
} from './customisation/api/services'

// Utils import
import { 
  computePricing, 
  estimateDelivery 
} from './customisation/utils/pricing'
```

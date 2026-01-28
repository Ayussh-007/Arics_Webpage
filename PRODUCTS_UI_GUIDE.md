# 🎨 Products UI Component Guide

This guide provides a visual reference for all UI components used in the Products feature.

---

## 📦 ProductCard Component

### Basic Structure
```
┌─────────────────────────────────────┐
│  [Offer Badge]          [Featured]  │ ← Top Badges (absolute)
│                                     │
│                                     │
│         Product Image               │ ← Image Section (h-80)
│        (hover: scale)               │
│                                     │
│    [Eye] [Edit] (hover overlay)    │ ← Quick Actions (on hover)
│                                     │
├─────────────────────────────────────┤
│  [Category Tag]                     │ ← Category Badge
│                                     │
│  Product Name (2xl, bold)          │ ← Product Name
│                                     │
│  Short description here...          │ ← Description (2 lines)
│  Second line truncated...           │
│                                     │
│  $99.99  $129.99  Save $30.00      │ ← Pricing Section
│                                     │
│  [Add to Cart]      [Details]      │ ← Action Buttons
│                                     │
│  Only 5 left in stock!             │ ← Stock Warning (if low)
└─────────────────────────────────────┘

Width: full (responsive grid)
Height: auto (content-based)
Border Radius: rounded-3xl (24px)
Background: bg-white/40 backdrop-blur-xl
Border: border-white/20
Shadow: shadow-lg hover:shadow-2xl
```

### Hover States
```
Card Hover:
  - Transform: translateY(-8px) scale(1.02)
  - Shadow: shadow-2xl
  - Border glow: border-pink-400/30

Image Hover:
  - Transform: scale(1.1)
  - Overlay: gradient from-black/60 to-transparent
  - Duration: 600ms

Quick Actions:
  - Initial: opacity-0
  - Hover: opacity-100
  - Buttons appear with fade-in
  - Individual button hover: scale(1.1) rotate(5deg)
```

### Badge Positions
```
Top-Right: Offer Badge
  - Background: gradient from-pink-500 to-rose-500
  - Text: white, Cinzel font
  - Position: top-4 right-4
  - Example: "20% OFF", "Valentine's Special"

Top-Left: Stock/Featured Badge
  - Out of Stock: bg-gray-900/80
  - Featured: gradient from-purple-500 to-pink-500
  - Position: top-4 left-4
```

### Pricing Display
```
Discounted Price:
  $99.99 (3xl, bold, text-gray-900)

Original Price (if discounted):
  $129.99 (lg, line-through, text-gray-400)

Savings Badge:
  Save $30.00 (sm, text-rose-500, bg-rose-50, rounded-full)
```

---

## 🔍 Search & Filter Bar

### Layout
```
┌──────────────────────────────────────────────────────────────┐
│ Glassmorphic Container (bg-white/40, backdrop-blur-xl)      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [🔍 Search products...]  [Category ▼]  [Sort By ▼] [Offers]│
│                                                              │
│     40%                      25%          25%       10%      │
└──────────────────────────────────────────────────────────────┘

Grid: grid-cols-1 md:grid-cols-12 gap-4
Border Radius: rounded-3xl (24px)
Padding: p-6
```

### Search Input
```
┌─────────────────────────────────────┐
│ 🔍  Search products...             │
└─────────────────────────────────────┘

- Icon: Magnifying glass (left-4)
- Padding: px-6 py-3 pl-12
- Background: bg-white/60 backdrop-blur-sm
- Border: border-gray-200
- Rounded: rounded-full
- Focus: ring-2 ring-pink-400
- Font: Montserrat
```

### Dropdowns (Category & Sort)
```
┌─────────────────────────────────────┐
│ All Products                     ▼ │
└─────────────────────────────────────┘

Style:
- Same as search (but no icon)
- Cursor: cursor-pointer
- Native select element
- Options styled in modal
```

### Offers Toggle Button
```
Inactive:
┌─────────┐
│ Offers  │
└─────────┘
bg-white/60, text-gray-700, border

Active:
┌─────────┐
│ ✓Offers │
└─────────┘
gradient from-pink-400 to-rose-400, text-white
```

---

## 📊 Admin Dashboard Table

### Table Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ Table Header (gradient from-pink-400 to-rose-400, text-white)      │
├──────┬────────────┬──────────┬───────┬───────┬────────┬───────────┤
│Image │ Product    │ Category │ Price │ Stock │ Status │ Actions   │
├──────┼────────────┼──────────┼───────┼───────┼────────┼───────────┤
│ 🖼️  │ Product 1  │ Bouquet  │$99.99 │ 25   │[Active]│ [✏️] [🗑️] │
│ 64px │ Bold name  │ Pink tag │ Bold  │ Green│ Button │ Icons     │
│      │ Description│          │ Strike│ Badge│        │           │
│      │ ⭐Featured │          │       │      │        │           │
├──────┼────────────┼──────────┼───────┼───────┼────────┼───────────┤
│ ... more rows ...                                                  │
└─────────────────────────────────────────────────────────────────────┘

Container:
- bg-white/40 backdrop-blur-xl
- rounded-3xl
- border-white/20
- overflow-hidden
```

### Table Cells

**Image Cell:**
```
[🖼️ Image]
- Size: 64x64px
- rounded-xl
- object-cover
- shadow-md
```

**Product Cell:**
```
Product Name          ← Playfair Display, bold, gray-900
Short description...  ← Cormorant Garamond, gray-600, line-clamp-1
⭐ Featured          ← Badge if featured (purple-100, purple-700)
```

**Category Cell:**
```
┌───────────┐
│ BOUQUET   │
└───────────┘
- Uppercase
- Pink-100 background
- Pink-700 text
- rounded-full
- px-3 py-1
```

**Price Cell:**
```
$99.99              ← Bold, gray-900, Montserrat
$129.99             ← line-through, gray-400 (if discounted)
```

**Stock Cell:**
```
Status badges:
┌──────────────┐
│ 25 in stock  │  ← Green (stock > 5)
└──────────────┘

┌──────────────┐
│ 3 in stock   │  ← Orange (stock ≤ 5)
└──────────────┘

┌──────────────┐
│ 0 in stock   │  ← Red (stock = 0)
└──────────────┘
```

**Status Cell:**
```
Active Button:
┌────────┐
│ Active │  ← Green-100 bg, green-700 text
└────────┘

Inactive Button:
┌──────────┐
│ Inactive │  ← Gray-100 bg, gray-700 text
└──────────┘

Click to toggle
```

**Actions Cell:**
```
[✏️] [🗑️]
Edit  Delete

Edit Button:
- Blue-100 bg
- Blue-700 text
- p-2 rounded-lg
- Hover: scale(1.1)

Delete Button:
- Red-100 bg
- Red-700 text
- p-2 rounded-lg
- Hover: scale(1.1)
```

---

## 📝 Product Form Modal

### Structure
```
┌────────────────────────────────────────────┐
│ Overlay (bg-black/50, backdrop-blur-sm)   │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Header (gradient pink to rose)       │ │
│  │ Add New Product / Edit Product       │ │
│  │ Fill in the details below            │ │
│  ├──────────────────────────────────────┤ │
│  │                                      │ │
│  │ Form Fields (scrollable)             │ │
│  │                                      │ │
│  │ [Product Name *]                     │ │
│  │ ├─────────────────────────────────┤ │ │
│  │                                      │ │
│  │ [Description *] (200 char limit)     │ │
│  │ ├─────────────────────────────────┤ │ │
│  │ │                                  │ │ │
│  │ └─────────────────────────────────┘ │ │
│  │ Character count: 45/200              │ │
│  │                                      │ │
│  │ [Image URL *]                        │ │
│  │ ├─────────────────────────────────┤ │ │
│  │ [Image Preview]                      │ │
│  │                                      │ │
│  │ [Original Price *] [Discounted $]   │ │
│  │ ├──────────┤  ├──────────┤         │ │
│  │                                      │ │
│  │ [Category *] [Stock *]               │ │
│  │ ├──────────┤  ├──────────┤         │ │
│  │                                      │ │
│  │ [Offer Badge (Optional)]             │ │
│  │ ├─────────────────────────────────┤ │ │
│  │                                      │ │
│  │ [Tags (comma-separated)]             │ │
│  │ ├─────────────────────────────────┤ │ │
│  │                                      │ │
│  │ ☐ Active    ☐ Featured              │ │
│  │                                      │ │
│  │ [Cancel]            [Add Product]    │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘

Modal Size: max-w-3xl
Max Height: max-h-[90vh]
Overflow: overflow-y-auto
```

### Form Fields

**Text Input:**
```
Label:
Product Name *    ← Montserrat, semibold, gray-700, mb-2

Input:
┌─────────────────────────────────────┐
│ e.g., Valentine's Rose Bouquet     │
└─────────────────────────────────────┘

Style:
- px-4 py-3
- rounded-xl
- border-gray-300
- Cormorant Garamond font (name/description)
- Montserrat font (other fields)
- Focus: ring-2 ring-pink-400

Error State:
┌─────────────────────────────────────┐
│ Invalid input                       │ ← border-red-500
└─────────────────────────────────────┘
⚠️ This field is required              ← text-red-500, xs
```

**Textarea (Description):**
```
┌─────────────────────────────────────┐
│ A beautiful arrangement of...      │
│                                     │
│                                     │
└─────────────────────────────────────┘
Character count: 45/200

- rows: 3
- maxLength: 200
- resize-none
- Character counter bottom-right
```

**Image Preview:**
```
┌──────────┐
│          │
│  Image   │  ← 128x128px, rounded-xl
│  Preview │     object-cover, border-2
│          │
└──────────┘

Error Fallback:
┌──────────┐
│ Invalid  │
│  Image   │
└──────────┘
```

**Number Inputs (Price, Stock):**
```
┌──────────┐
│   99.99  │
└──────────┘

- type: number
- step: 0.01 (price) or 1 (stock)
- min: 0
- Montserrat font
```

**Select (Category):**
```
┌─────────────────────────────────────┐
│ Bouquet                          ▼ │
└─────────────────────────────────────┘

Options:
- Bouquet
- Arrangement
- Plant
- Gift
- Subscription
```

**Checkboxes:**
```
☐ Active      ☐ Featured

- w-5 h-5
- rounded
- text-pink-500
- focus:ring-pink-400
- Montserrat label, gray-700, font-medium
```

**Action Buttons:**
```
[Cancel]                [Add Product]
Gray button            Pink gradient button

Cancel:
- bg-gray-200 hover:bg-gray-300
- text-gray-700
- Montserrat semibold
- px-6 py-3, rounded-xl

Submit:
- gradient from-pink-400 to-rose-400
- hover: from-pink-500 to-rose-500
- text-white
- Cinzel semibold
- px-6 py-3, rounded-xl
- shadow-lg
- Disabled state: opacity-50
```

---

## 📈 Statistics Cards (Admin Dashboard)

### Card Structure
```
┌─────────────────┐
│       📦        │  ← Icon (3xl emoji)
│       12        │  ← Value (3xl, Playfair Display, bold)
│ Total Products  │  ← Label (sm, Montserrat, gray-600)
└─────────────────┘

Style:
- bg-white/40 backdrop-blur-xl
- rounded-2xl
- p-6
- border-white/20
- shadow-lg
- text-center
- Hover: scale(1.05)

Grid: grid-cols-2 md:grid-cols-4 gap-4
```

### Stat Types
```
📦 Total Products     ← Blue icon
✅ Active            ← Green icon
⚠️ Out of Stock      ← Orange icon
⭐ Featured          ← Purple icon
```

---

## 🎭 Animation Reference

### Page Entrance
```javascript
Header:
  initial: { opacity: 0, y: -20 }
  animate: { opacity: 1, y: 0 }
  duration: 0.6s

Filter Bar:
  delay: 0.8s
  duration: 0.6s

Products Grid:
  Products appear with stagger:
  - Product 1: delay 0s
  - Product 2: delay 0.1s
  - Product 3: delay 0.2s
  - ...

Each Product:
  initial: { opacity: 0, y: 20 }
  animate: { opacity: 1, y: 0 }
```

### Card Hover
```javascript
Card:
  whileHover: { 
    y: -8,
    scale: 1.02,
    transition: { duration: 0.5 }
  }

Image:
  whileHover: { 
    scale: 1.1,
    transition: { duration: 0.6 }
  }

Quick Action Buttons:
  whileHover: { 
    scale: 1.1,
    rotate: 5 (or -5)
  }
  whileTap: { 
    scale: 0.95 
  }
```

### Modal Animation
```javascript
Backdrop:
  initial: { opacity: 0 }
  animate: { opacity: 1 }
  exit: { opacity: 0 }

Modal:
  initial: { scale: 0.9, y: 20 }
  animate: { scale: 1, y: 0 }
  exit: { scale: 0.9, y: 20 }
```

### Loading Spinner
```javascript
Spinner:
  animate: { rotate: 360 }
  transition: { 
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }

Style:
- w-16 h-16
- border-4 border-pink-400
- border-t-transparent
- rounded-full
```

---

## 🎨 Color Palette

### Primary Colors
```css
/* Pink Gradient */
from-pink-400 to-rose-400
#f9a8d4 → #fb7185

/* Hover State */
from-pink-500 to-rose-500
#ec4899 → #f43f5e

/* Background Gradient */
from-rose-50 via-pink-50 to-purple-50
#fff1f2 → #fdf2f8 → #faf5ff
```

### Text Colors
```css
Headings:    #111827 (gray-900)
Body:        #4b5563 (gray-600)
             #374151 (gray-700)
Secondary:   #9ca3af (gray-400)
Accent:      #db2777 (pink-600)
             #fb7185 (rose-400)
```

### Glassmorphism
```css
/* Card Background */
background: rgba(255, 255, 255, 0.4)
backdrop-filter: blur(16px)
border: 1px solid rgba(255, 255, 255, 0.2)

/* Darker Variant (Navbar on scroll) */
background: rgba(255, 255, 255, 0.95)
backdrop-filter: blur(12px)
```

### Status Colors
```css
Success (Active):
  bg-green-100, text-green-700

Warning (Low Stock):
  bg-orange-100, text-orange-700

Error (Out of Stock):
  bg-red-100, text-red-700

Info (Featured):
  bg-purple-100, text-purple-700
```

---

## 📐 Spacing System

### Container Padding
```css
Desktop:  px-12 (3rem / 48px)
Mobile:   px-6  (1.5rem / 24px)

Max Width: max-w-7xl (80rem / 1280px)
Centering: mx-auto
```

### Grid Gaps
```css
Product Grid:  gap-8  (2rem / 32px)
Form Grid:     gap-4  (1rem / 16px)
Stats Grid:    gap-4  (1rem / 16px)
```

### Section Spacing
```css
Page Top Padding:     py-20  (5rem / 80px)
Section Bottom:       mb-16  (4rem / 64px)
Between Elements:     mb-8   (2rem / 32px)
Between Form Fields:  mb-6   (1.5rem / 24px)
```

### Border Radius
```css
Cards:        rounded-3xl (24px)
Buttons:      rounded-full (9999px)
Badges:       rounded-full (9999px)
Inputs:       rounded-xl (12px)
Images:       rounded-xl (12px)
Small Pills:  rounded-full (9999px)
```

---

## 🔤 Typography Scale

### Font Families
```css
font-['Playfair_Display']    → Headings
font-['Cormorant_Garamond']  → Descriptions, elegant text
font-['Montserrat']           → Body, UI elements
font-['Cinzel']               → Buttons, labels (uppercase)
font-['Italiana']             → Logo
```

### Size Scale
```css
/* Product Card */
Product Name:     text-2xl   (1.5rem / 24px)
Description:      text-base  (1rem / 16px)
Price (main):     text-3xl   (1.875rem / 30px)
Price (original): text-lg    (1.125rem / 18px)
Badge:            text-xs    (0.75rem / 12px)
Button:           text-sm    (0.875rem / 14px)

/* Page Headings */
Main Title:       text-7xl   (4.5rem / 72px)
Subtitle:         text-2xl   (1.5rem / 24px)

/* Admin Table */
Header:           text-sm    (0.875rem / 14px)
Cell Text:        text-base  (1rem / 16px)
```

### Font Weights
```css
Headings:     font-bold      (700)
Buttons:      font-semibold  (600)
Body:         font-normal    (400)
Labels:       font-medium    (500)
Light:        font-light     (300)
```

---

## 📱 Responsive Breakpoints

### Grid Columns
```css
Mobile (default):
  grid-cols-1

Tablet (md: 768px):
  md:grid-cols-2

Desktop (lg: 1024px):
  lg:grid-cols-3
```

### Filter Bar Layout
```css
Mobile (default):
  grid-cols-1
  Each filter stacks vertically

Desktop (md: 768px):
  md:grid-cols-12
  [Search: 5] [Category: 3] [Sort: 3] [Offers: 1]
```

### Text Sizes (Responsive)
```css
Main Heading:
  text-5xl md:text-6xl lg:text-7xl

Subtitle:
  text-xl md:text-2xl

Product Name:
  text-2xl (same across devices)
```

---

## 🎯 Accessibility

### Focus States
```css
All Interactive Elements:
  focus:outline-none
  focus:ring-2
  focus:ring-pink-400
  focus:border-transparent
```

### Color Contrast
```css
Text on White BG:
  ✓ gray-900 (21:1 ratio)
  ✓ gray-700 (12:1 ratio)
  ✓ gray-600 (8:1 ratio)

Text on Pink Gradient:
  ✓ white (4.5:1+ ratio)
```

### Interactive Elements
```css
Minimum Touch Target: 44x44px (all buttons)
Hover Feedback: All buttons show hover state
Active Feedback: All buttons show active state
Disabled State: opacity-50 + cursor-not-allowed
```

---

This completes the visual component reference! 🎨

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Cart item shape
// {
//   id: string,            // unique key in cart
//   type: 'product'|'custom',
//   refId?: string,        // product _id or custom design id
//   name: string,
//   price: number,         // unit price
//   quantity: number,
//   image?: string,
//   meta?: object          // any extra info
// }

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items.slice()
        // Merge by id when same type+refId+metaKey if provided
        const key = item.id
        const idx = items.findIndex((x) => x.id === key)
        if (idx >= 0) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + (item.quantity || 1) }
        } else {
          items.push({ ...item, quantity: item.quantity || 1 })
        }
        set({ items })
      },
      removeItem: (id) => set({ items: get().items.filter((x) => x.id !== id) }),
      updateQty: (id, qty) => {
        const q = Math.max(1, Number(qty || 1))
        set({ items: get().items.map((x) => (x.id === id ? { ...x, quantity: q } : x)) })
      },
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((sum, x) => sum + x.price * x.quantity, 0),
      count: () => get().items.reduce((sum, x) => sum + x.quantity, 0),
    }),
    { name: 'arics_cart_v1' },
  ),
)
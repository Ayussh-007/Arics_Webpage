import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (product) => {
        const { items } = get()
        if (!items.find(item => item._id === product._id)) {
          set({ items: [...items, product] })
          return true
        }
        return false
      },
      
      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item._id !== productId)
        }))
      },
      
      isInWishlist: (productId) => {
        const { items } = get()
        return items.some(item => item._id === productId)
      },
      
      toggleWishlist: (product) => {
        const { isInWishlist, addToWishlist, removeFromWishlist } = get()
        if (isInWishlist(product._id)) {
          removeFromWishlist(product._id)
          return false
        } else {
          addToWishlist(product)
          return true
        }
      },
      
      clearWishlist: () => set({ items: [] }),
      
      getWishlistCount: () => get().items.length
    }),
    {
      name: 'arics-wishlist-storage',
    }
  )
)

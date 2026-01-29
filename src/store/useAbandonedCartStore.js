import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAbandonedCartStore = create(
  persist(
    (set, get) => ({
      abandonedCarts: [],
      
      // Track when cart was last modified
      lastCartUpdate: null,
      
      // User email for cart recovery
      userEmail: null,
      
      // Update timestamp when cart changes
      updateCartTimestamp: () => {
        set({ lastCartUpdate: new Date().toISOString() })
      },
      
      // Set user email for recovery
      setUserEmail: (email) => {
        set({ userEmail: email })
      },
      
      // Save current cart state for recovery
      saveAbandonedCart: (cartItems, totalAmount) => {
        const { userEmail } = get()
        
        if (!userEmail || cartItems.length === 0) return
        
        const abandonedCart = {
          id: Date.now().toString(),
          email: userEmail,
          items: cartItems,
          totalAmount,
          createdAt: new Date().toISOString(),
          remindersSent: [],
          recovered: false,
        }
        
        set((state) => ({
          abandonedCarts: [...state.abandonedCarts, abandonedCart]
        }))
        
        return abandonedCart
      },
      
      // Mark cart as recovered
      recoverCart: (cartId) => {
        set((state) => ({
          abandonedCarts: state.abandonedCarts.map(cart =>
            cart.id === cartId ? { ...cart, recovered: true } : cart
          )
        }))
      },
      
      // Get carts that need reminders
      getCartsNeedingReminders: () => {
        const { abandonedCarts } = get()
        const now = new Date()
        
        return abandonedCarts.filter(cart => {
          if (cart.recovered) return false
          
          const cartAge = (now - new Date(cart.createdAt)) / (1000 * 60 * 60) // hours
          const reminderCount = cart.remindersSent.length
          
          // Send reminders at 1hr, 24hr, 72hr
          if (cartAge >= 1 && reminderCount === 0) return true
          if (cartAge >= 24 && reminderCount === 1) return true
          if (cartAge >= 72 && reminderCount === 2) return true
          
          return false
        })
      },
      
      // Mark reminder as sent
      markReminderSent: (cartId, reminderType) => {
        set((state) => ({
          abandonedCarts: state.abandonedCarts.map(cart =>
            cart.id === cartId
              ? {
                  ...cart,
                  remindersSent: [
                    ...cart.remindersSent,
                    {
                      type: reminderType,
                      sentAt: new Date().toISOString()
                    }
                  ]
                }
              : cart
          )
        }))
      },
      
      // Get recovery analytics
      getRecoveryStats: () => {
        const { abandonedCarts } = get()
        
        return {
          total: abandonedCarts.length,
          recovered: abandonedCarts.filter(c => c.recovered).length,
          pending: abandonedCarts.filter(c => !c.recovered).length,
          recoveryRate: abandonedCarts.length > 0
            ? (abandonedCarts.filter(c => c.recovered).length / abandonedCarts.length * 100).toFixed(1)
            : 0
        }
      }
    }),
    {
      name: 'arics-abandoned-cart-storage',
    }
  )
)

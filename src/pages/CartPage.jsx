import React from 'react'
import { motion } from 'framer-motion'
import { useCartStore } from '../store/useCartStore'

const CartPage = ({ onCheckout }) => {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQty = useCartStore((s) => s.updateQty)
  const subtotal = useCartStore((s) => s.subtotal())

  const hasItems = items.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20 px-6 lg:px-12">
      <motion.div
        className="max-w-4xl mx-auto mb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-gray-900">Your Cart</h1>
        <p className="text-gray-600 font-['Cormorant_Garamond'] text-lg">Review items and proceed to final checkout</p>
      </motion.div>

      {!hasItems ? (
        <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-10 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-pink-800 font-['Cormorant_Garamond'] text-xl">Your cart is empty.</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-6">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white/70 border border-white/40 rounded-2xl p-4 flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-rose-50" onError={(e)=>{e.currentTarget.style.opacity=0}} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest font-['Cinzel'] text-rose-700">{item.type === 'custom' ? 'Custom Bouquet' : 'Product'}</span>
                  </div>
                  <div className="font-['Playfair_Display'] text-xl text-gray-900 truncate">{item.name}</div>
                  <div className="text-sm text-pink-800 font-['Montserrat']">₹{(item.price).toFixed(2)} each</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    className="w-16 px-2 py-2 rounded-lg border border-pink-200 text-pink-900 bg-white"
                  />
                  <button
                    className="px-3 py-2 rounded-lg bg-white/70 border border-rose-200 text-rose-700 text-sm font-['Cinzel']"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="bg-white/70 border border-white/40 rounded-2xl p-5">
              <div className="flex justify-between text-pink-900 font-['Montserrat'] text-base">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-2 text-xs text-pink-800">Taxes and delivery calculated at checkout.</p>
              <button
                disabled={!hasItems}
                onClick={onCheckout}
                className="mt-4 w-full px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-['Cinzel'] tracking-widest text-sm shadow hover:shadow-lg disabled:opacity-60"
              >
                Final Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
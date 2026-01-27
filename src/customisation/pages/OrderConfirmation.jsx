import React from 'react'
import GlassCard from '../components/GlassCard'

const OrderConfirmation = ({ onNewOrder }) => {
  return (
    <GlassCard className="p-10 text-center space-y-4">
      <h3 className="text-3xl font-['Playfair_Display'] text-slate-900">
        Your bouquet is on its way
      </h3>
      <p className="text-slate-600">
        A confirmation email has been sent. We’ll start arranging your luxury bouquet now.
      </p>
      <button
        onClick={onNewOrder}
        className="px-6 py-3 rounded-full bg-pink-600 text-white shadow-lg"
      >
        Create another bouquet
      </button>
    </GlassCard>
  )
}

export default OrderConfirmation

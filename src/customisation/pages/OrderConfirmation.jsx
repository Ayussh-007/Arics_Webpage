import React from 'react'
import GlassCard from '../components/GlassCard'

const OrderConfirmation = ({ onNewOrder }) => {
  return (
    <GlassCard className="p-10 text-center space-y-4">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-3xl font-['Italiana'] text-pink-700">
        Your bouquet is on its way
      </h3>
      <p className="text-pink-800">
        A confirmation email has been sent. We'll start arranging your luxury bouquet now.
      </p>
      <button
        onClick={onNewOrder}
        className="px-6 py-3 rounded-full bg-pink-600 text-white shadow-lg font-['Cinzel'] text-sm tracking-wider hover:bg-pink-700 transition-colors"
      >
        Create another bouquet
      </button>
    </GlassCard>
  )
}

export default OrderConfirmation

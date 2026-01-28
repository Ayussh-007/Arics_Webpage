import React from 'react'
import GlassCard from '../components/GlassCard'

const OrderConfirmation = ({ onNewOrder }) => {
  return (
    <GlassCard className="p-6 sm:p-10 text-center space-y-4">
      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-pink-100 flex items-center justify-center">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl sm:text-3xl font-['Italiana'] text-pink-700">
        Your bouquet is on its way
      </h3>
      <p className="text-sm sm:text-base text-pink-800">
        A confirmation email has been sent. We'll start arranging your luxury bouquet now.
      </p>
      <button
        onClick={onNewOrder}
        className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-pink-600 text-white shadow-lg font-['Cinzel'] tracking-wider hover:bg-pink-700 transition-colors"
      >
        Create another bouquet
      </button>
    </GlassCard>
  )
}

export default OrderConfirmation

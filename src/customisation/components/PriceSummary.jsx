import React from 'react'
import GlassCard from './GlassCard'

const PriceSummary = ({ pricing, deliveryDays }) => {
  return (
    <GlassCard className="p-6 space-y-4">
      <h3 className="text-xl font-['Italiana'] text-pink-700">Price Summary</h3>
      <div className="space-y-2 text-sm text-pink-800">
        <div className="flex justify-between">
          <span>Base</span>
          <span>₹{pricing.base.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Add-ons</span>
          <span>₹{pricing.addOns.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{pricing.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{pricing.delivery.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-pink-900 pt-2 border-t border-pink-300">
          <span>Total</span>
          <span>₹{pricing.total.toFixed(2)}</span>
        </div>
      </div>
      <div className="text-xs text-pink-600">
        Estimated Delivery: {deliveryDays}–{deliveryDays + 1} days
      </div>
    </GlassCard>
  )
}

export default PriceSummary

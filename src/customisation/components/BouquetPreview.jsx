import React from 'react'
import GlassCard from './GlassCard'

const BouquetPreview = ({ selection, flowers, customizations }) => {
  const selectedFlowers = Object.entries(selection.flowers || {})
    .filter(([, stems]) => stems > 0)
    .map(([id, stems]) => {
      const flower = flowers.find((f) => f._id === id)
      return flower ? { name: flower.name, stems, price: flower.pricePerStem } : null
    })
    .filter(Boolean)

  const selectedCustoms = (customizations || [])
    .map((cat) => {
      const picked = selection.customizations?.[cat.category]
      if (!picked) return null
      if (Array.isArray(picked)) {
        return picked.map(opt => {
          const option = cat.options.find(o => o.name === opt)
          return { category: cat.label, name: opt, price: option?.price || 0 }
        })
      }
      const option = cat.options.find(o => o.name === picked)
      return [{ category: cat.label, name: picked, price: option?.price || 0 }]
    })
    .filter(Boolean)
    .flat()

  const flowerSubtotal = selectedFlowers.reduce((sum, f) => sum + (f.stems * f.price), 0)
  const customsSubtotal = selectedCustoms.reduce((sum, c) => sum + c.price, 0)
  const totalAmount = flowerSubtotal + customsSubtotal

  return (
    <GlassCard className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      <h3 className="text-xl sm:text-2xl font-['Italiana'] text-pink-700 border-b border-pink-200 pb-2">
        Order Summary
      </h3>
      
      {/* Flowers Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-pink-900 font-['Cinzel'] text-sm sm:text-base">
            Flowers ({selection.quantity} total)
          </p>
          <p className="text-sm font-semibold text-pink-800">₹{flowerSubtotal}</p>
        </div>
        {selectedFlowers.length ? (
          <div className="space-y-2 pl-3 sm:pl-4">
            {selectedFlowers.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs sm:text-sm text-pink-800 bg-pink-50 rounded-lg p-2 sm:p-3">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-pink-600 ml-2">× {item.stems}</span>
                </div>
                <span className="font-medium">₹{item.stems * item.price}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-pink-600 pl-3 sm:pl-4 italic">No flowers selected yet.</p>
        )}
      </div>

      {/* Customizations Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-pink-900 font-['Cinzel'] text-sm sm:text-base">Customizations</p>
          <p className="text-sm font-semibold text-pink-800">₹{customsSubtotal}</p>
        </div>
        {selectedCustoms.length ? (
          <div className="space-y-2 pl-3 sm:pl-4">
            {selectedCustoms.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs sm:text-sm text-pink-800 bg-pink-50 rounded-lg p-2 sm:p-3">
                <div>
                  <span className="text-pink-600 text-xs">{item.category}</span>
                  <br />
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="font-medium">₹{item.price}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-pink-600 pl-3 sm:pl-4 italic">No customizations selected yet.</p>
        )}
      </div>

      {/* Total Section */}
      <div className="border-t-2 border-pink-300 pt-3 sm:pt-4">
        <div className="flex justify-between items-center">
          <p className="text-lg sm:text-xl font-['Italiana'] text-pink-900">Total Amount</p>
          <p className="text-xl sm:text-2xl font-bold text-pink-700">₹{totalAmount}</p>
        </div>
        <p className="text-xs text-pink-600 mt-2">
          * Delivery charges and taxes will be calculated at checkout
        </p>
      </div>
    </GlassCard>
  )
}

export default BouquetPreview

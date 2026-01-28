import React from 'react'
import GlassCard from './GlassCard'

const BouquetPreview = ({ selection, flowers, customizations }) => {
  const selectedFlowers = Object.entries(selection.flowers || {})
    .filter(([, stems]) => stems > 0)
    .map(([id, stems]) => {
      const flower = flowers.find((f) => f._id === id)
      return flower ? `${flower.name} × ${stems}` : null
    })
    .filter(Boolean)

  const selectedCustoms = (customizations || [])
    .map((cat) => {
      const picked = selection.customizations?.[cat.category]
      if (!picked) return null
      if (Array.isArray(picked)) return `${cat.label}: ${picked.join(', ')}`
      return `${cat.label}: ${picked}`
    })
    .filter(Boolean)

  return (
    <GlassCard className="p-6 space-y-4">
      <h3 className="text-xl font-['Italiana'] text-pink-700">Live Preview</h3>
      <div className="h-40 rounded-xl bg-gradient-to-br from-rose-100 via-pink-100 to-white border border-pink-200 flex items-center justify-center text-pink-600 text-sm font-['Cinzel']">
        Bouquet Preview Placeholder
      </div>
      <div className="space-y-2 text-sm text-pink-800">
        <div>
          <p className="font-semibold text-pink-900 font-['Cinzel']">Flowers</p>
          {selectedFlowers.length ? (
            <ul className="list-disc list-inside">
              {selectedFlowers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-pink-600">No flowers selected yet.</p>
          )}
        </div>
        <div>
          <p className="font-semibold text-pink-900 font-['Cinzel']">Wrap & Add-ons</p>
          {selectedCustoms.length ? (
            <ul className="list-disc list-inside">
              {selectedCustoms.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-pink-600">No options selected yet.</p>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

export default BouquetPreview

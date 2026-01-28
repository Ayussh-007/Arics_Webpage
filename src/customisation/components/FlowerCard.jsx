import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const FlowerCard = ({ flower, stems, onChange }) => {
  const disabled = !flower.enabled || flower.stock === 0
  return (
    <motion.div
      whileHover={!disabled ? { y: -4 } : undefined}
      className={clsx(
        'p-4 rounded-2xl border border-pink-200 bg-white/60 backdrop-blur-xl shadow-md',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-['Italiana'] text-lg text-pink-800">
            {flower.name}
          </h4>
          <p className="text-sm text-pink-700">₹{flower.pricePerStem} / stem</p>
          <p className="text-xs text-pink-600">Stock: {flower.stock}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange(Math.max(0, stems - 1))}
            className="w-8 h-8 rounded-full bg-white border border-pink-300 text-pink-800 hover:bg-pink-50 transition-colors"
            disabled={disabled}
          >
            -
          </button>
          <span className="w-8 text-center font-semibold text-pink-900">{stems}</span>
          <button
            onClick={() => onChange(stems + 1)}
            className="w-8 h-8 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors"
            disabled={disabled}
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default FlowerCard

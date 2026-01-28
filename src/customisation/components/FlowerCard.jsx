import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const FlowerCard = ({ flower, stems, onChange }) => {
  const disabled = !flower.enabled || flower.stock === 0
  return (
    <motion.div
      whileHover={!disabled ? { y: -4 } : undefined}
      className={clsx(
        'p-3 sm:p-4 rounded-2xl border border-pink-200 bg-white/60 backdrop-blur-xl shadow-md',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-['Italiana'] text-sm sm:text-lg text-pink-800 truncate">
            {flower.name}
          </h4>
          <p className="text-xs sm:text-sm text-pink-700">₹{flower.pricePerStem} / stem</p>
          <p className="text-xs text-pink-600">Stock: {flower.stock}</p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={() => onChange(Math.max(0, stems - 1))}
            className="w-7 h-7 sm:w-8 sm:h-8 text-sm sm:text-base rounded-full bg-white border border-pink-300 text-pink-800 hover:bg-pink-50 transition-colors"
            disabled={disabled}
          >
            -
          </button>
          <span className="w-6 sm:w-8 text-center font-semibold text-pink-900 text-sm sm:text-base">{stems}</span>
          <button
            onClick={() => onChange(stems + 1)}
            className="w-7 h-7 sm:w-8 sm:h-8 text-sm sm:text-base rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors"
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

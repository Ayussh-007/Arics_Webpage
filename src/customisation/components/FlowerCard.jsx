import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const FlowerCard = ({ flower, stems, onChange }) => {
  const disabled = !flower.enabled || flower.stock === 0
  return (
    <motion.div
      whileHover={!disabled ? { y: -4 } : undefined}
      className={clsx(
        'p-4 rounded-2xl border border-white/50 bg-white/30 backdrop-blur-xl',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-['Playfair_Display'] text-lg text-slate-900">
            {flower.name}
          </h4>
          <p className="text-sm text-slate-600">${flower.pricePerStem} / stem</p>
          <p className="text-xs text-slate-500">Stock: {flower.stock}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange(Math.max(0, stems - 1))}
            className="w-8 h-8 rounded-full bg-white/80 text-slate-800"
            disabled={disabled}
          >
            -
          </button>
          <span className="w-8 text-center">{stems}</span>
          <button
            onClick={() => onChange(stems + 1)}
            className="w-8 h-8 rounded-full bg-pink-500 text-white"
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

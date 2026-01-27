import React from 'react'
import clsx from 'clsx'

const GlassCard = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'bg-white/20 border border-white/30 backdrop-blur-xl shadow-[0_20px_60px_rgba(236,72,153,0.15)] rounded-2xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default GlassCard

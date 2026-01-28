import React from 'react'
import clsx from 'clsx'

const GlassCard = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'bg-white/70 border border-pink-200 backdrop-blur-xl shadow-lg rounded-2xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default GlassCard

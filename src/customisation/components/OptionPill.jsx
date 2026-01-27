import React from 'react'
import clsx from 'clsx'

const OptionPill = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'px-4 py-2 rounded-full border text-sm transition-all',
        active
          ? 'bg-pink-500 text-white border-pink-400 shadow-lg'
          : 'bg-white/70 text-slate-700 border-white/60 hover:bg-white',
      )}
    >
      {label}
    </button>
  )
}

export default OptionPill

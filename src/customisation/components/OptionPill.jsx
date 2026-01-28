import React from 'react'
import clsx from 'clsx'

const OptionPill = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'px-4 py-2 rounded-full border text-sm transition-all font-["Cinzel"] tracking-wide',
        active
          ? 'bg-pink-600 text-white border-pink-500 shadow-lg'
          : 'bg-white text-pink-800 border-pink-300 hover:bg-pink-50',
      )}
    >
      {label}
    </button>
  )
}

export default OptionPill

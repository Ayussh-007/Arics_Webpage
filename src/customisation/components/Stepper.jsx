import React from 'react'
import clsx from 'clsx'

const steps = ['Quantity', 'Flowers', 'Wrap & Add-ons', 'Preview']

const Stepper = ({ step }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((label, index) => {
        const active = step === index + 1
        const done = step > index + 1
        return (
          <div
            key={label}
            className={clsx(
              "px-4 py-2 rounded-full text-xs tracking-widest font-['Cinzel']",
              done || active
                ? 'bg-pink-500 text-white shadow-lg'
                : 'bg-white/60 text-slate-600 border border-white',
            )}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}

export default Stepper

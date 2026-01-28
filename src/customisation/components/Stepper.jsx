import React from 'react'
import clsx from 'clsx'

const steps = ['Quantity', 'Flowers', 'Wrap & Add-ons', 'Preview']

const Stepper = ({ step }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {steps.map((label, index) => {
        const active = step === index + 1
        const done = step > index + 1
        return (
          <div
            key={label}
            className={clsx(
              "px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs tracking-widest font-['Cinzel']",
              done || active
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white text-pink-700 border border-pink-300',
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

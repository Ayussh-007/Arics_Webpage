import React from 'react'

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] text-slate-900">
        {title}
      </h2>
      {subtitle && <p className="text-slate-600">{subtitle}</p>}
    </div>
  )
}

export default SectionHeader

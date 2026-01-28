import React from 'react'

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl md:text-4xl font-['Italiana'] text-pink-700">
        {title}
      </h2>
      {subtitle && <p className="text-pink-800">{subtitle}</p>}
    </div>
  )
}

export default SectionHeader

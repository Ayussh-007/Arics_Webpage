import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EnhancedSearchBar = ({ onSearch, onSuggestionClick, placeholder = "Search for flowers, occasions, colors..." }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef(null)
  
  // Popular searches and suggestions
  const popularSearches = [
    { text: 'Roses', type: 'flower', icon: '🌹' },
    { text: 'Lilies', type: 'flower', icon: '🌺' },
    { text: 'Tulips', type: 'flower', icon: '🌷' },
    { text: 'Orchids', type: 'flower', icon: '🌸' },
    { text: 'Birthday', type: 'occasion', icon: '🎂' },
    { text: 'Anniversary', type: 'occasion', icon: '💑' },
    { text: 'Wedding', type: 'occasion', icon: '💍' },
    { text: 'Valentine', type: 'occasion', icon: '❤️' },
    { text: 'Red Flowers', type: 'color', icon: '🔴' },
    { text: 'Pink Flowers', type: 'color', icon: '🩷' },
    { text: 'White Flowers', type: 'color', icon: '⚪' },
    { text: 'Mixed Bouquet', type: 'category', icon: '🎨' },
  ]
  
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([])
      return
    }
    
    // Filter suggestions based on query
    const filtered = popularSearches.filter(item =>
      item.text.toLowerCase().includes(query.toLowerCase())
    )
    
    setSuggestions(filtered.slice(0, 6))
  }, [query])
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const handleInputChange = (e) => {
    setQuery(e.target.value)
    setShowSuggestions(true)
    setSelectedIndex(-1)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
      setShowSuggestions(false)
    }
  }
  
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text)
    onSuggestionClick && onSuggestionClick(suggestion.text)
    setShowSuggestions(false)
  }
  
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return
    
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSuggestionClick(suggestions[selectedIndex])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'flower':
        return 'text-pink-600 bg-pink-50'
      case 'occasion':
        return 'text-purple-600 bg-purple-50'
      case 'color':
        return 'text-rose-600 bg-rose-50'
      case 'category':
        return 'text-indigo-600 bg-indigo-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }
  
  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 font-['Lato'] text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
          />
          
          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setSuggestions([])
              }}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>
      
      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (query || suggestions.length > 0) && (
          <motion.div
            className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.length > 0 ? (
              <div className="py-2">
                <div className="px-3 sm:px-4 py-2 text-xs font-['Montserrat'] font-semibold text-gray-500 uppercase tracking-wider">
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 hover:bg-pink-50 transition-colors text-left ${
                      selectedIndex === index ? 'bg-pink-50' : ''
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-xl sm:text-2xl">{suggestion.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-['Lato'] text-sm sm:text-base text-gray-900 truncate">{suggestion.text}</div>
                    </div>
                    <span className={`text-[10px] sm:text-xs font-['Montserrat'] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap ${getTypeColor(suggestion.type)}`}>
                      {suggestion.type}
                    </span>
                  </motion.button>
                ))}
              </div>
            ) : query ? (
              <div className="px-3 sm:px-4 py-6 sm:py-8 text-center text-gray-500 font-['Lato'] text-sm sm:text-base">
                No suggestions found
              </div>
            ) : null}
            
            {/* Trending Searches */}
            {!query && (
              <div className="border-t border-gray-200 py-2">
                <div className="px-3 sm:px-4 py-2 text-xs font-['Montserrat'] font-semibold text-gray-500 uppercase tracking-wider">
                  🔥 Trending Searches
                </div>
                {popularSearches.slice(0, 4).map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSuggestionClick(item)}
                    className="w-full px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 hover:bg-pink-50 transition-colors text-left"
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-lg sm:text-xl">{item.icon}</span>
                    <span className="font-['Lato'] text-gray-700 text-xs sm:text-sm truncate">{item.text}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EnhancedSearchBar

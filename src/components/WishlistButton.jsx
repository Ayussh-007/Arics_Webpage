import React from 'react'
import { motion } from 'framer-motion'
import { useWishlistStore } from '../store/useWishlistStore'
import toast from 'react-hot-toast'

const WishlistButton = ({ product, className = '', size = 'md' }) => {
  const { isInWishlist, toggleWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product._id)
  
  const handleToggle = (e) => {
    e.stopPropagation()
    const added = toggleWishlist(product)
    if (added) {
      toast.success('Added to wishlist', {
        icon: '❤️',
        duration: 2000
      })
    } else {
      toast('Removed from wishlist', {
        icon: '💔',
        duration: 2000
      })
    }
  }
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }
  
  return (
    <motion.button
      onClick={handleToggle}
      className={`${sizes[size]} rounded-full flex items-center justify-center transition-all backdrop-blur-sm border ${
        inWishlist
          ? 'bg-pink-500 border-pink-500 text-white'
          : 'bg-white/80 border-gray-200 text-gray-400 hover:text-pink-500 hover:border-pink-300'
      } ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}
        fill={inWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </motion.button>
  )
}

export default WishlistButton

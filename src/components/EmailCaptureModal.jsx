import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAbandonedCartStore } from '../store/useAbandonedCartStore'
import toast from 'react-hot-toast'

const EmailCaptureModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await onSubmit(email)
      toast.success('Email saved! We\'ll keep you updated.')
      onClose()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Icon */}
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            
            {/* Content */}
            <h3 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 text-center mb-3">
              Don't Lose Your Cart!
            </h3>
            
            <p className="text-gray-600 font-['Lato'] text-center mb-6">
              Enter your email to save your cart and get exclusive offers. We'll send you a reminder if you forget to checkout!
            </p>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full font-['Lato'] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-['Cinzel'] text-sm tracking-wider py-3 rounded-full transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'SAVING...' : 'SAVE MY CART'}
                </motion.button>
                
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-['Lato'] text-sm rounded-full hover:bg-gray-50 transition-all"
                >
                  Skip
                </button>
              </div>
            </form>
            
            {/* Benefits */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              <p className="text-xs text-gray-500 font-['Lato'] text-center">
                ✨ By saving your cart, you'll get:
              </p>
              <ul className="space-y-1 text-xs text-gray-600 font-['Lato']">
                <li className="flex items-center gap-2">
                  <span className="text-pink-500">•</span>
                  Cart recovery reminders
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-500">•</span>
                  Exclusive discount codes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-500">•</span>
                  Order updates & tracking
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EmailCaptureModal

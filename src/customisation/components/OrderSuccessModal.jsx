import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const OrderSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-gradient-to-br from-white via-pink-50 to-rose-50 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-pink-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center"
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-3 sm:space-y-4"
          >
            <h3 className="text-2xl sm:text-3xl font-['Italiana'] text-pink-700">
              Thank You!
            </h3>
            <p className="text-sm sm:text-base text-pink-800 font-['Lato'] leading-relaxed px-2">
              Your order has been placed successfully. A confirmation email will be sent to you shortly with complete payment details.
            </p>
            
            {/* Decorative flower icons */}
            <div className="flex justify-center gap-2 text-2xl sm:text-3xl py-2">
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                🌸
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                💐
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                🌺
              </motion.span>
            </div>
          </motion.div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
            className="w-full mt-6 px-6 py-3 text-sm sm:text-base rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-['Cinzel'] tracking-wider hover:from-pink-700 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            CONTINUE SHOPPING
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OrderSuccessModal

import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCartStore } from '../store/useCartStore'
import { createOrder } from '../customisation/api/services'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
})

// Success Modal Component
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

const CheckoutPage = ({ onBack, onComplete }) => {
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal())
  const clear = useCartStore((s) => s.clear)
  const [placing, setPlacing] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const total = useMemo(() => subtotal, [subtotal])

  const onSubmit = async (values) => {
    try {
      setPlacing(true)
      const payload = {
        customer: {
          name: values.name,
          phone: values.phone,
          email: values.email,
          address: values.address,
        },
        selection: {
          quantity: items.reduce((sum, x) => sum + Number(x.quantity || 0), 0),
          items: items.map((x) => ({
            type: x.type,
            refId: x.refId,
            name: x.name,
            quantity: x.quantity,
            unitPrice: x.price,
          })),
        },
        pricing: {
          total: subtotal,
        },
      }
      await createOrder(payload)
      clear()
      
      // Show success modal
      setShowSuccessModal(true)
      
      // Auto close after 5 seconds
      setTimeout(() => {
        setShowSuccessModal(false)
        onComplete?.()
      }, 5000)
    } catch (e) {
      toast.error('Order failed. Please try again.')
      console.error('Order error:', e)
    } finally {
      setPlacing(false)
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    onComplete?.()
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Italiana'] text-pink-700">Checkout</h2>
            <p className="text-sm sm:text-base text-pink-600 mt-2">Complete your order details</p>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-6 sm:gap-8">
            {/* Form Section */}
            <div className="bg-white/80 backdrop-blur-xl border border-pink-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-['Italiana'] text-pink-700 mb-4 sm:mb-6">Delivery Information</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-['Cinzel'] tracking-wider text-pink-800 mb-1">Full Name</label>
                  <input 
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" 
                    placeholder="John Doe"
                    {...register('name')} 
                  />
                  {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-['Cinzel'] tracking-wider text-pink-800 mb-1">Phone</label>
                  <input 
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" 
                    placeholder="+91 98765 43210"
                    {...register('phone')} 
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>}
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-['Cinzel'] tracking-wider text-pink-800 mb-1">Email</label>
                  <input 
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" 
                    placeholder="john@example.com"
                    {...register('email')} 
                  />
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-['Cinzel'] tracking-wider text-pink-800 mb-1">Delivery Address</label>
                  <textarea 
                    rows={3} 
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none" 
                    placeholder="Enter your complete delivery address"
                    {...register('address')} 
                  />
                  {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address.message}</p>}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button 
                    type="button" 
                    className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base rounded-full bg-white border-2 border-pink-300 text-pink-800 font-['Cinzel'] tracking-wider hover:bg-pink-50 transition-all" 
                    onClick={onBack}
                  >
                    Back to Cart
                  </button>
                  <button 
                    type="submit" 
                    disabled={placing || items.length === 0} 
                    className="flex-1 px-6 py-3 text-sm sm:text-base rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-['Cinzel'] tracking-wider hover:from-pink-700 hover:to-rose-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {placing ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary Section */}
            <div className="space-y-4 sm:space-y-5">
              <div className="bg-white/80 backdrop-blur-xl border border-pink-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl sticky top-4">
                <h3 className="text-lg sm:text-xl font-['Cinzel'] tracking-wider text-pink-800 mb-4 border-b border-pink-200 pb-2">Order Summary</h3>
                
                {items.length === 0 ? (
                  <p className="text-center text-pink-600 py-8 text-sm">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                      {items.map((x) => (
                        <div key={x.id} className="flex justify-between items-start text-xs sm:text-sm text-pink-900 bg-pink-50 rounded-lg p-3">
                          <div className="flex-1">
                            <p className="font-medium">{x.name}</p>
                            <p className="text-pink-600">Qty: {x.quantity}</p>
                          </div>
                          <span className="font-semibold">₹{(x.price * x.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t-2 border-pink-300 pt-3 mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm sm:text-base text-pink-800">Subtotal</span>
                        <span className="text-sm sm:text-base font-medium text-pink-900">₹{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center font-['Montserrat'] text-lg sm:text-xl">
                        <span className="text-pink-900 font-semibold">Total</span>
                        <span className="text-pink-700 font-bold">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-pink-600 mt-4 leading-relaxed">
                      * Payment details will be sent via email after order confirmation
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <OrderSuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleModalClose}
      />
    </>
  )
}

export default CheckoutPage

import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import GlassCard from '../components/GlassCard'
import PriceSummary from '../components/PriceSummary'
import OrderSuccessModal from '../components/OrderSuccessModal'
import { useBouquetStore } from '../store/useBouquetStore'
import { computePricing, estimateDelivery } from '../utils/pricing'
import { createOrder } from '../api/services'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  locationCode: z.string().optional(),
})

const Checkout = ({ flowers, customizations, settings, onBack, onComplete }) => {
  const { selection } = useBouquetStore()
  const [submitting, setSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const pricing = useMemo(
    () => computePricing({ selection, flowers, customizations, settings }),
    [selection, flowers, customizations, settings],
  )
  const deliveryDays = estimateDelivery({ quantity: selection.quantity, settings })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    try {
      setSubmitting(true)
      const selectionPayload = {
        quantity: selection.quantity,
        flowers: Object.entries(selection.flowers || {})
          .filter(([, stems]) => stems > 0)
          .map(([id, stems]) => {
            const flower = flowers.find((f) => f._id === id)
            return {
              flowerId: id,
              name: flower?.name,
              stems,
              pricePerStem: flower?.pricePerStem,
            }
          }),
        customizations: (customizations || [])
          .map((cat) => {
            const picked = selection.customizations?.[cat.category]
            if (!picked) return []
            if (Array.isArray(picked)) {
              return picked.map((opt) => {
                const option = cat.options.find((o) => o.name === opt)
                return {
                  category: cat.category,
                  option: opt,
                  price: option?.price || option?.priceImpact || 0,
                  quantity: 1,
                }
              })
            }
            return [
              {
                category: cat.category,
                option: picked,
                price: cat.options.find((o) => o.name === picked)?.price || 0,
                quantity: 1,
              },
            ]
          })
          .flat(),
      }

      await createOrder({
        customer: values,
        selection: selectionPayload,
      })
      
      // Show success modal instead of toast
      setShowSuccessModal(true)
      
      // Auto close modal and complete after 5 seconds
      setTimeout(() => {
        setShowSuccessModal(false)
        onComplete()
      }, 5000)
    } catch (err) {
      toast.error('Order failed. Please try again.')
      console.error('Order submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    onComplete()
  }

  return (
    <>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6 sm:gap-8">
        <GlassCard className="p-4 sm:p-6 space-y-4 sm:space-y-6 order-2 lg:order-1">
          <h3 className="text-xl sm:text-2xl font-['Italiana'] text-pink-700">Checkout</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs sm:text-sm text-pink-800 font-['Cinzel']">Full Name</label>
              <input
                {...register('name')}
                className="w-full mt-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-xs sm:text-sm text-pink-800 font-['Cinzel']">Phone</label>
              <input
                {...register('phone')}
                className="w-full mt-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="+91 98765 43210"
              />
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="text-xs sm:text-sm text-pink-800 font-['Cinzel']">Email</label>
              <input
                {...register('email')}
                className="w-full mt-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-xs sm:text-sm text-pink-800 font-['Cinzel']">Address</label>
              <textarea
                {...register('address')}
                className="w-full mt-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                rows={3}
                placeholder="Enter your delivery address"
              />
              {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address.message}</p>}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-white border border-pink-300 text-pink-700 font-['Cinzel'] tracking-wider hover:bg-pink-50 transition-colors"
                onClick={onBack}
                disabled={submitting}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-pink-600 text-white shadow-lg font-['Cinzel'] tracking-wider hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </form>
        </GlassCard>

        <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
          <PriceSummary pricing={pricing} deliveryDays={deliveryDays} />
          <GlassCard className="p-4 sm:p-6 text-xs sm:text-sm text-pink-800">
            <p className="font-['Cinzel'] text-pink-900 mb-2 text-sm sm:text-base">Payment Information</p>
            <p className="leading-relaxed">Payment details will be sent via email after order confirmation. You can pay using the provided QR code or bank details.</p>
          </GlassCard>
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

export default Checkout

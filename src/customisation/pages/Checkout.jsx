import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import GlassCard from '../components/GlassCard'
import PriceSummary from '../components/PriceSummary'
import { useBouquetStore } from '../store/useBouquetStore'
import { computePricing, estimateDelivery } from '../utils/pricing'
import { createOrder } from '../api/services'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  address: z.string().min(5),
  locationCode: z.string().optional(),
})

const Checkout = ({ flowers, customizations, settings, onBack, onComplete }) => {
  const { selection } = useBouquetStore()
  const [submitting, setSubmitting] = useState(false)

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
      toast.success('Order placed!')
      onComplete()
    } catch (err) {
      toast.error('Order failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
      <GlassCard className="p-6 space-y-6">
        <h3 className="text-2xl font-['Italiana'] text-pink-700">Checkout</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm text-pink-800 font-['Cinzel']">Full Name</label>
            <input
              {...register('name')}
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-xs text-rose-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm text-pink-800 font-['Cinzel']">Phone</label>
            <input
              {...register('phone')}
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="+91 98765 43210"
            />
            {errors.phone && <p className="text-xs text-rose-500">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="text-sm text-pink-800 font-['Cinzel']">Email</label>
            <input
              {...register('email')}
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm text-pink-800 font-['Cinzel']">Address</label>
            <textarea
              {...register('address')}
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              rows={3}
              placeholder="Enter your delivery address"
            />
            {errors.address && <p className="text-xs text-rose-500">{errors.address.message}</p>}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-6 py-3 rounded-full bg-white border border-pink-300 text-pink-700 font-['Cinzel'] text-sm tracking-wider hover:bg-pink-50 transition-colors"
              onClick={onBack}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-full bg-pink-600 text-white shadow-lg font-['Cinzel'] text-sm tracking-wider hover:bg-pink-700 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Placing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </GlassCard>

      <div className="space-y-6">
        <PriceSummary pricing={pricing} deliveryDays={deliveryDays} />
        <GlassCard className="p-6 text-sm text-pink-800">
          <p className="font-['Cinzel'] text-pink-900 mb-2">Payment Information</p>
          <p>Payment gateway integration coming soon. For now, payment will be collected on delivery.</p>
        </GlassCard>
      </div>
    </div>
  )
}

export default Checkout

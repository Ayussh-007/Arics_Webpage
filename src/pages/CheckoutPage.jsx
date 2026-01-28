import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCartStore } from '../store/useCartStore'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  address: z.string().min(5),
})

const CheckoutPage = ({ onBack, onComplete }) => {
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal())
  const clear = useCartStore((s) => s.clear)
  const [placing, setPlacing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const total = useMemo(() => subtotal, [subtotal])

  const onSubmit = async () => {
    try {
      setPlacing(true)
      // NOTE: Backend integration intentionally deferred.
      // This is a unified checkout placeholder. Hook up to your API here.
      await new Promise((r) => setTimeout(r, 800))
      clear()
      onComplete?.()
      alert('Order placed!')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white/70 border border-white/40 rounded-3xl p-6">
          <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-4">Checkout</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-['Cinzel'] tracking-widest text-pink-800">Full Name</label>
              <input className="mt-1 w-full px-4 py-2 rounded-xl bg-white border border-pink-300" {...register('name')} />
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-['Cinzel'] tracking-widest text-pink-800">Phone</label>
              <input className="mt-1 w-full px-4 py-2 rounded-xl bg-white border border-pink-300" {...register('phone')} />
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-['Cinzel'] tracking-widest text-pink-800">Email</label>
              <input className="mt-1 w-full px-4 py-2 rounded-xl bg-white border border-pink-300" {...register('email')} />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-['Cinzel'] tracking-widest text-pink-800">Address</label>
              <textarea rows={3} className="mt-1 w-full px-4 py-2 rounded-xl bg-white border border-pink-300" {...register('address')} />
              {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address.message}</p>}
            </div>
            <div className="flex gap-2">
              <button type="button" className="px-6 py-3 rounded-full bg-white border border-pink-300 text-pink-800 font-['Cinzel']" onClick={onBack}>Back</button>
              <button type="submit" disabled={placing || items.length === 0} className="px-6 py-3 rounded-full bg-pink-600 text-white font-['Cinzel'] disabled:opacity-60">
                {placing ? 'Placing…' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
        <div className="space-y-3">
          <div className="bg-white/70 border border-white/40 rounded-3xl p-6">
            <h3 className="text-lg font-['Cinzel'] tracking-widest text-pink-800 mb-3">Order Summary</h3>
            <div className="space-y-2">
              {items.map((x) => (
                <div key={x.id} className="flex justify-between text-sm text-pink-900">
                  <span>{x.name} × {x.quantity}</span>
                  <span>${(x.price * x.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-pink-100 flex justify-between font-['Montserrat']">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-pink-800 mt-2">Taxes and delivery shown after placing order.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
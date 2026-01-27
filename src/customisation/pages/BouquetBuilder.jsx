import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import GlassCard from '../components/GlassCard'
import SectionHeader from '../components/SectionHeader'
import Stepper from '../components/Stepper'
import FlowerCard from '../components/FlowerCard'
import OptionPill from '../components/OptionPill'
import PriceSummary from '../components/PriceSummary'
import BouquetPreview from '../components/BouquetPreview'
import { useBouquetStore } from '../store/useBouquetStore'
import { computePricing, estimateDelivery } from '../utils/pricing'
import { fetchCustomizations, fetchFlowers, fetchSettings } from '../api/services'

const BouquetBuilder = ({ onCheckout }) => {
  const { step, setStep, selection, setQuantity, setFlowerStem, toggleCustomization } =
    useBouquetStore()
  const [flowers, setFlowers] = useState([])
  const [customizations, setCustomizations] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [f, c, s] = await Promise.all([
          fetchFlowers(),
          fetchCustomizations(),
          fetchSettings(),
        ])
        setFlowers(f)
        setCustomizations(c)
        setSettings(s)
      } catch (err) {
        toast.error('Unable to load bouquet data. Using defaults.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const pricing = useMemo(
    () => computePricing({ selection, flowers, customizations, settings }),
    [selection, flowers, customizations, settings],
  )
  const deliveryDays = estimateDelivery({ quantity: selection.quantity, settings })

  if (loading) {
    return (
      <div className="p-10">
        <div className="animate-pulse text-slate-500">Loading bouquet builder...</div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <SectionHeader
          title="Design Your Custom Bouquet"
          subtitle="Select stems, wrapping, and add-ons. Each choice updates your price and delivery."
        />
        <Stepper step={step} />
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-8">
          {step === 1 && (
            <GlassCard className="p-6 space-y-6">
              <h3 className="text-xl font-['Playfair_Display']">1. Choose Quantity</h3>
              <div className="flex flex-wrap gap-3">
                {[5, 7, 9].map((qty) => (
                  <OptionPill
                    key={qty}
                    label={`${qty} flowers`}
                    active={selection.quantity === qty}
                    onClick={() => setQuantity(qty)}
                  />
                ))}
                <OptionPill
                  label="Custom (≥ 8)"
                  active={selection.quantity > 9}
                  onClick={() => setQuantity(12)}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="px-6 py-3 rounded-full bg-pink-500 text-white"
                  onClick={() => setStep(2)}
                >
                  Continue
                </button>
              </div>
            </GlassCard>
          )}

          {step === 2 && (
            <GlassCard className="p-6 space-y-6">
              <h3 className="text-xl font-['Playfair_Display']">2. Select Flowers</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {flowers.map((flower) => (
                  <FlowerCard
                    key={flower._id}
                    flower={flower}
                    stems={selection.flowers[flower._id] || 0}
                    onChange={(value) => setFlowerStem(flower._id, value)}
                  />
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  className="px-6 py-3 rounded-full bg-white/80 text-slate-700"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 rounded-full bg-pink-500 text-white"
                  onClick={() => setStep(3)}
                >
                  Continue
                </button>
              </div>
            </GlassCard>
          )}

          {step === 3 && (
            <GlassCard className="p-6 space-y-6">
              <h3 className="text-xl font-['Playfair_Display']">3. Wrap & Add-ons</h3>
              <div className="space-y-6">
                {customizations.map((cat) => (
                  <div key={cat._id} className="space-y-3">
                    <p className="font-semibold text-slate-800">{cat.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.options
                        .filter((o) => o.enabled !== false)
                        .map((opt) => {
                          const current = selection.customizations[cat.category]
                          const active = Array.isArray(current)
                            ? current.includes(opt.name)
                            : current === opt.name
                          return (
                            <OptionPill
                              key={opt.name}
                              label={`${opt.name} +$${opt.price || opt.priceImpact || 0}`}
                              active={active}
                              onClick={() =>
                                toggleCustomization(cat.category, opt.name, cat.inputType)
                              }
                            />
                          )
                        })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  className="px-6 py-3 rounded-full bg-white/80 text-slate-700"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 rounded-full bg-pink-500 text-white"
                  onClick={() => setStep(4)}
                >
                  Continue
                </button>
              </div>
            </GlassCard>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <BouquetPreview selection={selection} flowers={flowers} customizations={customizations} />
              <div className="flex justify-between">
                <button
                  className="px-6 py-3 rounded-full bg-white/80 text-slate-700"
                  onClick={() => setStep(3)}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 rounded-full bg-pink-600 text-white shadow-lg"
                  onClick={() => onCheckout()}
                >
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <PriceSummary pricing={pricing} deliveryDays={deliveryDays} />
          <GlassCard className="p-6 space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Delivery Notes</p>
            <p>Delivery dates adjust based on quantity and availability.</p>
            <p>All orders include a complimentary message card.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

export default BouquetBuilder

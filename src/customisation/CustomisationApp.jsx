import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import BouquetBuilder from './pages/BouquetBuilder'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import AdminDashboard from './pages/AdminDashboard'
import { fetchCustomizations, fetchFlowers, fetchSettings } from './api/services'

const CustomisationApp = () => {
  const [view, setView] = useState('builder')
  const [flowers, setFlowers] = useState([])
  const [customizations, setCustomizations] = useState([])
  const [settings, setSettings] = useState(null)

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
        // silent fallback
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14030a] via-[#2b0b1b] to-[#4a1430] text-white">
      <Toaster position="top-right" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-rose-200">Arics Atelier</p>
            <h1 className="text-4xl md:text-5xl font-['Playfair_Display']">
              Custom Bouquet Builder
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'builder', label: 'Builder' },
              { id: 'checkout', label: 'Checkout' },
              { id: 'admin', label: 'Admin' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`px-4 py-2 rounded-full border ${
                  view === item.id
                    ? 'bg-rose-500/80 border-rose-300'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-[32px] p-6 md:p-10 backdrop-blur-2xl">
          {view === 'builder' && <BouquetBuilder onCheckout={() => setView('checkout')} />}
          {view === 'checkout' && (
            <Checkout
              flowers={flowers}
              customizations={customizations}
              settings={settings}
              onBack={() => setView('builder')}
              onComplete={() => setView('confirmation')}
            />
          )}
          {view === 'confirmation' && (
            <OrderConfirmation onNewOrder={() => setView('builder')} />
          )}
          {view === 'admin' && <AdminDashboard />}
        </div>
      </div>
    </div>
  )
}

export default CustomisationApp

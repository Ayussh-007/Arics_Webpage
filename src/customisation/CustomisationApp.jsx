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

  // Secret admin access: Hold Shift and click on the logo/title 3 times quickly
  const [clickCount, setClickCount] = useState(0)
  const [clickTimer, setClickTimer] = useState(null)

  const handleSecretClick = (e) => {
    if (e.shiftKey) {
      clearTimeout(clickTimer)
      const newCount = clickCount + 1
      setClickCount(newCount)
      
      if (newCount >= 3) {
        setView('admin')
        setClickCount(0)
      } else {
        const timer = setTimeout(() => setClickCount(0), 2000)
        setClickTimer(timer)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pt-24 pb-8">
      <Toaster position="top-right" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div onClick={handleSecretClick} className="cursor-pointer">
            <p className="uppercase tracking-[0.3em] text-xs text-rose-600 font-['Cinzel']">Arics Atelier</p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-['Italiana'] text-pink-700">
              Custom Bouquet Builder
            </h1>
          </div>
          {view !== 'admin' && (
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'builder', label: 'Builder' },
                { id: 'checkout', label: 'Checkout' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`px-3 sm:px-4 py-2 rounded-full border font-['Cinzel'] text-xs sm:text-sm tracking-wider transition-all ${
                    view === item.id
                      ? 'bg-pink-600 border-pink-500 text-white shadow-lg'
                      : 'bg-white/80 border-pink-200 text-pink-800 hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/80 border border-pink-200 rounded-2xl sm:rounded-[32px] p-4 sm:p-6 md:p-10 backdrop-blur-xl shadow-xl">
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
          {view === 'admin' && <AdminDashboard onBack={() => setView('builder')} />}
        </div>
      </div>
    </div>
  )
}

export default CustomisationApp

import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import BloomAnimation from '../components/Bloomanimation'
import OrdersAdmin from '../components/admin/OrdersAdmin'
import ProductsAdmin from './AdminDashboard'
import CustomAdmin from '../customisation/pages/AdminDashboard'
import api from '../api/client'

const TABS = [
  { id: 'orders', label: 'Orders' },
  { id: 'products', label: 'Products' },
  { id: 'customs', label: 'Customizations' },
]

const AdminPortal = ({ onExit }) => {
  const [tab, setTab] = useState('orders')
  const [authed, setAuthed] = useState(!!localStorage.getItem('arics_admin_token'))
  const [busy, setBusy] = useState(false)

  // Login form state (kept simple; aligns with existing backend expecting email/password)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogout = () => {
    localStorage.removeItem('arics_admin_token')
    setAuthed(false)
    toast.success('Logged out')
    if (onExit) onExit()
  }

  const onLogin = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      const { data } = await api.post('/auth/login', {
        email: username,
        password,
      })
      localStorage.setItem('arics_admin_token', data.token)
      setAuthed(true)
      toast.success(`Welcome, ${data.user?.name || 'Admin'}!`)
    } catch (err) {
      toast.error('Invalid username or password')
    } finally {
      setBusy(false)
    }
  }

  // If token exists but is invalid, first admin call will 401. We preflight by calling /orders.
  useEffect(() => {
    if (!authed) return
    let cancelled = false
    const preflight = async () => {
      try {
        await api.get('/orders')
      } catch {
        if (!cancelled) {
          localStorage.removeItem('arics_admin_token')
          setAuthed(false)
        }
      }
    }
    preflight()
    return () => {
      cancelled = true
    }
  }, [authed])

  const activeLabel = useMemo(() => TABS.find((t) => t.id === tab)?.label || 'Admin', [tab])

  if (!authed) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <Toaster position="top-right" />
        <BloomAnimation />

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <motion.div
            className="w-full max-w-md bg-white/65 backdrop-blur-2xl border border-white/50 rounded-[32px] shadow-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow" />
                <div>
                  <div className="text-xs font-['Cinzel'] tracking-[0.35em] text-pink-800 uppercase">Arics</div>
                  <div className="text-2xl font-['Italiana'] text-pink-700">Admin Atelier</div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-['Cormorant_Garamond'] text-lg italic">A private room for orders, inventory, and craft.</p>
            </div>

            <form onSubmit={onLogin} className="mt-8 space-y-4">
              <div>
                <label className="block text-xs font-['Cinzel'] tracking-widest text-pink-800 mb-2">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@arics.com"
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-pink-200 text-gray-900 font-['Montserrat'] text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-xs font-['Cinzel'] tracking-widest text-pink-800 mb-2">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-pink-200 text-gray-900 font-['Montserrat'] text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <button
                disabled={busy}
                className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-['Cinzel'] tracking-widest text-sm shadow-lg hover:shadow-xl transition disabled:opacity-70"
              >
                {busy ? 'Signing in…' : 'Sign in'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => (onExit ? onExit() : null)}
                  className="text-xs font-['Cinzel'] tracking-widest text-pink-700 hover:text-pink-900 underline"
                >
                  Back to site
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster position="top-right" />
      <BloomAnimation />

      <div className="relative z-10 pt-24 px-6 lg:px-12 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-xs font-['Cinzel'] tracking-[0.35em] text-pink-800 uppercase">Private</div>
              <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-gray-900">{activeLabel}</h1>
              <p className="text-gray-600 font-['Cormorant_Garamond'] text-lg italic">Curate the experience. Deliver the bouquet. Delight the customer.</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-full bg-white/70 border border-rose-200 text-rose-700 font-['Cinzel'] text-xs tracking-wider hover:bg-white transition"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-8 bg-white/35 backdrop-blur-xl border border-white/30 rounded-3xl p-3 shadow">
            <div className="flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2 rounded-full font-['Cinzel'] text-xs tracking-wider transition-all ${
                    tab === t.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow'
                      : 'bg-white/70 border border-pink-200 text-pink-800 hover:bg-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {tab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <OrdersAdmin />
                </motion.div>
              )}

              {tab === 'products' && (
                <motion.div
                  key="products"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Products admin (existing) */}
                  <ProductsAdmin embedded />
                </motion.div>
              )}

              {tab === 'customs' && (
                <motion.div
                  key="customs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Customization admin (flowers + customizations) */}
                  <CustomAdmin visibleTabs={['customizations','flowers','settings']} initialTab="customizations" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPortal

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import GlassCard from '../components/GlassCard'
import {
  adminLogin,
  createCustomization,
  createFlower,
  deleteCustomization,
  deleteFlower,
  fetchAllCustomizations,
  fetchAllFlowers,
  fetchOrders,
  fetchSettings,
  updateCustomization,
  updateFlower,
  updateSettings,
} from '../api/services'

const AdminDashboard = () => {
  const [tab, setTab] = useState('orders')
  const [flowers, setFlowers] = useState([])
  const [customizations, setCustomizations] = useState([])
  const [orders, setOrders] = useState([])
  const [settings, setSettings] = useState(null)
  const [authed, setAuthed] = useState(!!localStorage.getItem('arics_admin_token'))

  const loginForm = useForm()
  const flowerForm = useForm({ defaultValues: { name: '', pricePerStem: 0, stock: 0 } })
  const customForm = useForm({
    defaultValues: { category: '', label: '', inputType: 'radio', optionName: '', optionPrice: 0 },
  })
  const settingsForm = useForm({
    defaultValues: { taxRate: 0.06, deliveryBaseDays: 2, deliveryPerStemDays: 0.02, deliveryFee: 4.99 },
  })

  const loadAll = async () => {
    try {
      const [f, c, o, s] = await Promise.all([
        fetchAllFlowers(),
        fetchAllCustomizations(),
        fetchOrders(),
        fetchSettings(),
      ])
      setFlowers(f)
      setCustomizations(c)
      setOrders(o)
      setSettings(s)
      if (s) settingsForm.reset(s)
    } catch (err) {
      toast.error('Admin data load failed.')
    }
  }

  useEffect(() => {
    if (authed) loadAll()
  }, [authed])

  const onLogin = async (values) => {
    try {
      const data = await adminLogin(values)
      localStorage.setItem('arics_admin_token', data.token)
      setAuthed(true)
      toast.success('Welcome back!')
    } catch (err) {
      toast.error('Login failed')
    }
  }

  const onCreateFlower = async (values) => {
    await createFlower(values)
    flowerForm.reset()
    loadAll()
  }

  const onCreateCustomization = async (values) => {
    const payload = {
      category: values.category,
      label: values.label,
      inputType: values.inputType,
      options: [{ name: values.optionName, price: Number(values.optionPrice || 0) }],
    }
    await createCustomization(payload)
    customForm.reset()
    loadAll()
  }

  const onUpdateSettings = async (values) => {
    await updateSettings(values)
    toast.success('Settings saved')
  }

  if (!authed) {
    return (
      <GlassCard className="p-8 max-w-md mx-auto">
        <h3 className="text-2xl font-['Playfair_Display'] mb-4">Admin Login</h3>
        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
          <input
            {...loginForm.register('email')}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-xl bg-white/80"
          />
          <input
            {...loginForm.register('password')}
            placeholder="Password"
            type="password"
            className="w-full px-4 py-2 rounded-xl bg-white/80"
          />
          <button className="px-6 py-3 rounded-full bg-pink-600 text-white w-full">
            Sign in
          </button>
        </form>
      </GlassCard>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {['orders', 'flowers', 'customizations', 'settings'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full ${
              tab === t ? 'bg-pink-600 text-white' : 'bg-white/70 text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-xl font-['Playfair_Display']">Recent Orders</h3>
          {orders.length === 0 && <p className="text-sm text-slate-500">No orders yet.</p>}
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order._id} className="text-sm text-slate-700 border-b border-white/50 pb-2">
                <div className="font-semibold">{order.customer?.name}</div>
                <div>
                  {order.pricing?.total?.toFixed(2)} | {order.deliveryEstimate?.startDate} -{' '}
                  {order.deliveryEstimate?.endDate}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {tab === 'flowers' && (
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xl font-['Playfair_Display']">Add Flower</h3>
            <form onSubmit={flowerForm.handleSubmit(onCreateFlower)} className="space-y-3">
              <input {...flowerForm.register('name')} placeholder="Name" className="w-full px-4 py-2 rounded-xl bg-white/80" />
              <input {...flowerForm.register('pricePerStem')} type="number" placeholder="Price" className="w-full px-4 py-2 rounded-xl bg-white/80" />
              <input {...flowerForm.register('stock')} type="number" placeholder="Stock" className="w-full px-4 py-2 rounded-xl bg-white/80" />
              <button className="px-5 py-2 rounded-full bg-pink-600 text-white">Create</button>
            </form>
          </GlassCard>
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xl font-['Playfair_Display']">Inventory</h3>
            {flowers.map((flower) => (
              <div key={flower._id} className="flex items-center justify-between text-sm border-b border-white/50 pb-2">
                <div>
                  <p className="font-semibold">{flower.name}</p>
                  <p>${flower.pricePerStem} | Stock: {flower.stock}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateFlower(flower._id, { enabled: !flower.enabled }).then(loadAll)}
                    className="px-3 py-1 rounded-full bg-white/80"
                  >
                    {flower.enabled ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => deleteFlower(flower._id).then(loadAll)}
                    className="px-3 py-1 rounded-full bg-rose-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      )}

      {tab === 'customizations' && (
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xl font-['Playfair_Display']">Add Customization</h3>
            <form onSubmit={customForm.handleSubmit(onCreateCustomization)} className="space-y-3">
              <input {...customForm.register('category')} placeholder="Category key" className="w-full px-4 py-2 rounded-xl bg-white/80" />
              <input {...customForm.register('label')} placeholder="Label" className="w-full px-4 py-2 rounded-xl bg-white/80" />
              <select {...customForm.register('inputType')} className="w-full px-4 py-2 rounded-xl bg-white/80">
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="quantity">Quantity</option>
              </select>
              <input {...customForm.register('optionName')} placeholder="First option name" className="w-full px-4 py-2 rounded-xl bg-white/80" />
              <input {...customForm.register('optionPrice')} type="number" placeholder="Option price" className="w-full px-4 py-2 rounded-xl bg-white/80" />
              <button className="px-5 py-2 rounded-full bg-pink-600 text-white">Create</button>
            </form>
          </GlassCard>
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xl font-['Playfair_Display']">Customization Categories</h3>
            {customizations.map((cat) => (
              <div key={cat._id} className="border-b border-white/50 pb-2">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-semibold">{cat.label}</p>
                    <p className="text-xs text-slate-500">{cat.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateCustomization(cat._id, { enabled: !cat.enabled }).then(loadAll)}
                      className="px-3 py-1 rounded-full bg-white/80"
                    >
                      {cat.enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => deleteCustomization(cat._id).then(loadAll)}
                      className="px-3 py-1 rounded-full bg-rose-500 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cat.options.map((opt) => (
                    <span key={opt.name} className="text-xs bg-white/70 px-2 py-1 rounded-full">
                      {opt.name} (+${opt.price || opt.priceImpact || 0})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      )}

      {tab === 'settings' && (
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-xl font-['Playfair_Display']">Store Settings</h3>
          <form onSubmit={settingsForm.handleSubmit(onUpdateSettings)} className="grid md:grid-cols-2 gap-4">
            <input {...settingsForm.register('taxRate')} type="number" step="0.01" placeholder="Tax rate" className="w-full px-4 py-2 rounded-xl bg-white/80" />
            <input {...settingsForm.register('deliveryBaseDays')} type="number" step="1" placeholder="Base delivery days" className="w-full px-4 py-2 rounded-xl bg-white/80" />
            <input {...settingsForm.register('deliveryPerStemDays')} type="number" step="0.01" placeholder="Per stem days" className="w-full px-4 py-2 rounded-xl bg-white/80" />
            <input {...settingsForm.register('deliveryFee')} type="number" step="0.01" placeholder="Delivery fee" className="w-full px-4 py-2 rounded-xl bg-white/80" />
            <button className="px-5 py-2 rounded-full bg-pink-600 text-white">Save</button>
          </form>
        </GlassCard>
      )}
    </div>
  )
}

export default AdminDashboard

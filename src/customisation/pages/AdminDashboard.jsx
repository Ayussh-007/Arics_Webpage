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
  const [editingFlower, setEditingFlower] = useState(null)
  const [editingCustomization, setEditingCustomization] = useState(null)
  const [addingOption, setAddingOption] = useState(null)

  const loginForm = useForm()
  const flowerForm = useForm({ defaultValues: { name: '', pricePerStem: 0, stock: 0, imageUrl: '' } })
  const editFlowerForm = useForm()
  const customForm = useForm({
    defaultValues: { category: '', label: '', inputType: 'radio', optionName: '', optionPrice: 0 },
  })
  const optionForm = useForm({ defaultValues: { name: '', price: 0 } })
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
    try {
      await createFlower(values)
      flowerForm.reset()
      loadAll()
      toast.success('Flower added!')
    } catch (err) {
      toast.error('Failed to add flower')
    }
  }

  const onUpdateFlower = async (values) => {
    try {
      await updateFlower(editingFlower._id, values)
      setEditingFlower(null)
      loadAll()
      toast.success('Flower updated!')
    } catch (err) {
      toast.error('Failed to update flower')
    }
  }

  const onCreateCustomization = async (values) => {
    try {
      const payload = {
        category: values.category,
        label: values.label,
        inputType: values.inputType,
        options: [{ name: values.optionName, price: Number(values.optionPrice || 0) }],
      }
      await createCustomization(payload)
      customForm.reset()
      loadAll()
      toast.success('Customization category added!')
    } catch (err) {
      toast.error('Failed to add customization')
    }
  }

  const onAddOption = async (values) => {
    try {
      const custom = customizations.find(c => c._id === addingOption)
      const newOptions = [...custom.options, { name: values.name, price: Number(values.price || 0) }]
      await updateCustomization(addingOption, { options: newOptions })
      setAddingOption(null)
      optionForm.reset()
      loadAll()
      toast.success('Option added!')
    } catch (err) {
      toast.error('Failed to add option')
    }
  }

  const onRemoveOption = async (customId, optionName) => {
    try {
      const custom = customizations.find(c => c._id === customId)
      const newOptions = custom.options.filter(o => o.name !== optionName)
      await updateCustomization(customId, { options: newOptions })
      loadAll()
      toast.success('Option removed!')
    } catch (err) {
      toast.error('Failed to remove option')
    }
  }

  const onUpdateSettings = async (values) => {
    try {
      await updateSettings(values)
      toast.success('Settings saved')
    } catch (err) {
      toast.error('Failed to save settings')
    }
  }

  if (!authed) {
    return (
      <GlassCard className="p-8 max-w-md mx-auto">
        <h3 className="text-2xl font-['Italiana'] text-pink-700 mb-4">Admin Login</h3>
        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
          <div>
            <label className="block text-sm font-['Cinzel'] text-pink-800 mb-2">Email</label>
            <input
              {...loginForm.register('email')}
              placeholder="admin@arics.com"
              className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-['Cinzel'] text-pink-800 mb-2">Password</label>
            <input
              {...loginForm.register('password')}
              placeholder="••••••••"
              type="password"
              className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button className="px-6 py-3 rounded-full bg-pink-600 text-white w-full font-['Cinzel'] tracking-wider hover:bg-pink-700 transition-colors">
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
            className={`px-4 py-2 rounded-full font-['Cinzel'] text-sm tracking-wider transition-all ${
              tab === t ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-pink-800 border border-pink-300 hover:bg-pink-50'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-xl font-['Italiana'] text-pink-700">Recent Orders</h3>
          {orders.length === 0 && <p className="text-sm text-pink-600">No orders yet.</p>}
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order._id} className="text-sm text-pink-900 border-b border-pink-200 pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold font-['Cinzel']">{order.customer?.name}</div>
                    <div className="text-xs text-pink-700">{order.customer?.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-pink-800">₹{order.pricing?.total?.toFixed(2)}</div>
                    <div className="text-xs text-pink-600">
                      {order.deliveryEstimate?.startDate} - {order.deliveryEstimate?.endDate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {tab === 'flowers' && (
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xl font-['Italiana'] text-pink-700">Add Flower</h3>
            <form onSubmit={flowerForm.handleSubmit(onCreateFlower)} className="space-y-3">
              <div>
                <label className="block text-sm font-['Cinzel'] text-pink-800 mb-1">Flower Name</label>
                <input 
                  {...flowerForm.register('name')} 
                  placeholder="Rose" 
                  className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-['Cinzel'] text-pink-800 mb-1">Price per Stem (₹)</label>
                <input 
                  {...flowerForm.register('pricePerStem')} 
                  type="number" 
                  step="0.01"
                  placeholder="50" 
                  className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-['Cinzel'] text-pink-800 mb-1">Stock Quantity</label>
                <input 
                  {...flowerForm.register('stock')} 
                  type="number" 
                  placeholder="100" 
                  className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-['Cinzel'] text-pink-800 mb-1">Image URL (optional)</label>
                <input 
                  {...flowerForm.register('imageUrl')} 
                  placeholder="https://..." 
                  className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                />
              </div>
              <button className="px-5 py-2 rounded-full bg-pink-600 text-white font-['Cinzel'] tracking-wider hover:bg-pink-700 transition-colors w-full">
                Create Flower
              </button>
            </form>
          </GlassCard>
          
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xl font-['Italiana'] text-pink-700">Flower Inventory</h3>
            <div className="space-y-3">
              {flowers.map((flower) => (
                <div key={flower._id} className="border border-pink-200 rounded-xl p-4 bg-white/50">
                  {editingFlower?._id === flower._id ? (
                    <form onSubmit={editFlowerForm.handleSubmit(onUpdateFlower)} className="space-y-3">
                      <div>
                        <label className="block text-xs font-['Cinzel'] text-pink-700 mb-1">Name</label>
                        <input 
                          {...editFlowerForm.register('name')} 
                          defaultValue={flower.name}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-pink-300 text-pink-900 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-['Cinzel'] text-pink-700 mb-1">Price (₹)</label>
                          <input 
                            {...editFlowerForm.register('pricePerStem')} 
                            type="number"
                            step="0.01"
                            defaultValue={flower.pricePerStem}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-pink-300 text-pink-900 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-['Cinzel'] text-pink-700 mb-1">Stock</label>
                          <input 
                            {...editFlowerForm.register('stock')} 
                            type="number"
                            defaultValue={flower.stock}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-pink-300 text-pink-900 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" 
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 rounded-lg bg-pink-600 text-white text-sm font-['Cinzel'] hover:bg-pink-700 transition-colors">
                          Save
                        </button>
                        <button type="button" onClick={() => setEditingFlower(null)} className="px-4 py-2 rounded-lg bg-white border border-pink-300 text-pink-800 text-sm font-['Cinzel'] hover:bg-pink-50 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold font-['Italiana'] text-pink-800">{flower.name}</p>
                        <p className="text-sm text-pink-700">₹{flower.pricePerStem} per stem</p>
                        <p className="text-xs text-pink-600">Stock: {flower.stock} | Status: {flower.enabled ? 'Enabled' : 'Disabled'}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingFlower(flower)
                            editFlowerForm.reset(flower)
                          }}
                          className="px-3 py-1 rounded-lg bg-white border border-pink-300 text-pink-800 text-sm font-['Cinzel'] hover:bg-pink-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => updateFlower(flower._id, { enabled: !flower.enabled }).then(loadAll)}
                          className="px-3 py-1 rounded-lg bg-pink-100 text-pink-800 text-sm font-['Cinzel'] hover:bg-pink-200 transition-colors"
                        >
                          {flower.enabled ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this flower?')) {
                              deleteFlower(flower._id).then(loadAll)
                            }
                          }}
                          className="px-3 py-1 rounded-lg bg-rose-500 text-white text-sm font-['Cinzel'] hover:bg-rose-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {tab === 'customizations' && (
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xl font-['Italiana'] text-pink-700">Add Customization Category</h3>
            <form onSubmit={customForm.handleSubmit(onCreateCustomization)} className="space-y-3">
              <div>
                <label className="block text-sm font-['Cinzel'] text-pink-800 mb-1">Category Key</label>
                <input 
                  {...customForm.register('category')} 
                  placeholder="wrapping" 
                  className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                />
                <p className="text-xs text-pink-600 mt-1">Unique identifier (e.g., wrapping, ribbon)</p>
              </div>
              <div>
                <label className="block text-sm font-['Cinzel'] text-pink-800 mb-1">Display Label</label>
                <input 
                  {...customForm.register('label')} 
                  placeholder="Gift Wrapping" 
                  className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                />
                <p className="text-xs text-pink-600 mt-1">Shown to customers</p>
              </div>
              <div>
                <label className="block text-sm font-['Cinzel'] text-pink-800 mb-1">Input Type</label>
                <select 
                  {...customForm.register('inputType')} 
                  className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="radio">Single Choice (Radio)</option>
                  <option value="checkbox">Multiple Choice (Checkbox)</option>
                  <option value="quantity">Quantity Selector</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-['Cinzel'] text-pink-800 mb-1">First Option Name</label>
                <input 
                  {...customForm.register('optionName')} 
                  placeholder="Basic Paper" 
                  className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-['Cinzel'] text-pink-800 mb-1">First Option Price (₹)</label>
                <input 
                  {...customForm.register('optionPrice')} 
                  type="number" 
                  step="0.01"
                  placeholder="10" 
                  className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                />
              </div>
              <button className="px-5 py-2 rounded-full bg-pink-600 text-white font-['Cinzel'] tracking-wider hover:bg-pink-700 transition-colors w-full">
                Create Category
              </button>
            </form>
          </GlassCard>
          
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xl font-['Italiana'] text-pink-700">Customization Categories & Options</h3>
            <div className="space-y-4">
              {customizations.map((cat) => (
                <div key={cat._id} className="border border-pink-200 rounded-xl p-4 bg-white/50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold font-['Italiana'] text-pink-800 text-lg">{cat.label}</p>
                      <p className="text-xs text-pink-600">
                        Key: {cat.category} | Type: {cat.inputType} | Status: {cat.enabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateCustomization(cat._id, { enabled: !cat.enabled }).then(loadAll)}
                        className="px-3 py-1 rounded-lg bg-pink-100 text-pink-800 text-xs font-['Cinzel'] hover:bg-pink-200 transition-colors"
                      >
                        {cat.enabled ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this category and all its options?')) {
                            deleteCustomization(cat._id).then(loadAll)
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-rose-500 text-white text-xs font-['Cinzel'] hover:bg-rose-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-['Cinzel'] text-pink-700 mb-2">Options:</p>
                    <div className="space-y-2">
                      {cat.options.map((opt) => (
                        <div key={opt.name} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-pink-200">
                          <div>
                            <span className="text-sm text-pink-900 font-medium">{opt.name}</span>
                            <span className="text-sm text-pink-700 ml-2">+₹{opt.price || opt.priceImpact || 0}</span>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm(`Remove option "${opt.name}"?`)) {
                                onRemoveOption(cat._id, opt.name)
                              }
                            }}
                            className="text-rose-500 hover:text-rose-700 text-xs font-['Cinzel']"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {addingOption === cat._id ? (
                      <form onSubmit={optionForm.handleSubmit(onAddOption)} className="mt-3 p-3 bg-pink-50 rounded-lg space-y-2">
                        <div>
                          <label className="block text-xs font-['Cinzel'] text-pink-700 mb-1">Option Name</label>
                          <input 
                            {...optionForm.register('name')} 
                            placeholder="Premium Silk" 
                            className="w-full px-3 py-2 rounded-lg bg-white border border-pink-300 text-pink-900 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-['Cinzel'] text-pink-700 mb-1">Price (₹)</label>
                          <input 
                            {...optionForm.register('price')} 
                            type="number" 
                            step="0.01"
                            placeholder="25" 
                            className="w-full px-3 py-2 rounded-lg bg-white border border-pink-300 text-pink-900 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" 
                          />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="px-4 py-2 rounded-lg bg-pink-600 text-white text-sm font-['Cinzel'] hover:bg-pink-700 transition-colors">
                            Add Option
                          </button>
                          <button 
                            type="button" 
                            onClick={() => {
                              setAddingOption(null)
                              optionForm.reset()
                            }}
                            className="px-4 py-2 rounded-lg bg-white border border-pink-300 text-pink-800 text-sm font-['Cinzel'] hover:bg-pink-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setAddingOption(cat._id)}
                        className="mt-2 text-sm text-pink-600 hover:text-pink-800 font-['Cinzel'] underline"
                      >
                        + Add New Option
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {tab === 'settings' && (
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-xl font-['Italiana'] text-pink-700">Store Settings</h3>
          <form onSubmit={settingsForm.handleSubmit(onUpdateSettings)} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-['Cinzel'] text-pink-800 mb-2">Tax Rate (%)</label>
              <input 
                {...settingsForm.register('taxRate')} 
                type="number" 
                step="0.01" 
                placeholder="0.06" 
                className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
              />
              <p className="text-xs text-pink-600 mt-1">e.g., 0.06 for 6%</p>
            </div>
            <div>
              <label className="block text-sm font-['Cinzel'] text-pink-800 mb-2">Base Delivery Days</label>
              <input 
                {...settingsForm.register('deliveryBaseDays')} 
                type="number" 
                step="1" 
                placeholder="2" 
                className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
              />
              <p className="text-xs text-pink-600 mt-1">Minimum delivery time</p>
            </div>
            <div>
              <label className="block text-sm font-['Cinzel'] text-pink-800 mb-2">Per Stem Days</label>
              <input 
                {...settingsForm.register('deliveryPerStemDays')} 
                type="number" 
                step="0.01" 
                placeholder="0.02" 
                className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
              />
              <p className="text-xs text-pink-600 mt-1">Additional days per flower stem</p>
            </div>
            <div>
              <label className="block text-sm font-['Cinzel'] text-pink-800 mb-2">Delivery Fee (₹)</label>
              <input 
                {...settingsForm.register('deliveryFee')} 
                type="number" 
                step="0.01" 
                placeholder="4.99" 
                className="w-full px-4 py-2 rounded-xl bg-white border border-pink-300 text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" 
              />
              <p className="text-xs text-pink-600 mt-1">Flat delivery charge</p>
            </div>
            <button className="px-5 py-2 rounded-full bg-pink-600 text-white font-['Cinzel'] tracking-wider hover:bg-pink-700 transition-colors md:col-span-2">
              Save Settings
            </button>
          </form>
        </GlassCard>
      )}
    </div>
  )
}

export default AdminDashboard

import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../../api/client'
import { sendOrderEmail } from '../../customisation/api/services'

const STATUSES = [
  { id: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-800' },
  { id: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { id: 'payment_received', label: 'Payment received', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'preparing', label: 'Preparing', color: 'bg-purple-100 text-purple-800' },
  { id: 'out_for_delivery', label: 'Out for delivery', color: 'bg-pink-100 text-pink-800' },
  { id: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { id: 'cancelled', label: 'Cancelled', color: 'bg-rose-100 text-rose-800' },
]

const statusMeta = (status) => STATUSES.find((s) => s.id === status) || STATUSES[0]

const fmtMoney = (v) => {
  const n = Number(v || 0)
  return n.toFixed(2)
}

const safe = (v) => (v == null ? '' : String(v))

const toCsv = (orders) => {
  const headers = [
    'id',
    'createdAt',
    'status',
    'customerName',
    'customerEmail',
    'customerPhone',
    'customerAddress',
    'quantity',
    'total',
    'deliveryStart',
    'deliveryEnd',
  ]

  const rows = orders.map((o) => [
    safe(o._id),
    safe(o.createdAt),
    safe(o.status),
    safe(o.customer?.name),
    safe(o.customer?.email),
    safe(o.customer?.phone),
    safe(o.customer?.address),
    safe(o.selection?.quantity),
    safe(o.pricing?.total),
    safe(o.deliveryEstimate?.startDate),
    safe(o.deliveryEstimate?.endDate),
  ])

  const escape = (cell) => {
    const s = safe(cell)
    if (/[\n\r,\"]/g.test(s)) return `"${s.replaceAll('"', '""')}"`
    return s
  }

  return [headers.join(','), ...rows.map((r) => r.map(escape).join(','))].join('\n')
}

const downloadText = (filename, text) => {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/orders')
      setOrders(Array.isArray(data) ? data : [])
    } catch (err) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false
      if (!q) return true
      const hay = [
        o._id,
        o.customer?.name,
        o.customer?.email,
        o.customer?.phone,
        o.customer?.address,
        o.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [orders, query, statusFilter])

  const stats = useMemo(() => {
    const total = orders.length
    const byStatus = Object.fromEntries(STATUSES.map((s) => [s.id, 0]))
    for (const o of orders) byStatus[o.status] = (byStatus[o.status] || 0) + 1
    const revenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + Number(o.pricing?.total || 0), 0)
    return { total, byStatus, revenue }
  }, [orders])

  const onUpdateStatus = async (orderId, status) => {
    setUpdating(true)
    try {
      await api.patch(`/orders/${orderId}`, { status })
      toast.success('Order updated')
      await load()
      setSelected((prev) => (prev && prev._id === orderId ? { ...prev, status } : prev))
    } catch (err) {
      toast.error('Failed to update order')
    } finally {
      setUpdating(false)
    }
  }

  const onConfirmAndSendMail = async (orderId) => {
    setUpdating(true)
    try {
      await api.post(`/orders/${orderId}/confirm`)
      toast.success('Confirmation email sent')
      await load()
      setSelected((prev) => (prev && prev._id === orderId ? { ...prev, status: 'confirmed' } : prev))
    } catch (err) {
      toast.error('Failed to send email (check SMTP + payment QR config)')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-gray-900">Orders</h2>
          <p className="text-gray-600 font-['Cormorant_Garamond'] text-lg italic">Manage deliveries, statuses, and customer details.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={load}
            className="px-4 py-2 rounded-full bg-white/70 border border-pink-200 text-pink-800 font-['Cinzel'] text-xs tracking-wider hover:bg-white transition"
          >
            Refresh
          </button>
          <button
            onClick={() => downloadText(`arics-orders-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(filtered))}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-['Cinzel'] text-xs tracking-wider shadow hover:shadow-lg transition"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white/45 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow">
          <div className="text-xs font-['Cinzel'] tracking-widest text-pink-800">Total</div>
          <div className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mt-1">{stats.total}</div>
        </div>
        <div className="bg-white/45 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow">
          <div className="text-xs font-['Cinzel'] tracking-widest text-pink-800">Pending</div>
          <div className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mt-1">{stats.byStatus.pending || 0}</div>
        </div>
        <div className="bg-white/45 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow">
          <div className="text-xs font-['Cinzel'] tracking-widest text-pink-800">Delivered</div>
          <div className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mt-1">{stats.byStatus.delivered || 0}</div>
        </div>
        <div className="bg-white/45 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow">
          <div className="text-xs font-['Cinzel'] tracking-widest text-pink-800">Revenue</div>
          <div className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mt-1">₹{fmtMoney(stats.revenue)}</div>
        </div>
      </div>

      <div className="bg-white/45 backdrop-blur-xl border border-white/30 rounded-3xl p-4 md:p-6 shadow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-7">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email, phone, status, order id…"
                className="w-full bg-white/70 border border-pink-200 rounded-full px-5 py-3 pl-11 text-sm font-['Montserrat'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="md:col-span-5">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white/70 border border-pink-200 rounded-full px-5 py-3 text-sm font-['Montserrat'] text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="all">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/45 backdrop-blur-xl border border-white/30 rounded-3xl shadow overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-pink-700 font-['Cormorant_Garamond'] text-xl">Loading orders…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-5xl mb-2">🌸</div>
            <div className="text-pink-700 font-['Cormorant_Garamond'] text-xl italic">No orders found.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-['Cinzel'] tracking-widest">Order</th>
                  <th className="px-5 py-4 text-left text-xs font-['Cinzel'] tracking-widest">Customer</th>
                  <th className="px-5 py-4 text-left text-xs font-['Cinzel'] tracking-widest">Total</th>
                  <th className="px-5 py-4 text-left text-xs font-['Cinzel'] tracking-widest">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-['Cinzel'] tracking-widest">Delivery</th>
                  <th className="px-5 py-4 text-right text-xs font-['Cinzel'] tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100/70">
                {filtered.map((o) => {
                  const meta = statusMeta(o.status)
                  return (
                    <tr key={o._id} className="hover:bg-white/50 transition">
                      <td className="px-5 py-4">
                        <div className="text-sm font-['Cinzel'] text-gray-900">#{String(o._id).slice(-6).toUpperCase()}</div>
                        <div className="text-xs text-gray-500 font-['Montserrat']">{new Date(o.createdAt).toLocaleString()}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-sm font-['Playfair_Display'] font-bold text-gray-900">{o.customer?.name}</div>
                        <div className="text-xs text-gray-600 font-['Montserrat']">{o.customer?.email}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-sm font-['Montserrat'] font-bold text-gray-900">₹{fmtMoney(o.pricing?.total)}</div>
                        <div className="text-xs text-gray-500 font-['Montserrat']">Qty: {o.selection?.quantity}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-['Cinzel'] tracking-wider ${meta.color}`}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-xs text-gray-700 font-['Montserrat']">
                          {o.deliveryEstimate?.startDate} → {o.deliveryEstimate?.endDate}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelected(o)}
                          className="px-4 py-2 rounded-full bg-white/80 border border-pink-200 text-pink-800 text-xs font-['Cinzel'] tracking-wider hover:bg-white transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
            <motion.div
              className="relative w-full md:max-w-3xl bg-white/80 backdrop-blur-2xl border border-white/40 rounded-t-3xl md:rounded-3xl shadow-2xl p-6 md:p-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-['Cinzel'] tracking-widest text-pink-800">Order</div>
                  <div className="text-2xl font-['Playfair_Display'] font-bold text-gray-900">#{String(selected._id).slice(-6).toUpperCase()}</div>
                  <div className="text-xs text-gray-600 font-['Montserrat'] mt-1">{new Date(selected.createdAt).toLocaleString()}</div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-full bg-white/70 border border-pink-200 text-pink-700 hover:bg-white"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-white/60 border border-pink-100 rounded-2xl p-4">
                  <div className="text-xs font-['Cinzel'] tracking-widest text-pink-800">Customer</div>
                  <div className="mt-2 text-sm font-['Playfair_Display'] font-bold text-gray-900">{selected.customer?.name}</div>
                  <div className="text-xs text-gray-700 font-['Montserrat'] mt-1">{selected.customer?.email}</div>
                  <div className="text-xs text-gray-700 font-['Montserrat'] mt-1">{selected.customer?.phone}</div>
                  <div className="text-xs text-gray-700 font-['Montserrat'] mt-2">{selected.customer?.address}</div>
                </div>

                <div className="bg-white/60 border border-pink-100 rounded-2xl p-4">
                  <div className="text-xs font-['Cinzel'] tracking-widest text-pink-800">Pricing</div>
                  <div className="mt-2 text-sm font-['Montserrat'] text-gray-800 space-y-1">
                    <div className="flex justify-between"><span>Base</span><span>₹{fmtMoney(selected.pricing?.base)}</span></div>
                    <div className="flex justify-between"><span>Add-ons</span><span>₹{fmtMoney(selected.pricing?.addOns)}</span></div>
                    <div className="flex justify-between"><span>Tax</span><span>₹{fmtMoney(selected.pricing?.tax)}</span></div>
                    <div className="flex justify-between"><span>Delivery</span><span>₹{fmtMoney(selected.pricing?.delivery)}</span></div>
                    <div className="pt-2 mt-2 border-t border-pink-100 flex justify-between font-bold"><span>Total</span><span>₹{fmtMoney(selected.pricing?.total)}</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white/60 border border-pink-100 rounded-2xl p-4">
                <div className="text-xs font-['Cinzel'] tracking-widest text-pink-800">Items</div>
                <div className="mt-3 grid md:grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs font-['Cinzel'] text-pink-700">Flowers</div>
                    <div className="mt-2 space-y-1">
                      {(selected.selection?.flowers || []).map((f, idx) => (
                        <div key={idx} className="flex justify-between text-xs font-['Montserrat'] text-gray-800">
                          <span>{f.name} × {f.stems}</span>
                          <span>₹{fmtMoney(Number(f.stems || 0) * Number(f.pricePerStem || 0))}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-['Cinzel'] text-pink-700">Customizations</div>
                    <div className="mt-2 space-y-1">
                      {(selected.selection?.customizations || []).length === 0 ? (
                        <div className="text-xs text-gray-500 font-['Montserrat']">None</div>
                      ) : (
                        (selected.selection?.customizations || []).map((c, idx) => (
                          <div key={idx} className="flex justify-between text-xs font-['Montserrat'] text-gray-800">
                            <span>{c.option || c.category}{c.quantity ? ` × ${c.quantity}` : ''}</span>
                            <span>₹{fmtMoney(Number(c.price || 0) * Number(c.quantity || 1))}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-['Cinzel'] tracking-widest text-pink-800">Status</span>
                  <select
                    value={selected.status}
                    onChange={(e) => setSelected((prev) => ({ ...prev, status: e.target.value }))}
                    className="bg-white/80 border border-pink-200 rounded-full px-4 py-2 text-xs font-['Cinzel'] tracking-wider text-pink-900"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <button
                    disabled={updating}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(selected._id)
                        toast.success('Order ID copied')
                      } catch {
                        toast.error('Copy failed')
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-white/80 border border-pink-200 text-pink-800 text-xs font-['Cinzel'] tracking-wider hover:bg-white disabled:opacity-60"
                  >
                    Copy ID
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => onUpdateStatus(selected._id, selected.status)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-['Cinzel'] tracking-wider shadow hover:shadow-lg disabled:opacity-60"
                  >
                    {updating ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    disabled={updating || !selected.customer?.email}
                    onClick={async () => {
                      try {
                        const html = buildEmailHtml(selected)
                        setUpdating(true)
                        await sendOrderEmail(selected._id, {
                          to: selected.customer?.email,
                          subject: `Your Arics order is confirmed (#${String(selected._id).slice(-6).toUpperCase()})`,
                          html,
                        })
                        toast.success('Email sent')
                      } catch (e) {
                        const msg = getErrorMessage(e)
                        toast.error(`Email failed: ${msg}`)
                      } finally {
                        setUpdating(false)
                      }
                    }}
                    title={!selected.customer?.email ? 'No customer email on order' : 'Send confirmation email'}
                    className="px-4 py-2 rounded-full bg-white/80 border border-emerald-300 text-emerald-700 text-xs font-['Cinzel'] tracking-wider hover:bg-white disabled:opacity-60"
                  >
                    Send mail
                  </button>
                  <button
                    onClick={() => setPreviewHtml(buildEmailHtml(selected))}
                    className="px-4 py-2 rounded-full bg-white/80 border border-pink-200 text-pink-800 text-xs font-['Cinzel'] tracking-wider hover:bg-white"
                  >
                    Preview email
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Preview Modal */}
      <AnimatePresence>
        {previewHtml && (
          <motion.div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setPreviewHtml('')} />
            <motion.div className="relative w-full md:max-w-3xl bg-white/90 backdrop-blur-xl border border-white/40 rounded-t-3xl md:rounded-3xl shadow-2xl p-0 overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-pink-100 bg-white/70">
                <div className="text-sm font-['Cinzel'] tracking-wider text-pink-800">Email preview</div>
                <div className="flex gap-2">
                  <button
                    onClick={async () => { try { await navigator.clipboard.writeText(previewHtml); toast.success('Copied HTML'); } catch { toast.error('Copy failed') } }}
                    className="px-3 py-1 rounded-full bg-white border border-pink-200 text-pink-800 text-xs font-['Cinzel']"
                  >Copy HTML</button>
                  <button
                    onClick={() => setPreviewHtml('')}
                    className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-['Cinzel']"
                  >Close</button>
                </div>
              </div>
              <div className="max-h-[70vh] overflow-auto p-4">
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
function buildEmailHtml(order) {
  // Build QR URL - use actual qr.png path from server
  const qrUrl = import.meta.env.VITE_QR_IMAGE_URL || 'https://via.placeholder.com/240x240?text=Scan+to+Pay'
  const name = order.customer?.name || 'Customer'
  const id = String(order._id || '').slice(-6).toUpperCase()
  const total = Number(order.pricing?.total || 0).toFixed(2)
  const status = order.status || 'pending'
  
  // Fix delivery estimate - convert object to string
  let delivery = 'To be confirmed'
  if (order.deliveryEstimate) {
    if (typeof order.deliveryEstimate === 'string') {
      delivery = order.deliveryEstimate
    } else if (order.deliveryEstimate.startDate && order.deliveryEstimate.endDate) {
      delivery = `${order.deliveryEstimate.startDate} - ${order.deliveryEstimate.endDate}`
    } else if (order.deliveryEstimate.startDate) {
      delivery = order.deliveryEstimate.startDate
    }
  }
  
  const address = order.customer?.address || 'Your address'
  
  // Build order details section (common for some templates)
  const orderDetailsLines = []
  
  // Flowers
  if (Array.isArray(order.selection?.flowers) && order.selection.flowers.length) {
    orderDetailsLines.push('<h4 style="margin:12px 0 4px">Flowers</h4>')
    orderDetailsLines.push('<ul style="margin:0;padding-left:16px">')
    for (const f of order.selection.flowers) {
      orderDetailsLines.push(`<li>${f.name} × ${f.stems}</li>`)
    }
    orderDetailsLines.push('</ul>')
  }
  
  // Customizations
  if (Array.isArray(order.selection?.customizations) && order.selection.customizations.length) {
    orderDetailsLines.push('<h4 style="margin:12px 0 4px">Customizations</h4>')
    orderDetailsLines.push('<ul style="margin:0;padding-left:16px">')
    for (const c of order.selection.customizations) {
      const qty = c.quantity ? ` × ${c.quantity}` : ''
      orderDetailsLines.push(`<li>${c.category}: ${c.option}${qty}</li>`)
    }
    orderDetailsLines.push('</ul>')
  }
  
  // Generic items (for cart-based orders)
  if (Array.isArray(order.selection?.items) && order.selection.items.length) {
    orderDetailsLines.push('<h4 style="margin:12px 0 4px">Items</h4>')
    orderDetailsLines.push('<ul style="margin:0;padding-left:16px">')
    for (const it of order.selection.items) {
      orderDetailsLines.push(`<li>${it.name} × ${it.quantity}</li>`)
    }
    orderDetailsLines.push('</ul>')
  }
  
  const orderDetails = orderDetailsLines.join('')
  
  // Status-specific email templates matching backend
  const emailTemplates = {
    pending: `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111827; max-width:640px; margin:0 auto; padding:18px;">
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Order Received! 🌸</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${id}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Thank you for choosing Arics! We've received your order and will review it shortly.</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">Order Summary</div>
          ${orderDetails}
          <p style="margin:6px 0 0; color:#374151;"><strong>Total:</strong> ₹${total}</p>
          <p style="margin:6px 0 0; color:#374151;"><strong>Status:</strong> Pending Review</p>
          <p style="margin:10px 0 0; color:#6b7280; font-size:13px;">We'll send you a confirmation email once your order is confirmed.</p>
        </div>
      </div>
    `,
    
    confirmed: `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111827; max-width:640px; margin:0 auto; padding:18px;">
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Order Confirmed! ✨</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${id}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Your order is confirmed and scheduled for preparation!</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">Order Details</div>
          ${orderDetails}
          <p style="margin:6px 0 0; color:#374151;"><strong>Total:</strong> ₹${total}</p>
          <p style="margin:6px 0 0; color:#374151;"><strong>Delivery:</strong> ${delivery}</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">💳 Payment Required</div>
          <p style="margin:6px 0 0; color:#374151;">Please scan the QR code below to complete your payment.</p>
          <div style="margin-top:10px; text-align:center;"><img src="${qrUrl}" width="220" height="220" alt="Payment QR" style="border-radius:12px; border:1px solid rgba(236,72,153,0.18)"/></div>
        </div>
      </div>
    `,
    
    payment_received: `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111827; max-width:640px; margin:0 auto; padding:18px;">
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Payment Received! 💝</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${id}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">We've received your payment of <strong>₹${total}</strong>. Thank you!</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">What's Next?</div>
          <p style="margin:6px 0 0; color:#374151;">Our expert florists will now begin preparing your beautiful bouquet with the utmost care.</p>
          <p style="margin:6px 0 0; color:#374151;">Expected delivery: <strong>${delivery}</strong></p>
        </div>
      </div>
    `,
    
    preparing: `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111827; max-width:640px; margin:0 auto; padding:18px;">
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Crafting Your Bouquet 🌹</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${id}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Our talented florists are carefully arranging your flowers!</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">🎨 In Progress</div>
          <p style="margin:6px 0 0; color:#374151;">Each stem is being selected and arranged with love and expertise.</p>
          <p style="margin:6px 0 0; color:#374151;">Your bouquet will be ready for delivery soon!</p>
        </div>
      </div>
    `,
    
    out_for_delivery: `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111827; max-width:640px; margin:0 auto; padding:18px;">
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Out for Delivery! 🚚</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${id}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Your beautiful bouquet is on its way to you!</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">📦 Delivery in Progress</div>
          <p style="margin:6px 0 0; color:#374151;">Your flowers are being carefully transported to ensure they arrive fresh and beautiful.</p>
          <p style="margin:6px 0 0; color:#374151;"><strong>Delivery to:</strong> ${name}</p>
          <p style="margin:6px 0 0; color:#374151;"><strong>Address:</strong> ${address}</p>
        </div>
      </div>
    `,
    
    delivered: `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111827; max-width:640px; margin:0 auto; padding:18px;">
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Delivered Successfully! 🎉</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${id}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Your bouquet has been delivered. We hope you love it!</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">💐 Enjoy Your Flowers!</div>
          <p style="margin:6px 0 0; color:#374151;">We hope your flowers bring joy and beauty to your space.</p>
          <p style="margin:10px 0 0; color:#374151;"><strong>Care Tips:</strong></p>
          <ul style="margin:6px 0 0 20px; color:#374151;">
            <li>Change water every 2-3 days</li>
            <li>Trim stems at an angle</li>
            <li>Keep away from direct sunlight</li>
            <li>Remove wilted flowers promptly</li>
          </ul>
          <p style="margin:10px 0 0; color:#6b7280; font-size:13px;">Thank you for choosing Arics! We'd love to hear your feedback.</p>
        </div>
      </div>
    `,
    
    cancelled: `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111827; max-width:640px; margin:0 auto; padding:18px;">
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Order Cancelled</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${id}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Your order has been cancelled.</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">What Happened?</div>
          <p style="margin:6px 0 0; color:#374151;">This order has been cancelled as requested.</p>
          <p style="margin:6px 0 0; color:#374151;">If you have any questions or if this was unexpected, please reply to this email or contact our support team.</p>
          <p style="margin:10px 0 0; color:#374151;"><strong>Order Total:</strong> ₹${total}</p>
          <p style="margin:6px 0 0; color:#6b7280; font-size:13px;">If payment was made, it will be refunded within 5-7 business days.</p>
        </div>
      </div>
    `
  }
  
  // Return the appropriate template based on status, fallback to confirmed
  return emailTemplates[status] || emailTemplates.confirmed
}

function getErrorMessage(err) {
  if (!err) return 'unknown error'
  const r = err.response
  if (r?.data?.message) return r.data.message
  if (r?.data?.error) return r.data.error
  if (r?.status) return `${r.status} ${r.statusText || ''}`.trim()
  return err.message || 'unknown error'
}

export default OrdersAdmin

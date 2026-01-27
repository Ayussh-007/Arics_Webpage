import express from 'express'
import Order from '../models/Order.js'
import Flower from '../models/Flower.js'
import AdminSettings from '../models/AdminSettings.js'
import { estimateDelivery } from '../utils/delivery.js'
import { protect, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.get('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { customer, selection } = req.body
    if (!customer || !selection) {
      res.status(400)
      return next(new Error('Invalid payload'))
    }

    const settings = await AdminSettings.findOne()
    const quantity = Number(selection.quantity || 0)

    const flowerIds = (selection.flowers || []).map((f) => f.flowerId)
    const flowers = await Flower.find({ _id: { $in: flowerIds } })
    const byId = new Map(flowers.map((f) => [String(f._id), f]))

    for (const item of selection.flowers || []) {
      const dbFlower = byId.get(String(item.flowerId))
      if (!dbFlower || !dbFlower.enabled) {
        res.status(400)
        return next(new Error(`Flower unavailable: ${item.name || item.flowerId}`))
      }
      if (item.stems > dbFlower.stock) {
        res.status(400)
        return next(new Error(`Insufficient stock for ${dbFlower.name}`))
      }
    }

    const base = (selection.flowers || []).reduce(
      (sum, f) => sum + Number(f.stems || 0) * Number(f.pricePerStem || 0),
      0,
    )
    const addOns = (selection.customizations || []).reduce(
      (sum, c) => sum + Number(c.price || 0) * (c.quantity || 1),
      0,
    )
    const taxRate = settings?.taxRate ?? 0.05
    const tax = (base + addOns) * taxRate
    const delivery = settings?.deliveryFee ?? 4.99
    const total = base + addOns + tax + delivery

    const estimate = estimateDelivery({
      quantity,
      locationCode: customer.locationCode,
      settings,
    })

    const order = await Order.create({
      customer,
      selection,
      pricing: { base, addOns, tax, delivery, total },
      deliveryEstimate: estimate,
    })

    for (const item of selection.flowers || []) {
      await Flower.findByIdAndUpdate(item.flowerId, { $inc: { stock: -item.stems } })
    }

    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
})

export default router

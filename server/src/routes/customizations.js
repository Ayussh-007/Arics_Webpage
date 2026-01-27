import express from 'express'
import CustomizationOption from '../models/CustomizationOption.js'
import { protect, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const includeDisabled = req.query.all === '1'
    const query = includeDisabled ? {} : { enabled: true }
    const items = await CustomizationOption.find(query).sort({ createdAt: -1 })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.post('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const created = await CustomizationOption.create(req.body)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const updated = await CustomizationOption.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    await CustomizationOption.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router

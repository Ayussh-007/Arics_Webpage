import express from 'express'
import AdminSettings from '../models/AdminSettings.js'
import { protect, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const settings = await AdminSettings.findOne()
    res.json(settings)
  } catch (err) {
    next(err)
  }
})

router.put('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const existing = await AdminSettings.findOne()
    const updated = existing
      ? await AdminSettings.findByIdAndUpdate(existing._id, req.body, { new: true })
      : await AdminSettings.create(req.body)
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

export default router

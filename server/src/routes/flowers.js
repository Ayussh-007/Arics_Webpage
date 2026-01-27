import express from 'express'
import Flower from '../models/Flower.js'
import { protect, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const includeDisabled = req.query.all === '1'
    const query = includeDisabled ? {} : { enabled: true }
    const flowers = await Flower.find(query).sort({ createdAt: -1 })
    res.json(flowers)
  } catch (err) {
    next(err)
  }
})

router.post('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const flower = await Flower.create(req.body)
    res.status(201).json(flower)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const flower = await Flower.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(flower)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    await Flower.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router

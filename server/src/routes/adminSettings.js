import express from 'express'
import AdminSettings from '../models/AdminSettings.js'
import { protect, requireRole } from '../middleware/auth.js'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const router = express.Router()

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true)
    } else {
      cb(new Error('Only PNG and JPEG images are allowed'))
    }
  }
})

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

// Upload QR code image
router.post('/qr-upload', protect, requireRole('admin'), upload.single('qrImage'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const existing = await AdminSettings.findOne()
    const settings = existing || new AdminSettings()

    settings.paymentQrImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      uploadedAt: new Date(),
    }

    await settings.save()
    
    res.json({ 
      message: 'QR code uploaded successfully',
      uploadedAt: settings.paymentQrImage.uploadedAt,
      contentType: settings.paymentQrImage.contentType,
      size: req.file.buffer.length
    })
  } catch (err) {
    next(err)
  }
})

// Upload QR from local file (for initial setup/seeding)
router.post('/qr-upload-from-file', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const qrPath = path.join(__dirname, '../assets/qr.png')

    if (!fs.existsSync(qrPath)) {
      return res.status(404).json({ error: 'QR file not found in assets folder' })
    }

    const qrBuffer = fs.readFileSync(qrPath)
    const existing = await AdminSettings.findOne()
    const settings = existing || new AdminSettings()

    settings.paymentQrImage = {
      data: qrBuffer,
      contentType: 'image/png',
      uploadedAt: new Date(),
    }

    await settings.save()
    
    res.json({ 
      message: 'QR code uploaded from file successfully',
      uploadedAt: settings.paymentQrImage.uploadedAt,
      size: qrBuffer.length
    })
  } catch (err) {
    next(err)
  }
})

// Get QR code image
router.get('/qr-image', async (req, res, next) => {
  try {
    const settings = await AdminSettings.findOne()
    
    if (!settings || !settings.paymentQrImage || !settings.paymentQrImage.data) {
      return res.status(404).json({ error: 'QR code not found' })
    }

    res.set('Content-Type', settings.paymentQrImage.contentType || 'image/png')
    res.set('Cache-Control', 'public, max-age=86400') // Cache for 24 hours
    res.send(settings.paymentQrImage.data)
  } catch (err) {
    next(err)
  }
})

// Delete QR code image
router.delete('/qr-image', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const settings = await AdminSettings.findOne()
    
    if (!settings || !settings.paymentQrImage) {
      return res.status(404).json({ error: 'QR code not found' })
    }

    settings.paymentQrImage = undefined
    await settings.save()
    
    res.json({ message: 'QR code deleted successfully' })
  } catch (err) {
    next(err)
  }
})

export default router

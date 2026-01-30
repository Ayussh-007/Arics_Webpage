import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './lib/db.js'
import { errorHandler, notFound } from './middleware/errors.js'
import authRoutes from './routes/auth.js'
import flowerRoutes from './routes/flowers.js'
import customizationRoutes from './routes/customizations.js'
import orderRoutes from './routes/orders.js'
import adminSettingsRoutes from './routes/adminSettings.js'
import productRoutes from './routes/products.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Configure CORS for production and development
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5002',
  'https://arics-webpage.vercel.app', // Update with your actual Vercel URL
]

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))

// Serve static assets (QR code, etc.)
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/flowers', flowerRoutes)
app.use('/api/customizations', customizationRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin/settings', adminSettingsRoutes)
app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('DB connection failed:', err.message)
    process.exit(1)
  })

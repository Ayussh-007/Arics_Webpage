import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'

// Load environment variables
dotenv.config({ path: '../server/.env' })

// Import routes
import authRoutes from '../server/src/routes/auth.js'
import productsRoutes from '../server/src/routes/products.js'
import flowersRoutes from '../server/src/routes/flowers.js'
import ordersRoutes from '../server/src/routes/orders.js'
import customizationRoutes from '../server/src/routes/customizations.js'
import adminSettingsRoutes from '../server/src/routes/adminSettings.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Connect to MongoDB
let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }

  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error('MONGODB_URI is not defined')
    }

    const connection = await mongoose.connect(uri)
    console.log('✅ Connected to MongoDB')
    cachedDb = connection
    return connection
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}

// Initialize database connection
connectToDatabase()

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Arics API is running' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/flowers', flowersRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/customizations', customizationRoutes)
app.use('/api/admin-settings', adminSettingsRoutes)

// 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

// Export for Vercel
export default app

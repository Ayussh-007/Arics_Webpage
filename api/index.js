import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Import routes
import authRoutes from '../server/src/routes/auth.js'
import productsRoutes from '../server/src/routes/products.js'
import flowersRoutes from '../server/src/routes/flowers.js'
import ordersRoutes from '../server/src/routes/orders.js'
import customizationRoutes from '../server/src/routes/customizations.js'
import adminSettingsRoutes from '../server/src/routes/adminSettings.js'

const app = express()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// MongoDB connection cache for serverless
let cachedDb = null

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log('Using cached database connection')
    return cachedDb
  }

  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }

    console.log('Connecting to MongoDB...')
    const connection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    
    console.log('✅ Connected to MongoDB')
    cachedDb = connection
    return connection
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    throw error
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  res.json({ 
    status: 'ok', 
    message: 'Arics API is running',
    database: dbStatus,
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/flowers', flowersRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/customizations', customizationRoutes)
app.use('/api/admin-settings', adminSettingsRoutes)

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    path: req.path,
    method: req.method
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  })
})

// Serverless function handler
export default async function handler(req, res) {
  try {
    // Connect to database before handling request
    await connectToDatabase()
    
    // Handle the request with Express
    return app(req, res)
  } catch (error) {
    console.error('Handler error:', error)
    return res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message 
    })
  }
}

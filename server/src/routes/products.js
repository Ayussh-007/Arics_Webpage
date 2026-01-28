import express from 'express'
import Product from '../models/Product.js'
import { protect, requireRole } from '../middleware/auth.js'

const router = express.Router()

// Public routes

// Get all active products with filters and sorting
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      sortBy = 'createdAt', 
      order = 'desc',
      limit = 50,
      skip = 0,
      featured,
      hasOffer
    } = req.query

    const query = { isActive: true }
    
    if (category) query.category = category
    if (featured === 'true') query.isFeatured = true
    if (hasOffer === 'true') query.hasOffer = true

    const sortOrder = order === 'asc' ? 1 : -1
    const sortOptions = {}
    
    if (sortBy === 'price') {
      sortOptions.discountedPrice = sortOrder
      sortOptions.originalPrice = sortOrder
    } else if (sortBy === 'popularity') {
      sortOptions.popularity = sortOrder
    } else if (sortBy === 'name') {
      sortOptions.name = sortOrder
    } else {
      sortOptions.createdAt = sortOrder
    }

    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .select('-__v')
      .lean()

    const total = await Product.countDocuments(query)

    res.json({
      products,
      total,
      page: Math.floor(skip / limit) + 1,
      pages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id, 
      isActive: true 
    })
      .populate('flowers.flowerId', 'name image pricePerStem')
      .lean()

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Admin routes (protected)

// Get all products (including inactive) - Admin only
router.get('/admin/all', protect, requireRole('admin'), async (req, res) => {
  try {
    const { sortBy = 'createdAt', order = 'desc' } = req.query
    const sortOrder = order === 'asc' ? 1 : -1
    const sortOptions = { [sortBy]: sortOrder }

    const products = await Product.find()
      .sort(sortOptions)
      .select('-__v')
      .lean()

    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new product - Admin only
router.post('/', protect, requireRole('admin'), async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update product - Admin only
router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Toggle product active status - Admin only
router.patch('/:id/toggle', protect, requireRole('admin'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    product.isActive = !product.isActive
    await product.save()

    res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete product - Admin only
router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ message: 'Product deleted successfully', product })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Increment popularity (on view/purchase) - Public
router.post('/:id/view', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { popularity: 1 } },
      { new: true }
    )

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ message: 'Popularity updated' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

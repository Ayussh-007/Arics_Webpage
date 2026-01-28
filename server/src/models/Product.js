import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true 
    },
    description: { 
      type: String, 
      required: true,
      maxlength: 200 
    },
    image: { 
      type: String, 
      required: true 
    },
    images: [{ 
      type: String 
    }], // Additional product images
    originalPrice: { 
      type: Number, 
      required: true,
      min: 0 
    },
    discountedPrice: { 
      type: Number,
      min: 0 
    },
    discountPercentage: { 
      type: Number,
      min: 0,
      max: 100 
    },
    category: { 
      type: String,
      enum: ['bouquet', 'arrangement', 'plant', 'gift', 'subscription'],
      default: 'bouquet'
    },
    stock: { 
      type: Number, 
      required: true,
      min: 0,
      default: 0 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    isFeatured: { 
      type: Boolean, 
      default: false 
    },
    hasOffer: { 
      type: Boolean, 
      default: false 
    },
    offerBadge: { 
      type: String,
      maxlength: 50 
    }, // e.g., "Valentine's Special", "20% OFF"
    popularity: { 
      type: Number, 
      default: 0 
    }, // For sorting by popularity
    tags: [{ 
      type: String 
    }], // e.g., ['roses', 'premium', 'luxury']
    flowers: [{
      flowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flower' },
      quantity: { type: Number }
    }], // Optional: link to individual flowers used
  },
  { 
    timestamps: true 
  }
)

// Virtual for effective price
productSchema.virtual('effectivePrice').get(function() {
  return this.discountedPrice || this.originalPrice
})

// Calculate discount percentage if not provided
productSchema.pre('save', function(next) {
  if (this.discountedPrice && this.originalPrice > this.discountedPrice) {
    this.discountPercentage = Math.round(
      ((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100
    )
    this.hasOffer = true
  } else {
    this.hasOffer = false
    this.discountPercentage = 0
  }
  next()
})

// Indexes for better query performance
productSchema.index({ category: 1, isActive: 1 })
productSchema.index({ popularity: -1 })
productSchema.index({ createdAt: -1 })

export default mongoose.model('Product', productSchema)

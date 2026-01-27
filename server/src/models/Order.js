import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      locationCode: { type: String },
    },
    selection: {
      quantity: { type: Number, required: true },
      flowers: [
        {
          flowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flower' },
          name: String,
          stems: Number,
          pricePerStem: Number,
        },
      ],
      customizations: [
        {
          category: String,
          option: String,
          price: Number,
          quantity: Number,
        },
      ],
      notes: { type: String },
    },
    pricing: {
      base: Number,
      addOns: Number,
      tax: Number,
      delivery: Number,
      total: Number,
    },
    deliveryEstimate: {
      startDate: String,
      endDate: String,
      days: Number,
    },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true },
)

export default mongoose.model('Order', orderSchema)

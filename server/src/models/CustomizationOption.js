import mongoose from 'mongoose'

const optionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    priceImpact: { type: Number, default: 0 },
    image: { type: String },
    enabled: { type: Boolean, default: true },
  },
  { _id: false },
)

const customizationSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    label: { type: String, required: true },
    inputType: { type: String, enum: ['radio', 'checkbox', 'quantity'], default: 'radio' },
    enabled: { type: Boolean, default: true },
    options: [optionSchema],
  },
  { timestamps: true },
)

export default mongoose.model('CustomizationOption', customizationSchema)

import mongoose from 'mongoose'

const flowerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    pricePerStem: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
    enabled: { type: Boolean, default: true },
    category: { type: String },
  },
  { timestamps: true },
)

export default mongoose.model('Flower', flowerSchema)

import mongoose from 'mongoose'

const adminSettingsSchema = new mongoose.Schema(
  {
    taxRate: { type: Number, default: 0.05 },
    deliveryBaseDays: { type: Number, default: 2 },
    deliveryPerStemDays: { type: Number, default: 0.02 },
    deliveryFee: { type: Number, default: 4.99 },
    locationOffsets: [
      {
        code: String,
        days: Number,
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.model('AdminSettings', adminSettingsSchema)

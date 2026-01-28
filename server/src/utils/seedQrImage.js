import mongoose from 'mongoose'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define AdminSettings schema inline for this script
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
    paymentQrImage: {
      data: Buffer,
      contentType: String,
      uploadedAt: Date,
    },
  },
  { timestamps: true },
)

const AdminSettings = mongoose.model('AdminSettings', adminSettingsSchema)

async function seedQrImage() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/arics'
    console.log('Connecting to MongoDB...')
    await mongoose.connect(mongoUri)
    console.log('✅ Connected to MongoDB')

    // Read QR image from assets folder
    const qrPath = path.join(__dirname, '../assets/qr.png')
    
    if (!fs.existsSync(qrPath)) {
      console.error('❌ Error: qr.png not found in server/src/assets/')
      console.log('Please make sure qr.png exists at:', qrPath)
      process.exit(1)
    }

    const qrBuffer = fs.readFileSync(qrPath)
    console.log(`✅ Read QR image from file (${qrBuffer.length} bytes)`)

    // Find or create AdminSettings
    let settings = await AdminSettings.findOne()
    
    if (!settings) {
      console.log('Creating new AdminSettings document...')
      settings = new AdminSettings()
    } else {
      console.log('Updating existing AdminSettings document...')
    }

    // Update QR image
    settings.paymentQrImage = {
      data: qrBuffer,
      contentType: 'image/png',
      uploadedAt: new Date(),
    }

    await settings.save()
    console.log('✅ QR image saved to database successfully!')
    console.log(`   - Size: ${qrBuffer.length} bytes`)
    console.log(`   - Content Type: image/png`)
    console.log(`   - Uploaded At: ${settings.paymentQrImage.uploadedAt}`)

    await mongoose.connection.close()
    console.log('✅ Database connection closed')
    console.log('\n🎉 QR image seeding complete!')
    
  } catch (error) {
    console.error('❌ Error seeding QR image:', error)
    process.exit(1)
  }
}

seedQrImage()

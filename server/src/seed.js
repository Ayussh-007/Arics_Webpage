import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDB } from './lib/db.js'
import User from './models/User.js'
import Flower from './models/Flower.js'
import CustomizationOption from './models/CustomizationOption.js'
import AdminSettings from './models/AdminSettings.js'
import { seedProducts } from './utils/seedProducts.js'

const seed = async () => {
  await connectDB()

  await Promise.all([
    User.deleteMany({}),
    Flower.deleteMany({}),
    CustomizationOption.deleteMany({}),
    AdminSettings.deleteMany({}),
  ])

  // Seed products
  await seedProducts()

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@arics.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!'
  const passwordHash = await bcrypt.hash(adminPassword, 10)

  await User.create({
    name: 'Admin',
    email: adminEmail,
    passwordHash,
    role: 'admin',
  })

  await Flower.insertMany([
    { name: 'Rose', pricePerStem: 3.5, stock: 120, enabled: true },
    { name: 'Lily', pricePerStem: 4.2, stock: 80, enabled: true },
    { name: 'Tulip', pricePerStem: 2.9, stock: 100, enabled: true },
    { name: 'Orchid', pricePerStem: 6.5, stock: 40, enabled: true },
  ])

  await CustomizationOption.insertMany([
    {
      category: 'paper',
      label: 'Paper Type',
      inputType: 'radio',
      options: [
        { name: 'Matte', price: 2 },
        { name: 'Glossy', price: 3 },
        { name: 'Linen', price: 4 },
      ],
    },
    {
      category: 'paperColor',
      label: 'Paper Color',
      inputType: 'radio',
      options: [
        { name: 'Blush', price: 0 },
        { name: 'Ivory', price: 0 },
        { name: 'Rose', price: 1 },
      ],
    },
    {
      category: 'ribbon',
      label: 'Ribbon Type',
      inputType: 'radio',
      options: [
        { name: 'Silk', price: 2 },
        { name: 'Velvet', price: 3 },
        { name: 'Satin', price: 2 },
      ],
    },
    {
      category: 'addOns',
      label: 'Add-ons',
      inputType: 'checkbox',
      options: [
        { name: 'Chocolate', price: 6 },
        { name: 'Polaroids', price: 4 },
        { name: 'Message Card', price: 3 },
        { name: 'Perfume Spray', price: 5 },
      ],
    },
  ])

  await AdminSettings.create({
    taxRate: 0.06,
    deliveryBaseDays: 2,
    deliveryPerStemDays: 0.02,
    deliveryFee: 4.99,
    locationOffsets: [
      { code: 'local', days: 0 },
      { code: 'outstation', days: 1 },
    ],
  })

  // eslint-disable-next-line no-console
  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

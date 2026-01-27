import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email?.toLowerCase() })
    if (!user) {
      res.status(401)
      return next(new Error('Invalid credentials'))
    }
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      res.status(401)
      return next(new Error('Invalid credentials'))
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    next(err)
  }
})

export default router

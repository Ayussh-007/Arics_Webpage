import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    res.status(401)
    return next(new Error('Not authorized'))
  }
  try {
    const token = auth.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-passwordHash')
    if (!user) {
      res.status(401)
      return next(new Error('Not authorized'))
    }
    req.user = user
    next()
  } catch (err) {
    res.status(401)
    next(new Error('Not authorized'))
  }
}

export const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    res.status(403)
    return next(new Error('Forbidden'))
  }
  next()
}

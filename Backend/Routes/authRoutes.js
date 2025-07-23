import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import User from '../Models/userModel.js'
const router = express.Router()
const resetTokens = new Map()

router.post('/register', async (req, res) => {
  const { email, password } = req.body
  if (!email||!password) return res.status(400).json({ message: 'Email and password required' })
  if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already in use' })
  if (password.length<8) return res.status(400).json({ message: 'Password must be 8+ chars' })
  const rx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
  if (!rx.test(password)) return res.status(400).json({ message: 'Use upper, lower, digit, special' })
  const user = new User({ email, password })
  await user.save()
  res.status(201).json({ message: 'Registered' })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email||!password) return res.status(400).json({ message: 'Email and password required' })
  const u = await User.findOne({ email })
  if (!u) return res.status(400).json({ message: 'Invalid credentials' })
  if (!await u.comparePassword(password)) return res.status(400).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn:'1d' })
  res.json({ token })
})

router.post('/google', async (req, res) => {
  const { email, name, googleId } = req.body
  let u = await User.findOne({ email })
  if (!u) {
    u = new User({ email, name, googleId })
    await u.save()
  }
  const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn:'1d' })
  res.json({ token })
})

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email required' })
  const u = await User.findOne({ email })
  if (!u) return res.status(400).json({ message: 'User not found' })
  const t = crypto.randomBytes(32).toString('hex')
  resetTokens.set(t,{ userId: u._id, expires: Date.now()+3600000 })
  const link = `http://localhost:3000/reset-password/${t}`
  const transporter = nodemailer.createTransport({ service:'gmail', auth:{ user:process.env.EMAIL_USER, pass:process.env.EMAIL_PASS }})
  await transporter.sendMail({ from:process.env.EMAIL_USER, to:email, subject:'Reset Password', text:link })
  res.json({ message:'Email sent' })
})

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params, { password } = req.body
  const data = resetTokens.get(token)
  if (!data||data.expires<Date.now()) return res.status(400).json({ message:'Invalid/expired' })
  const u = await User.findById(data.userId)
  if (!u) return res.status(400).json({ message:'User not found' })
  u.password = password
  await u.save()
  resetTokens.delete(token)
  res.json({ message:'Password reset' })
})

export default router

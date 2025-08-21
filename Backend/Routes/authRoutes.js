import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim())
      return res.status(400).json({ message: 'Email and password required' });

    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser)
      return res.status(400).json({ message: 'Email already in use' });

    if (password.length < 8)
      return res.status(400).json({ message: 'Password must be at least 8 characters' });

    const rx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
    if (!rx.test(password))
      return res.status(400).json({ message: 'Password must include upper, lower, digit, special char' });

    const newUser = new User({ email: email.trim(), password: password.trim() });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim())
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email: email.trim() });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password.trim());
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name || '' }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

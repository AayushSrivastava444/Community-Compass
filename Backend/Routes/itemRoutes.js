import express from 'express'
import multer from 'multer'
import path from 'path'
import Item from '../Models/itemModel.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage })

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, status, location, description } = req.body
    const image = req.file ? `/uploads/${req.file.filename}` : ''
    const newItem = new Item({ name, status, location, description, image })
    await newItem.save()
    res.status(201).json(newItem)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

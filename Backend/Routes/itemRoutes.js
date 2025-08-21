import express from 'express';
import Item from '../Models/itemModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, status, location, description, imageUrl } = req.body;

    if (!name || !status || !location || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newItem = new Item({ name, status, location, description, imageUrl });
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;



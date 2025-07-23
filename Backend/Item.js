import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['lost', 'found'], required: true },
  city: String,
  neighborhood: String,
  imageUrl: String, 
  date: { type: Date, default: Date.now },
});

const Item = mongoose.model('Item', itemSchema);

export default Item;

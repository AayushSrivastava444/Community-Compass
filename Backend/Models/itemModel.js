import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true, enum: ['lost', 'found'] },
  location: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, default: '' } 
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);



import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import itemRoutes from './Routes/itemRoutes.js';
import authRoutes from './Routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://community-compass-74iw.vercel.app'
  ],
  credentials: true,
}));



app.use(helmet({
  crossOriginOpenerPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

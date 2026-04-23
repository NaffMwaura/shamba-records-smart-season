import express, { type Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import fieldRoutes from './routes/fieldRoutes.js';
import obsRoutes from './routes/obsRoutes.js';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/fields', fieldRoutes); 
app.use('/api/observations', obsRoutes); 

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 😂😂`);
  console.log(`This is my secret: ${JWT_SECRET}`);
});
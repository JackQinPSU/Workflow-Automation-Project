import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './features/auth/routes.js'; 
import uploadRoutes from './features/upload/routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Backend is running');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
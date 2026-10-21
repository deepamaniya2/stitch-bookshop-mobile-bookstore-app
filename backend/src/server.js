import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import booksRouter from './routes/books.routes.js';
import categoriesRouter from './routes/categories.routes.js';
import cartRouter from './routes/cart.routes.js';
import promosRouter from './routes/promos.routes.js';
import ordersRouter from './routes/orders.routes.js';
import userRouter from './routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());

// Root Welcome Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'BookStop Bookstore API',
    endpoints: {
      health: '/api/health',
      books: '/api/books',
      categories: '/api/categories',
      orders: '/api/orders',
      user: '/api/user/profile'
    }
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'BookStop Bookstore API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/books', booksRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/promos', promosRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/user', userRouter);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.method} ${req.originalUrl} not found`
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 BookStop Backend API is running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
  console.log(`📚 Books: http://localhost:${PORT}/api/books`);
  console.log(`=============================================`);
});

export default app;

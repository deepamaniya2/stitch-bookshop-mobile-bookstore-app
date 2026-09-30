import { Router } from 'express';
import { getBooks, getBookById, getSimilarBooks } from '../data/db.js';

const router = Router();

// GET /api/books - Get books with optional query filtering
router.get('/', async (req, res, next) => {
  try {
    const { genre, search, trending, recommended, limit } = req.query;
    const books = await getBooks({ genre, search, trending, recommended, limit });
    res.json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/books/:id - Get single book details
router.get('/:id', async (req, res, next) => {
  try {
    const book = await getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with id '${req.params.id}' not found`
      });
    }
    res.json({
      success: true,
      data: book
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/books/:id/similar - Get similar recommendations
router.get('/:id/similar', async (req, res, next) => {
  try {
    const similar = await getSimilarBooks(req.params.id);
    res.json({
      success: true,
      data: similar
    });
  } catch (err) {
    next(err);
  }
});

export default router;

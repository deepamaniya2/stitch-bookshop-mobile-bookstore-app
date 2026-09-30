import { Router } from 'express';
import { getCategories } from '../data/db.js';

const router = Router();

// GET /api/categories - Get all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (err) {
    next(err);
  }
});

export default router;

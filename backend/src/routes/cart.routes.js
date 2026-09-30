import { Router } from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../data/db.js';

const router = Router();

// GET /api/cart - Get current cart items & summary
router.get('/', async (req, res, next) => {
  try {
    const cart = await getCart();
    res.json({
      success: true,
      data: cart
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res, next) => {
  try {
    const { bookId, quantity = 1 } = req.body;
    if (!bookId) {
      return res.status(400).json({ success: false, message: 'bookId is required' });
    }

    const updated = await addToCart(bookId, parseInt(quantity, 10) || 1);
    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/cart/:bookId - Increment/decrement quantity
router.patch('/:bookId', async (req, res, next) => {
  try {
    const { delta } = req.body;
    if (delta === undefined) {
      return res.status(400).json({ success: false, message: 'delta is required' });
    }

    const updated = await updateCartItem(req.params.bookId, parseInt(delta, 10));
    res.json({
      success: true,
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/:bookId - Remove item from cart
router.delete('/:bookId', async (req, res, next) => {
  try {
    const updated = await removeFromCart(req.params.bookId);
    res.json({
      success: true,
      message: 'Item removed from cart',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart - Clear all cart items
router.delete('/', async (req, res, next) => {
  try {
    const empty = await clearCart();
    res.json({
      success: true,
      message: 'Cart cleared',
      data: empty
    });
  } catch (err) {
    next(err);
  }
});

export default router;

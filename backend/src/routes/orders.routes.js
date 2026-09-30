import { Router } from 'express';
import { getOrders, createOrder } from '../data/db.js';

const router = Router();

// GET /api/orders - Get all past orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await getOrders();
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/orders - Place a new order
router.post('/', async (req, res, next) => {
  try {
    const { items, shippingAddress, deliveryMethod, grandTotal, subtotal, discount, shippingCost } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'Order items cannot be empty'
      });
    }

    const order = await createOrder({
      items,
      shippingAddress: shippingAddress || {
        name: 'Jane Doe',
        address: '123 Paper Street, Apt 4B, New York, NY 10001, United States'
      },
      deliveryMethod: deliveryMethod || 'standard',
      subtotal: subtotal || 0,
      discount: discount || 0,
      shippingCost: shippingCost || 0,
      grandTotal: grandTotal || 0
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (err) {
    next(err);
  }
});

export default router;

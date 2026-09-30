import { Router } from 'express';
import { validatePromo } from '../data/db.js';

const router = Router();

// POST /api/promos/validate - Validate promo code
router.post('/validate', async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is required'
      });
    }

    const promo = await validatePromo(code);
    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired promo code'
      });
    }

    res.json({
      success: true,
      message: `${promo.description} applied!`,
      data: promo
    });
  } catch (err) {
    next(err);
  }
});

export default router;

import { Router } from 'express';
import { getUserProfile, updateUserProfile, toggleWishlist, getBooks } from '../data/db.js';

const router = Router();

// GET /api/user/profile - Get profile data & stats
router.get('/profile', async (req, res, next) => {
  try {
    const profile = await getUserProfile();
    res.json({
      success: true,
      data: profile
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/user/profile - Update profile details
router.put('/profile', async (req, res, next) => {
  try {
    const updated = await updateUserProfile(req.body);
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/user/wishlist - Get full book objects in wishlist
router.get('/wishlist', async (req, res, next) => {
  try {
    const profile = await getUserProfile();
    const allBooks = await getBooks();
    const wishlistedBooks = allBooks.filter(b => profile.wishlist.includes(b.id));

    res.json({
      success: true,
      count: wishlistedBooks.length,
      data: wishlistedBooks
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/user/wishlist/:bookId - Toggle item in wishlist
router.post('/wishlist/:bookId', async (req, res, next) => {
  try {
    const result = await toggleWishlist(req.params.bookId);
    res.json({
      success: true,
      message: result.isWishlisted ? 'Added to wishlist' : 'Removed from wishlist',
      data: result
    });
  } catch (err) {
    next(err);
  }
});

export default router;

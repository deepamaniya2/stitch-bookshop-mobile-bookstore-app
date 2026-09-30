import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'db.json');

export const readDB = async () => {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database:', err);
    throw new Error('Database read failure');
  }
};

export const writeDB = async (data) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database:', err);
    throw new Error('Database write failure');
  }
};

// Books Queries
export const getBooks = async ({ genre, search, trending, recommended, limit } = {}) => {
  const db = await readDB();
  let books = [...db.books];

  if (genre) {
    books = books.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    books = books.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q) ||
      (b.synopsis && b.synopsis.toLowerCase().includes(q))
    );
  }

  if (trending === 'true' || trending === true) {
    books = books.filter(b => b.isTrending);
  }

  if (recommended === 'true' || recommended === true) {
    books = books.filter(b => b.isRecommended || b.isFeatured);
  }

  if (limit) {
    books = books.slice(0, parseInt(limit, 10));
  }

  return books;
};

export const getBookById = async (id) => {
  const db = await readDB();
  return db.books.find(b => b.id === id) || null;
};

export const getSimilarBooks = async (id) => {
  const db = await readDB();
  const book = db.books.find(b => b.id === id);
  if (!book) return [];

  return db.books
    .filter(b => b.id !== id && (b.genre === book.genre || b.isSimilar))
    .slice(0, 4);
};

// Categories
export const getCategories = async () => {
  const db = await readDB();
  // Count books in each category
  return db.categories.map(cat => ({
    ...cat,
    count: db.books.filter(b => b.genre.toLowerCase() === cat.title.toLowerCase()).length
  }));
};

// Cart
export const getCart = async () => {
  const db = await readDB();
  const booksMap = new Map(db.books.map(b => [b.id, b]));

  const items = db.cart.map(item => {
    const book = booksMap.get(item.bookId);
    if (!book) return null;
    return {
      ...book,
      quantity: item.quantity
    };
  }).filter(Boolean);

  const subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    totalQuantity,
    subtotal: parseFloat(subtotal.toFixed(2))
  };
};

export const addToCart = async (bookId, quantity = 1) => {
  const db = await readDB();
  const book = db.books.find(b => b.id === bookId);
  if (!book) throw new Error('Book not found');

  const existing = db.cart.find(c => c.bookId === bookId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    db.cart.push({ bookId, quantity });
  }

  await writeDB(db);
  return getCart();
};

export const updateCartItem = async (bookId, delta) => {
  const db = await readDB();
  const existing = db.cart.find(c => c.bookId === bookId);
  if (!existing) throw new Error('Item not in cart');

  existing.quantity += delta;
  if (existing.quantity <= 0) {
    db.cart = db.cart.filter(c => c.bookId !== bookId);
  }

  await writeDB(db);
  return getCart();
};

export const removeFromCart = async (bookId) => {
  const db = await readDB();
  db.cart = db.cart.filter(c => c.bookId !== bookId);
  await writeDB(db);
  return getCart();
};

export const clearCart = async () => {
  const db = await readDB();
  db.cart = [];
  await writeDB(db);
  return { items: [], totalQuantity: 0, subtotal: 0 };
};

// Promos
export const validatePromo = async (code) => {
  const db = await readDB();
  const cleanCode = (code || '').trim().toUpperCase();
  const promo = db.promos.find(p => p.code === cleanCode);
  if (!promo) return null;
  return promo;
};

// Orders
export const getOrders = async () => {
  const db = await readDB();
  return db.orders;
};

export const createOrder = async (orderData) => {
  const db = await readDB();
  const orderId = 'BS-' + Math.floor(100000 + Math.random() * 900000);

  const newOrder = {
    id: orderId,
    date: new Date().toISOString(),
    status: 'Confirmed',
    ...orderData
  };

  db.orders.unshift(newOrder);
  // Clear cart on successful order
  db.cart = [];

  // Increment user order count
  if (db.user) {
    db.user.ordersCount = (db.user.ordersCount || 0) + 1;
  }

  await writeDB(db);
  return newOrder;
};

// User & Wishlist
export const getUserProfile = async () => {
  const db = await readDB();
  return {
    ...db.user,
    ordersCount: db.orders.length
  };
};

export const updateUserProfile = async (updates) => {
  const db = await readDB();
  db.user = { ...db.user, ...updates };
  await writeDB(db);
  return db.user;
};

export const toggleWishlist = async (bookId) => {
  const db = await readDB();
  const exists = db.user.wishlist.includes(bookId);

  if (exists) {
    db.user.wishlist = db.user.wishlist.filter(id => id !== bookId);
  } else {
    db.user.wishlist.push(bookId);
  }

  await writeDB(db);
  return {
    wishlist: db.user.wishlist,
    isWishlisted: !exists
  };
};

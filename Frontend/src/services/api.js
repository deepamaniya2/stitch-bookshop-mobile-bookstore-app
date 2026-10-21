import { BOOKS, CATEGORIES_DATA, USER_PROFILE } from '../data/books';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Generic request helper with error handling & graceful mock fallback
 */
async function request(endpoint, options = {}, fallbackData = null) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err) {
    console.warn(`[API Warning] Request to ${endpoint} failed:`, err.message);
    if (fallbackData !== null) {
      return fallbackData;
    }
    throw err;
  }
}

export const booksApi = {
  // Get all books with optional filters
  getBooks: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/books?${query}` : '/books';
    return request(endpoint, {}, BOOKS);
  },

  // Get book details by ID
  getBookById: async (id) => {
    const fallback = BOOKS.find(b => b.id === id) || null;
    return request(`/books/${id}`, {}, fallback);
  },

  // Get similar books
  getSimilarBooks: async (id) => {
    const fallback = BOOKS.filter(b => b.id !== id).slice(0, 4);
    return request(`/books/${id}/similar`, {}, fallback);
  }
};

export const categoriesApi = {
  // Get all categories
  getCategories: async () => {
    return request('/categories', {}, CATEGORIES_DATA);
  }
};

export const cartApi = {
  // Get cart
  getCart: async () => {
    return request('/cart', {}, null);
  },

  // Add item
  addItem: async (bookId, quantity = 1) => {
    return request('/cart', {
      method: 'POST',
      body: JSON.stringify({ bookId, quantity })
    });
  },

  // Update quantity delta (+1 or -1)
  updateItem: async (bookId, delta) => {
    return request(`/cart/${bookId}`, {
      method: 'PATCH',
      body: JSON.stringify({ delta })
    });
  },

  // Remove item
  removeItem: async (bookId) => {
    return request(`/cart/${bookId}`, {
      method: 'DELETE'
    });
  },

  // Clear cart
  clearCart: async () => {
    return request('/cart', {
      method: 'DELETE'
    });
  }
};

export const promosApi = {
  // Validate promo code
  validatePromo: async (code) => {
    return request('/promos/validate', {
      method: 'POST',
      body: JSON.stringify({ code })
    });
  }
};

export const ordersApi = {
  // Get orders
  getOrders: async () => {
    return request('/orders', {}, []);
  },

  // Place order
  placeOrder: async (orderData) => {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }
};

export const userApi = {
  // Get user profile
  getProfile: async () => {
    return request('/user/profile', {}, USER_PROFILE);
  },

  // Toggle wishlist
  toggleWishlist: async (bookId) => {
    return request(`/user/wishlist/${bookId}`, {
      method: 'POST'
    });
  }
};

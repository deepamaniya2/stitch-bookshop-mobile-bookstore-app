import React, { createContext, useContext, useState, useEffect } from 'react';
import { BOOKS } from '../data/books';
import { cartApi, promosApi, userApi } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize default cart items
  const [cart, setCart] = useState(() => {
    return BOOKS.filter(b => b.inCartDefault).map(b => ({
      ...b,
      quantity: b.defaultQty || 1
    }));
  });

  const [wishlist, setWishlist] = useState(["silent-echo", "morning-light"]);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [notification, setNotification] = useState(null);

  // Sync initial cart and profile with backend on startup
  useEffect(() => {
    let isMounted = true;

    // Fetch live cart from backend
    cartApi.getCart()
      .then(serverCart => {
        if (isMounted && serverCart && serverCart.items && serverCart.items.length > 0) {
          setCart(serverCart.items);
        }
      })
      .catch(() => {});

    // Fetch live user wishlist
    userApi.getProfile()
      .then(profile => {
        if (isMounted && profile && profile.wishlist) {
          setWishlist(profile.wishlist);
        }
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (book, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...book, quantity: qty }];
    });

    showNotification(`"${book.title}" added to your cart!`);

    // Sync to backend in background
    cartApi.addItem(book.id, qty).catch(() => {});
  };

  const updateQuantity = (bookId, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });

    // Sync to backend in background
    cartApi.updateItem(bookId, delta).catch(() => {});
  };

  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
    showNotification("Item removed from cart.", "info");

    // Sync to backend in background
    cartApi.removeItem(bookId).catch(() => {});
  };

  const clearCart = () => {
    setCart([]);
    cartApi.clearCart().catch(() => {});
  };

  const toggleWishlist = (bookId) => {
    setWishlist(prev => {
      const exists = prev.includes(bookId);
      if (exists) {
        showNotification("Removed from wishlist.", "info");
        return prev.filter(id => id !== bookId);
      } else {
        showNotification("Saved to wishlist!");
        return [...prev, bookId];
      }
    });

    // Sync to backend in background
    userApi.toggleWishlist(bookId).catch(() => {});
  };

  const isInWishlist = (bookId) => wishlist.includes(bookId);

  const applyPromoCode = async (code) => {
    const clean = code.trim().toUpperCase();

    try {
      const promo = await promosApi.validatePromo(clean);
      if (promo && promo.discountPercent) {
        setPromoCode(promo.code);
        setDiscountPercent(promo.discountPercent);
        showNotification(`${promo.description} applied!`);
        return { success: true, message: `${promo.description} applied!` };
      }
    } catch {
      // Local fallback for quick responses
      if (clean === "SUMMER40" || clean === "SUMMER") {
        setPromoCode(clean);
        setDiscountPercent(0.40);
        showNotification("Summer Sale 40% discount applied!");
        return { success: true, message: "40% discount applied!" };
      } else if (clean === "BOOKSTOP10" || clean === "SAVE10") {
        setPromoCode(clean);
        setDiscountPercent(0.10);
        showNotification("10% discount applied!");
        return { success: true, message: "10% discount applied!" };
      }
    }

    showNotification("Invalid promo code. Try 'SUMMER40'", "error");
    return { success: false, message: "Invalid promo code." };
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountPercent(0);
  };

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
    if (method === "express") {
      setShippingCost(12.0);
    } else {
      setShippingCost(0.0);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discountPercent;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        promoCode,
        discountPercent,
        discountAmount,
        applyPromoCode,
        removePromoCode,
        shippingCost,
        deliveryMethod,
        handleDeliveryChange,
        subtotal,
        grandTotal,
        notification,
        showNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

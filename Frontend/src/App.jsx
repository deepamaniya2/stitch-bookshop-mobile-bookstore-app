import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toast } from './components/Toast';

import { SplashScreen } from './pages/SplashScreen';
import { Onboarding } from './pages/Onboarding';
import { HomeFeed } from './pages/HomeFeed';
import { Categories } from './pages/Categories';
import { BookDetails } from './pages/BookDetails';
import { ShoppingCart } from './pages/ShoppingCart';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';

export const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Toast />
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<HomeFeed />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;

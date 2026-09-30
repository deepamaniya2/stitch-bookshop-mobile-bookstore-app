import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const BottomNav = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  const navItems = [
    { path: '/home', label: 'Home', icon: 'home' },
    { path: '/categories', label: 'Genres', icon: 'category' },
    { path: '/cart', label: 'Cart', icon: 'shopping_cart', badge: cartCount },
    { path: '/profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="md:hidden bg-surface/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.08)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-6 border-t border-surface-container-high">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center relative py-1 px-3 transition-all duration-200 ${
              isActive
                ? 'text-primary font-bold scale-105'
                : 'text-on-surface-variant hover:text-primary opacity-80 hover:opacity-100'
            }`}
          >
            <div className="relative">
              <span
                className={`material-symbols-outlined text-[24px] mb-0.5 ${
                  isActive ? 'fill' : ''
                }`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              {item.badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="font-label-sm text-[11px] leading-tight">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

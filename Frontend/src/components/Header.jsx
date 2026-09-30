import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { USER_PROFILE } from '../data/books';

export const Header = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Top Navigation */}
      <header className="hidden md:flex bg-background/90 backdrop-blur-md text-primary w-full top-0 sticky z-40 transition-all duration-200 border-b border-surface-container/50">
        <div className="max-w-[1200px] mx-auto w-full flex justify-between items-center px-margin-desktop py-md">
          <div className="flex items-center gap-4">
            <Link to="/home" className="flex items-center gap-2 group">
              <span className="material-symbols-outlined text-primary-container text-3xl transition-transform group-hover:scale-110">
                menu_book
              </span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tight">
                BookStop
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <nav className="flex gap-6 items-center">
              <Link
                to="/home"
                className={`font-label-md text-label-md transition-colors ${
                  isActive('/home') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className={`font-label-md text-label-md transition-colors ${
                  isActive('/categories') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Genres
              </Link>
              <Link
                to="/cart"
                className={`font-label-md text-label-md transition-colors relative flex items-center gap-1 ${
                  isActive('/cart') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Cart
                {cartCount > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className={`font-label-md text-label-md transition-colors ${
                  isActive('/profile') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Profile
              </Link>
            </nav>

            <Link
              to="/profile"
              className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-surface-container hover:border-primary transition-all duration-200"
              title="View Profile"
            >
              <img
                src={USER_PROFILE.headerAvatar}
                alt={USER_PROFILE.name}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Top Header */}
      <header className="w-full top-0 sticky z-40 bg-background/95 backdrop-blur-md flex justify-between items-center px-margin-mobile py-3 md:hidden border-b border-surface-container/40">
        <Link to="/home" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-2xl">
            menu_book
          </span>
          <span className="font-headline-lg-mobile text-[22px] font-bold text-primary tracking-tight">
            BookStop
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative p-2 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Cart"
          >
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/profile"
            className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-surface-variant"
          >
            <img
              src={USER_PROFILE.headerAvatar}
              alt={USER_PROFILE.name}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </header>
    </>
  );
};

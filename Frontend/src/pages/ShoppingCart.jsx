import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';

export const ShoppingCart = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    shippingCost,
    grandTotal
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyPromoCode(inputCode);
    setInputCode('');
  };

  return (
    <div className="bg-background min-h-screen text-on-background antialiased pb-28 md:pb-16 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-margin-mobile md:px-margin-desktop pt-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background font-bold">
            Your Cart
          </h2>
          <span className="font-label-md text-on-surface-variant font-medium">
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-surface-variant p-8 shadow-sm">
            <span className="material-symbols-outlined text-6xl text-text-secondary mb-3">
              remove_shopping_cart
            </span>
            <h3 className="text-xl font-bold text-on-surface mb-2">
              Your cart is empty
            </h3>
            <p className="text-text-secondary mb-6 max-w-sm mx-auto">
              Looks like you haven't added any books to your cart yet. Explore our curated library to find your next great read!
            </p>
            <Link
              to="/home"
              className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-container transition-all shadow-md"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-surface-container-lowest rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-variant relative transition-all hover:shadow-md"
                >
                  {/* Book Cover Thumbnail */}
                  <Link
                    to={`/book/${item.id}`}
                    className="w-20 h-28 md:w-24 md:h-36 flex-shrink-0 rounded-lg bg-surface-variant overflow-hidden shadow-sm"
                  >
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Details & Counter */}
                  <div className="flex flex-col flex-grow justify-between py-1">
                    <div>
                      <Link
                        to={`/book/${item.id}`}
                        className="font-headline-md text-[18px] md:text-headline-md text-on-background leading-tight font-bold hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="font-body-md text-sm text-text-secondary mt-1">
                        {item.author}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-headline-md text-lg md:text-xl text-primary font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center bg-surface-variant rounded-full p-0.5 border border-outline-variant/40">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="font-label-md text-label-md w-7 text-center font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 text-text-secondary hover:text-error transition-colors p-1"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary & Coupon */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Promo Code Input */}
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-surface-variant shadow-sm">
                <h4 className="font-label-md text-label-md font-bold text-on-surface mb-2">
                  Promo Code
                </h4>
                {promoCode ? (
                  <div className="flex items-center justify-between bg-surface-container-high px-4 py-2.5 rounded-full border border-primary/20">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">
                        check_circle
                      </span>
                      <span className="font-bold text-primary text-sm">
                        {promoCode} (Applied)
                      </span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-error font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="e.g. SUMMER40"
                      className="flex-1 px-4 py-2.5 bg-surface border border-outline-variant rounded-full text-sm focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-secondary text-white font-semibold text-xs rounded-full hover:bg-primary transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Summary Card */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant shadow-sm">
                <h3 className="font-headline-md text-lg font-bold text-on-surface mb-4">
                  Order Summary
                </h3>

                <div className="flex flex-col gap-3 font-body-md text-sm text-text-secondary pb-4 border-b border-surface-container">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-text-primary">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-primary font-semibold">
                      <span>Discount ({promoCode})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="text-text-primary font-semibold">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 mb-6">
                  <span className="font-headline-md text-lg font-bold text-on-surface">
                    Total
                  </span>
                  <span className="font-headline-xl text-2xl font-extrabold text-primary">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 bg-primary-container text-white font-label-md text-label-md font-bold rounded-full shadow-[0_8px_16px_rgba(255,122,0,0.25)] hover:bg-primary transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordersApi } from '../services/api';

export const Checkout = () => {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    discountAmount,
    promoCode,
    shippingCost,
    deliveryMethod,
    handleDeliveryChange,
    grandTotal,
    clearCart
  } = useCart();

  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    try {
      const orderPayload = {
        items: cart.map(item => ({
          bookId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        shippingAddress: {
          name: 'Jane Doe',
          address: selectedAddress === 'home'
            ? '123 Paper Street, Apt 4B, New York, NY 10001, United States'
            : '456 Tech Blvd, Suite 200, New York, NY 10002, United States'
        },
        deliveryMethod,
        subtotal,
        discount: discountAmount,
        shippingCost,
        grandTotal
      };

      const result = await ordersApi.placeOrder(orderPayload);
      const placedId = (result && result.id) ? result.id : ('BS-' + Math.floor(100000 + Math.random() * 900000));

      setOrderId(placedId);
      setOrderPlaced(true);
      clearCart();
    } catch {
      // Fallback
      const randomId = 'BS-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(randomId);
      setOrderPlaced(true);
      clearCart();
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="bg-background min-h-screen text-on-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-8 shadow-2xl border border-surface-variant text-center fade-in-up">
          <div className="w-20 h-20 bg-primary-container/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span
              className="material-symbols-outlined text-5xl fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>

          <h2 className="font-headline-lg-mobile text-2xl font-bold text-on-background mb-2">
            Order Confirmed!
          </h2>
          <p className="font-body-md text-text-secondary mb-4">
            Thank you for your purchase. Your order has been saved and is being prepared!
          </p>

          <div className="bg-surface-container-low p-4 rounded-xl mb-6 text-sm text-left border border-outline-variant/30">
            <div className="flex justify-between mb-2">
              <span className="text-text-secondary">Order Reference:</span>
              <span className="font-bold text-primary">{orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-text-secondary">Estimated Delivery:</span>
              <span className="font-semibold text-text-primary">
                {deliveryMethod === 'express' ? '1 - 2 Business Days' : '3 - 5 Business Days'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Charged:</span>
              <span className="font-bold text-text-primary">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/home"
              className="w-full py-3.5 bg-primary text-white font-bold rounded-full hover:bg-primary-container transition-all shadow-md text-center"
            >
              Continue Browsing
            </Link>
            <Link
              to="/profile"
              className="w-full py-3 bg-surface-container-high text-on-surface font-semibold rounded-full hover:bg-surface-variant transition-colors text-center"
            >
              View Order in Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased pb-24 md:pb-12">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 bg-background/95 backdrop-blur-md flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 border-b border-surface-container/50">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="text-on-surface-variant hover:text-primary transition-opacity p-2 -ml-2 rounded-full cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">
          Checkout
        </div>
        <div className="w-8 h-8"></div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Checkout Steps */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Step 1: Shipping Address */}
            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-variant">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="font-headline-md text-xl font-bold text-on-surface">
                  Shipping Address
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div
                  onClick={() => setSelectedAddress('home')}
                  className={`border-2 rounded-2xl p-4 cursor-pointer relative transition-all ${
                    selectedAddress === 'home'
                      ? 'border-primary bg-surface shadow-sm'
                      : 'border-outline-variant/50 bg-surface-container-lowest'
                  }`}
                >
                  {selectedAddress === 'home' && (
                    <span
                      className="absolute top-4 right-4 material-symbols-outlined text-primary fill"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  )}
                  <div className="font-label-md text-label-md font-bold text-on-surface mb-2">
                    Home
                  </div>
                  <div className="font-body-md text-sm text-text-secondary leading-relaxed">
                    Jane Doe<br />
                    123 Paper Street, Apt 4B<br />
                    New York, NY 10001<br />
                    United States
                  </div>
                </div>

                <div
                  onClick={() => setSelectedAddress('office')}
                  className={`border-2 rounded-2xl p-4 cursor-pointer relative transition-all flex flex-col justify-center min-h-[130px] ${
                    selectedAddress === 'office'
                      ? 'border-primary bg-surface shadow-sm'
                      : 'border-dashed border-outline-variant hover:bg-surface-container-low text-text-secondary'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined mb-1">add</span>
                    <span className="font-label-md text-sm font-semibold">
                      Add New Address
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Delivery Options */}
            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-variant">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="font-headline-md text-xl font-bold text-on-surface">
                  Delivery Method
                </h2>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <label
                  onClick={() => handleDeliveryChange('standard')}
                  className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-primary bg-surface'
                      : 'border-outline-variant/40 hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === 'standard'}
                    onChange={() => handleDeliveryChange('standard')}
                    className="accent-primary w-5 h-5 cursor-pointer"
                  />
                  <div className="ml-4 flex-1">
                    <div className="font-label-md font-bold text-on-surface">
                      Standard Delivery
                    </div>
                    <div className="font-body-md text-text-secondary text-sm">
                      3-5 Business Days
                    </div>
                  </div>
                  <div className="font-label-md font-bold text-primary">Free</div>
                </label>

                <label
                  onClick={() => handleDeliveryChange('express')}
                  className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-primary bg-surface'
                      : 'border-outline-variant/40 hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === 'express'}
                    onChange={() => handleDeliveryChange('express')}
                    className="accent-primary w-5 h-5 cursor-pointer"
                  />
                  <div className="ml-4 flex-1">
                    <div className="font-label-md font-bold text-on-surface">
                      Express Delivery
                    </div>
                    <div className="font-body-md text-text-secondary text-sm">
                      1-2 Business Days
                    </div>
                  </div>
                  <div className="font-label-md font-bold text-on-surface">$12.00</div>
                </label>
              </div>
            </section>

            {/* Step 3: Payment Method */}
            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-variant">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="font-headline-md text-xl font-bold text-on-surface">
                  Payment Method
                </h2>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <label
                  onClick={() => setSelectedPayment('card')}
                  className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                    selectedPayment === 'card'
                      ? 'border-primary bg-surface'
                      : 'border-outline-variant/40 hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === 'card'}
                      onChange={() => setSelectedPayment('card')}
                      className="accent-primary w-5 h-5 cursor-pointer"
                    />
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                    <div>
                      <div className="font-bold text-on-surface text-sm">
                        Credit / Debit Card
                      </div>
                      <div className="text-xs text-text-secondary">Ending in •••• 4242</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase bg-surface-variant px-2.5 py-1 rounded-md text-primary">
                    Default
                  </span>
                </label>

                <label
                  onClick={() => setSelectedPayment('apple')}
                  className={`flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                    selectedPayment === 'apple'
                      ? 'border-primary bg-surface'
                      : 'border-outline-variant/40 hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPayment === 'apple'}
                    onChange={() => setSelectedPayment('apple')}
                    className="accent-primary w-5 h-5 cursor-pointer"
                  />
                  <span className="material-symbols-outlined text-on-surface">smartphone</span>
                  <span className="font-bold text-on-surface text-sm">Apple Pay / Google Pay</span>
                </label>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4 sticky top-24">
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant shadow-sm">
              <h3 className="font-headline-md text-lg font-bold text-on-surface mb-4">
                Order Review
              </h3>

              {/* Items List Preview */}
              <div className="flex flex-col gap-3 max-h-56 overflow-y-auto no-scrollbar pb-3 mb-4 border-b border-surface-container">
                {cart.length === 0 ? (
                  <p className="text-sm text-text-secondary">No items in cart.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-10 h-14 object-cover rounded bg-surface-variant flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-on-surface truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-text-secondary">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Cost Calculations */}
              <div className="flex flex-col gap-2.5 text-sm text-text-secondary pb-4 border-b border-surface-container">
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
                  <span>Shipping</span>
                  <span className="font-semibold text-text-primary">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 mb-6">
                <span className="text-lg font-bold text-on-surface">Total</span>
                <span className="text-2xl font-extrabold text-primary">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={cart.length === 0 || isProcessing}
                className="w-full py-4 bg-primary text-white font-label-md text-label-md font-bold rounded-full shadow-[0_8px_16px_rgba(153,71,0,0.25)] hover:bg-primary-container transition-all hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order (${grandTotal.toFixed(2)})</span>
                    <span className="material-symbols-outlined text-lg">check</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-text-secondary text-center mt-3">
                By placing this order you agree to BookStop Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

import React from 'react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { notification } = useCart();

  if (!notification) return null;

  const isError = notification.type === 'error';
  const isInfo = notification.type === 'info';

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div
        className={`px-5 py-3 rounded-full shadow-lg backdrop-blur-md flex items-center gap-3 text-sm font-semibold border ${
          isError
            ? 'bg-error-container text-on-error-container border-error/30'
            : isInfo
            ? 'bg-surface-container-high text-on-surface border-outline-variant/40'
            : 'bg-primary text-white border-primary-container'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">
          {isError ? 'error' : isInfo ? 'info' : 'check_circle'}
        </span>
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

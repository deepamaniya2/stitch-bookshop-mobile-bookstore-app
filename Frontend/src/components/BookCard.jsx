import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const BookCard = ({ book, layout = 'carousel' }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist, addToCart } = useCart();
  const isWishlisted = isInWishlist(book.id);

  const isCarousel = layout === 'carousel';

  return (
    <div
      onClick={() => navigate(`/book/${book.id}`)}
      className={`group cursor-pointer flex flex-col justify-between transition-all duration-300 ${
        isCarousel ? 'flex-none w-[140px] md:w-[180px] snap-start' : 'w-full'
      }`}
    >
      <div>
        {/* Cover Container */}
        <div className="relative rounded-lg overflow-hidden aspect-[2/3] mb-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)] group-hover:shadow-[0_10px_20px_rgba(153,71,0,0.14)] transition-all duration-300 bg-surface-container-high">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(book.id);
            }}
            className="absolute top-2 right-2 w-8 h-8 bg-surface/85 backdrop-blur-sm rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-all shadow-sm hover:scale-110 active:scale-95"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
          >
            <span
              className={`material-symbols-outlined text-[18px] transition-colors ${
                isWishlisted ? 'text-primary fill' : 'text-text-secondary'
              }`}
              style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
          </button>

          {/* Quick Add Overlay on Hover (Desktop) */}
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(book, 1);
              }}
              className="w-full py-1.5 px-3 bg-primary-container text-white text-xs font-semibold rounded-full shadow-md hover:bg-primary transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
              Add
            </button>
          </div>
        </div>

        {/* Metadata */}
        <h4 className="font-label-md text-label-md text-text-primary truncate group-hover:text-primary transition-colors">
          {book.title}
        </h4>
        <p className="font-body-md text-[13px] text-text-secondary truncate mt-0.5">
          {book.author}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2 pt-1 border-t border-surface-container/60">
        <div className="flex items-center gap-1 text-primary">
          <span
            className="material-symbols-outlined text-[15px] fill"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-label-sm text-label-sm font-bold text-text-primary">
            {book.rating}
          </span>
        </div>
        <span className="font-label-md text-label-md text-primary font-bold">
          ${book.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

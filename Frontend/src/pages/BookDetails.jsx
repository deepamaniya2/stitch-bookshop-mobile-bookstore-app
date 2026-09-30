import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BOOKS } from '../data/books';
import { booksApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';

export const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, toggleWishlist, showNotification } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [book, setBook] = useState(() => {
    return BOOKS.find((b) => b.id === id) || BOOKS[0];
  });
  const [similarBooks, setSimilarBooks] = useState(() => {
    return BOOKS.filter((b) => b.id !== id && (b.isSimilar || b.genre === book?.genre)).slice(0, 4);
  });

  useEffect(() => {
    let isMounted = true;

    booksApi.getBookById(id).then(data => {
      if (isMounted && data) {
        setBook(data);
      }
    }).catch(() => {});

    booksApi.getSimilarBooks(id).then(sim => {
      if (isMounted && sim && sim.length > 0) {
        setSimilarBooks(sim);
      }
    }).catch(() => {});

    return () => { isMounted = false; };
  }, [id]);

  const isWishlisted = book ? isInWishlist(book.id) : false;

  const handleAddToCart = () => {
    if (book) addToCart(book, 1);
  };

  const handleBuyNow = () => {
    if (book) {
      addToCart(book, 1);
      navigate('/checkout');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book?.title,
        text: `Check out "${book?.title}" by ${book?.author} on BookStop!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Book link copied to clipboard!');
    }
  };

  if (!book) return null;

  return (
    <div className="bg-background min-h-screen text-on-background antialiased pb-36 md:pb-24">
      <Header />

      {/* Top Navigation Bar with Back & Actions */}
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-3 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-primary hover:opacity-80 flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-surface-variant transition-colors cursor-pointer"
          aria-label="Go Back"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="text-on-surface-variant hover:text-primary flex items-center justify-center p-2 rounded-full hover:bg-surface-variant transition-colors cursor-pointer"
            title="Share"
            aria-label="Share book"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
          <button
            onClick={() => toggleWishlist(book.id)}
            className="text-on-surface-variant hover:text-primary flex items-center justify-center p-2 rounded-full hover:bg-surface-variant transition-colors cursor-pointer"
            title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
            aria-label="Wishlist"
          >
            <span
              className={`material-symbols-outlined ${isWishlisted ? 'text-primary fill' : ''}`}
              style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
            >
              {isWishlisted ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mt-2 fade-in-up">
        {/* Hero Section: Cover Image */}
        <div className="flex justify-center mb-8">
          <div className="w-[220px] md:w-[300px] aspect-[2/3] rounded-2xl shadow-[0_16px_32px_rgba(153,71,0,0.18)] relative group overflow-hidden bg-surface-container-high border border-surface-variant">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Book Metadata */}
        <div className="text-center md:text-left mb-8 max-w-2xl mx-auto md:mx-0">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary mb-1 font-bold tracking-tight">
            {book.title}
          </h1>
          <p className="font-body-lg text-body-lg text-text-secondary mb-4">
            by <span className="font-semibold text-text-primary">{book.author}</span>
          </p>

          <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
            <div className="flex text-primary-container">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[20px] fill"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant font-semibold ml-1">
              {book.rating} ({book.reviewsCount || '1.5k reviews'})
            </span>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
            {(book.tags || [book.genre]).map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm text-label-sm border border-outline-variant/30 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price Tag */}
          <div className="text-2xl font-bold text-primary">
            ${book.price.toFixed(2)}
          </div>
        </div>

        {/* Description / Synopsis */}
        <div className="mb-10 max-w-3xl">
          <h2 className="font-headline-md text-headline-md text-text-primary mb-3 font-bold">
            Synopsis
          </h2>
          <p
            className={`font-body-md text-body-md text-text-secondary leading-relaxed transition-all ${
              !isExpanded ? 'line-clamp-3' : ''
            }`}
          >
            {book.synopsis}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-primary font-label-md text-label-md font-semibold hover:underline cursor-pointer"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        </div>

        {/* Similar Books Section */}
        <div className="mb-12">
          <h2 className="font-headline-md text-headline-md text-text-primary mb-4 font-bold">
            You might also like
          </h2>
          <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 snap-x">
            {similarBooks.map((simBook) => (
              <div
                key={simBook.id}
                onClick={() => {
                  navigate(`/book/${simBook.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="snap-start shrink-0 w-[140px] md:w-[180px] group cursor-pointer"
              >
                <div className="w-full aspect-[2/3] rounded-DEFAULT overflow-hidden mb-2 shadow-sm relative bg-surface-container">
                  <img
                    src={simBook.cover}
                    alt={simBook.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-label-md text-label-md text-text-primary truncate group-hover:text-primary">
                  {simBook.title}
                </h3>
                <p className="font-label-sm text-label-sm text-text-secondary truncate mt-0.5">
                  {simBook.author}
                </p>
                <p className="font-label-sm text-primary font-bold mt-1">
                  ${simBook.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex justify-end gap-4 max-w-[1200px] mx-auto pt-6 border-t border-surface-container">
          <button
            onClick={handleAddToCart}
            className="py-3 px-8 rounded-full border-2 border-primary text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 bg-surface hover:bg-surface-variant transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="py-3 px-8 rounded-full bg-primary-container text-white font-label-md text-label-md font-semibold flex items-center justify-center shadow-[0_4px_16px_rgba(255,122,0,0.3)] hover:bg-primary transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Buy Now (${book.price.toFixed(2)})
          </button>
        </div>
      </main>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md border-t border-surface-container-high shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-margin-mobile py-3.5 flex gap-3 md:hidden">
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-3 rounded-full border-2 border-primary text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 bg-surface hover:bg-surface-variant transition-colors active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 px-3 rounded-full bg-primary-container text-white font-label-md text-label-md font-semibold flex items-center justify-center shadow-[0_4px_12px_rgba(255,122,0,0.25)] hover:bg-primary transition-colors active:scale-95 cursor-pointer"
        >
          Buy Now (${book.price.toFixed(2)})
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

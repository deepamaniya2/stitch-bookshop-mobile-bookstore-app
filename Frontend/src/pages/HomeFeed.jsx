import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { BookCard } from '../components/BookCard';
import { BOOKS, USER_PROFILE } from '../data/books';
import { booksApi } from '../services/api';
import { useCart } from '../context/CartContext';

export const HomeFeed = () => {
  const navigate = useNavigate();
  const { applyPromoCode } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [allBooks, setAllBooks] = useState(BOOKS);

  useEffect(() => {
    let isMounted = true;
    booksApi.getBooks().then(data => {
      if (isMounted && data && data.length > 0) {
        setAllBooks(data);
      }
    }).catch(() => {});

    return () => { isMounted = false; };
  }, []);

  const trendingBooks = useMemo(() => {
    return allBooks.filter((b) => b.isTrending);
  }, [allBooks]);

  const recommendedBooks = useMemo(() => {
    if (!searchQuery.trim()) {
      return allBooks.filter((b) => b.isRecommended || b.isFeatured);
    }
    const q = searchQuery.toLowerCase();
    return allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
    );
  }, [allBooks, searchQuery]);

  const handleSummerSaleClick = () => {
    applyPromoCode('SUMMER40');
    navigate('/categories');
  };

  return (
    <div className="bg-background min-h-screen text-on-background pb-28 md:pb-16 antialiased selection:bg-primary-container selection:text-white">
      <Header />

      <main className="max-w-[1200px] mx-auto w-full">
        {/* Mobile Header Greeting */}
        <div className="px-margin-mobile pt-lg pb-sm md:hidden flex justify-between items-center">
          <div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background font-bold">
              Hi, Reader!
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              Ready for your next adventure?
            </p>
          </div>
          <Link
            to="/profile"
            className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden shadow-sm border border-surface-variant"
          >
            <img
              src={USER_PROFILE.headerAvatar}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>

        {/* Desktop Greeting */}
        <div className="hidden md:block px-margin-desktop pt-8 pb-4">
          <h1 className="font-headline-xl text-headline-xl text-on-background font-extrabold tracking-tight">
            Hi, Reader!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            Ready for your next adventure?
          </p>
        </div>

        {/* Floating Search Bar */}
        <div className="px-margin-mobile md:px-margin-desktop py-sm sticky top-14 md:top-20 z-30 bg-background/90 backdrop-blur-md pb-md">
          <div className="relative w-full h-14 bg-surface rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-surface-variant flex items-center px-5 group focus-within:border-primary transition-all">
            <span className="material-symbols-outlined text-text-secondary group-focus-within:text-primary transition-colors mr-3 text-2xl">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, or genres..."
              className="w-full bg-transparent border-none focus:outline-none font-body-md text-body-md text-text-primary placeholder-text-secondary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-text-secondary hover:text-primary p-1"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Promo Banner */}
        <section className="px-margin-mobile md:px-margin-desktop py-md">
          <div
            className="relative w-full rounded-2xl overflow-hidden bg-surface-container-high h-52 md:h-72 flex items-center shadow-sm bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA24psoePi8kEM-KE7dPVS8gfqQtc4JWpgmzmxFOECnRnpnilKlOtAC7m4iWoX-68Avo-B14o6fP-u8ssNyTDSzHR9HvLao3C0xoq2ol6h2kvCeos_426-1_sHrv47bLxxx_IUJArloobd708NFKYEZO6P1Qehqc2W-fFXMyH5uS4hJT2MjB1wN6y-4ZQ3-EekujrdAVGBlcGFllNCUVoQ3bEeI545lTvSopTkFCx0qp6P3kPr0MYep')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent"></div>
            <div className="relative z-10 px-6 md:px-12 max-w-sm md:max-w-md">
              <span className="inline-block px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm rounded-full mb-3 uppercase tracking-wider font-bold shadow-sm">
                Summer Sale • Code: SUMMER40
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background font-bold mb-2 leading-tight">
                Dive into a new world
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 font-medium">
                Up to 40% off selected fiction titles.
              </p>
              <button
                onClick={handleSummerSaleClick}
                className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-full hover:bg-primary-container hover:text-white transition-all shadow-md transform hover:scale-105 active:scale-95 cursor-pointer font-semibold"
              >
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* Trending Books Section (Horizontal Scroll) */}
        {!searchQuery && (
          <section className="py-md">
            <div className="px-margin-mobile md:px-margin-desktop flex justify-between items-end mb-4">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-background font-bold">
                  Trending Books
                </h3>
                <p className="font-body-md text-xs text-text-secondary mt-0.5">
                  Top reads readers can't put down this week
                </p>
              </div>
              <Link
                to="/categories"
                className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors font-semibold"
              >
                View All
              </Link>
            </div>

            <div className="flex overflow-x-auto no-scrollbar gap-4 px-margin-mobile md:px-margin-desktop pb-4 snap-x">
              {trendingBooks.map((book) => (
                <BookCard key={book.id} book={book} layout="carousel" />
              ))}
            </div>
          </section>
        )}

        {/* Recommended For You Section (Grid) */}
        <section className="py-md px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-background font-bold">
                {searchQuery ? `Search Results (${recommendedBooks.length})` : 'Recommended For You'}
              </h3>
              {!searchQuery && (
                <p className="font-body-md text-xs text-text-secondary mt-0.5">
                  Hand-picked stories curated for your reading journey
                </p>
              )}
            </div>
          </div>

          {recommendedBooks.length === 0 ? (
            <div className="py-12 text-center bg-surface-container-low rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-text-secondary mb-2">
                search_off
              </span>
              <p className="text-on-surface-variant font-medium">
                No books found matching "{searchQuery}".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-primary font-bold text-sm underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
              {recommendedBooks.map((book) => (
                <BookCard key={book.id} book={book} layout="grid" />
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

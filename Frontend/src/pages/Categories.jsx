import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { BookCard } from '../components/BookCard';
import { CATEGORIES_DATA, BOOKS } from '../data/books';
import { categoriesApi, booksApi } from '../services/api';

export const Categories = () => {
  const [categories, setCategories] = useState(CATEGORIES_DATA);
  const [allBooks, setAllBooks] = useState(BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    let isMounted = true;

    categoriesApi.getCategories().then(data => {
      if (isMounted && data && data.length > 0) setCategories(data);
    }).catch(() => {});

    booksApi.getBooks().then(data => {
      if (isMounted && data && data.length > 0) setAllBooks(data);
    }).catch(() => {});

    return () => { isMounted = false; };
  }, []);

  const filteredBooks = useMemo(() => {
    if (!selectedGenre) return allBooks;
    return allBooks.filter((b) => b.genre.toLowerCase() === selectedGenre.toLowerCase());
  }, [allBooks, selectedGenre]);

  const handleCategoryClick = (genreTitle) => {
    if (selectedGenre === genreTitle) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genreTitle);
    }
  };

  return (
    <div className="bg-background min-h-screen text-text-primary antialiased flex flex-col pb-28 md:pb-16">
      <Header />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-margin-mobile md:px-margin-desktop pt-md pb-xl">
        <div className="mb-lg">
          <h2 className="font-headline-xl text-headline-xl text-on-background font-bold mb-1 tracking-tight">
            Explore Genres
          </h2>
          <p className="font-body-md text-body-md text-text-secondary">
            Discover your next favorite read among our curated categories.
          </p>

          {/* Quick Filter Badges */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mt-4 py-1">
            <button
              onClick={() => setSelectedGenre(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedGenre === null
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              All Genres ({allBooks.length})
            </button>
            {categories.map((cat) => {
              const isSelected = selectedGenre === cat.title;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.title)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid for Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-lg mb-12">
          {categories.map((category) => {
            const isSelected = selectedGenre === category.title;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.title)}
                className={`group relative overflow-hidden rounded-2xl ${category.bgClass} ${category.aspect} ${category.span} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border ${
                  isSelected ? 'ring-4 ring-primary border-transparent' : 'border-outline-variant/30'
                }`}
              >
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between z-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-headline-md text-headline-md font-bold ${category.textClass}`}
                    >
                      {category.title}
                    </h3>
                    {isSelected && (
                      <span className="px-2 py-0.5 bg-primary text-white text-[11px] font-bold rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md transform translate-y-2 group-hover:translate-y-0">
                    <span
                      className={`material-symbols-outlined ${category.arrowColor} text-sm font-bold`}
                    >
                      arrow_forward
                    </span>
                  </div>
                </div>

                <img
                  alt={category.title}
                  src={category.image}
                  className="absolute right-0 bottom-0 w-3/4 h-3/4 object-contain opacity-75 group-hover:scale-110 transition-transform duration-500 origin-bottom-right"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        {/* Filtered Books Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-background">
                {selectedGenre ? `${selectedGenre} Books` : 'All Books in Library'}
              </h3>
              <p className="font-body-md text-xs text-text-secondary mt-0.5">
                Showing {filteredBooks.length} available {filteredBooks.length === 1 ? 'title' : 'titles'}
              </p>
            </div>

            {selectedGenre && (
              <button
                onClick={() => setSelectedGenre(null)}
                className="text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                Show All
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} layout="grid" />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

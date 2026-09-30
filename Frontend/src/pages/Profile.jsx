import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { USER_PROFILE, BOOKS } from '../data/books';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';

export const Profile = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart, showNotification } = useCart();
  const [activeModal, setActiveModal] = useState(null); // 'wishlist' | 'orders' | 'edit'

  const wishlistedBooks = BOOKS.filter((b) => wishlist.includes(b.id));

  return (
    <div className="bg-background text-on-background antialiased min-h-screen pb-28 md:pb-16 flex flex-col">
      <Header />

      <main className="max-w-[1200px] mx-auto w-full px-margin-mobile md:px-margin-desktop pt-6 pb-12 flex flex-col md:flex-row gap-8">
        {/* Profile Summary Card (Bento Style) */}
        <section className="w-full md:w-1/3 bg-surface-container-lowest rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden border border-surface-variant h-fit">
          {/* Decorative background element */}
          <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-br from-primary-fixed to-surface-container-high opacity-60 z-0"></div>

          {/* Avatar */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-surface-variant p-1 shadow-md mb-4 border-2 border-surface mt-6">
            <img
              className="w-full h-full rounded-full object-cover"
              src={USER_PROFILE.avatar}
              alt={USER_PROFILE.name}
            />
            <button
              onClick={() => showNotification('Edit profile picture coming soon!')}
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
              title="Change avatar"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </button>
          </div>

          <h2 className="relative z-10 font-headline-md text-xl font-bold text-on-surface mb-0.5">
            {USER_PROFILE.name}
          </h2>
          <p className="relative z-10 font-body-md text-sm text-text-secondary mb-6">
            {USER_PROFILE.email}
          </p>

          {/* Stats Bar */}
          <div className="relative z-10 w-full flex justify-around bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30">
            <div className="flex flex-col items-center">
              <span className="font-headline-md text-lg font-bold text-primary">
                {USER_PROFILE.reviewsCount}
              </span>
              <span className="font-label-sm text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                Reviews
              </span>
            </div>
            <div className="w-px h-8 bg-outline-variant/30 my-auto"></div>
            <button
              onClick={() => setActiveModal('wishlist')}
              className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="font-headline-md text-lg font-bold text-primary">
                {wishlist.length}
              </span>
              <span className="font-label-sm text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                Wishlist
              </span>
            </button>
            <div className="w-px h-8 bg-outline-variant/30 my-auto"></div>
            <button
              onClick={() => setActiveModal('orders')}
              className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="font-headline-md text-lg font-bold text-primary">
                {USER_PROFILE.ordersCount}
              </span>
              <span className="font-label-sm text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                Orders
              </span>
            </button>
          </div>
        </section>

        {/* Options List */}
        <section className="w-full md:w-2/3 flex flex-col gap-4">
          <h3 className="font-label-md text-xs text-text-secondary uppercase tracking-wider font-bold ml-1">
            Account Settings
          </h3>

          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-outline-variant/30 overflow-hidden divide-y divide-outline-variant/20">
            {/* Option: Edit Profile */}
            <button
              onClick={() => showNotification('Profile editing opened')}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-fixed-dim/40 flex items-center justify-center group-hover:bg-primary-fixed-dim transition-colors text-primary">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <span className="font-body-md text-sm md:text-base text-on-surface font-medium">
                  Edit Profile
                </span>
              </div>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-xl">
                chevron_right
              </span>
            </button>

            {/* Option: Saved Addresses */}
            <button
              onClick={() => showNotification('1 saved address: 123 Paper Street, New York')}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed-dim/40 flex items-center justify-center group-hover:bg-tertiary-fixed-dim transition-colors text-tertiary">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <span className="font-body-md text-sm md:text-base text-on-surface font-medium">
                  Saved Addresses
                </span>
              </div>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-xl">
                chevron_right
              </span>
            </button>

            {/* Option: Order History */}
            <button
              onClick={() => setActiveModal('orders')}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-surface-variant transition-colors text-primary">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                </div>
                <span className="font-body-md text-sm md:text-base text-on-surface font-medium">
                  Order History
                </span>
              </div>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-xl">
                chevron_right
              </span>
            </button>

            {/* Option: Notification Preferences */}
            <button
              onClick={() => showNotification('Notifications preferences are up to date')}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center group-hover:bg-surface-container-high transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">notifications</span>
                </div>
                <span className="font-body-md text-sm md:text-base text-on-surface font-medium">
                  Notifications
                </span>
              </div>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-xl">
                chevron_right
              </span>
            </button>

            {/* Option: Help & Support */}
            <button
              onClick={() => showNotification('BookStop Support: support@bookstop.com')}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-text-secondary">
                  <span className="material-symbols-outlined text-[20px]">help</span>
                </div>
                <span className="font-body-md text-sm md:text-base text-on-surface font-medium">
                  Help & FAQs
                </span>
              </div>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-xl">
                chevron_right
              </span>
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              showNotification('Logged out successfully', 'info');
              navigate('/');
            }}
            className="w-full py-3.5 mt-2 bg-surface border border-outline-variant/40 hover:border-error/50 text-error font-semibold rounded-2xl hover:bg-error/5 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Sign Out
          </button>
        </section>
      </main>

      {/* Wishlist Modal */}
      {activeModal === 'wishlist' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-surface-variant max-h-[85vh] flex flex-col fade-in-up">
            <div className="flex justify-between items-center pb-4 border-b border-surface-container">
              <h3 className="font-headline-md text-xl font-bold text-on-surface">
                My Wishlist ({wishlistedBooks.length})
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full text-text-secondary hover:text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-4 flex flex-col gap-4">
              {wishlistedBooks.length === 0 ? (
                <p className="text-center text-text-secondary py-8">
                  Your wishlist is empty. Tap the heart on any book to add it here!
                </p>
              ) : (
                wishlistedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center justify-between gap-3 p-3 bg-surface-container-lowest rounded-2xl border border-surface-variant"
                  >
                    <div
                      onClick={() => {
                        setActiveModal(null);
                        navigate(`/book/${book.id}`);
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm truncate text-on-surface">
                          {book.title}
                        </h4>
                        <p className="text-xs text-text-secondary truncate">{book.author}</p>
                        <p className="text-xs text-primary font-bold mt-1">
                          ${book.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addToCart(book, 1)}
                        className="p-2 rounded-full bg-primary-container text-white hover:bg-primary transition-colors"
                        title="Add to cart"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_cart
                        </span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(book.id)}
                        className="p-2 rounded-full text-text-secondary hover:text-error"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Orders Modal */}
      {activeModal === 'orders' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-surface-variant max-h-[85vh] flex flex-col fade-in-up">
            <div className="flex justify-between items-center pb-4 border-b border-surface-container">
              <h3 className="font-headline-md text-xl font-bold text-on-surface">
                Order History
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full text-text-secondary hover:text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-4 flex flex-col gap-4">
              <div className="p-4 bg-surface-container-lowest rounded-2xl border border-surface-variant">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-primary">#BS-849201</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                    Delivered
                  </span>
                </div>
                <p className="text-xs text-text-secondary mb-2">Ordered on Sept 12, 2026</p>
                <div className="text-xs font-medium text-text-primary">
                  The Midnight Library, The Silent Echo
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-surface-container text-xs">
                  <span className="text-text-secondary">Total: $33.98</span>
                  <button
                    onClick={() => showNotification('Invoice downloaded')}
                    className="text-primary font-bold hover:underline"
                  >
                    View Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

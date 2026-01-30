import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import logoUrl from "../assets/logo.svg";

const Navbar = ({ currentPage, setCurrentPage, showAdmin = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cartCount = useCartStore((s) => s.count());
  const wishlistCount = useWishlistStore((s) => s.getWishlistCount());

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "products", label: "PRODUCTS" },
    { id: "customize", label: "CUSTOMIZE" },
    { id: "corporate", label: "CORPORATE" },
    { id: "about", label: "ABOUT US" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-200"
            : "bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleNavigation("home")}
            >
              <img
                src={logoUrl}
                alt="Arics logo"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-sm shadow-sm border border-pink-200 bg-white"
              />
              <span className="text-2xl sm:text-3xl font-['Italiana'] text-pink-700 tracking-wide">
                Arics
              </span>
            </motion.div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-10">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`font-['Cinzel'] text-xs xl:text-sm tracking-widest transition-colors relative group ${
                    currentPage === item.id
                      ? "text-pink-600"
                      : "text-pink-800 hover:text-pink-600"
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                      currentPage === item.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </motion.button>
              ))}

              {/* Wishlist Icon */}
              <motion.button
                onClick={() => handleNavigation("wishlist")}
                className="relative text-pink-800 hover:text-pink-600 transition-colors"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Wishlist"
              >
                <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {wishlistCount > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Cart Icon */}
              <motion.button
                onClick={() => handleNavigation("cart")}
                className="relative text-pink-800 hover:text-pink-600 transition-colors"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Cart"
              >
                <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {showAdmin && (
                <motion.button
                  onClick={() => handleNavigation("admin")}
                  className={`font-['Cinzel'] text-xs xl:text-sm tracking-widest transition-colors relative group ${
                    currentPage === "admin"
                      ? "text-pink-600"
                      : "text-pink-800 hover:text-pink-600"
                  }`}
                  whileHover={{ y: -2 }}
                >
                  ADMIN
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                      currentPage === "admin" ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </motion.button>
              )}
            </div>

            {/* Mobile Icons (Wishlist & Cart) */}
            <div className="flex lg:hidden items-center gap-4">
              {/* Mobile Wishlist */}
              <motion.button
                onClick={() => handleNavigation("wishlist")}
                className="relative text-pink-800 hover:text-pink-600 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] rounded-full px-1.5 py-0.5 min-w-[16px] text-center">
                    {wishlistCount}
                  </span>
                )}
              </motion.button>

              {/* Mobile Cart */}
              <motion.button
                onClick={() => handleNavigation("cart")}
                className="relative text-pink-800 hover:text-pink-600 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] rounded-full px-1.5 py-0.5 min-w-[16px] text-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-pink-700 hover:text-pink-600 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="sm:w-7 sm:h-7"
                >
                  {mobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                  ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-16 sm:top-20 left-0 right-0 bottom-0 bg-white z-[95] overflow-y-auto lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="px-6 py-8 space-y-1">
                {/* Navigation Items */}
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`block w-full text-left font-['Cinzel'] text-base tracking-widest transition-all py-4 px-4 rounded-lg ${
                      currentPage === item.id
                        ? "text-pink-600 bg-pink-50"
                        : "text-pink-800 hover:bg-pink-50"
                    }`}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Additional Mobile Features */}
                <div className="pt-6 pb-4 border-t border-pink-200 space-y-1">
                  <motion.button
                    onClick={() => handleNavigation("referrals")}
                    className="flex items-center gap-3 w-full text-left text-pink-800 hover:bg-pink-50 py-4 px-4 rounded-lg transition-all"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-['Cinzel'] text-sm tracking-wider">
                      REFERRALS
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleNavigation("occasions")}
                    className="flex items-center gap-3 w-full text-left text-pink-800 hover:bg-pink-50 py-4 px-4 rounded-lg transition-all"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-['Cinzel'] text-sm tracking-wider">
                      OCCASION REMINDERS
                    </span>
                  </motion.button>
                </div>

                {showAdmin && (
                  <motion.button
                    onClick={() => handleNavigation("admin")}
                    className="block w-full text-left font-['Cinzel'] text-base tracking-widest text-pink-800 hover:bg-pink-50 py-4 px-4 rounded-lg transition-all border-t border-pink-200 mt-4 pt-8"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    ADMIN
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

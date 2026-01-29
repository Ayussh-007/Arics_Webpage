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
    { id: "about", label: "ABOUT US" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-200"
            : "bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleNavigation("home")}
            >
              <img
                src={logoUrl}
                alt="Arics logo"
                className="w-8 h-8 md:w-9 md:h-9 rounded-sm shadow-sm border border-pink-200 bg-white"
              />
              <span className="text-3xl font-['Italiana'] text-pink-700 tracking-wide">
                Arics
              </span>
            </motion.div>

            {/* Navigation Menu - Desktop */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`font-['Cinzel'] text-sm tracking-widest transition-colors relative group ${
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={`font-['Cinzel'] text-sm tracking-widest transition-colors relative group ${
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-pink-700 hover:text-pink-600 transition-colors relative z-50"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border-b border-pink-200"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="px-6 py-8 space-y-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`block w-full text-left font-['Cinzel'] text-base tracking-widest transition-colors ${
                      currentPage === item.id
                        ? "text-pink-600"
                        : "text-pink-800"
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Wishlist & Cart in Mobile */}
                <div className="flex gap-6 pt-4 border-t border-pink-200">
                  <motion.button
                    onClick={() => handleNavigation("wishlist")}
                    className="flex items-center gap-2 text-pink-800"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="font-['Cinzel'] text-sm tracking-wider">
                      WISHLIST {wishlistCount > 0 && `(${wishlistCount})`}
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleNavigation("cart")}
                    className="flex items-center gap-2 text-pink-800"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="font-['Cinzel'] text-sm tracking-wider">
                      CART {cartCount > 0 && `(${cartCount})`}
                    </span>
                  </motion.button>
                </div>

                {showAdmin && (
                  <motion.button
                    onClick={() => handleNavigation("admin")}
                    className="block w-full text-left font-['Cinzel'] text-base tracking-widest text-pink-800 pt-4 border-t border-pink-200"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    ADMIN
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import logoUrl from "../assets/logo.svg";

const Navbar = ({ currentPage, setCurrentPage, showAdmin = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cartCount = useCartStore((s) => s.count())

  return (
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
            <motion.button
              onClick={() => handleNavigation("home")}
              className={`font-['Cinzel'] text-sm tracking-widest transition-colors relative group ${
                currentPage === "home"
                  ? "text-pink-600"
                  : "text-pink-800 hover:text-pink-600"
              }`}
              whileHover={{ y: -2 }}
            >
              HOME
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                  currentPage === "home" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </motion.button>

            <motion.button
              onClick={() => handleNavigation("products")}
              className={`font-['Cinzel'] text-sm tracking-widest transition-colors relative group ${
                currentPage === "products"
                  ? "text-pink-600"
                  : "text-pink-800 hover:text-pink-600"
              }`}
              whileHover={{ y: -2 }}
            >
              PRODUCTS
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                  currentPage === "products"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </motion.button>

            <motion.button
              onClick={() => handleNavigation("customize")}
              className={`font-['Cinzel'] text-sm tracking-widest transition-colors relative group ${
                currentPage === "customize"
                  ? "text-pink-600"
                  : "text-pink-800 hover:text-pink-600"
              }`}
              whileHover={{ y: -2 }}
            >
              CUSTOMIZE
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                  currentPage === "customize"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </motion.button>

            <motion.button
              onClick={() => handleNavigation("about")}
              className={`font-['Cinzel'] text-sm tracking-widest transition-colors relative group ${
                currentPage === "about"
                  ? "text-pink-600"
                  : "text-pink-800 hover:text-pink-600"
              }`}
              whileHover={{ y: -2 }}
            >
              ABOUT US
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                  currentPage === "about" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </motion.button>

            {/* Cart */}
            <motion.button
              onClick={() => handleNavigation("cart")}
              className={`relative font-['Cinzel'] text-sm tracking-widest transition-colors group ${
                currentPage === "cart" ? "text-pink-600" : "text-pink-800 hover:text-pink-600"
              }`}
              whileHover={{ y: -2 }}
            >
              CART
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                  currentPage === "cart" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
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
          <button className="md:hidden text-pink-700 hover:text-pink-600 transition-colors">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

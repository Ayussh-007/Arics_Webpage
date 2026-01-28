import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = ({ currentPage, setCurrentPage }) => {
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
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              className="text-pink-600"
            >
              <path
                d="M18 5C18 5 13.5 9.5 13.5 14C13.5 16.4853 15.5147 18.5 18 18.5C20.4853 18.5 22.5 16.4853 22.5 14C22.5 9.5 18 5 18 5Z"
                fill="currentColor"
              />
              <path
                d="M11 16C11 16 9 18.5 9 20.5C9 21.8807 10.1193 23 11.5 23C12.8807 23 14 21.8807 14 20.5C14 18.5 11 16 11 16Z"
                fill="currentColor"
              />
              <path
                d="M25 16C25 16 23 18.5 23 20.5C23 21.8807 24.1193 23 25.5 23C26.8807 23 28 21.8807 28 20.5C28 18.5 25 16 25 16Z"
                fill="currentColor"
              />
              <rect
                x="16.5"
                y="18"
                width="3"
                height="13"
                rx="1.5"
                fill="currentColor"
              />
            </svg>
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

            <motion.div className="relative group" whileHover={{ y: -2 }}>
              <button className="flex items-center gap-2 text-pink-800 font-['Cinzel'] text-sm tracking-widest hover:text-pink-600 transition-colors">
                OUR PRODUCTS
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform group-hover:rotate-180"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
            </motion.div>

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
                  currentPage === "about"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </motion.button>
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

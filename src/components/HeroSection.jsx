import React from "react";
import { motion } from "framer-motion";
import BloomAnimation from "./Bloomanimation";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bloom Animation Background */}
      <BloomAnimation />

      {/* Social Media Icons - Right Side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-6">
        <motion.a
          href="#"
          className="w-11 h-11 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition-all shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="18" cy="6" r="1.5" fill="currentColor" />
          </svg>
        </motion.a>
        <motion.a
          href="#"
          className="w-11 h-11 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition-all shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </motion.a>
        <motion.a
          href="#"
          className="w-11 h-11 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition-all shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </motion.a>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="max-w-2xl">
          <motion.p
            className="text-gray-700 text-xl md:text-2xl font-['Cormorant_Garamond'] italic mb-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            This Valentine's Day
          </motion.p>

          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-['Playfair_Display'] text-gray-900 mb-6 leading-tight font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Customize your bunch
          </motion.h1>

          <motion.p
            className="text-gray-700 text-xl md:text-2xl mb-3 font-['Cormorant_Garamond'] font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            select flowers you love, packing you want
          </motion.p>

          <motion.p
            className="text-gray-500 text-sm mb-10 font-['Montserrat']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            T&C applied. Offer Valid till 19th February 21
          </motion.p>

          <motion.button
            className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-['Cinzel'] font-medium px-12 py-4 rounded-full text-base tracking-wider transition-all shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            EXPLORE MORE
          </motion.button>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        <motion.div
          className="w-3 h-3 rounded-full bg-pink-500 shadow-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 }}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-pink-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.3 }}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-pink-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4 }}
        />
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-32 left-10 w-16 h-16 border-2 border-pink-300 rounded-full"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      />
      <motion.div
        className="absolute top-40 left-1/4 w-12 h-12 border-2 border-rose-300 rounded-full"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      />
    </section>
  );
};

export default HeroSection;

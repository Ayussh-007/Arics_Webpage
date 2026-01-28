import React from "react";
import { motion } from "framer-motion";

const BloomAnimation = () => {
  const floatSlow = {
    duration: 10,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  };

  const floatFast = {
    duration: 7,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient layer (no scroll effects) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-200 to-purple-200"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "blur(2px)" }}
      />

      {/* Flower 1 - Main center flower */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96"
        animate={{
          y: [0, -14, 0],
          rotate: [-6, 2, -6],
          scale: [0.95, 1.05, 0.95],
          opacity: [0.75, 1, 0.75],
        }}
        transition={{ ...floatSlow, delay: 0.2 }}
      >
        <div className="relative w-full h-full">
          {/* Petals */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-32 h-32 -ml-16 -mt-16 origin-center"
              style={{ rotate: i * 45 }}
              animate={{ scale: [0.92, 1, 0.92], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 6 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-pink-300 to-rose-500 rounded-full opacity-70 blur-sm" />
            </motion.div>
          ))}
          {/* Center */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-20 h-20 -ml-10 -mt-10 bg-gradient-to-br from-yellow-100 to-amber-300 rounded-full shadow-lg"
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Flower 2 - Top right accent */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64"
        animate={{
          y: [0, -10, 0],
          rotate: [10, -2, 10],
          scale: [0.92, 1.03, 0.92],
          opacity: [0.55, 0.9, 0.55],
        }}
        transition={{ ...floatFast, delay: 0.6 }}
      >
        <div className="relative w-full h-full">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12 origin-center"
              style={{ rotate: i * 60 }}
              animate={{ scale: [0.9, 1, 0.9], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-rose-300 to-pink-500 rounded-full opacity-65 blur-sm" />
            </motion.div>
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-full shadow-md"
            animate={{ scale: [0.95, 1.08, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Flower 3 - Lower right cluster */}
      <motion.div
        className="absolute bottom-20 right-1/3 w-80 h-80"
        animate={{
          y: [0, 12, 0],
          rotate: [-8, 5, -8],
          scale: [0.96, 1.06, 0.96],
          opacity: [0.6, 0.95, 0.6],
        }}
        transition={{ ...floatSlow, delay: 1 }}
      >
        <div className="relative w-full h-full">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-28 h-28 -ml-14 -mt-14 origin-center"
              style={{ rotate: i * 51.4 }}
              animate={{ scale: [0.9, 1, 0.9], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 6.5 + i * 0.18, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-pink-300 to-fuchsia-500 rounded-full opacity-60 blur-sm" />
            </motion.div>
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 w-18 h-18 -ml-9 -mt-9 bg-gradient-to-br from-yellow-100 to-yellow-400 rounded-full shadow-md"
            animate={{ scale: [0.94, 1.06, 0.94] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Additional floating petals */}
      <motion.div
        className="absolute top-1/3 right-1/2 w-20 h-20 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-40 blur-md"
        animate={{ y: [0, -22, 0], x: [0, 12, 0], opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-rose-300 to-pink-500 rounded-full opacity-30 blur-md"
        animate={{ y: [0, 18, 0], x: [0, -10, 0], opacity: [0.1, 0.35, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Flower 4 - Top left accent */}
      <motion.div
        className="absolute top-20 left-20 w-56 h-56"
        animate={{
          y: [0, -8, 0],
          rotate: [12, -6, 12],
          scale: [0.9, 1.02, 0.9],
          opacity: [0.45, 0.85, 0.45],
        }}
        transition={{ ...floatFast, delay: 0.4 }}
      >
        <div className="relative w-full h-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-20 h-20 -ml-10 -mt-10 origin-center"
              style={{ rotate: i * 72 }}
              animate={{ scale: [0.9, 1, 0.9], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 4.8 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-300 to-fuchsia-400 rounded-full opacity-60 blur-sm" />
            </motion.div>
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 bg-gradient-to-br from-yellow-100 to-amber-300 rounded-full shadow-md"
            animate={{ scale: [0.95, 1.08, 0.95] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Ambient blurred blobs for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-24 -left-24 w-80 h-80 bg-rose-300/40 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-140px] right-[-120px] w-[28rem] h-[28rem] bg-pink-300/35 rounded-full blur-3xl"
          animate={{ x: [0, -26, 0], y: [0, -22, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-300/25 rounded-full blur-3xl"
          animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Overlay gradient for softness */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/20 pointer-events-none" />
    </div>
  );
};

export default BloomAnimation;

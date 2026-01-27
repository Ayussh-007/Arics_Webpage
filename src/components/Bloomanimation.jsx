import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BloomAnimation = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Multiple flower elements with different scroll transforms
  const flower1Scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1.2]);
  const flower1Rotate = useTransform(scrollYProgress, [0, 0.5], [-15, 0]);
  const flower1Opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);

  const flower2Scale = useTransform(scrollYProgress, [0, 0.6], [0.5, 1.1]);
  const flower2Rotate = useTransform(scrollYProgress, [0, 0.6], [20, 0]);
  const flower2Opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);

  const flower3Scale = useTransform(scrollYProgress, [0, 0.4], [0.7, 1]);
  const flower3Rotate = useTransform(scrollYProgress, [0, 0.4], [-10, 5]);
  const flower3Opacity = useTransform(scrollYProgress, [0, 0.25], [0.5, 1]);

  const backgroundBlur = useTransform(scrollYProgress, [0, 0.5], [0, 4]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Background gradient layer with light theme */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-300 to-purple-200"
        style={{ filter: useTransform(backgroundBlur, (v) => `blur(${v}px)`) }}
      />

      {/* Flower 1 - Main center flower */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96"
        style={{
          scale: flower1Scale,
          rotate: flower1Rotate,
          opacity: flower1Opacity,
        }}
      >
        <div className="relative w-full h-full">
          {/* Petals */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-32 h-32 -ml-16 -mt-16 origin-center"
              style={{
                rotate: i * 45,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-500 rounded-full opacity-70 blur-sm" />
            </motion.div>
          ))}
          {/* Center */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-20 h-20 -ml-10 -mt-10 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          />
        </div>
      </motion.div>

      {/* Flower 2 - Top right accent */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64"
        style={{
          scale: flower2Scale,
          rotate: flower2Rotate,
          opacity: flower2Opacity,
        }}
      >
        <div className="relative w-full h-full">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12 origin-center"
              style={{
                rotate: i * 60,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-rose-300 to-rose-500 rounded-full opacity-65 blur-sm" />
            </motion.div>
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-full shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Flower 3 - Lower right cluster */}
      <motion.div
        className="absolute bottom-20 right-1/3 w-80 h-80"
        style={{
          scale: flower3Scale,
          rotate: flower3Rotate,
          opacity: flower3Opacity,
        }}
      >
        <div className="relative w-full h-full">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-28 h-28 -ml-14 -mt-14 origin-center"
              style={{
                rotate: i * 51.4,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.09 + 0.3, duration: 0.55 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 rounded-full opacity-60 blur-sm" />
            </motion.div>
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 w-18 h-18 -ml-9 -mt-9 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.35 }}
          />
        </div>
      </motion.div>

      {/* Additional scattered petals */}
      <motion.div
        className="absolute top-1/3 right-1/2 w-20 h-20 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-50 blur-md"
        style={{
          scale: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0.5, 0]),
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-rose-300 to-pink-500 rounded-full opacity-40 blur-md"
        style={{
          scale: useTransform(scrollYProgress, [0.1, 0.4], [0, 1]),
          opacity: useTransform(scrollYProgress, [0.1, 0.4, 0.8], [0, 0.4, 0]),
        }}
      />

      {/* Flower 4 - Top left accent */}
      <motion.div
        className="absolute top-20 left-20 w-56 h-56"
        style={{
          scale: useTransform(scrollYProgress, [0, 0.5], [0.5, 1]),
          rotate: useTransform(scrollYProgress, [0, 0.5], [15, -5]),
          opacity: useTransform(scrollYProgress, [0, 0.35], [0.3, 0.9]),
        }}
      >
        <div className="relative w-full h-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-20 h-20 -ml-10 -mt-10 origin-center"
              style={{
                rotate: i * 72,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.07 + 0.25, duration: 0.45 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-300 to-purple-500 rounded-full opacity-60 blur-sm" />
            </motion.div>
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 bg-gradient-to-br from-yellow-100 to-amber-300 rounded-full shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.55, duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Overlay gradient for depth and softness */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/20 pointer-events-none" />
    </div>
  );
};

export default BloomAnimation;

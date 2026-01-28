import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollBloomSection - Premium scroll-controlled flower bloom animation
 * 
 * Features:
 * - 120 frame sequence controlled by scroll position
 * - Canvas-based rendering for optimal performance
 * - Landscape orientation for cinematic feel
 * - Preloading with elegant loading screen
 * - Smooth frame interpolation
 * - Responsive design with mobile optimization
 * - Graceful fallback for low-end devices
 */

const ScrollBloomSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const frameImages = useRef([]);
  const currentFrame = useRef(0);
  const rafId = useRef(null);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Configuration
  const TOTAL_FRAMES = 120;
  const SCROLL_MULTIPLIER = 2.5; // Height multiplier for scroll distance

  // Detect low-end devices
  useEffect(() => {
    const checkDevice = () => {
      const memory = navigator.deviceMemory || 4;
      const cores = navigator.hardwareConcurrency || 4;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      // Flag as low-end if mobile with less than 4GB RAM or fewer than 4 cores
      if (isMobile && (memory < 4 || cores < 4)) {
        setIsLowEndDevice(true);
      }
    };
    
    checkDevice();
  }, []);

  // Preload all frame images
  useEffect(() => {
    if (isLowEndDevice) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const images = [];

    const loadImage = (index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const frameNumber = String(index).padStart(3, '0');
        
        // Import the image using Vite's import
        img.src = new URL(`../assets/Frames/${frameNumber}.png`, import.meta.url).href;
        
        img.onload = () => {
          images[index - 1] = img;
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve();
        };
        
        img.onerror = () => {
          console.error(`Failed to load frame ${frameNumber}`);
          reject();
        };
      });
    };

    // Load all frames
    const loadAllFrames = async () => {
      const promises = [];
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        promises.push(loadImage(i));
      }

      try {
        await Promise.all(promises);
        frameImages.current = images;
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading frames:', error);
        setIsLowEndDevice(true);
        setImagesLoaded(true);
      }
    };

    loadAllFrames();
  }, [isLowEndDevice]);

  // Setup canvas and handle scroll
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || isLowEndDevice) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });

    // Set canvas size for landscape display
    const setCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Original image is 720x1280 (portrait)
      // We'll rotate it to display as landscape (1280x720)
      const imageWidth = 1280;
      const imageHeight = 720;
      const aspectRatio = imageWidth / imageHeight;
      
      let canvasWidth, canvasHeight;
      
      // Use 80% of container for a more prominent display
      const maxWidth = containerWidth * 0.85;
      const maxHeight = containerHeight * 0.75;
      
      // Calculate size maintaining aspect ratio
      if (maxWidth / aspectRatio <= maxHeight) {
        canvasWidth = maxWidth;
        canvasHeight = maxWidth / aspectRatio;
      } else {
        canvasHeight = maxHeight;
        canvasWidth = maxHeight * aspectRatio;
      }

      // Set actual canvas resolution (for sharp rendering)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      
      // Set display size
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      
      // Scale context to match device pixel ratio
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Render frame on canvas with rotation
    const renderFrame = (frameIndex) => {
      const img = frameImages.current[frameIndex];
      if (!img || !ctx) return;

      const canvasDisplayWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasDisplayHeight = canvas.height / (window.devicePixelRatio || 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvasDisplayWidth, canvasDisplayHeight);

      // Save context state
      ctx.save();

      // Translate to center of canvas
      ctx.translate(canvasDisplayWidth / 2, canvasDisplayHeight / 2);
      
      // Rotate 90 degrees clockwise to make portrait -> landscape
      ctx.rotate(Math.PI / 2);

      // Calculate scale to fit the rotated image
      // After rotation, image width becomes height and vice versa
      const scale = Math.min(
        canvasDisplayHeight / img.width,
        canvasDisplayWidth / img.height
      );
      
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      // Draw image centered at origin (which is now at canvas center)
      ctx.drawImage(
        img,
        -scaledWidth / 2,
        -scaledHeight / 2,
        scaledWidth,
        scaledHeight
      );

      // Restore context state
      ctx.restore();
    };

    // Handle scroll with smooth interpolation
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress when section is in viewport
      // Start when section enters viewport, complete when it exits
      const scrollStart = windowHeight - sectionTop;
      const scrollRange = windowHeight + sectionHeight;
      const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollRange));

      const targetFrame = Math.floor(scrollProgress * (TOTAL_FRAMES - 1));
      
      if (targetFrame !== currentFrame.current) {
        currentFrame.current = targetFrame;
        renderFrame(targetFrame);
      }
    };

    // Use requestAnimationFrame for smooth rendering
    const smoothScroll = () => {
      handleScroll();
      rafId.current = requestAnimationFrame(smoothScroll);
    };

    // Initial render
    renderFrame(0);
    
    // Start smooth scroll listener
    smoothScroll();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [imagesLoaded, isLowEndDevice]);

  // Scroll-based text opacity using Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.45], [1, 0.5, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.45], [0, -30]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.45], [1, 0.95]);

  if (isLowEndDevice) {
    // Fallback for low-end devices - show static final frame
    return (
      <section
        ref={containerRef}
        className="relative w-full min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-blush-50 flex items-center justify-center overflow-hidden"
      >
        <div className="text-center max-w-7xl mx-auto px-6">
          <div className="relative inline-block">
            <img
              src={new URL(`../assets/Frames/120.png`, import.meta.url).href}
              alt="Bloomed flower"
              className="max-w-[90vw] max-h-[70vh] object-contain transform rotate-90"
              style={{ filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.08))' }}
            />
          </div>
          <p className="mt-12 font-['Cormorant_Garamond'] text-xl md:text-2xl text-gray-600 italic">
            A moment of beauty
          </p>
        </div>
      </section>
    );
  }

  if (!imagesLoaded) {
    // Elegant loading screen
    return (
      <section className="relative w-full min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-blush-50 flex items-center justify-center">
        <div className="text-center">
          {/* Elegant flower-shaped loader */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0">
              <svg viewBox="0 0 100 100" className="animate-spin" style={{ animationDuration: '3s' }}>
                {/* Petals */}
                <ellipse cx="50" cy="20" rx="8" ry="20" fill="#fecdd3" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="50" cy="20" rx="8" ry="20" fill="#fecdd3" opacity="0.6" transform="rotate(60 50 50)" />
                <ellipse cx="50" cy="20" rx="8" ry="20" fill="#fecdd3" opacity="0.6" transform="rotate(120 50 50)" />
                <ellipse cx="50" cy="20" rx="8" ry="20" fill="#fecdd3" opacity="0.6" transform="rotate(180 50 50)" />
                <ellipse cx="50" cy="20" rx="8" ry="20" fill="#fecdd3" opacity="0.6" transform="rotate(240 50 50)" />
                <ellipse cx="50" cy="20" rx="8" ry="20" fill="#fecdd3" opacity="0.6" transform="rotate(300 50 50)" />
                {/* Center */}
                <circle cx="50" cy="50" r="8" fill="#fb7185" />
              </svg>
            </div>
          </div>
          
          <p className="font-['Cormorant_Garamond'] text-3xl text-gray-700 mb-3 italic">
            Preparing the bloom
          </p>
          <div className="w-48 h-1 bg-rose-100 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-300 to-pink-400 transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="mt-3 font-['Lato'] text-sm text-gray-500">
            {loadingProgress}%
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-rose-50 via-pink-50 to-blush-50 flex items-center justify-center overflow-hidden"
      style={{ minHeight: `${100 * SCROLL_MULTIPLIER}vh` }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Sticky container for canvas and text */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        {/* Instructional text with scroll-based fade */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ 
            opacity: textOpacity, 
            y: textY,
            scale: textScale
          }}
        >
          <div className="text-center">
            <p className="font-['Cormorant_Garamond'] text-2xl md:text-4xl lg:text-5xl text-gray-700 italic font-light px-6">
              Scroll to see the bloom effect
            </p>
            <div className="w-20 h-px bg-rose-300 mx-auto mt-6" />
          </div>
        </motion.div>

        {/* Canvas for frame rendering */}
        <canvas
          ref={canvasRef}
          className="relative z-0"
          style={{
            filter: 'drop-shadow(0 30px 80px rgba(0, 0, 0, 0.08))',
          }}
        />
      </div>

      {/* Ambient floating elements */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>
    </section>
  );
};

export default ScrollBloomSection;

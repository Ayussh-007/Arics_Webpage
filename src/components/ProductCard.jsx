import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product, onViewDetails, onCustomize, onAddToCart }) => {
  const effectivePrice = product.discountedPrice || product.originalPrice;
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.originalPrice;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Card */}
      <motion.div
        className="relative bg-white/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500"
        whileHover={{ y: -8, scale: 1.02 }}
      >
        {/* Offer Badge */}
        {product.hasOffer && (
          <motion.div
            className="absolute top-4 right-4 z-10 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-xs font-['Cinzel'] font-semibold tracking-wide shadow-lg"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            {product.offerBadge || `${product.discountPercentage}% OFF`}
          </motion.div>
        )}

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-['Montserrat'] font-medium">
            Out of Stock
          </div>
        )}

        {/* Featured Badge */}
        {product.isFeatured && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-['Cinzel'] font-semibold tracking-wide shadow-lg">
            ✨ Featured
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          
          {/* Quick Action Buttons - Appear on Hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <motion.button
              onClick={() => onViewDetails(product)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => onCustomize(product)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Tag */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-pink-100/50 backdrop-blur-sm text-pink-700 rounded-full text-xs font-['Montserrat'] font-medium uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 font-['Cormorant_Garamond'] text-base mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl font-['Playfair_Display'] font-bold text-gray-900">
              ${effectivePrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg font-['Montserrat'] text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="ml-auto text-sm font-['Cinzel'] font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                  Save ${(product.originalPrice - product.discountedPrice).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className={`flex-1 ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white'
              } font-['Cinzel'] font-medium px-6 py-3 rounded-full text-sm tracking-wider transition-all shadow-md hover:shadow-lg`}
              whileHover={product.stock > 0 ? { scale: 1.02 } : {}}
              whileTap={product.stock > 0 ? { scale: 0.98 } : {}}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </motion.button>

            <motion.button
              onClick={() => onViewDetails(product)}
              className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 border border-gray-200 font-['Montserrat'] font-medium px-6 py-3 rounded-full text-sm transition-all shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Details
            </motion.button>
          </div>

          {/* Stock Indicator */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="mt-3 text-xs text-orange-600 font-['Montserrat'] text-center">
              Only {product.stock} left in stock!
            </p>
          )}
        </div>

        {/* Glassmorphism Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-pink-400/0 group-hover:border-pink-400/30 transition-colors duration-500 pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../store/useCartStore'
import WishlistButton from './WishlistButton'
import ProductReviews from './ProductReviews'
import StarRating from './StarRating'
import { useReviewStore } from '../store/useReviewStore'
import toast from 'react-hot-toast'

const ProductDetailModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState('description')
  const addItem = useCartStore((s) => s.addItem)
  const { getAverageRating, getProductReviews } = useReviewStore()
  
  if (!product) return null
  
  const averageRating = getAverageRating(product._id)
  const reviewCount = getProductReviews(product._id).length
  const effectivePrice = product.discountedPrice || product.originalPrice
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.originalPrice
  
  const handleAddToCart = () => {
    addItem({
      id: `product:${product._id}`,
      type: 'product',
      refId: product._id,
      name: product.name,
      price: Number(effectivePrice),
      image: product.image,
      quantity: quantity,
      meta: { category: product.category },
    })
    toast.success(`Added ${quantity} item(s) to cart`)
  }
  
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'care', label: 'Care Instructions' },
    { id: 'delivery', label: 'Delivery Info' },
    { id: 'reviews', label: `Reviews (${reviewCount})` }
  ]
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white shadow-lg transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="overflow-y-auto max-h-[90vh]">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 md:h-auto bg-gradient-to-br from-pink-50 to-rose-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Wishlist Button */}
                <div className="absolute top-6 left-6">
                  <WishlistButton product={product} size="lg" />
                </div>
                
                {/* Badges */}
                {product.hasOffer && (
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-['Cinzel'] tracking-wider shadow-lg">
                    {product.offerBadge || `${product.discountPercentage}% OFF`}
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-8 lg:p-10 space-y-6">
                {/* Category */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-['Montserrat'] font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.isFeatured && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-['Montserrat'] font-medium">
                      ✨ Featured
                    </span>
                  )}
                </div>
                
                {/* Title */}
                <div>
                  <h2 className="text-4xl font-['Playfair_Display'] font-bold text-gray-900 mb-3">
                    {product.name}
                  </h2>
                  
                  {/* Rating */}
                  {reviewCount > 0 && (
                    <div className="flex items-center gap-3">
                      <StarRating rating={Math.round(parseFloat(averageRating))} size="md" />
                      <span className="text-sm text-gray-600 font-['Montserrat']">
                        {averageRating} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Price */}
                <div className="flex items-baseline gap-3 pb-6 border-b border-gray-200">
                  <span className="text-4xl font-['Playfair_Display'] font-bold text-gray-900">
                    ₹{effectivePrice.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-gray-400 line-through font-['Lato']">
                        ₹{product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm font-['Cinzel'] font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                        Save ₹{(product.originalPrice - product.discountedPrice).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
                
                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <>
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-600 font-['Montserrat'] font-medium">
                        In Stock
                        {product.stock <= 5 && ` - Only ${product.stock} left!`}
                      </span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-red-600 font-['Montserrat'] font-medium">
                        Out of Stock
                      </span>
                    </>
                  )}
                </div>
                
                {/* Quantity Selector */}
                {product.stock > 0 && (
                  <div className="space-y-2">
                    <label className="block text-sm font-['Montserrat'] font-medium text-gray-700">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-12 text-center text-lg font-['Playfair_Display'] font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-4 rounded-full font-['Cinzel'] text-sm tracking-wider shadow-lg ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                  }`}
                  whileHover={product.stock > 0 ? { scale: 1.02 } : {}}
                  whileTap={product.stock > 0 ? { scale: 0.98 } : {}}
                >
                  {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                </motion.button>
              </div>
            </div>
            
            {/* Tabs Section */}
            <div className="border-t border-gray-200">
              {/* Tab Headers */}
              <div className="flex border-b border-gray-200 px-8 lg:px-10 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-6 py-4 font-['Montserrat'] text-sm font-medium whitespace-nowrap transition-colors relative ${
                      selectedTab === tab.id
                        ? 'text-pink-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                    {selectedTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600"
                        layoutId="activeTab"
                      />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {selectedTab === 'description' && (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="prose prose-pink max-w-none"
                    >
                      <p className="text-gray-700 font-['Cormorant_Garamond'] text-lg leading-relaxed">
                        {product.description || 'No description available.'}
                      </p>
                    </motion.div>
                  )}
                  
                  {selectedTab === 'care' && (
                    <motion.div
                      key="care"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">
                        How to Care for Your Flowers
                      </h3>
                      <ul className="space-y-3 text-gray-700 font-['Lato']">
                        <li className="flex gap-3">
                          <span className="text-pink-500">•</span>
                          <span>Trim stems at a 45° angle and remove any leaves below the waterline</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-pink-500">•</span>
                          <span>Use a clean vase with fresh, cool water</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-pink-500">•</span>
                          <span>Change water every 2-3 days and re-trim stems</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-pink-500">•</span>
                          <span>Keep away from direct sunlight and heat sources</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-pink-500">•</span>
                          <span>Remove wilted flowers to keep arrangement fresh</span>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                  
                  {selectedTab === 'delivery' && (
                    <motion.div
                      key="delivery"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">
                        Delivery Information
                      </h3>
                      <div className="space-y-4 text-gray-700 font-['Lato']">
                        <div>
                          <h4 className="font-semibold mb-2">Standard Delivery (2-3 days)</h4>
                          <p>Free for orders above ₹500. ₹50 for orders below ₹500.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Express Delivery (24 hours)</h4>
                          <p>Additional ₹100. Available in Mumbai & surrounding areas.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Same Day Delivery</h4>
                          <p>Additional ₹200. Order before 12 PM for same-day delivery.</p>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-lg mt-4">
                          <p className="text-sm">
                            <strong>Note:</strong> All deliveries include a complimentary message card.
                            Flowers are delivered fresh from our local florists.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {selectedTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <ProductReviews productId={product._id} productName={product.name} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProductDetailModal

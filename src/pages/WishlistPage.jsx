import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWishlistStore } from '../store/useWishlistStore'
import { useCartStore } from '../store/useCartStore'
import toast from 'react-hot-toast'

const WishlistPage = () => {
  const { items, removeFromWishlist } = useWishlistStore()
  const addItem = useCartStore((s) => s.addItem)
  
  const handleAddToCart = (product) => {
    const price = product.discountedPrice || product.originalPrice || 0
    addItem({
      id: `product:${product._id}`,
      type: 'product',
      refId: product._id,
      name: product.name,
      price: Number(price),
      image: product.image,
      quantity: 1,
      meta: { category: product.category },
    })
    toast.success('Added to cart')
  }
  
  const handleRemove = (productId) => {
    removeFromWishlist(productId)
    toast('Removed from wishlist', { icon: '💔' })
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20 px-6 lg:px-12">
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto mb-16 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-['Playfair_Display'] font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          My Wishlist
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-['Cormorant_Garamond'] text-gray-700 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Your favorite bouquets, saved for later
        </motion.p>
        
        {items.length > 0 && (
          <motion.p
            className="mt-4 text-gray-600 font-['Montserrat']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist
          </motion.p>
        )}
      </motion.div>
      
      {/* Wishlist Items */}
      <div className="max-w-7xl mx-auto">
        {items.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-6">❤️</div>
            <h3 className="text-2xl font-['Playfair_Display'] font-bold text-gray-800 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 font-['Cormorant_Garamond'] text-lg mb-6">
              Start adding your favorite bouquets!
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((product, index) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition-all shadow-md"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    {/* Badges */}
                    {product.offerBadge && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-['Cinzel'] tracking-wider shadow-lg">
                        {product.offerBadge}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="font-['Cormorant_Garamond'] text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-['Playfair_Display'] font-bold text-gray-900">
                        ₹{product.discountedPrice || product.originalPrice}
                      </span>
                      {product.discountedPrice && product.originalPrice !== product.discountedPrice && (
                        <span className="text-lg text-gray-400 line-through font-['Lato']">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Stock Status */}
                    {product.stock !== undefined && (
                      <div className="text-sm font-['Montserrat']">
                        {product.stock > 0 ? (
                          <span className="text-green-600">
                            ✓ In Stock
                            {product.stock < 5 && ` (Only ${product.stock} left)`}
                          </span>
                        ) : (
                          <span className="text-red-600">✗ Out of Stock</span>
                        )}
                      </div>
                    )}
                    
                    {/* Add to Cart Button */}
                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full py-3 rounded-full font-['Cinzel'] text-sm tracking-wider transition-all shadow-md ${
                        product.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 hover:shadow-lg'
                      }`}
                      whileHover={product.stock > 0 ? { scale: 1.02 } : {}}
                      whileTap={product.stock > 0 ? { scale: 0.98 } : {}}
                    >
                      {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default WishlistPage

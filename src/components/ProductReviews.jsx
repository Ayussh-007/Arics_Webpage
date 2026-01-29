import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReviewStore } from '../store/useReviewStore'
import StarRating from './StarRating'
import toast from 'react-hot-toast'

const ProductReviews = ({ productId, productName }) => {
  const { getProductReviews, getAverageRating, getRatingDistribution, addReview, markHelpful } = useReviewStore()
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [sortBy, setSortBy] = useState('recent')
  const [filterRating, setFilterRating] = useState(null)
  
  const reviews = getProductReviews(productId)
  const averageRating = getAverageRating(productId)
  const distribution = getRatingDistribution(productId)
  
  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === 'highest') return b.rating - a.rating
    if (sortBy === 'helpful') return (b.helpful || 0) - (a.helpful || 0)
    return 0
  })
  
  // Filter by rating
  const filteredReviews = filterRating
    ? sortedReviews.filter(r => r.rating === filterRating)
    : sortedReviews
  
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    comment: ''
  })
  
  const handleSubmitReview = (e) => {
    e.preventDefault()
    
    if (reviewForm.rating === 0) {
      toast.error('Please select a rating')
      return
    }
    
    const newReview = {
      id: Date.now().toString(),
      productId,
      ...reviewForm,
      createdAt: new Date().toISOString(),
      helpful: 0,
      verified: false
    }
    
    addReview(newReview)
    toast.success('Thank you for your review!')
    setShowWriteReview(false)
    setReviewForm({
      name: '',
      email: '',
      rating: 0,
      title: '',
      comment: ''
    })
  }
  
  const totalReviews = reviews.length
  const ratingPercentages = {}
  Object.keys(distribution).forEach(rating => {
    ratingPercentages[rating] = totalReviews > 0
      ? Math.round((distribution[rating] / totalReviews) * 100)
      : 0
  })
  
  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/20 shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-2">
          Customer Reviews
        </h2>
        <p className="text-gray-600 font-['Cormorant_Garamond'] text-lg">
          See what others are saying about {productName}
        </p>
      </div>
      
      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
        {/* Overall Rating */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
            <div className="text-5xl font-['Playfair_Display'] font-bold text-gray-900">
              {totalReviews > 0 ? averageRating : '0.0'}
            </div>
            <div>
              <StarRating rating={Math.round(parseFloat(averageRating))} size="lg" />
              <p className="text-sm text-gray-600 mt-1 font-['Montserrat']">
                Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>
          
          <motion.button
            onClick={() => setShowWriteReview(!showWriteReview)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-['Cinzel'] text-sm tracking-wider hover:from-pink-600 hover:to-rose-600 transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            WRITE A REVIEW
          </motion.button>
        </div>
        
        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => setFilterRating(filterRating === rating ? null : rating)}
              className={`w-full flex items-center gap-3 group hover:bg-pink-50 p-2 rounded-lg transition-colors ${
                filterRating === rating ? 'bg-pink-50' : ''
              }`}
            >
              <span className="text-sm font-['Montserrat'] text-gray-700 w-8">
                {rating}★
              </span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${ratingPercentages[rating]}%` }}
                  transition={{ duration: 0.5, delay: rating * 0.1 }}
                />
              </div>
              <span className="text-sm font-['Montserrat'] text-gray-600 w-12 text-right">
                {ratingPercentages[rating]}%
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Write Review Form */}
      <AnimatePresence>
        {showWriteReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 pb-8 border-b border-gray-200 overflow-hidden"
          >
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <h3 className="text-xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">
                Write Your Review
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-['Montserrat'] text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Lato']"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-['Montserrat'] text-gray-700 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={reviewForm.email}
                    onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Lato']"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-['Montserrat'] text-gray-700 mb-2">
                  Your Rating *
                </label>
                <StarRating
                  rating={reviewForm.rating}
                  size="xl"
                  interactive
                  onRate={(rating) => setReviewForm({ ...reviewForm, rating })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-['Montserrat'] text-gray-700 mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  required
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Lato']"
                  placeholder="Summarize your experience"
                />
              </div>
              
              <div>
                <label className="block text-sm font-['Montserrat'] text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Lato'] resize-none"
                  placeholder="Tell us about your experience with this product..."
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-['Cinzel'] text-sm tracking-wider hover:from-pink-600 hover:to-rose-600 transition-all shadow-md"
                >
                  SUBMIT REVIEW
                </button>
                <button
                  type="button"
                  onClick={() => setShowWriteReview(false)}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full font-['Cinzel'] text-sm tracking-wider hover:bg-gray-50 transition-all"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Filter and Sort Controls */}
      {totalReviews > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-['Montserrat'] text-gray-600">
              Showing {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
            </span>
            {filterRating && (
              <button
                onClick={() => setFilterRating(null)}
                className="text-sm text-pink-600 hover:text-pink-700 font-['Montserrat'] underline"
              >
                Clear filter
              </button>
            )}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-['Montserrat'] focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      )}
      
      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">⭐</div>
            <p className="text-gray-600 font-['Cormorant_Garamond'] text-lg">
              {totalReviews === 0
                ? 'No reviews yet. Be the first to review this product!'
                : 'No reviews match your filter.'}
            </p>
          </div>
        ) : (
          filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/60 rounded-2xl p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <StarRating rating={review.rating} size="sm" />
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-['Montserrat']">
                        ✓ Verified Purchase
                      </span>
                    )}
                  </div>
                  <h4 className="font-['Playfair_Display'] font-bold text-lg text-gray-900">
                    {review.title}
                  </h4>
                </div>
              </div>
              
              <p className="text-gray-700 font-['Lato'] mb-4 leading-relaxed">
                {review.comment}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 font-['Montserrat']">
                  <span className="font-semibold">{review.name}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                
                <button
                  onClick={() => markHelpful(review.id)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600 transition-colors font-['Montserrat']"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  Helpful ({review.helpful || 0})
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProductReviews

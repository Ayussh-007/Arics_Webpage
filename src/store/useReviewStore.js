import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useReviewStore = create(
  persist(
    (set, get) => ({
      reviews: [],
      
      addReview: (review) => {
        set((state) => ({
          reviews: [review, ...state.reviews]
        }))
      },
      
      getProductReviews: (productId) => {
        const { reviews } = get()
        return reviews.filter(review => review.productId === productId)
      },
      
      getAverageRating: (productId) => {
        const productReviews = get().getProductReviews(productId)
        if (productReviews.length === 0) return 0
        const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
        return (sum / productReviews.length).toFixed(1)
      },
      
      getRatingDistribution: (productId) => {
        const productReviews = get().getProductReviews(productId)
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        
        productReviews.forEach(review => {
          distribution[review.rating] = (distribution[review.rating] || 0) + 1
        })
        
        return distribution
      },
      
      markHelpful: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === reviewId
              ? { ...review, helpful: (review.helpful || 0) + 1 }
              : review
          )
        }))
      }
    }),
    {
      name: 'arics-reviews-storage',
    }
  )
)

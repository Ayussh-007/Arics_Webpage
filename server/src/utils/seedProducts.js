import Product from '../models/Product.js'

// Sample product data
export const sampleProducts = [
  {
    name: "Valentine's Rose Bouquet",
    description: "A stunning arrangement of 24 premium red roses, elegantly wrapped in luxury paper with satin ribbon. Perfect for expressing deep love.",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80",
    originalPrice: 129.99,
    discountedPrice: 99.99,
    category: "bouquet",
    stock: 25,
    isActive: true,
    isFeatured: true,
    offerBadge: "Valentine's Special",
    tags: ["roses", "romantic", "premium", "bestseller"]
  },
  {
    name: "Pastel Dream Arrangement",
    description: "Soft pink peonies, white lilies, and lavender roses in a ceramic vase. A delicate touch of elegance for any occasion.",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
    originalPrice: 89.99,
    discountedPrice: 74.99,
    category: "arrangement",
    stock: 15,
    isActive: true,
    isFeatured: true,
    offerBadge: "Limited Edition",
    tags: ["peonies", "lilies", "pastel", "elegant"]
  },
  {
    name: "Sunflower Joy Bundle",
    description: "Bright and cheerful sunflowers mixed with daisies and greenery. Brings sunshine to any room with its vibrant yellow blooms.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    originalPrice: 69.99,
    category: "bouquet",
    stock: 30,
    isActive: true,
    isFeatured: false,
    tags: ["sunflowers", "cheerful", "bright", "affordable"]
  },
  {
    name: "Orchid Elegance Plant",
    description: "A beautiful white phalaenopsis orchid in a modern ceramic pot. Low maintenance luxury that lasts for months.",
    image: "https://images.unsplash.com/photo-1525923838299-2312b60f6d69?w=800&q=80",
    originalPrice: 79.99,
    discountedPrice: 59.99,
    category: "plant",
    stock: 12,
    isActive: true,
    isFeatured: false,
    offerBadge: "25% OFF",
    tags: ["orchid", "plant", "long-lasting", "minimal"]
  },
  {
    name: "Luxe Gift Box - Roses & Chocolates",
    description: "Premium roses paired with artisan chocolates in an elegant gift box. The perfect romantic gesture for someone special.",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80",
    originalPrice: 149.99,
    discountedPrice: 119.99,
    category: "gift",
    stock: 8,
    isActive: true,
    isFeatured: true,
    offerBadge: "Best Value",
    tags: ["roses", "chocolates", "luxury", "gift-set"]
  },
  {
    name: "Wildflower Meadow Mix",
    description: "A rustic collection of seasonal wildflowers creating a natural, bohemian aesthetic. Each arrangement is unique.",
    image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&q=80",
    originalPrice: 54.99,
    category: "bouquet",
    stock: 20,
    isActive: true,
    isFeatured: false,
    tags: ["wildflowers", "rustic", "bohemian", "seasonal"]
  },
  {
    name: "Tropical Paradise Arrangement",
    description: "Exotic birds of paradise, proteas, and anthuriums create a bold statement piece. Vibrant colors that captivate.",
    image: "https://images.unsplash.com/photo-1560717845-968905f1b0e0?w=800&q=80",
    originalPrice: 109.99,
    discountedPrice: 89.99,
    category: "arrangement",
    stock: 10,
    isActive: true,
    isFeatured: false,
    offerBadge: "Trending",
    tags: ["tropical", "exotic", "bold", "statement"]
  },
  {
    name: "White Lily Sympathy Bouquet",
    description: "Elegant white lilies and roses conveying peace and comfort. Thoughtfully arranged for memorial occasions.",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80",
    originalPrice: 94.99,
    category: "bouquet",
    stock: 18,
    isActive: true,
    isFeatured: false,
    tags: ["lilies", "sympathy", "white", "memorial"]
  },
  {
    name: "Succulent Garden Collection",
    description: "An assortment of premium succulents in a decorative wooden box. Modern, minimal, and nearly indestructible.",
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=800&q=80",
    originalPrice: 64.99,
    discountedPrice: 49.99,
    category: "plant",
    stock: 22,
    isActive: true,
    isFeatured: false,
    tags: ["succulents", "modern", "low-maintenance", "trendy"]
  },
  {
    name: "Monthly Bloom Subscription",
    description: "Receive a curated seasonal bouquet delivered monthly. Experience the joy of fresh flowers all year round.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80",
    originalPrice: 299.99,
    discountedPrice: 249.99,
    category: "subscription",
    stock: 50,
    isActive: true,
    isFeatured: true,
    offerBadge: "Subscribe & Save",
    tags: ["subscription", "seasonal", "monthly", "convenient"]
  },
  {
    name: "Garden Rose Romance",
    description: "Lush garden roses in blush pink and cream tones. Each bloom is hand-selected for its perfect form and fragrance.",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80",
    originalPrice: 119.99,
    category: "bouquet",
    stock: 14,
    isActive: true,
    isFeatured: false,
    tags: ["garden-roses", "romantic", "fragrant", "premium"]
  },
  {
    name: "Spring Tulip Basket",
    description: "Fresh Dutch tulips in assorted spring colors arranged in a woven basket. Cheerful and vibrant seasonal favorite.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    originalPrice: 59.99,
    discountedPrice: 44.99,
    category: "arrangement",
    stock: 0,
    isActive: true,
    isFeatured: false,
    offerBadge: "Season Sale",
    tags: ["tulips", "spring", "colorful", "basket"]
  }
]

// Function to seed products
export const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({})
    console.log('Cleared existing products')

    // Insert sample products
    await Product.insertMany(sampleProducts)
    console.log(`✅ Seeded ${sampleProducts.length} products successfully`)
  } catch (error) {
    console.error('❌ Error seeding products:', error)
    throw error
  }
}

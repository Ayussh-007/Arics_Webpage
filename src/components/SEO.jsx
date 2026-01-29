import { useEffect } from 'react'

const SEO = ({ 
  title = "Arics - Flower Boutique | Customize Your Perfect Bunch",
  description = "Order custom flower bouquets in Mumbai. Fresh roses, lilies, and seasonal blooms. Same-day delivery available. Customize your perfect bunch at Arics Flower Boutique!",
  keywords = "flower bouquet Mumbai, custom flowers, rose bouquet, flower delivery Mumbai, wedding flowers, birthday flowers, anniversary flowers, Arics",
  image = "/og-image.jpg",
  url = "https://arics.com",
  type = "website"
}) => {
  useEffect(() => {
    // Update title
    document.title = title
    
    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let tag = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, name)
        document.head.appendChild(tag)
      }
      
      tag.setAttribute('content', content)
    }
    
    // Standard meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    
    // Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'Arics Flower Boutique', true)
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('author', 'Arics Flower Boutique')
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')
  }, [title, description, keywords, image, url, type])
  
  return null
}

export default SEO

// Pre-defined SEO configurations for different pages
export const SEOConfigs = {
  home: {
    title: "Arics - Flower Boutique | Customize Your Perfect Bunch",
    description: "Order custom flower bouquets in Mumbai. Fresh roses, lilies, and seasonal blooms. Same-day delivery available. Customize your perfect bunch at Arics!",
    keywords: "flower bouquet Mumbai, custom flowers, rose bouquet, flower delivery Mumbai, Arics",
    url: "https://arics.com"
  },
  
  products: {
    title: "Shop Luxury Flower Bouquets | Arics Flower Boutique",
    description: "Browse our collection of handcrafted luxury bouquets. Premium roses, lilies, orchids, and seasonal arrangements. Free delivery on orders above ₹500.",
    keywords: "buy flowers online Mumbai, luxury bouquets, premium flowers, flower arrangements, Arics products",
    url: "https://arics.com/products"
  },
  
  customize: {
    title: "Create Custom Flower Bouquet | Arics Bouquet Builder",
    description: "Design your perfect bouquet! Choose your favorite flowers, colors, wrapping, and add-ons. Real-time preview and instant pricing. Create something unique!",
    keywords: "custom bouquet, design flowers online, personalized flowers, bouquet builder, flower customization",
    url: "https://arics.com/customize"
  },
  
  about: {
    title: "About Arics | Mumbai's Premier Flower Boutique",
    description: "Meet the team behind Arics Flower Boutique. Bhagyashree, Ayush & Manthan bring creativity and passion to every floral arrangement. Serving Mumbai since 2024.",
    keywords: "about Arics, flower boutique Mumbai, florist team, Bhagyashree Chavan, Arics story",
    url: "https://arics.com/about"
  },
  
  wishlist: {
    title: "My Wishlist | Arics Flower Boutique",
    description: "Your saved flower bouquets and arrangements. Shop your favorites anytime with quick access to your wishlist.",
    keywords: "flower wishlist, saved bouquets, favorite flowers",
    url: "https://arics.com/wishlist"
  },
  
  cart: {
    title: "Shopping Cart | Arics Flower Boutique",
    description: "Review your selected bouquets and complete your order. Fast checkout and secure payment options available.",
    keywords: "flower cart, checkout, buy flowers online",
    url: "https://arics.com/cart"
  }
}

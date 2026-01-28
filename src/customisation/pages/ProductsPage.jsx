import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterOffers, setFilterOffers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, [sortBy, filterCategory, filterOffers]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        sortBy,
        order: sortBy === "price" ? "asc" : "desc",
      });

      if (filterCategory !== "all") {
        params.append("category", filterCategory);
      }

      if (filterOffers) {
        params.append("hasOffer", "true");
      }

      const response = await fetch(
        `http://localhost:5000/api/products?${params}`
      );
      const data = await response.json();
      setProducts(data.products || []);
      setFilteredProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const handleViewDetails = (product) => {
    console.log("View details:", product);
    // Navigate to product details page or open modal
  };

  const handleCustomize = (product) => {
    console.log("Customize:", product);
    // Navigate to customization page
  };

  const handleAddToCart = async (product) => {
    // Increment popularity
    try {
      await fetch(`http://localhost:5000/api/products/${product._id}/view`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error updating popularity:", error);
    }
    
    console.log("Add to cart:", product);
    // Add to cart logic
  };

  const categories = [
    { value: "all", label: "All Products" },
    { value: "bouquet", label: "Bouquets" },
    { value: "arrangement", label: "Arrangements" },
    { value: "plant", label: "Plants" },
    { value: "gift", label: "Gifts" },
    { value: "subscription", label: "Subscriptions" },
  ];

  const sortOptions = [
    { value: "createdAt", label: "Newest" },
    { value: "popularity", label: "Popular" },
    { value: "price", label: "Price: Low to High" },
    { value: "name", label: "Name" },
  ];

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
          Our Collection
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-['Cormorant_Garamond'] text-gray-700 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Handcrafted luxury bouquets for every occasion
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mt-8 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
      </motion.div>

      {/* Filters & Search Bar */}
      <motion.div
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Bar */}
            <div className="md:col-span-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 pl-12 font-['Montserrat'] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 font-['Montserrat'] text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 font-['Montserrat'] text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Offers Toggle */}
            <div className="md:col-span-1 flex justify-center">
              <motion.button
                onClick={() => setFilterOffers(!filterOffers)}
                className={`px-6 py-3 rounded-full font-['Cinzel'] font-semibold text-sm tracking-wider transition-all shadow-md ${
                  filterOffers
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 text-white"
                    : "bg-white/60 backdrop-blur-sm text-gray-700 border border-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterOffers ? "✓ Offers" : "Offers"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        className="max-w-7xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <p className="text-gray-600 font-['Montserrat'] text-sm">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <motion.div
            className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        {!loading && filteredProducts.length > 0 && (
          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard
                  product={product}
                  onViewDetails={handleViewDetails}
                  onCustomize={handleCustomize}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-6">🌸</div>
            <h3 className="text-2xl font-['Playfair_Display'] font-bold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 font-['Cormorant_Garamond'] text-lg mb-6">
              Try adjusting your filters or search query
            </p>
            <motion.button
              onClick={() => {
                setSearchQuery("");
                setFilterCategory("all");
                setFilterOffers(false);
              }}
              className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-['Cinzel'] font-medium px-8 py-3 rounded-full text-sm tracking-wider transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <motion.div
        className="fixed bottom-20 right-10 w-20 h-20 border-2 border-pink-300/40 rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed top-40 right-20 w-16 h-16 border-2 border-rose-300/40 rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default ProductsPage;

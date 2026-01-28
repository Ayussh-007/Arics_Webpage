import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductForm from "../components/ProductForm";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  // Get auth token (you'll need to implement your auth logic)
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Fetch all products (including inactive)
  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${API_BASE_URL}/products/admin/all?sortBy=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Create product
  const handleCreateProduct = async (productData) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        await fetchProducts();
        setShowForm(false);
        alert("Product created successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    }
  };

  // Update product
  const handleUpdateProduct = async (productData) => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${API_BASE_URL}/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        await fetchProducts();
        setShowForm(false);
        setEditingProduct(null);
        alert("Product updated successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  // Toggle active status
  const handleToggleActive = async (productId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${API_BASE_URL}/products/${productId}/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchProducts();
      } else {
        alert("Failed to toggle product status");
      }
    } catch (error) {
      console.error("Error toggling product:", error);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = getAuthToken();
      const response = await fetch(
        `${API_BASE_URL}/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchProducts();
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "bouquet", label: "Bouquets" },
    { value: "arrangement", label: "Arrangements" },
    { value: "plant", label: "Plants" },
    { value: "gift", label: "Gifts" },
    { value: "subscription", label: "Subscriptions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20 px-6 lg:px-12">
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-gray-900 mb-2">
              Products Admin
            </h1>
            <p className="text-xl font-['Cormorant_Garamond'] text-gray-600 italic">
              Manage your product catalog
            </p>
          </div>

          <motion.button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-['Cinzel'] font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Product
          </motion.button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="max-w-7xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 pl-12 font-['Montserrat'] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
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

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 font-['Montserrat'] text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 font-['Montserrat'] text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer"
            >
              <option value="createdAt">Newest First</option>
              <option value="name">Name</option>
              <option value="popularity">Popularity</option>
              <option value="stock">Stock</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="max-w-7xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {[
          { label: "Total Products", value: products.length, icon: "📦" },
          {
            label: "Active",
            value: products.filter((p) => p.isActive).length,
            icon: "✅",
          },
          {
            label: "Out of Stock",
            value: products.filter((p) => p.stock === 0).length,
            icon: "⚠️",
          },
          {
            label: "Featured",
            value: products.filter((p) => p.isFeatured).length,
            icon: "⭐",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-['Playfair_Display'] font-bold text-gray-900">
              {stat.value}
            </div>
            <div className="text-sm font-['Montserrat'] text-gray-600 mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
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

      {/* Products Table */}
      {!loading && (
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-pink-400 to-rose-400 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-['Cinzel'] font-semibold text-sm">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left font-['Cinzel'] font-semibold text-sm">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left font-['Cinzel'] font-semibold text-sm">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left font-['Cinzel'] font-semibold text-sm">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left font-['Cinzel'] font-semibold text-sm">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left font-['Cinzel'] font-semibold text-sm">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-['Cinzel'] font-semibold text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filteredProducts.map((product) => (
                    <motion.tr
                      key={product._id}
                      className="hover:bg-white/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-xl shadow-md"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-['Playfair_Display'] font-bold text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-600 font-['Cormorant_Garamond'] line-clamp-1">
                          {product.description}
                        </div>
                        {product.isFeatured && (
                          <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-['Montserrat']">
                            ⭐ Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-['Montserrat'] font-medium uppercase">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-['Montserrat'] font-bold text-gray-900">
                          $
                          {(
                            product.discountedPrice || product.originalPrice
                          ).toFixed(2)}
                        </div>
                        {product.discountedPrice && (
                          <div className="text-xs text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-['Montserrat'] font-medium ${
                            product.stock === 0
                              ? "bg-red-100 text-red-700"
                              : product.stock <= 5
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleActive(product._id)}
                          className={`px-4 py-2 rounded-full text-xs font-['Montserrat'] font-semibold transition-all ${
                            product.isActive
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => {
                              setEditingProduct(product);
                              setShowForm(true);
                            }}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title="Edit"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </motion.button>

                          <motion.button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title="Delete"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🌸</div>
                  <p className="text-gray-600 font-['Cormorant_Garamond'] text-xl">
                    No products found
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={editingProduct ? handleUpdateProduct : handleCreateProduct}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

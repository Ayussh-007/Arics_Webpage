import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    originalPrice: "",
    discountedPrice: "",
    category: "bouquet",
    stock: "",
    isActive: true,
    isFeatured: false,
    offerBadge: "",
    tags: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        image: product.image || "",
        originalPrice: product.originalPrice || "",
        discountedPrice: product.discountedPrice || "",
        category: product.category || "bouquet",
        stock: product.stock || "",
        isActive: product.isActive !== undefined ? product.isActive : true,
        isFeatured: product.isFeatured || false,
        offerBadge: product.offerBadge || "",
        tags: product.tags ? product.tags.join(", ") : "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.description.length > 200)
      newErrors.description = "Description must be 200 characters or less";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.originalPrice || formData.originalPrice <= 0)
      newErrors.originalPrice = "Original price must be greater than 0";
    if (
      formData.discountedPrice &&
      parseFloat(formData.discountedPrice) >= parseFloat(formData.originalPrice)
    )
      newErrors.discountedPrice =
        "Discounted price must be less than original price";
    if (!formData.stock || formData.stock < 0)
      newErrors.stock = "Stock must be 0 or greater";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const submitData = {
      ...formData,
      originalPrice: parseFloat(formData.originalPrice),
      discountedPrice: formData.discountedPrice
        ? parseFloat(formData.discountedPrice)
        : null,
      stock: parseInt(formData.stock),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    try {
      await onSave(submitData);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "bouquet",
    "arrangement",
    "plant",
    "gift",
    "subscription",
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-pink-400 to-rose-400 text-white p-6 rounded-t-3xl">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="font-['Cormorant_Garamond'] text-white/90 mt-1">
            Fill in the details below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-['Montserrat'] font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Cormorant_Garamond'] text-lg`}
              placeholder="e.g., Valentine's Rose Bouquet"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 font-['Montserrat']">
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-['Montserrat'] font-semibold text-gray-700 mb-2">
              Description * (Max 200 characters)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              maxLength={200}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Cormorant_Garamond'] text-base resize-none`}
              placeholder="A beautiful arrangement of premium roses..."
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description ? (
                <p className="text-red-500 text-xs font-['Montserrat']">
                  {errors.description}
                </p>
              ) : (
                <span />
              )}
              <p className="text-gray-400 text-xs font-['Montserrat']">
                {formData.description.length}/200
              </p>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-['Montserrat'] font-semibold text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.image ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Montserrat'] text-sm`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1 font-['Montserrat']">
                {errors.image}
              </p>
            )}
            {formData.image && (
              <div className="mt-3">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200?text=Invalid+Image";
                  }}
                />
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-['Montserrat'] font-semibold text-gray-700 mb-2">
                Original Price * ($)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.originalPrice ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Montserrat']`}
                placeholder="99.99"
              />
              {errors.originalPrice && (
                <p className="text-red-500 text-xs mt-1 font-['Montserrat']">
                  {errors.originalPrice}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-['Montserrat'] font-semibold text-gray-700 mb-2">
                Discounted Price ($)
              </label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.discountedPrice ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Montserrat']`}
                placeholder="79.99"
              />
              {errors.discountedPrice && (
                <p className="text-red-500 text-xs mt-1 font-['Montserrat']">
                  {errors.discountedPrice}
                </p>
              )}
            </div>
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-['Montserrat'] font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Montserrat'] cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-['Montserrat'] font-semibold text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Montserrat']`}
                placeholder="50"
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1 font-['Montserrat']">
                  {errors.stock}
                </p>
              )}
            </div>
          </div>

          {/* Offer Badge */}
          <div>
            <label className="block text-sm font-['Montserrat'] font-semibold text-gray-700 mb-2">
              Offer Badge (Optional)
            </label>
            <input
              type="text"
              name="offerBadge"
              value={formData.offerBadge}
              onChange={handleChange}
              maxLength={50}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Montserrat']"
              placeholder="Valentine's Special"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-['Montserrat'] font-semibold text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-['Montserrat']"
              placeholder="roses, premium, luxury"
            />
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-400"
              />
              <span className="font-['Montserrat'] text-gray-700 font-medium">
                Active
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-400"
              />
              <span className="font-['Montserrat'] text-gray-700 font-medium">
                Featured
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <motion.button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-['Montserrat'] font-semibold px-6 py-3 rounded-xl transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-['Cinzel'] font-semibold px-6 py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProductForm;

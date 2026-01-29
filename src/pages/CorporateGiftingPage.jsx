import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const CorporateGiftingPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    numberOfEmployees: "",
    occasionType: "",
    budget: "",
    deliveryDate: "",
    message: "",
  });

  const occasionTypes = [
    "Employee Appreciation",
    "Client Gifts",
    "Holiday Season",
    "Corporate Events",
    "Welcome Gifts",
    "Retirement",
    "Milestone Celebrations",
    "Conference Gifts",
    "Other",
  ];

  const budgetRanges = [
    "₹500 - ₹1,000 per unit",
    "₹1,000 - ₹2,500 per unit",
    "₹2,500 - ₹5,000 per unit",
    "₹5,000+ per unit",
    "Custom Budget",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactPerson || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In a real app, this would send to backend
    console.log("Corporate inquiry:", formData);
    toast.success("Your inquiry has been submitted! We'll contact you within 24 hours.");
    
    // Reset form
    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      numberOfEmployees: "",
      occasionType: "",
      budget: "",
      deliveryDate: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] text-gray-900 mb-4">
            Corporate Gifting Solutions
          </h1>
          <p className="text-gray-600 text-lg font-['Cormorant_Garamond'] max-w-3xl mx-auto">
            Elevate your corporate relationships with premium floral gifts. Perfect for employee
            appreciation, client gifts, and special corporate occasions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-['Cinzel'] text-pink-700 mb-6">
              Request a Quote
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                    Number of Units
                  </label>
                  <input
                    type="number"
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                    Occasion Type
                  </label>
                  <select
                    name="occasionType"
                    value={formData.occasionType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="">Select an occasion</option>
                    {occasionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your requirements, preferred flowers, color schemes, etc."
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-['Cinzel'] py-3 rounded-lg tracking-wider transition-all shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SUBMIT INQUIRY
              </motion.button>
            </form>
          </motion.div>

          {/* Benefits & Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8">
              <h3 className="text-2xl font-['Cinzel'] text-pink-700 mb-6">
                Why Choose Us?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                    title: "Premium Quality",
                    desc: "Hand-selected fresh flowers sourced from the finest growers",
                  },
                  {
                    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                    title: "On-Time Delivery",
                    desc: "Reliable delivery service ensuring freshness and punctuality",
                  },
                  {
                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                    title: "Volume Discounts",
                    desc: "Special pricing for bulk orders and recurring clients",
                  },
                  {
                    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
                    title: "Customization",
                    desc: "Tailor arrangements to match your brand and preferences",
                  },
                  {
                    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                    title: "Easy Management",
                    desc: "Streamlined ordering and tracking for multiple deliveries",
                  },
                  {
                    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
                    title: "Dedicated Support",
                    desc: "Personal account manager for all your corporate needs",
                  },
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-pink-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={benefit.icon}
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-['Cinzel'] text-gray-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 font-['Lato']">
                        {benefit.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-['Cinzel'] text-pink-700 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <svg
                    className="w-5 h-5 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="font-['Lato']">+91 9XXXXXXXXX</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg
                    className="w-5 h-5 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-['Lato']">corporate@arics.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg
                    className="w-5 h-5 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-['Lato']">Mon-Sat: 9AM - 7PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { number: "500+", label: "Corporate Clients" },
            { number: "10,000+", label: "Deliveries Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "24/7", label: "Customer Support" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center bg-white rounded-xl shadow-md p-6"
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-['Playfair_Display'] text-pink-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-['Cinzel'] text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-['Cinzel'] text-pink-700 text-center mb-8">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Arics has been our go-to partner for corporate gifting. Their attention to detail and quality is unmatched.",
                company: "Tech Innovations Pvt Ltd",
                person: "HR Manager",
              },
              {
                quote:
                  "The customization options and bulk discounts made it easy to show appreciation to our entire team.",
                company: "Global Solutions Inc",
                person: "Operations Director",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-md"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-pink-600 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-['Cormorant_Garamond'] text-lg mb-4 italic">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-['Cinzel'] text-gray-900 font-semibold">
                    {testimonial.company}
                  </p>
                  <p className="text-sm text-gray-600 font-['Lato']">
                    {testimonial.person}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CorporateGiftingPage;

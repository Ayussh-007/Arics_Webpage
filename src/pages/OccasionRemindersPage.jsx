import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const OccasionRemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    occasion: "",
    date: "",
    recipientName: "",
    notes: "",
  });

  const occasions = [
    "Birthday",
    "Anniversary",
    "Valentine's Day",
    "Mother's Day",
    "Father's Day",
    "Wedding",
    "Graduation",
    "New Baby",
    "Get Well Soon",
    "Sympathy",
    "Thank You",
    "Congratulations",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.occasion || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newReminder = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setReminders((prev) => [...prev, newReminder]);
    setFormData({
      name: "",
      occasion: "",
      date: "",
      recipientName: "",
      notes: "",
    });
    toast.success("Reminder created successfully!");
  };

  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
    toast.success("Reminder deleted");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] text-gray-900 mb-4">
            Occasion Reminders
          </h1>
          <p className="text-gray-600 text-lg font-['Cormorant_Garamond']">
            Never miss a special moment. Set reminders for important occasions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create Reminder Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-['Cinzel'] text-pink-700 mb-6">
              Create New Reminder
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                  Occasion *
                </label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                >
                  <option value="">Select an occasion</option>
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-['Cinzel'] text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-['Cinzel'] py-3 rounded-lg tracking-wider transition-all shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                CREATE REMINDER
              </motion.button>
            </form>
          </motion.div>

          {/* Reminders List */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-['Cinzel'] text-pink-700 mb-6">
              Your Reminders
            </h2>
            {reminders.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-pink-200 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-400 font-['Cormorant_Garamond']">
                  No reminders yet. Create your first one!
                </p>
              </div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {reminders.map((reminder) => (
                  <motion.div
                    key={reminder.id}
                    className="border border-pink-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    variants={itemVariants}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-['Cinzel'] text-pink-700 font-semibold">
                          {reminder.occasion}
                        </h3>
                        <p className="text-sm text-gray-600 font-['Cormorant_Garamond']">
                          {new Date(reminder.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 font-['Lato']">
                      For: {reminder.recipientName || reminder.name}
                    </p>
                    {reminder.notes && (
                      <p className="text-sm text-gray-500 mt-2 italic">
                        {reminder.notes}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h3 className="font-['Cinzel'] text-lg text-gray-900 mb-2">
              Email Reminders
            </h3>
            <p className="text-gray-600 text-sm font-['Lato']">
              Get notified before special occasions
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-pink-600"
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
            </div>
            <h3 className="font-['Cinzel'] text-lg text-gray-900 mb-2">
              Never Miss a Date
            </h3>
            <p className="text-gray-600 text-sm font-['Lato']">
              Stay on top of important celebrations
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="font-['Cinzel'] text-lg text-gray-900 mb-2">
              Quick Ordering
            </h3>
            <p className="text-gray-600 text-sm font-['Lato']">
              Order flowers directly from reminders
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OccasionRemindersPage;

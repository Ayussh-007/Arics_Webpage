import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".fade-in-up");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const teamMembers = [
    {
      name: "Bhagyashree Chavan",
      role: "FOUNDER",
      description:
        "Visionary behind Arics, blending creativity with emotional storytelling through flowers.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "Ayush Mhatre",
      role: "CO-FOUNDER",
      description:
        "Oversees operations and floral design execution, ensuring quality and consistency.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    },
    {
      name: "Manthan Railkar",
      role: "TECH HEAD",
      description:
        "Leads digital presence and technical innovation behind the Arics experience.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50/80 via-pink-50/60 to-blush-50/80">
        {/* Soft Abstract Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            className="font-['Cormorant_Garamond'] text-6xl md:text-7xl lg:text-8xl font-light text-gray-800 mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Crafting Emotions
            <br />
            <span className="italic font-normal">Through Flowers</span>
          </motion.h1>

          <motion.div
            className="w-24 h-px bg-rose-300 mx-auto mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>

          <motion.p
            className="font-['Lato'] text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            At Arics, every bouquet is thoughtfully designed to celebrate love,
            joy, and life's most beautiful moments.
          </motion.p>
        </div>
      </section>

      {/* About The Store Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="fade-in-up order-2 md:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                  src="https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&h=1000&fit=crop"
                  alt="Floral arrangement"
                  className="relative rounded-2xl shadow-2xl w-full h-[600px] object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="fade-in-up order-1 md:order-2 space-y-8">
              <div>
                <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-gray-800 mb-6">
                  About Our
                  <br />
                  <span className="italic font-normal">Store</span>
                </h2>
                <div className="w-16 h-px bg-rose-300 mb-8"></div>
              </div>

              <p className="font-['Lato'] text-gray-600 text-lg leading-relaxed">
                Arics is a boutique flower studio dedicated to creating elegant,
                handcrafted bouquets that express emotions effortlessly. From
                intimate floral gifts to grand event arrangements, we blend
                premium blooms with artistic vision.
              </p>

              <p className="font-['Lato'] text-gray-600 text-lg leading-relaxed">
                Every creation is rooted in quality, creativity, and a deep
                appreciation for nature's beauty.
              </p>

              <motion.button
                className="mt-8 px-8 py-3 border border-rose-300 text-rose-700 font-['Lato'] text-sm tracking-wider hover:bg-rose-50 transition-colors duration-300 rounded-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                EXPLORE OUR CREATIONS
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Snapshot Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-blush-50/50 to-rose-50/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="fade-in-up mb-16">
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-gray-800 mb-6">
              What We <span className="italic font-normal">Do</span>
            </h2>
            <div className="w-16 h-px bg-rose-300 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {/* Service 1 */}
            <div className="fade-in-up group">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-normal text-gray-800 mb-4">
                Custom Flower Bouquets
              </h3>
              <p className="font-['Lato'] text-gray-600 leading-relaxed">
                Handcrafted floral arrangements tailored to emotions and
                occasions.
              </p>
            </div>

            {/* Service 2 */}
            <div className="fade-in-up group">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-normal text-gray-800 mb-4">
                Event & Celebration Florals
              </h3>
              <p className="font-['Lato'] text-gray-600 leading-relaxed">
                Floral styling for weddings, celebrations, and special moments.
              </p>
            </div>

            {/* Service 3 */}
            <div className="fade-in-up group">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-normal text-gray-800 mb-4">
                Gifting & Subscriptions
              </h3>
              <p className="font-['Lato'] text-gray-600 leading-relaxed">
                Thoughtful floral gifts and recurring bouquet services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center fade-in-up mb-16">
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-gray-800 mb-6">
              The People Behind{" "}
              <span className="italic font-normal">Arics</span>
            </h2>
            <div className="w-16 h-px bg-rose-300 mx-auto mb-8"></div>
            <p className="font-['Lato'] text-lg text-gray-600 max-w-2xl mx-auto">
              Our team brings together creativity, passion, and craftsmanship to
              turn flowers into unforgettable experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="fade-in-up text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative mb-6 inline-block">
                  <div className="absolute -inset-2 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-48 h-48 rounded-full object-cover mx-auto shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-3xl font-normal text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="font-['Lato'] text-xs tracking-widest text-rose-600 uppercase mb-4">
                  {member.role}
                </p>
                <p className="font-['Lato'] text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-rose-100/40 to-pink-100/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in-up">
            <svg
              className="w-12 h-12 mx-auto text-rose-400 mb-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl italic font-light text-gray-800 mb-8 leading-relaxed">
              "Flowers speak the language
              <br />
              the heart understands."
            </h2>
            <div className="w-24 h-px bg-rose-300 mx-auto mb-8"></div>
            <p className="font-['Lato'] text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              At Arics, we believe in the transformative power of flowers. Each
              bloom carries a story, each arrangement conveys an emotion. Our
              philosophy is rooted in elegance, craftsmanship, and creating
              emotional connections that transcend words.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-32 px-6 lg:px-12 bg-gradient-to-br from-rose-900 to-pink-900 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-white rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            className="fade-in-up"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-white mb-8 leading-tight">
              Let Us Create Something
              <br />
              <span className="italic font-normal">Beautiful for You</span>
            </h2>
            <div className="w-24 h-px bg-rose-300 mx-auto mb-12"></div>
            <motion.button
              className="px-12 py-4 bg-white text-rose-900 font-['Lato'] text-sm tracking-widest hover:bg-rose-50 transition-colors duration-300 rounded-sm shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONTACT US
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

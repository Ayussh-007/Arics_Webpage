import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import "./App.css";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Navbar />
      <HeroSection />

      {/* Extra scroll space to demonstrate bloom animation */}
      <section className="h-screen bg-gradient-to-b from-pink-50 to-rose-100 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p className="text-xl font-['Cormorant_Garamond'] italic">
            Scroll to see the bloom effect
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;

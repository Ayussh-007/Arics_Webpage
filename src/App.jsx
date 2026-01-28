import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutUs from "./pages/AboutUs";
import { CustomisationApp } from "./customisation";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "customize":
        return <CustomisationApp />;
      case "about":
        return <AboutUs />;
      case "home":
      default:
        return (
          <>
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <HeroSection />
            {/* Extra scroll space to demonstrate bloom animation */}
            <section className="h-screen bg-gradient-to-b from-pink-50 to-rose-100 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <p className="text-xl font-['Cormorant_Garamond'] italic">
                  Scroll to see the bloom effect
                </p>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {currentPage === "home" ? (
        renderPage()
      ) : (
        <>
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {renderPage()}
        </>
      )}
    </div>
  );
};

export default App;

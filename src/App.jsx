import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutUs from "./pages/AboutUs";
import { CustomisationApp } from "./customisation";
import ProductsPage from "./pages/ProductsPage";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "customize":
        return <CustomisationApp />;
      case "products":
        return <ProductsPage />;
      case "admin":
        return <AdminDashboard />;
      case "about":
        return <AboutUs />;
      case "home":
      default:
        return (
          <>
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <HeroSection />
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

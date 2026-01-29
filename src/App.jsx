import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutUs from "./pages/AboutUs";
import { CustomisationApp } from "./customisation";
import ProductsPage from "./pages/ProductsPage";
import AdminPortal from "./pages/AdminPortal";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";
import WhatsAppButton from "./components/WhatsAppButton";
import SEO, { SEOConfigs } from "./components/SEO";
import "./App.css";

const ADMIN_UNLOCK_STORAGE_KEY = "arics_admin_unlocked";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [adminUnlocked, setAdminUnlocked] = useState(
    () => sessionStorage.getItem(ADMIN_UNLOCK_STORAGE_KEY) === "1"
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      // Hidden key combo: Ctrl + Shift + A
      if (e.ctrlKey && e.shiftKey && e.key && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setAdminUnlocked((prev) => {
          const next = !prev;
          if (next) {
            sessionStorage.setItem(ADMIN_UNLOCK_STORAGE_KEY, "1");
            toast.success("Admin unlocked");
            setCurrentPage("admin");
          } else {
            sessionStorage.removeItem(ADMIN_UNLOCK_STORAGE_KEY);
            toast("Admin hidden", { icon: "🌸" });
            setCurrentPage("home");
          }
          return next;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const getSEOConfig = () => {
    return SEOConfigs[currentPage] || SEOConfigs.home
  }

  const renderPage = () => {
    switch (currentPage) {
      case "customize":
        return (
          <CustomisationApp
            onOpenAdmin={adminUnlocked ? () => setCurrentPage("admin") : undefined}
          />
        );
      case "products":
        return <ProductsPage onNavigateToCustomize={setCurrentPage} />;
      case "cart":
        return <CartPage onCheckout={() => setCurrentPage("checkout")} />;
      case "checkout":
        return (
          <CheckoutPage
            onBack={() => setCurrentPage("cart")}
            onComplete={() => setCurrentPage("home")}
          />
        );
      case "admin":
        if (!adminUnlocked) {
          // Admin route is hidden unless unlocked via the secret key combo.
          return <HeroSection />;
        }
        return <AdminPortal onExit={() => setCurrentPage("home")} />;
      case "wishlist":
        return <WishlistPage />;
      case "about":
        return <AboutUs />;
      case "home":
      default:
        return (
          <>
            <Navbar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              showAdmin={adminUnlocked}
            />
            <HeroSection onNavigate={setCurrentPage} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <SEO {...getSEOConfig()} />
      <Toaster position="top-right" />
      <WhatsAppButton phoneNumber="+919XXXXXXXXX" />
      {currentPage === "home" ? (
        renderPage()
      ) : (
        <>
          <Navbar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            showAdmin={adminUnlocked}
          />
          {renderPage()}
        </>
      )}
    </div>
  );
};

export default App;

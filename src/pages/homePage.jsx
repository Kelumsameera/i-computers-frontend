import { Routes, Route } from "react-router-dom";

import Header from "../components/Heder";
import Home from "./homeContent";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkOut";
import OrdersPage from "./ordersPage";
import AboutPage from "./aboutPage";
import ContactPage from "./ContactPage";

import ReviewForm from "../components/ReviewForm.jsx";
import TermsAndConditions from "../support/termsAndConditionsPage.jsx";
import PrivacyPolicy from "../support/privacyPolicyPage.jsx";
import RefundPolicy from "../support/refundPolicyPage.jsx";
import FAQPage from "../support/fAQPage.jsx";

export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header className="sticky top-0 z-50" />

      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/overview/:productID" element={<ProductOverview />} />
          <Route path="/write-reviews/:productID" element={<ReviewForm />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
      
    </div>
  );
}

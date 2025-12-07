import { Link, Route, Routes } from "react-router-dom";
import { LuBoxes, LuClipboardList } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";

import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductsPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminReviewsPage from "./admin/adminReviewsPage";
import AdminDashboardPage from "./admin/adminDashboardPage"; // FIXED NAME

import axios from "axios";
import { useEffect, useState } from "react";

import Loader from "../components/loder";
import AdminAnalyticsPage from "./admin/AdminAnalyticsPage";

export default function AdminPage() {
  const [user, setUser] = useState(null);

  // ------------------------------
  // AUTH CHECK
  // ------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.role === "admin") {
          setUser(response.data);
        } else {
          window.location.href = "/";
        }
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  return (
    <div className="w-full h-full flex bg-accent">
      {user ? (
        <>
          {/* ===========================
              SIDEBAR
          ============================ */}
          <div className="w-[250px] bg-accent h-full">
            <div className="w-full h-[100px] flex items-center text-primary">
              <img src="/logo.png" className="h-full" />
              <h1 className="text-2xl ml-2 text-white">Admin</h1>
            </div>

            <div className="w-full p-2.5 text-white text-xl flex flex-col items-center gap-1">
              <Link
                to="/admin/dashboard"
                className="w-full flex items-center h-[50px] gap-2.5 px-3 hover:bg-accent/50 rounded"
              >
                <RxDashboard /> Dashboard
              </Link>

              <Link
                to="/admin/orders"
                className="w-full flex items-center h-[50px] gap-2.5 px-3 hover:bg-accent/50 rounded"
              >
                <LuClipboardList /> Orders
              </Link>

              <Link
                to="/admin/products"
                className="w-full flex items-center h-[50px] gap-2.5 px-3 hover:bg-accent/50 rounded"
              >
                <LuBoxes /> Products
              </Link>

              <Link
                to="/admin/users"
                className="w-full flex items-center h-[50px] gap-2.5 px-3 hover:bg-accent/50 rounded"
              >
                <FiUsers /> Users
              </Link>

              <Link
                to="/admin/reviews"
                className="w-full flex items-center h-[50px] gap-2.5 px-3 hover:bg-accent/50 rounded"
              >
                <MdOutlineRateReview /> Reviews
              </Link>
              <Link
                to="/admin/analytics"
                className="w-full flex items-center h-[50px] gap-2.5"
              >
                📊 Analytics
              </Link>
            </div>
          </div>

          {/* ===========================
              MAIN CONTENT AREA
          ============================ */}
          <div className="w-[calc(100%-250px)] h-full max-h-full bg-primary border-8 border-accent rounded-3xl overflow-y-scroll">
            <Routes>
              {/* All routes MUST start *after* /admin */}
              <Route path="/dashboard" element={<AdminDashboardPage />} />
              <Route path="/analytics" element={<AdminAnalyticsPage />} />

              <Route path="/orders" element={<AdminOrdersPage />} />

              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/add-product" element={<AdminAddProductPage />} />
              <Route
                path="/update-product"
                element={<AdminUpdateProductPage />}
              />

              <Route path="/users" element={<AdminUsersPage />} />

              <Route path="/reviews" element={<AdminReviewsPage />} />
            </Routes>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

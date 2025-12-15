import { Link, Route, Routes } from "react-router-dom";
import { LuBoxes, LuClipboardList } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

import Loader from "../components/loder";

import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductsPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminReviewsPage from "./admin/adminReviewsPage";
import AdminDashboardPage from "./admin/adminDashboardPage";
import AdminAnalyticsPage from "./admin/AdminAnalyticsPage";

export default function AdminPage() {
  const [user, setUser] = useState(null);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.role === "admin") {
          setUser(res.data);
        } else {
          window.location.href = "/";
        }
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  if (!user) return <Loader />;

  return (
    <div className="w-full h-screen flex bg-accent">
     
      <aside className="w-[250px] bg-accent text-white flex flex-col">
        <div className="h-[100px] flex items-center justify-center px-4 gap-2">
          <img src="/logo.png" className="h-full" />
          <h1 className="text-2xl font-semibold">Admin</h1>
        </div>

        <nav className="flex flex-col justify-center flex-1 gap-1 px-2 text-lg">
          <div className="w-full h-[400px] text-white text-2xl flex flex-col pl-5 pt-5">

            <Link to="/admin" className="w-full flex items-center h-[50px] gap-2.5">
              <RxDashboard /> Dashboard
            </Link>

            <Link to="/admin/analytics" className="w-full flex items-center h-[50px] gap-2.5">
              <RxDashboard /> Analytics
            </Link>

            <Link to="/admin/orders" className="w-full flex items-center h-[50px] gap-2.5">
              <LuClipboardList /> Orders
            </Link>

            <Link to="/admin/products" className="w-full flex items-center h-[50px] gap-2.5">
              <LuBoxes /> Products
            </Link>

            <Link to="/admin/users" className="w-full flex items-center h-[50px] gap-2.5">
              <FiUsers /> Users
            </Link>

            <Link to="/admin/reviews" className="w-full flex items-center h-[50px] gap-2.5">
              <MdOutlineRateReview /> Reviews
            </Link>

          </div>
        </nav>
      </aside>

      
      <main className="flex-1 bg-primary border-8 border-accent rounded-3xl overflow-y-auto">
        <Routes>
          {/* DASHBOARD */}
          <Route path="/" element={<AdminDashboardPage />} />

          {/* OTHER PAGES */}
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="add-product" element={<AdminAddProductPage />} />
          <Route path="update-product" element={<AdminUpdateProductPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
        </Routes>
      </main>
    </div>
  );
}

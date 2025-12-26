import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { RxDashboard } from "react-icons/rx";
import { LuClipboardList, LuBoxes } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import { BiTime } from "react-icons/bi";

import Loader from "../../components/loder";
import ViewOrderInfo from "../../components/viewOrderInfo";
import StatCard from "../../components/StatCard";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    reviews: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  const API = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    (async () => {
      try {
        const [usersRes, productsRes, ordersRes, reviewsRes] =
          await Promise.all([
            axios.get(`${API}/users/all`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API}/products`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API}/orders`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API}/reviews/all`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        setStats({
          users: usersRes.data.length,
          products: productsRes.data.length,
          orders: ordersRes.data.length,
          reviews: reviewsRes.data.reviews.length,
        });

        setRecentOrders(ordersRes.data.slice(0, 5));
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [API]);

  /* ================= LOADING ================= */
 
return (
    <div >
      {loading ? (
        <Loader />
      ) : (
        <><div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="max-w-[1800px] mx-auto flex flex-col gap-8">

        {/* HEADER */}
        <header className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform duration-300">
              <RxDashboard size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Store overview & quick actions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <BiTime className="text-blue-600" size={18} />
            <span className="text-sm font-medium text-gray-700">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </header>

        {/* STAT CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats.users}
            icon={<FiUsers size={24} />}
            tint="blue"
            trend={true}
            trendText="+12%"
            onClick={() => navigate("/admin/users")}
          />

          <StatCard
            title="Products"
            value={stats.products}
            icon={<LuBoxes size={24} />}
            tint="green"
            trend={true}
            trendText="+8%"
            onClick={() => navigate("/admin/products")}
          />

          <StatCard
            title="Total Orders"
            value={stats.orders}
            icon={<LuClipboardList size={24} />}
            tint="amber"
            trend={true}
            trendText="+23%"
            onClick={() => navigate("/admin/orders")}
          />

          <StatCard
            title="Reviews"
            value={stats.reviews}
            icon={<MdOutlineRateReview size={24} />}
            tint="purple"
            trend={true}
            trendText="+15%"
            onClick={() => navigate("/admin/reviews")}
          />
        </section>

        {/* RECENT ORDERS */}
        <section className="bg-white/80 backdrop-blur-sm border border-gray-400 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 bg-secondary border-b border-gray-200">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <LuClipboardList className="text-gold" size={24} />
              Recent Orders
            </h2>
            <Link
              to="/admin/orders"
              className="text-sm font-semibold text-primary hover:text-blue-700 flex items-center gap-1 group transition-colors duration-200"
            >
              View all 
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <LuClipboardList className="text-gray-400" size={28} />
              </div>
              <p className="text-gray-500 font-medium">No recent orders</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-400">
              {recentOrders.map((order, index) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between px-6 py-4 transition-all duration-200 hover:bg-linear-to-r hover:from-blue-50/50 hover:to-transparent group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/30">
                      {order.orderId.slice(-2)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {order.orderId}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">
                        Rs. {order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <ViewOrderInfo order={order} />
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div></>
      )}
    </div>
      ) 

  
  
}
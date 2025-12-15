import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { RxDashboard } from "react-icons/rx";
import { LuClipboardList, LuBoxes } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";

import Loader from "../../components/loder";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    reviews: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  /* ================= LOAD DASHBOARD DATA ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    const loadDashboardData = async () => {
      try {
        const [usersRes, productsRes, ordersRes, reviewsRes] =
          await Promise.all([
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/all`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/all`, {
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
      } catch (error) {
        console.error("Dashboard Load Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <Loader />;

  /* ================= DASHBOARD CARDS ================= */
  const cards = [
    {
      name: "Users",
      value: stats.users,
      icon: <FiUsers size={28} />,
      color: "bg-blue-500",
      path: "/admin/users",
    },
    {
      name: "Products",
      value: stats.products,
      icon: <LuBoxes size={28} />,
      color: "bg-green-500",
      path: "/admin/products",
    },
    {
      name: "Orders",
      value: stats.orders,
      icon: <LuClipboardList size={28} />,
      color: "bg-yellow-500",
      path: "/admin/orders",
    },
    {
      name: "Reviews",
      value: stats.reviews,
      icon: <MdOutlineRateReview size={28} />,
      color: "bg-red-500",
      path: "/admin/reviews",
    },
  ];

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <RxDashboard size={32} /> Admin Dashboard
      </h1>

      {/* ================= CLICKABLE CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <Link
            key={card.name}
            to={card.path}
            className="group"
          >
            <div
              className="p-5 bg-white rounded-xl shadow-lg flex items-center gap-4
                         hover:shadow-xl hover:scale-[1.03] transition cursor-pointer"
            >
              <div
                className={`p-4 rounded-lg text-white ${card.color}
                            group-hover:opacity-90 transition`}
              >
                {card.icon}
              </div>

              <div>
                <p className="text-gray-500 text-sm">{card.name}</p>
                <h2 className="text-2xl font-bold">{card.value}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ================= RECENT ORDERS ================= */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{order.orderId}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">
                    Rs. {order.total.toLocaleString()}
                  </td>
                  <td className="p-3">
                    {new Date(order.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

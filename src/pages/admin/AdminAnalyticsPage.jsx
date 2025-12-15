import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loder";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

  //Load Analytics Data
  const loadAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const [ordersRes, usersRes, productsRes, reviewsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setReviews(reviewsRes.data.reviews);

      setLoading(false);
    } catch (e) {
      console.error("Analytics Error:", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) return <Loader />;

  //Calculate Analytics Data
  const ordersPerDay = {};
  orders.forEach((o) => {
    const date = new Date(o.date).toLocaleDateString();
    ordersPerDay[date] = (ordersPerDay[date] || 0) + 1;
  });
  const ordersChart = Object.entries(ordersPerDay).map(([day, count]) => ({
    day,
    count,
  }));

  // 2️ Revenue Per Day
  const revenuePerDay = {};
  orders.forEach((o) => {
    const date = new Date(o.date).toLocaleDateString();
    revenuePerDay[date] = (revenuePerDay[date] || 0) + o.total;
  });
  const revenueChart = Object.entries(revenuePerDay).map(([day, total]) => ({
    day,
    total,
  }));

  // 3️ Product Category Distribution
  const categoryCount = {};
  products.forEach((p) => {
    const cat = p.category || "Uncategorized";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28", "#AF19FF"];

  // 4️ Key Performance Indicators (KPIs)
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const today = new Date().toLocaleDateString();
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

  const todayOrders = orders.filter(
    (o) => new Date(o.date).toLocaleDateString() === today
  ).length;

  const yesterdayOrders = orders.filter(
    (o) => new Date(o.date).toLocaleDateString() === yesterday
  ).length;

  const orderTrendUp = todayOrders >= yesterdayOrders;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        📊 Advanced Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-5 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-3xl font-bold mt-2">
            Rs. {totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="p-5 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold mt-2">{orders.length}</h2>
          <div className="flex items-center gap-1 mt-2 text-sm">
            {orderTrendUp ? (
              <FaArrowUp className="text-green-600" />
            ) : (
              <FaArrowDown className="text-red-600" />
            )}
            <span>{orderTrendUp ? "Up Today" : "Down Today"}</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold mt-2">{users.length}</h2>
        </div>

        <div className="p-5 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500">Total Reviews</p>
          <h2 className="text-3xl font-bold mt-2">{reviews.length}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-3">📈 Orders Per Day</h3>
          <LineChart width={500} height={250} data={ordersChart}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#0088FE"
              strokeWidth={3}
            />
          </LineChart>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-3">💰 Revenue Per Day</h3>
          <BarChart width={500} height={250} data={revenueChart}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#00C49F" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg col-span-1 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-3">
            📦 Product Category Breakdown
          </h3>
          <PieChart width={600} height={300}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

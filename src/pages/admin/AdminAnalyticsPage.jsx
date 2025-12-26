import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import ChartCard from "../../components/ChartCard";
import StatCard from "../../components/StatCard";

export default function AdminAnalyticsPage() {
  /* ================= STATE ================= */
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  const API = import.meta.env.VITE_BACKEND_URL;

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    (async () => {
      try {
        const [ordersRes, usersRes, productsRes, reviewsRes] =
          await Promise.all([
            axios.get(`${API}/orders`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API}/users/all`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API}/products`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API}/reviews/all`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        setOrders(ordersRes.data || []);
        setUsers(usersRes.data || []);
        setProducts(productsRes.data || []);
        setReviews(reviewsRes.data?.reviews || []);
      } catch (err) {
        console.error("Analytics load failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [API]);

  /* ================= CALCULATIONS ================= */
  const ordersChart = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      const day = new Date(o.date).toISOString().split("T")[0];
      map[day] = (map[day] || 0) + 1;
    });
    return Object.entries(map).map(([day, count]) => ({ day, count }));
  }, [orders]);

  const revenueChart = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      const day = new Date(o.date).toISOString().split("T")[0];
      map[day] = (map[day] || 0) + o.total;
    });
    return Object.entries(map).map(([day, total]) => ({ day, total }));
  }, [orders]);

  const categoryData = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const category = p.category || "Uncategorized";
      map[category] = (map[category] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [products]);

  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + o.total, 0),
    [orders]
  );

  const COLORS = ["#6366F1", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"];

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* HEADER */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Business performance overview
          </p>
        </section>

        {/* KPI CARDS (FLEX) */}
        <section className="flex flex-wrap gap-6">
          <StatCard
            title="Revenue"
            value={`Rs. ${totalRevenue.toLocaleString()}`}
            tint="blue"
            icon={<span className="text-xl">💰</span>}
          />
          <StatCard
            title="Orders"
            value={orders.length}
            tint="amber"
            icon={<span className="text-xl">📦</span>}
          />
          <StatCard
            title="Users"
            value={users.length}
            tint="green"
            icon={<span className="text-xl">👤</span>}
          />
          <StatCard
            title="Reviews"
            value={reviews.length}
            tint="purple"
            icon={<span className="text-xl">⭐</span>}
          />
        </section>

        {/* CHARTS (FLEX COLUMN → ROW ON LARGE) */}
        <section className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <ChartCard title="Orders Per Day">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={ordersChart}>
                  <CartesianGrid stroke="#E5E7EA" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    dataKey="count"
                    stroke="#E5E7EB"
                    fill="#6366F1"
                    fillOpacity={0.25}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="flex-1">
            <ChartCard title="Revenue Per Day">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={revenueChart}>
                  <CartesianGrid stroke="#E5E7EB" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </section>

        {/* CATEGORY */}
        <section>
          <ChartCard title="Product Categories">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" outerRadius={120} label>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

      </div>
    </div>
  );
}

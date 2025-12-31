import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import Loader from "../../components/loder";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const API = import.meta.env.VITE_BACKEND_URL;
const COLORS = ["#22c55e", "#eab308", "#ef4444", "#3b82f6"];

export default function InventoryManagementPage() {
  // ================= STATE =================
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ================= FETCH PRODUCTS =================
  const loadProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
      setLoaded(true);
    } catch {
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ================= STOCK STATUS =================
  const getStockStatus = (p) => {
    if (p.stock <= 0) return "Out of Stock";
    if (p.stock <= 10) return "Low Stock";
    return "In Stock";
  };

  // ================= FILTER =================
  const filteredProducts = products.filter((p) => {
    const textMatch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.productID.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "all" || getStockStatus(p) === statusFilter;

    return textMatch && statusMatch;
  });

  // ================= STATS =================
  const stats = {
    total: products.length,
    inStock: products.filter((p) => getStockStatus(p) === "In Stock").length,
    lowStock: products.filter((p) => getStockStatus(p) === "Low Stock").length,
    outStock: products.filter((p) => getStockStatus(p) === "Out of Stock")
      .length,
  };

  // ================= CHART DATA =================

  // Stock by Category
  const stockByCategory = Object.values(
    products.reduce((acc, p) => {
      acc[p.category] ??= { category: p.category, stock: 0 };
      acc[p.category].stock += p.stock;
      return acc;
    }, {})
  );

  // Inventory Value
  const inventoryValueData = products.map((p) => ({
    name: p.name,
    value: p.stock * p.price,
  }));
  const totalInventoryValue = inventoryValueData.reduce(
    (sum, i) => sum + i.value,
    0
  );

  // Low Stock Trend
  const lowStockTrend = products.filter((p) => p.stock <= 10);

  // Reorder Alert
  const reorderData = [
    { name: "Reorder Needed", value: lowStockTrend.length },
    { name: "Stock OK", value: products.length - lowStockTrend.length },
  ];

  const badgeColor = (status) => {
    if (status === "In Stock") return "bg-green-100 text-green-700";
    if (status === "Low Stock") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  // ================= LOADER =================
  if (!loaded) {
    return (
      <div className="py-20 flex justify-center">
        <Loader />
      </div>
    );
  }

  // ================= PAGE =================
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-gray-600">Stock overview, analytics & control</p>
        </div>

        {/* STATS */}
        <div className="flex flex-col lg:flex-row gap-4">
          <Stat title="Total Products" value={stats.total} icon={<Package className="text-blue-800"/>} />
          <Stat title="In Stock" value={stats.inStock} icon={<TrendingUp className="text-green-800"/>} />
          <Stat
            title="Low Stock"
            value={stats.lowStock}
            icon={<AlertTriangle className="text-yellow-800"/>}
          />
          <Stat
            title="Out of Stock"
            value={stats.outStock}
            icon={<TrendingDown className="text-red-800" />}
          />
        </div>

        {/* ================= CHARTS ================= */}
        <div className="flex flex-col lg:flex-row gap-6">
          <ChartCard title="📊 Stock by Category">
            <BarChart data={stockByCategory}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#3b82f6" />
            </BarChart>
          </ChartCard>

          <ChartCard title="🚨 Reorder Alert">
            <PieChart>
              <Pie
                data={reorderData}
                dataKey="value"
                innerRadius={60}
                outerRadius={100}
                label
              >
                {reorderData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartCard>
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
          <ChartCard title="🧮 Total Inventory Value" className="flex flex-col">
            

            <BarChart data={inventoryValueData.slice(0, 8)}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ChartCard>

          <ChartCard title="📉 Low Stock Trend">
            {lowStockTrend.length === 0 ? (
              <p className="text-green-600 font-medium">
                All products healthy 🎉
              </p>
            ) : (
              <LineChart data={lowStockTrend}>
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Line dataKey="stock" stroke="#eab308" strokeWidth={2} />
              </LineChart>
            )}
          </ChartCard>
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="bg-white p-4 rounded-lg shadow mt-10 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              className="pl-10 w-full border rounded-lg p-2"
              placeholder="Search by name or Product ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border rounded-lg p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Product ID",
                  "Name",
                  "Category",
                  "Stock",
                  "Price",
                  "Value",
                  "Status",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((p) => {
                const status = getStockStatus(p);
                return (
                  <tr key={p.productID} className="border-t">
                    <td className="px-4 py-3 font-mono">{p.productID}</td>
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3">{p.category}</td>
                    <td className="px-4 py-3">{p.stock}</td>
                    <td className="px-4 py-3">LKR {p.price}</td>
                    <td className="px-4 py-3">
                      LKR {(p.stock * p.price).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${badgeColor(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const Stat = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-lg shadow flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    {icon}
  </div>
);

const ChartCard = ({ title, children, className = "" }) => (
  <div className={`bg-white p-4 rounded-lg shadow flex-1 ${className}`}>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      {children}
    </ResponsiveContainer>
  </div>
);

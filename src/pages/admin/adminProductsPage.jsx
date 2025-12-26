import axios from "axios";
import { BiPlus, BiSearch, BiFilter } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loader from "../../components/loder";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URL;

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    if (loaded) return;

    const token = localStorage.getItem("token");

    axios
      .get(`${API}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoaded(true);
      })
      .catch(() => toast.error("Failed to load products"));
  }, [loaded, API]);

  /* ================= FILTER & SEARCH ================= */
  useEffect(() => {
    let result = products;

    // Filter by status
    if (filterStatus === "available") {
      result = result.filter((p) => p.isAvailable);
    } else if (filterStatus === "unavailable") {
      result = result.filter((p) => !p.isAvailable);
    }

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.productID.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, filterStatus, products]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
                Product Management
              </h1>
              <p className="text-slate-600 text-sm">
                Manage your inventory and product catalog
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                <p className="text-xs text-slate-500 mb-0.5">Total Products</p>
                <p className="text-2xl font-bold text-slate-800">{products.length}</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                <p className="text-xs text-slate-500 mb-0.5">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter((p) => p.isAvailable).length}
                </p>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search by name, category, brand, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <BiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer min-w-[180px]"
                >
                  <option value="all">All Products</option>
                  <option value="available">In Stock</option>
                  <option value="unavailable">Out of Stock</option>
                </select>
              </div>
            </div>
            
            {searchTerm && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-slate-600">
                  Found {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {!loaded && (
            <div className="py-20">
              <Loader />
            </div>
          )}

          {loaded && filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <div className="text-slate-400 text-5xl mb-4">📦</div>
              <p className="text-slate-600 text-lg font-medium mb-1">
                {searchTerm || filterStatus !== "all" 
                  ? "No products match your filters" 
                  : "No products found"}
              </p>
              <p className="text-slate-500 text-sm">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filters"
                  : "Add your first product to get started"}
              </p>
            </div>
          )}

          {loaded && filteredProducts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ minWidth: '1400px' }}>
                {/* ================= TABLE HEAD ================= */}
                <thead className="bg-linear-to-r from-slate-800 to-slate-700 text-white">
                  <tr>
                    <th rowSpan="2" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Image
                    </th>
                    <th rowSpan="2" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Product ID
                    </th>
                    <th colSpan="4" className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider border-b border-slate-600">
                      Product Information
                    </th>
                    <th colSpan="2" className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider border-b border-slate-600">
                      Pricing
                    </th>
                    <th rowSpan="2" className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                      Stock
                    </th>
                    <th rowSpan="2" className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th rowSpan="2" className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                  <tr className="bg-slate-700">
                    <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium">Brand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium">Model</th>
                    <th className="px-6 py-3 text-left text-xs font-medium">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium">MSRP</th>
                  </tr>
                </thead>

                {/* ================= TABLE BODY ================= */}
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((item) => (
                    <tr
                      key={item.productID}
                      className="hover:bg-blue-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="relative">
                          <img
                            src={item.images?.[0]}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-200 group-hover:ring-blue-400 transition-all shadow-sm"
                          />
                          {!item.isAvailable && (
                            <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                              <span className="text-white text-[10px] font-bold">OUT</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {item.productID}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-800">{item.name}</span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {item.category}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 text-slate-600">{item.brand}</td>
                      <td className="px-6 py-4 text-slate-600">{item.model}</td>

                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800 text-base">
                          ${Number(item.price).toLocaleString()}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-slate-400 line-through decoration-2">
                          ${Number(item.labelledPrice).toLocaleString()}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg font-bold text-sm ${
                          item.stock > 50 
                            ? "bg-green-100 text-green-700" 
                            : item.stock > 0 
                            ? "bg-yellow-100 text-yellow-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {item.stock}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                            item.isAvailable
                              ? "bg-green-100 text-green-700 ring-1 ring-green-200"
                              : "bg-red-100 text-red-700 ring-1 ring-red-200"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            item.isAvailable ? "bg-green-500" : "bg-red-500"
                          }`}></span>
                          {item.isAvailable ? "Available" : "Out of Stock"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              navigate("/admin/update-product", { state: item })
                            }
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
                          >
                            Edit
                          </button>

                          <ProductDeleteButton
                            productID={item.productID}
                            reload={() => setLoaded(false)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <Link
          to="/admin/add-product"
          className="fixed right-6 bottom-6 w-16 h-16 flex justify-center items-center rounded-full bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 group z-50"
        >
          <BiPlus className="text-4xl group-hover:rotate-90 transition-transform duration-300" />
          <span className="absolute -top-12 right-0 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Add New Product
          </span>
        </Link>
      </div>
    </div>
  );
}
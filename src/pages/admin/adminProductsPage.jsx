import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loader from "../../components/loder";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
        setLoaded(true);
      })
      .catch(() => toast.error("Failed to load products"));
  }, [loaded, API]);

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-10 bg-linear-to-b from-primary to-white text-secondary">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-semibold">
          🧾 Product Management
        </h2>
        <span className="text-sm text-gray-500">
          {products.length} products available
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white/70 shadow-sm">
        {!loaded && <Loader />}

        {loaded && products.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No products found
          </div>
        )}

        {loaded && products.length > 0 && (
          <table className="w-full text-sm border-collapse">
            <thead className="bg-secondary text-primary/95 sticky top-0 z-10">
              <tr>
                {[
                  "Image",
                  "Product ID",
                  "Name",
                  "Price",
                  "Labelled Price",
                  "Category",
                  "Brand",
                  "Model",
                  "Stock",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-secondary/10">
              {products.map((item) => (
                <tr
                  key={item.productID}
                  className="odd:bg-primary/60 even:bg-white hover:bg-primary/90 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-9 h-9 rounded-lg object-cover ring-1 ring-secondary/10"
                    />
                  </td>

                  <td className="px-4 py-3 text-xs font-medium whitespace-nowrap">
                    {item.productID}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.name}
                  </td>

                  <td className="px-4 py-3 font-semibold whitespace-nowrap">
                    {Number(item.price).toLocaleString()}
                  </td>

                  <td className="px-4 py-3 line-through decoration-gold/70 decoration-2 whitespace-nowrap">
                    {Number(item.labelledPrice).toLocaleString()}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.category}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.brand}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.model}
                  </td>

                  <td className="px-4 py-3 text-center font-semibold">
                    {item.stock}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isAvailable ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate("/admin/update-product", { state: item })
                      }
                      className="text-xs w-20 bg-accent text-white py-1.5 rounded-full hover:bg-accent/80 transition"
                    >
                      Edit
                    </button>

                    <ProductDeleteButton
                      productID={item.productID}
                      reload={() => setLoaded(false)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Product Button */}
      <Link
        to="/admin/add-product"
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 w-12 sm:w-[60px] h-12 sm:h-[60px]
        flex justify-center items-center text-3xl border-2 rounded-full
        bg-white text-accent border-accent shadow-lg
        hover:bg-accent hover:text-white transition-transform hover:scale-110"
      >
        <BiPlus />
      </Link>
    </div>
  );
}

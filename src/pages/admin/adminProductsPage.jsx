import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loder"; // Adjust path if needed
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
  if (!loaded) {
    const token = localStorage.getItem("token");
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products.");
      });
  }
}, [loaded]);

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 md:p-10 
      bg-linear-to-b from-primary to-white text-secondary relative"
    >
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white/90 rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-secondary text-center sm:text-left">
            🧾 Product Management
          </h2>
          <span className="text-sm text-gray-500 text-center sm:text-right">
            {products.length} products available
          </span>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
          {loaded ? (
            <table
              className="w-full text-sm sm:text-base border-collapse rounded-xl overflow-hidden
              bg-white/70 "
            >
              <thead className="bg-secondary text-primary/95">
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
                    "Availability",
                    "Actions",
                  ].map((header, i) => (
                    <th
                      key={i}
                      className={`px-3 sm:px-4 py-2 sm:py-3 ${
                        header === "Actions" ? "text-center" : "text-left"
                      } text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-secondary/10">
                {products.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-primary/60 even:bg-white hover:bg-primary/90 transition-colors"
                  >
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-7 sm:w-9 h-7 sm:h-9 rounded-lg object-cover ring-1 ring-secondary/10 shadow-sm"
                      />
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-secondary/90 whitespace-nowrap">
                      {item.productID}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-secondary whitespace-nowrap">
                      {item.price}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm line-through decoration-gold/70 decoration-2 whitespace-nowrap">
                      {item.labelledPrice}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                      {item.brand}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                      {item.model}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {item.stock}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-center whitespace-nowrap">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                          item.isAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.isAvailable ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-center whitespace-nowrap">
                      <ProductDeleteButton productID={item.productID} reload={() => setLoaded(false)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Loader />
          )}
        </div>
      </div>

      {/* Floating Add Product Button */}
      <Link
        to="/admin/add-product"
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 w-12 sm:w-[60px] h-12 sm:h-[60px] 
        flex justify-center items-center text-3xl sm:text-4xl border-2 rounded-full hover:text-white 
        hover:bg-accent border-accent bg-white text-accent shadow-lg transition-transform duration-300 hover:scale-110"
      >
        <BiPlus />
      </Link>
    </div>
  );
}

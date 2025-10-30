import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loder"; // Adjust path if needed

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setLoaded(true);
      });
    }
  }, [loaded]);

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 md:p-10 
      bg-gradient-to-b from-primary to-white text-secondary relative"
    >
      {/* Loader Overlay */}
      {!loaded && <Loader />}

      {/* Main Container */}
      {loaded && (
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 relative z-10">
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
            <table
              className="w-full text-sm sm:text-base border-collapse rounded-xl overflow-hidden
              bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60"
            >
              <thead className="bg-secondary text-primary/95">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Image
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Product ID
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Price
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Labelled Price
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Category
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Brand
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Model
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Stock
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Availability
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
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
                        className="w-[28px] sm:w-[38px] h-[28px] sm:h-[38px] rounded-lg object-cover ring-1 ring-secondary/10 shadow-sm"
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
                      <button
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          axios
                            .delete(
                              `${import.meta.env.VITE_BACKEND_URL}/products/${item.productID}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then(() => {
                              toast.success("Product deleted successfully");
                              setLoaded(false);
                            });
                        }}
                        className="text-[10px] sm:text-sm  sm:w-[100px] bg-red-500 flex justify-center items-center text-white sm:p-2 rounded-full cursor-pointer hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Floating Add Product Button */}
      <Link
        to="/admin/add-product"
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] 
        flex justify-center items-center text-3xl sm:text-4xl border-2 rounded-full hover:text-white 
        hover:bg-accent border-accent bg-white text-accent shadow-lg transition-transform duration-300 hover:scale-110"
      >
        <BiPlus />
      </Link>
    </div>
  );
}

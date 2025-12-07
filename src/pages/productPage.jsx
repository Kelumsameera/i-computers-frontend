import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loder";
import ProductCard from "../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoaded(false);
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
      console.log(response.data);
      setProducts(response.data);
      setLoaded(true);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoaded(true);
    }
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    
    if (value === "") {
      fetchProducts();
    } else {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/products/search/" + value
        );
        console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        console.error("Error searching products:", err);
      }
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-linear-to-b from-primary/30 to-white">
      {!loaded ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center p-4 flex-row flex-wrap">
          {/* Search Bar */}
          <div className="w-full h-[100px] sticky top-0 bg-white flex justify-center items-center text-center mb-4 shadow-md z-10">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              className="w-1/2 p-3 border-2 border-secondary/20 rounded-lg focus:outline-none focus:border-accent transition-colors"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="w-full text-center py-20">
              <p className="text-secondary/70 text-xl">No products found</p>
            </div>
          ) : (
            products.map((item) => (
              <ProductCard key={item.productID} product={item} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
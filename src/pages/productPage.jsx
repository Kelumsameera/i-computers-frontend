import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loder";
import ProductCard from "../components/productCard";
import Footer from "../components/Footer";
import { FiSearch, FiX } from "react-icons/fi";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoaded(false);
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/products"
      );

      setProducts(response.data);
      setAllProducts(response.data);

      const uniqueCategories = [
        "All",
        ...new Set(response.data.map((p) => p.category)),
      ];
      setCategories(uniqueCategories);

      setLoaded(true);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoaded(true);
    }
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (value === "") {
      setProducts(
        selectedCategory === "All"
          ? allProducts
          : allProducts.filter((p) => p.category === selectedCategory)
      );
      return;
    }

    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/products/search/" + value
      );

      setProducts(
        selectedCategory === "All"
          ? response.data
          : response.data.filter((p) => p.category === selectedCategory)
      );
    } catch (err) {
      console.error("Error searching products:", err);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setProducts(searchTerm ? products : allProducts);
    } else {
      const source = searchTerm ? products : allProducts;
      setProducts(source.filter((p) => p.category === category));
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setProducts(
      selectedCategory === "All"
        ? allProducts
        : allProducts.filter((p) => p.category === selectedCategory)
    );
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {!loaded ? (
        <Loader />
      ) : (
        <>
          {/* HEADER */}
          <div className="bg-white border-b border-secondary/10">
            <div className="max-w-7xl mx-auto px-6 py-6">

              {/* TITLE + SEARCH */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4">
                
                {/* TITLE */}
                <div className="text-center lg:text-left">
                  <h1 className="text-2xl font-bold text-secondary">
                    Our Products
                  </h1>
                  <p className="text-secondary/60 text-sm mt-1">
                    Discover amazing products tailored for you
                  </p>
                </div>

                {/* SEARCH */}
                <div className="w-full max-w-md mx-auto lg:mx-0">
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border border-secondary/20 rounded-lg focus:outline-none focus:border-accent bg-primary/30 text-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <FiX className="text-secondary/40" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* CATEGORY FILTER (REDUCED) */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-1.5 text-sm rounded-full font-medium transition ${
                      selectedCategory === category
                        ? "bg-accent text-white"
                        : "border border-secondary/20 text-secondary hover:border-accent hover:text-accent"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* RESULT COUNT */}
              <p className="text-center text-xs text-secondary/60 mt-3">
                Showing{" "}
                <span className="font-semibold text-accent">
                  {products.length}
                </span>{" "}
                products
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </p>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="max-w-7xl mx-auto px-6 py-12">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-secondary">
                  No Products Found
                </h3>
                <p className="text-secondary/60 text-sm">
                  Try adjusting your search or category
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-6 justify-center">
                {products.map((item) => (
                  <div
                    key={item.productID}
                    className="w-full sm:w-[48%] lg:w-[31%] xl:w-[23%]"
                  >
                    <ProductCard product={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <Footer />
        </>
      )}

      <Footer />
    </div>
  );
}

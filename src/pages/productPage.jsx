// import axios from "axios";
// import { useEffect, useState } from "react";
// import Loader from "../components/loder";
// import ProductCard from "../components/productCard";
// import Footer from "../components/Footer";
// import { FiSearch, FiX } from "react-icons/fi";

// export default function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loaded, setLoaded] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     GetProducts();
//   }, []);

//   const GetProducts = async () => {
//     setLoaded(false);
//     try {
//       const response = await axios.get(
//         import.meta.env.VITE_BACKEND_URL + "/products"
//       );

//       setProducts(response.data);
//       setAllProducts(response.data);

//       const uniqueCategories = [
//         "All",
//         ...new Set(response.data.map((p) => p.category)),
//       ];
//       setCategories(uniqueCategories);

//       setLoaded(true);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setLoaded(true);
//     }
//   };
//   const getRattings = (product) => {
//     await.axios
//       .get(
//         import.meta.env.VITE_BACKEND_URL + "/reviews/product/" + product.productID
//       )
//       .then((response) => {
//         return response.data;
//       })
//       .catch((err) => {
//         console.error("Error fetching product reviews:", err);
//         return [];
//       });
//   }

//   const handleSearch = async (value) => {
//     setSearchTerm(value);

//     if (value === "") {
//       setProducts(
//         selectedCategory === "All"
//           ? allProducts
//           : allProducts.filter((p) => p.category === selectedCategory)
//       );
//       return;
//     }

//     try {
//       const response = await axios.get(
//         import.meta.env.VITE_BACKEND_URL + "/products/search/" + value
//       );

//       setProducts(
//         selectedCategory === "All"
//           ? response.data
//           : response.data.filter((p) => p.category === selectedCategory)
//       );
//     } catch (err) {
//       console.error("Error searching products:", err);
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);

//     if (category === "All") {
//       setProducts(searchTerm ? products : allProducts);
//     } else {
//       const source = searchTerm ? products : allProducts;
//       setProducts(source.filter((p) => p.category === category));
//     }
//   };

//   const clearSearch = () => {
//     setSearchTerm("");
//     setProducts(
//       selectedCategory === "All"
//         ? allProducts
//         : allProducts.filter((p) => p.category === selectedCategory)
//     );
//   };

//   return (
//     <div className="w-full min-h-screen bg-white">
//       {!loaded ? (
//         <Loader />
//       ) : (
//         <>
//           {/* HEADER */}
//           <div className="bg-white border-b border-secondary/10">
//             <div className="max-w-7xl mx-auto px-6 py-6">

//               {/* TITLE + SEARCH */}
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4">
                
//                 {/* TITLE */}
//                 <div className="text-center lg:text-left">
//                   <h1 className="text-2xl font-bold text-secondary">
//                     Our Products
//                   </h1>
//                   <p className="text-secondary/60 text-sm mt-1">
//                     Discover amazing products tailored for you
//                   </p>
//                 </div>

//                 {/* SEARCH */}
//                 <div className="w-full max-w-md mx-auto lg:mx-0">
//                   <div className="relative">
//                     <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" />
//                     <input
//                       type="text"
//                       placeholder="Search products..."
//                       value={searchTerm}
//                       onChange={(e) => handleSearch(e.target.value)}
//                       className="w-full pl-12 pr-12 py-3 border border-secondary/20 rounded-lg focus:outline-none focus:border-accent bg-primary/30 text-sm"
//                     />
//                     {searchTerm && (
//                       <button
//                         onClick={clearSearch}
//                         className="absolute right-4 top-1/2 -translate-y-1/2"
//                       >
//                         <FiX className="text-secondary/40" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* CATEGORY FILTER (REDUCED) */}
//               <div className="flex flex-wrap justify-center gap-2 mt-4">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => handleCategoryChange(category)}
//                     className={`px-4 py-1.5 text-sm rounded-full font-medium transition ${
//                       selectedCategory === category
//                         ? "bg-accent text-white"
//                         : "border border-secondary/20 text-secondary hover:border-accent hover:text-accent"
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>

//               {/* RESULT COUNT */}
//               <p className="text-center text-xs text-secondary/60 mt-3">
//                 Showing{" "}
//                 <span className="font-semibold text-accent">
//                   {products.length}
//                 </span>{" "}
//                 products
//                 {searchTerm && ` for "${searchTerm}"`}
//                 {selectedCategory !== "All" && ` in ${selectedCategory}`}
//               </p>
//             </div>
//           </div>

//           {/* PRODUCTS */}
//           <div className="max-w-7xl mx-auto px-6 py-12">
//             {products.length === 0 ? (
//               <div className="text-center py-20">
//                 <h3 className="text-2xl font-bold text-secondary">
//                   No Products Found
//                 </h3>
//                 <p className="text-secondary/60 text-sm">
//                   Try adjusting your search or category
//                 </p>
//               </div>
//             ) : (
//               <div className="flex flex-wrap gap-6 justify-center">
//                 {products.map((item) => (
//                   <div
//                     key={item.productID}
//                     className="w-full sm:w-[48%] lg:w-[31%] xl:w-[23%]"
//                   >
//                     <ProductCard product={item} />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <Footer />
//         </>
//       )}

//       <Footer />
//     </div>
//   );
// }
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Search,
  X,
  Filter,
  Grid,
  List,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import Loader from "../components/loder";
import ProductCard from "../components/productCard";
import Footer from "../components/Footer";

export default function ProductPage() {
  const API = import.meta.env.VITE_BACKEND_URL;

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    loadProductsWithRatings();
  }, []);

  const loadProductsWithRatings = async () => {
    setLoaded(false);
    try {
      const productRes = await axios.get(`${API}/products`);
      const list = productRes.data;

      const enriched = await Promise.all(
        list.map(async (p) => {
          try {
            const ratingRes = await axios.get(
              `${API}/reviews/rating/${p.productID}`
            );
            return {
              ...p,
              averageRating: ratingRes.data.averageRating || 0,
              reviewCount: ratingRes.data.reviewCount || 0,
            };
          } catch {
            return { ...p, averageRating: 0, reviewCount: 0 };
          }
        })
      );

      setAllProducts(enriched);
      setProducts(enriched);
      setCategories([
        "All",
        ...new Set(enriched.map((p) => p.category).filter(Boolean)),
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "price-low") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    }

    setProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, allProducts]);

  if (!loaded) return <Loader />;

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* ================= HERO ================= */}
      <div className="bg-linear-to-br from-gray-900 to-gray-800">
        <div className="flex flex-col items-center justify-center text-center px-6 py-6 gap-2">
          <h1 className="text-2xl font-extrabold text-white">
            Our Products
          </h1>
          <p className="text-gray-300 max-w-xl">
            Discover amazing products tailored just for you
          </p>

          <div className="w-full max-w-2xl mt-6">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-gray-400" size={20} />
              <input
                className="w-full pl-12 pr-12 py-4 bg-white rounded-full shadow-xl outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4"
                >
                  <X className="text-gray-400" size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= TOOLBAR ================= */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-yellow-500" size={18} />
            <span className="text-sm text-gray-600">
              <b className="text-yellow-500 text-lg">{products.length}</b>{" "}
              Products
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-100 px-4 py-2 pr-10 rounded-xl text-sm font-medium focus:ring-2 focus:ring-yellow-500"
              >
                <option value="default">Sort: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>

            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-white shadow text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-white shadow text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 px-4 py-8">
        {/* Categories */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="text-yellow-500" size={18} />
            <h3 className="text-sm font-semibold uppercase">Categories</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 rounded-full text-sm font-semibold transition-all
                  ${
                    selectedCategory === cat
                      ? "bg-yellow-500 text-white shadow-lg scale-105"
                      : "bg-white border border-gray-200 hover:border-yellow-500"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <Search className="text-yellow-500" size={36} />
            </div>
            <h3 className="text-2xl font-bold">No Products Found</h3>
            <p className="text-gray-500 mt-2">
              Try changing filters or search
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "flex flex-wrap gap-6 justify-center"
                : "flex flex-col gap-5"
            }
          >
            {products.map((product) => (
              <div
                key={product.productID}
                className="transition-transform hover:-translate-y-1"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

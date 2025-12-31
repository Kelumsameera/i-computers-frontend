
import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";


  // Constants

const SLOGANS = [
  "Custom-built rigs for work, study, and play.",
  "Genuine parts. Reliable service. Zero drama.",
  "From student laptops to pro workstations — we've got you.",
];

const FEATURED_PRODUCTS_COUNT = 5;
const CAROUSEL_AUTO_SLIDE_INTERVAL = 5000;
const SLOGAN_CHANGE_INTERVAL = 3000;


  // Reusable Components

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-[450px]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
  </div>
);

const ProductSkeleton = () => (
  <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden animate-pulse">
    <div className="aspect-video bg-gray-800" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-800 rounded w-3/4" />
      <div className="h-4 bg-gray-800 rounded w-1/2" />
      <div className="h-8 bg-gray-800 rounded w-1/3 mt-4" />
    </div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center">
    <p className="text-red-400 mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Try Again
      </button>
    )}
  </div>
);


  // Main Component

export default function Home() {
  const navigate = useNavigate();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Slogan animation
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);
  
  // Data states
  const [topSelling, setTopSelling] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topSellingLoading, setTopSellingLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topSellingError, setTopSellingError] = useState(null);
  
  // Carousel states
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  //get featured products
  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/products"
      );
      setFeatured(res.data.slice(0, FEATURED_PRODUCTS_COUNT));
    } catch (err) {
      console.error("Error loading featured products:", err);
      setError("Failed to load featured products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

     //Fetch Top Selling Products
 
  const getTopSellingProducts = async () => {
    try {
      setTopSellingLoading(true);
      setTopSellingError(null);
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/orders/top-selling"
      );
      setTopSelling(res.data.topSelling || []);
    } catch (err) {
      console.error("Error loading top selling:", err);
      setTopSellingError("Failed to load top selling products.");
    } finally {
      setTopSellingLoading(false);
    }
  };

  useEffect(() => {
    getTopSellingProducts();
  }, []);


    // Slogan Animation
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActive((i) => (i + 1) % SLOGANS.length);
        setFade(true);
      }, 300);
    }, SLOGAN_CHANGE_INTERVAL);
    return () => clearInterval(interval);
  }, []);


     //Carousel Auto-Slide
 
  useEffect(() => {
    if (isPaused || featured.length === 0) return;
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featured.length);
    }, CAROUSEL_AUTO_SLIDE_INTERVAL);
    
    return () => clearInterval(slideInterval);
  }, [featured, isPaused]);

 
    // Image Preloading

  useEffect(() => {
    if (featured.length > 0) {
      const nextIndex = (currentSlide + 1) % featured.length;
      const img = new Image();
      img.src = featured[nextIndex]?.images?.[0];
    }
  }, [currentSlide, featured]);


     //Carousel Controls

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featured.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };


     // Touch Handlers for Mobile

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchEnd - touchStart > 75) {
      prevSlide();
    }
  };

     //Keyboard Navigation

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };


     //Search Handler

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  
    // Categories (Static)

  const categories = [
    { name: "Laptops", icon: "💻" },
    { name: "Desktops", icon: "🖥️" },
    { name: "Components", icon: "⚙️" },
    { name: "Peripherals", icon: "⌨️" },
    { name: "Monitors", icon: "🖵" },
    { name: "Accessories", icon: "🎧" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/*
            HERO SECTION
     */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/home.jpg')" }}
          role="img"
          aria-label="Hero background"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black" />

        {/* Animated blurs */}
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 flex min-h-screen flex-col justify-center py-20 md:flex-row md:items-center md:gap-12">
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-cyan-300">
                Isuru Technologies
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Upgrade your{" "}
              <span className="bg-linear-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                tech game
              </span>{" "}
              with trusted hardware & service.
            </h1>

            {/* Rotating slogan */}
            <div className="min-h-14">
              <p
                className={`text-xl text-gray-300 transition-all duration-500 ${
                  fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
                aria-live="polite"
              >
                {SLOGANS[active]}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row items-center md:items-start">
              <Link
                to="/products"
                className="rounded-full bg-cyan-500 px-8 py-3 text-sm font-semibold text-black shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 hover:scale-105 transition"
              >
                Shop Products
              </Link>

              <Link
                to="/about"
                className="rounded-full border border-gray-600 bg-white/5 px-8 py-3 text-sm font-semibold text-gray-100 backdrop-blur-sm hover:border-cyan-400 hover:bg-white/10 hover:scale-105 transition"
              >
                Learn About Us
              </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto md:mx-0 pt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-900/80 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 backdrop-blur-md transition"
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 mx-3 py-2 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition"
                  aria-label="Submit search"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

           {/* 3D CAROUSEL */}
          
          <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} onRetry={fetchFeatured} />
            ) : featured.length === 0 ? (
              <div className="text-center text-gray-400">
                <p>No featured products available at the moment.</p>
              </div>
            ) : (
              <div
                className="relative w-full max-w-lg h-[450px]"
                style={{ perspective: "1000px" }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="region"
                aria-label="Featured products carousel"
                aria-live="polite"
              >
                <div className="relative w-full h-full">
                  {featured.map((product, index) => {
                    const position =
                      (index - currentSlide + featured.length) % featured.length;

                    const isActive = position === 0;
                    const isPrev = position === featured.length - 1;
                    const isNext = position === 1;

                    // Only render visible slides for performance
                    if (!isActive && !isPrev && !isNext) return null;

                    return (
                      <div
                        key={product.productID}
                        onClick={() => goToSlide(index)}
                        className={`absolute top-1/2 left-1/2 w-72 sm:w-80 cursor-pointer transition-all duration-700 ease-in-out ${
                          isActive
                            ? "z-30 opacity-100"
                            : isNext || isPrev
                            ? "z-20 opacity-60"
                            : "z-10 opacity-0"
                        }`}
                        style={{
                          transform: `
                            translate(-50%, -50%)
                            ${isActive ? "scale(1.1)" : ""}
                            ${
                              isNext
                                ? "translateX(45%) scale(0.9) rotateY(-25deg)"
                                : ""
                            }
                            ${
                              isPrev
                                ? "translateX(-145%) scale(0.9) rotateY(25deg)"
                                : ""
                            }
                          `,
                          transformStyle: "preserve-3d",
                        }}
                        role="group"
                        aria-label={`Product ${index + 1} of ${featured.length}: ${product.name}`}
                      >
                        {/* Card */}
                        <div
                          className={`relative rounded-2xl overflow-hidden border bg-linear-to-br from-gray-900 to-gray-800 transition-all duration-500 ${
                            isActive
                              ? "border-cyan-400 shadow-cyan-400/30 shadow-2xl"
                              : "border-gray-700"
                          }`}
                        >
                          <div className="relative  h-48 overflow-hidden">
                            <img
                              src={product.images?.[0]}
                              alt={product.name}
                              loading="lazy"
                              className={`w-full h-full object-cover transition-transform duration-700 ${
                                isActive ? "scale-110" : "scale-100"
                              }`}
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

                            <span className="absolute top-4 right-4 bg-cyan-400 text-black px-3 py-1 text-xs font-bold rounded-full">
                              {product.labelledPrice > product.price
                                ? "SALE"
                                : "FEATURED"}
                            </span>
                          </div>

                          {/* Card Content */}
                          <div className="p-5">
                            <h3
                              className={`text-sm lg:text-lg font-bold mb-2 ${
                                isActive ? "text-cyan-400" : "text-white"
                              }`}
                            >
                              {product.name}
                            </h3>

                            <div className="flex items-center justify-between mt-2">
                              <span className="text-lg lg:text-2xl font-bold text-cyan-400">
                                LKR {product.price?.toLocaleString()}
                              </span>

                              <Link
                                to={`/overview/${product.productID}`}
                                className={`px-5 py-2 rounded-full text-sm lg:text-sm font-semibold cursor-pointer transition-all ${
                                  isActive
                                    ? "bg-cyan-400 text-black hover:scale-105"
                                    : "bg-gray-700 text-gray-400 cursor-not-allowed pointer-events-none"
                                }`}
                                tabIndex={isActive ? 0 : -1}
                                aria-label={`View details for ${product.name}`}
                              >
                                {isActive ? "View Details" : "View"}
                              </Link>
                            </div>
                          </div>

                          {isActive && (
                            <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl animate-pulse pointer-events-none" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-linear-to-r from-cyan-500 to-blue-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg shadow-cyan-500/30 hover:scale-110 transition flex items-center justify-center"
                  aria-label="Previous product"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-linear-to-r from-cyan-500 to-blue-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg shadow-cyan-500/30 hover:scale-110 transition flex items-center justify-center"
                  aria-label="Next product"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Dots Indicator */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-40" role="tablist">
                  {featured.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`transition-all duration-300 ${
                        i === currentSlide
                          ? "w-10 h-3 bg-linear-to-r from-cyan-400 to-blue-500 rounded-full"
                          : "w-3 h-3 bg-white/30 hover:bg-white/50 rounded-full"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                      role="tab"
                      aria-selected={i === currentSlide}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/*   CATEGORY SECTION */}
      <section className="py-12 px-2 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c, i) => (
              <Link
                key={i}
                to={`/products?category=${c.name.toLowerCase()}`}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-400 hover:bg-gray-700 cursor-pointer text-center transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label={`Browse ${c.name}`}
              >
                <div className="text-2xl mb-2" aria-hidden="true">{c.icon}</div>
                <p className="text-gray-300 font-medium group-hover:text-cyan-400">{c.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10">
            🔥 Top Selling Products
          </h2>

          {topSellingLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : topSellingError ? (
            <ErrorMessage message={topSellingError} onRetry={fetchTopSelling} />
          ) : topSelling.length === 0 ? (
            <p className="text-gray-400 text-center text-lg">
              No sales data available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {topSelling.map(({ product, quantity }) =>
                product ? (
                  <div
                    key={product.productID}
                    className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-400 group transition cursor-pointer"
                  >
                    {/* Image */}
                    <div className="aspect-video overflow-hidden bg-gray-800">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-400 mb-3">
                        Sold:{" "}
                        <span className="text-cyan-400 font-bold">
                          {quantity}
                        </span>
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-cyan-400">
                          LKR {product.price?.toLocaleString()}
                        </span>

                        <Link
                          to={`/overview/${product.productID}`}
                          className="px-4 py-2 bg-cyan-400 text-black rounded font-semibold hover:bg-cyan-300 transition"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      </section>

      {/* ============================
          FEATURED PRODUCTS
      ============================= */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>

            <Link
              to="/products"
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2 focus:outline-none focus:underline"
            >
              View All
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchFeatured} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((product) => (
                <div
                  key={product.productID}
                  className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-400 transition group cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="aspect-video bg-gray-800 overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Card Details */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition">
                      {product.name}
                    </h3>

                    {/* Simple Rating */}
                    <div className="flex items-center gap-1 text-cyan-400">
                      {"★".repeat(Math.round(product.rating || 4))}
                      <span className="text-gray-400 text-sm ml-1">
                        ({product.rating || "4.5"})
                      </span>
                    </div>

                    {/* Price + View */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-cyan-400">
                        LKR {product.price?.toLocaleString()}
                      </span>

                      <Link
                        to={`/overview/${product.productID}`}
                        className="px-4 py-2 bg-cyan-400 text-black font-semibold rounded hover:bg-cyan-300 transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/*FOOTER*/}
      <Footer />

      
    </div>
  );
}


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SLOGANS = [
  "Custom-built rigs for work, study, and play.",
  "Genuine parts. Reliable service. Zero drama.",
  "From student laptops to pro workstations — we've got you.",
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActive((i) => (i + 1) % SLOGANS.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const categories = [
    { name: "Laptops", icon: "💻" },
    { name: "Desktops", icon: "🖥️" },
    { name: "Components", icon: "⚙️" },
    { name: "Peripherals", icon: "⌨️" },
    { name: "Monitors", icon: "🖵" },
    { name: "Accessories", icon: "🎧" },
  ];

  const featuredSlides = [
    {
      id: 1,
      name: "Gaming Laptop RTX 4080",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=400&fit=crop",
      tag: "Best Seller",
    },
    {
      id: 2,
      name: "Custom Gaming Desktop",
      price: 3299,
      image:
        "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=400&fit=crop",
      tag: "New Arrival",
    },
    {
      id: 3,
      name: "Ultra-Wide Gaming Monitor",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop",
      tag: "Hot Deal",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Gaming Laptop RTX 4080",
      price: 2499,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Mechanical RGB Keyboard",
      price: 149,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Ultra-Wide Gaming Monitor",
      price: 799,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Wireless Gaming Mouse",
      price: 89,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "AMD Ryzen 9 Processor",
      price: 549,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "RTX 4090 Graphics Card",
      price: 1899,
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= Math.floor(rating)
                ? "text-cyan-400"
                : star - 0.5 <= rating
                ? "text-cyan-400 opacity-50"
                : "text-gray-600"
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-gray-400 text-sm ml-1">({rating})</span>
      </div>
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredSlides.length) % featuredSlides.length
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Background */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/home.jpg')" }}
        />

        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black" />

        {/* Animated blur effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 flex min-h-screen flex-col justify-center py-20 md:flex-row md:items-center md:gap-12">
          {/* LEFT SECTION */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-cyan-300">
                Isuri Technologies
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-white">
              Upgrade your{" "}
              <span className="bg-linear-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                tech game
              </span>{" "}
              with trusted hardware & service.
            </h1>

            {/* Rotating Slogan */}
            <div className="min-h-14">
              <p
                className={`text-lg sm:text-xl font-medium text-slate-300 transition-all duration-500 ${
                  fade
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                {SLOGANS[active]}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row items-center md:items-start pt-2">
              <Link
                to="/products"
                className="rounded-full bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 hover:shadow-cyan-400/40 hover:scale-105 transition"
              >
                Shop Products
              </Link>

              <Link
                to="/about"
                className="rounded-full border border-slate-500/70 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur-md hover:border-cyan-400 hover:bg-white/10 hover:scale-105 transition"
              >
                Learn About Us
              </Link>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto md:mx-0 pt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 backdrop-blur-md transition"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION – 3D Carousel */}
          <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
            <div
              className="relative w-full max-w-lg h-[450px]"
              style={{ perspective: "1000px" }}
            >
              {/* Carousel Container */}
              <div className="relative w-full h-full">
                {featuredSlides.map((slide, index) => {
                  const position =
                    (index - currentSlide + featuredSlides.length) %
                    featuredSlides.length;
                  const isActive = position === 0;
                  const isPrev = position === featuredSlides.length - 1;
                  const isNext = position === 1;

                  return (
                    <div
                      key={slide.id}
                      onClick={() => setCurrentSlide(index)}
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
                          ${isActive ? "translateX(0) scale(1.1)" : ""}
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
                          ${
                            !isActive && !isNext && !isPrev ? "scale(0.75)" : ""
                          }
                        `,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Card */}
                      <div
                        className={`relative rounded-2xl overflow-hidden border transition-all duration-500 ${
                          isActive
                            ? "border-cyan-400 shadow-2xl shadow-cyan-400/30"
                            : "border-white/10"
                        } bg-linear-to-br from-gray-900 to-gray-800 backdrop-blur-lg`}
                      >
                        {/* Image */}
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <img
                            src={slide.image}
                            alt={slide.name}
                            className={`w-full h-full object-cover transition-transform duration-700 ${
                              isActive ? "scale-110" : "scale-100"
                            }`}
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

                          {/* Tag */}
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-cyan-400/90 text-black text-xs font-bold rounded-full backdrop-blur-sm">
                              {slide.tag}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3
                            className={`text-base sm:text-lg font-bold text-white mb-3 transition-colors ${
                              isActive ? "text-cyan-400" : ""
                            }`}
                          >
                            {slide.name}
                          </h3>

                          <div className="flex items-center justify-between">
                            <span className="text-xl sm:text-2xl font-bold text-cyan-400">
                              ${slide.price}
                            </span>
                            <button
                              className={`px-4 sm:px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
                                isActive
                                  ? "bg-cyan-400 text-black hover:bg-cyan-300 hover:scale-105"
                                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
                              }`}
                              disabled={!isActive}
                            >
                              {isActive ? "View Details" : "View"}
                            </button>
                          </div>
                        </div>

                        {/* Active Indicator Glow */}
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl animate-pulse pointer-events-none"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/50 transition-all hover:scale-110"
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
                className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/50 transition-all hover:scale-110"
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
              <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-40">
                {featuredSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 sm:w-10 h-2 sm:h-3 bg-linear-to-r from-cyan-400 to-blue-500 rounded-full"
                        : "w-2 sm:w-3 h-2 sm:h-3 bg-white/30 hover:bg-white/50 rounded-full"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-cyan-400 rounded-lg p-6 text-center cursor-pointer transition group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <div className="text-gray-300 group-hover:text-cyan-400 font-medium transition">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              to="/products"
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-400 transition group cursor-pointer"
              >
                <div className="aspect-video bg-gray-800 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition">
                    {product.name}
                  </h3>
                  <StarRating rating={product.rating} />
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-cyan-400">
                      ${product.price}
                    </span>
                    <button className="px-4 py-2 bg-cyan-400 text-black font-semibold rounded hover:bg-cyan-300 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-2">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-5 mb-4">
                <div className="w-full h-25 rounded-full overflow-hidden bg-transparent flex items-center justify-center">
                  <img
                    src="/logo.png"
                    className="w-full h-full object-contain"
                    alt="logo"
                  />
                </div>
                <span className="text-xl font-bold">Isuru Technologies</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted source for premium computer hardware and technology
                solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-cyan-400">Shop</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link
                    to="/products"
                    className="hover:text-cyan-400 transition"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Deals
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-cyan-400">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-cyan-400 transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-cyan-400">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="/about" className="hover:text-cyan-400 transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Isuri Technologies. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

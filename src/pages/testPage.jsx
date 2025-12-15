import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X, Star, ChevronRight, Truck, Shield, CreditCard } from 'lucide-react';

// Mock product data
const mockProducts = [
  { 
    id: 1, 
    name: 'Wireless Earbuds Pro', 
    price: 4999, 
    originalPrice: 7999, 
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', 
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
      'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400'
    ],
    category: 'Electronics', 
    rating: 4.5, 
    reviews: 234, 
    discount: 38,
    description: 'Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and commuters.',
    features: ['Active Noise Cancellation', '30-hour Battery Life', 'IPX7 Water Resistant', 'Bluetooth 5.3', 'Fast Charging'],
    inStock: true,
    sold: 1200
  },
  { 
    id: 2, 
    name: 'Smart Watch Series 7', 
    price: 12999, 
    originalPrice: 18999, 
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400', 
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400'
    ],
    category: 'Electronics', 
    rating: 4.8, 
    reviews: 567, 
    discount: 32,
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life. Stay connected and healthy with this all-in-one device.',
    features: ['Heart Rate Monitor', 'GPS Tracking', '7-day Battery', 'Water Resistant', 'Sleep Tracking', 'Multiple Sports Modes'],
    inStock: true,
    sold: 890
  },
  { 
    id: 3, 
    name: 'Laptop Backpack', 
    price: 2499, 
    originalPrice: 3999, 
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400'
    ],
    category: 'Fashion', 
    rating: 4.3, 
    reviews: 123, 
    discount: 38,
    description: 'Spacious and durable laptop backpack with multiple compartments, USB charging port, and anti-theft design. Perfect for work and travel.',
    features: ['Fits 15.6" Laptop', 'USB Charging Port', 'Anti-theft Pocket', 'Water Resistant', 'Ergonomic Design'],
    inStock: true,
    sold: 2340
  },
  { 
    id: 4, 
    name: 'Running Shoes', 
    price: 5999, 
    originalPrice: 9999, 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400'
    ],
    category: 'Fashion', 
    rating: 4.6, 
    reviews: 445, 
    discount: 40,
    description: 'Lightweight running shoes with superior cushioning and breathable mesh upper. Engineered for comfort and performance during your runs.',
    features: ['Breathable Mesh', 'Cushioned Sole', 'Lightweight Design', 'Anti-slip Grip', 'Available in Multiple Colors'],
    inStock: true,
    sold: 3450
  },
  { 
    id: 5, 
    name: 'Bluetooth Speaker', 
    price: 3499, 
    originalPrice: 5499, 
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', 
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      'https://images.unsplash.com/photo-1608156639585-b3a9d1cd58dc?w=400'
    ],
    category: 'Electronics', 
    rating: 4.4, 
    reviews: 289, 
    discount: 36,
    description: 'Portable Bluetooth speaker with 360° sound, deep bass, and 12-hour playtime. Take your music anywhere with this compact powerhouse.',
    features: ['360° Sound', '12-hour Battery', 'IPX6 Waterproof', 'Deep Bass', 'Portable Design'],
    inStock: true,
    sold: 1560
  },
  { 
    id: 6, 
    name: 'Sunglasses UV400', 
    price: 1999, 
    originalPrice: 3499, 
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', 
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400'
    ],
    category: 'Fashion', 
    rating: 4.2, 
    reviews: 167, 
    discount: 43,
    description: 'Stylish polarized sunglasses with UV400 protection. Perfect blend of fashion and function to protect your eyes in style.',
    features: ['UV400 Protection', 'Polarized Lenses', 'Lightweight Frame', 'Scratch Resistant', 'Multiple Styles'],
    inStock: true,
    sold: 890
  },
  { 
    id: 7, 
    name: 'Mechanical Keyboard', 
    price: 8999, 
    originalPrice: 12999, 
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400', 
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'
    ],
    category: 'Electronics', 
    rating: 4.7, 
    reviews: 389, 
    discount: 31,
    description: 'RGB mechanical gaming keyboard with customizable keys, anti-ghosting, and tactile switches. Elevate your gaming and typing experience.',
    features: ['RGB Backlight', 'Anti-ghosting', 'Mechanical Switches', 'Programmable Keys', 'Durable Build'],
    inStock: true,
    sold: 670
  },
  { 
    id: 8, 
    name: 'Yoga Mat Premium', 
    price: 1499, 
    originalPrice: 2499, 
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400'
    ],
    category: 'Sports', 
    rating: 4.5, 
    reviews: 201, 
    discount: 40,
    description: 'Extra thick premium yoga mat with non-slip surface and carrying strap. Perfect for yoga, pilates, and floor exercises.',
    features: ['Extra Thick (6mm)', 'Non-slip Surface', 'Eco-friendly Material', 'Easy to Clean', 'Includes Carrying Strap'],
    inStock: true,
    sold: 1120
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Sports', 'Home & Living'];

export default function TestPage() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="bg-orange-500 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex gap-6">
              <span className="flex items-center gap-1"><Truck size={16} /> Free Shipping Over Rs. 5000</span>
              <span className="flex items-center gap-1"><Shield size={16} /> 100% Secure Payment</span>
            </div>
            <div>Save More on App</div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <h1 className="text-3xl font-bold text-orange-500">ShopZone</h1>
              
              <div className="hidden lg:flex relative flex-1 max-w-2xl">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-orange-500 rounded-l-md focus:outline-none"
                />
                <button className="bg-orange-500 text-white px-6 py-2 rounded-r-md hover:bg-orange-600">
                  <Search size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 hover:text-orange-500">
                <User size={24} />
                <span>Account</span>
              </button>
              
              <button 
                onClick={() => setShowCart(true)}
                className="relative flex items-center gap-2 hover:text-orange-500"
              >
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
                <span className="hidden md:inline">Cart</span>
              </button>

              <button className="lg:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <Menu size={24} />
              </button>
            </div>
          </div>

          <div className="lg:hidden mt-4">
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-2 border-orange-500 rounded-l-md focus:outline-none"
              />
              <button className="bg-orange-500 text-white px-6 py-2 rounded-r-md">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="border-t">
          <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-4">Flash Sale!</h2>
            <p className="text-2xl mb-6">Up to 70% OFF on selected items</p>
            <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
              Shop Now <ChevronRight className="inline" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                  -{product.discount}%
                </div>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <Heart 
                    size={20} 
                    className={wishlist.find(item => item.id === product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                  />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-orange-500">Rs. {product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                </div>
                
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-orange-500 text-white py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="w-full mt-2 border-2 border-orange-500 text-orange-500 py-2 rounded-md font-medium hover:bg-orange-50 transition-colors"
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <Truck size={32} className="text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Free Delivery</h3>
                <p className="text-gray-600">For orders over Rs. 5000</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <Shield size={32} className="text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Secure Payment</h3>
                <p className="text-gray-600">100% secure transactions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <CreditCard size={32} className="text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Easy Returns</h3>
                <p className="text-gray-600">7 days return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Overview Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div 
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
              <button onClick={() => setSelectedProduct(null)} className="hover:bg-gray-100 p-2 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Images */}
                <div>
                  <div className="mb-4">
                    <img 
                      src={selectedProduct.images[selectedImage]} 
                      alt={selectedProduct.name}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                          selectedImage === idx ? 'border-orange-500' : 'border-gray-200'
                        }`}
                      >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Column - Details */}
                <div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={18} 
                            className={i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{selectedProduct.rating}</span>
                      <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-600">{selectedProduct.sold.toLocaleString()} sold</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl font-bold text-orange-500">
                        Rs. {selectedProduct.price.toLocaleString()}
                      </span>
                      <span className="text-xl text-gray-400 line-through">
                        Rs. {selectedProduct.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                        -{selectedProduct.discount}%
                      </span>
                    </div>
                    <p className="text-green-600 font-medium">
                      {selectedProduct.inStock ? '✓ In Stock' : 'Out of Stock'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-orange-500 text-white py-3 rounded-md font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => toggleWishlist(selectedProduct)}
                      className="px-6 border-2 border-orange-500 rounded-md hover:bg-orange-50 transition-colors"
                    >
                      <Heart 
                        size={24}
                        className={wishlist.find(item => item.id === selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-orange-500'}
                      />
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t">
                    <div className="text-center">
                      <Truck className="mx-auto mb-2 text-orange-500" size={32} />
                      <p className="text-sm font-medium">Free Delivery</p>
                      <p className="text-xs text-gray-500">Orders over Rs. 5000</p>
                    </div>
                    <div className="text-center">
                      <Shield className="mx-auto mb-2 text-orange-500" size={32} />
                      <p className="text-sm font-medium">Warranty</p>
                      <p className="text-xs text-gray-500">1 Year</p>
                    </div>
                    <div className="text-center">
                      <CreditCard className="mx-auto mb-2 text-orange-500" size={32} />
                      <p className="text-sm font-medium">Easy Returns</p>
                      <p className="text-xs text-gray-500">7 Days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Product Information */}
              <div className="mt-8 border-t pt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Product Specifications</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium">{selectedProduct.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Availability</span>
                        <span className="font-medium text-green-600">In Stock</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">2-3 Business Days</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-500">
                          A
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">Ahmed K.</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">Great product! Exactly as described. Highly recommend.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-500">
                          S
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">Sarah M.</span>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                              ))}
                              <Star size={14} className="text-gray-300" />
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">Good quality, fast delivery. Worth the price.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Shopping Cart ({cartItemsCount})</h2>
              <button onClick={() => setShowCart(false)} className="hover:bg-gray-100 p-2 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-orange-500 font-bold">Rs. {item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-4">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-orange-500">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-3 rounded-md font-bold hover:bg-orange-600 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-4">ShopZone</h3>
              <p className="text-gray-400">Your one-stop shop for everything you need.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Track Order</li>
                <li>Returns</li>
                <li>Shipping Info</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">About Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Our Story</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShopZone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
// import axios from "axios";
// import { useEffect, useMemo, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";

// import Loader from "../components/loder";
// import ImageSlider from "../components/imageSlider";
// import StarRating from "../components/StarRating";
// import { CgChevronRight } from "react-icons/cg";
// import { addToCart } from "../utils/cart";
// import SimilarProductCard from "../components/smillerProduct";

// export default function ProductOverview() {
//   const navigate = useNavigate();
//   const { productID } = useParams();
//   const API = import.meta.env.VITE_BACKEND_URL;

//   // main states
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [votedReviews, setVotedReviews] = useState({});
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [status, setStatus] = useState("loading");

//   // quantity
//   const [quantity, setQuantity] = useState(1);

//   // ref for similar products scroll
//   const similarRef = useRef(null);

//   /* ================= FETCH PRODUCT ================= */
//   useEffect(() => {
//     if (status !== "loading") return;

//     axios
//       .get(`${API}/products/${productID}`)
//       .then((res) => {
//         setProduct(res.data);
//         setStatus("success");
//       })
//       .catch(() => {
//         toast.error("Product Not Found");
//         setStatus("error");
//       });
//   }, [API, productID, status]);

//   /* ================= FETCH REVIEWS ================= */
//   useEffect(() => {
//     if (!productID) return;

//     axios
//       .get(`${API}/reviews/${productID}`)
//       .then((res) => {
//         const list = res.data?.reviews || res.data || [];
//         setReviews(list);

//         if (list.length === 0) {
//           setAverageRating(0);
//           return;
//         }

//         const avg =
//           list.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
//           list.length;

//         setAverageRating(Number(avg.toFixed(1)));
//       })
//       .catch(() => setReviews([]));
//   }, [API, productID]);

//   /* ================= FETCH SIMILAR PRODUCTS ================= */
//   useEffect(() => {
//     if (!product) return;

//     axios
//       .get(`${API}/products`)
//       .then((res) => {
//         const all = res.data || [];
//         const filtered = all.filter(
//           (p) =>
//             p.category === product.category &&
//             p.productID !== product.productID
//         );
//         setSimilarProducts(filtered.slice(0, 8));
//       })
//       .catch(() => setSimilarProducts([]));
//   }, [API, product]);

//   /* ================= HISTOGRAM ================= */
//   const histogram = useMemo(() => {
//     return [1, 2, 3, 4, 5].map(
//       (s) => reviews.filter((r) => Number(r.rating) === s).length
//     );
//   }, [reviews]);

//   /* ================= REVIEW VOTE ================= */
//   const handleVote = (reviewId, type) => {
//     if (votedReviews[reviewId]) return;

//     setReviews((prev) =>
//       prev.map((r) =>
//         r._id === reviewId
//           ? {
//               ...r,
//               votes: {
//                 helpful:
//                   (r.votes?.helpful || 0) + (type === "helpful" ? 1 : 0),
//                 notHelpful:
//                   (r.votes?.notHelpful || 0) + (type === "notHelpful" ? 1 : 0),
//               },
//             }
//           : r
//       )
//     );

//     setVotedReviews((prev) => ({ ...prev, [reviewId]: true }));

//     axios.patch(`${API}/reviews/${reviewId}/vote`, { type }).catch(() => {
//       toast.error("Vote failed");
//     });
//   };

//   /* ================= SCROLL ================= */
//   const scrollLeft = () => {
//     similarRef.current?.scrollBy({ left: -300, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     similarRef.current?.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   return (
//     <>
//       {status === "loading" && <Loader />}

//       {status === "error" && (
//         <h1 className="text-center mt-10 text-2xl text-red-600">
//           Error loading product.
//         </h1>
//       )}

//       {status === "success" && product && (
//         <div className="w-full flex flex-col gap-20 pb-20">

//           {/* ================= PRODUCT TOP ================= */}
//           <div className="w-full flex flex-col lg:flex-row h-[calc(100vh-100px)]">
//             <div className="w-full lg:w-1/2 flex justify-center items-center">
//               <ImageSlider images={product.images || []} />
//             </div>

//             <div className="w-full lg:w-1/2 p-10 flex flex-col gap-6">
//               <h1 className="text-4xl font-semibold">{product.name}</h1>

//               <div className="flex items-center gap-3">
//                 <StarRating rating={averageRating} size={20} />
//                 <span className="text-sm text-secondary/80">
//                   {averageRating} ({reviews.length} reviews)
//                 </span>
//               </div>

//               {product.stock > 0 ? (
//                 <span className="w-fit text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
//                   ● In Stock
//                 </span>
//               ) : (
//                 <span className="w-fit text-sm font-semibold text-red-700 bg-red-100 px-3 py-1 rounded-full">
//                   ● Out of Stock
//                 </span>
//               )}

//               <h3 className="text-lg text-secondary/80 flex items-center gap-1">
//                 <CgChevronRight /> {product.category}
//               </h3>

//               <p className="text-secondary/90 h-32 overflow-hidden">
//                 {product.description}
//               </p>

//               {/* PRICE */}
//               <div>
//                 {product.labelledPrice > product.price && (
//                   <h2 className="line-through text-secondary/70 text-xl">
//                     LKR. {product.labelledPrice.toFixed(2)}
//                   </h2>
//                 )}
//                 <h2 className="text-accent text-3xl font-semibold">
//                   LKR. {product.price.toFixed(2)}
//                 </h2>
//               </div>

//               {/* QUANTITY */}
//               <div className="flex items-center gap-4">
//                 <span className="font-semibold">Quantity</span>

//                 <div className="flex items-center border rounded">
//                   <button
//                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                     disabled={quantity === 1}
//                     className="px-3 py-1 disabled:text-gray-400"
//                   >
//                     −
//                   </button>

//                   <span className="px-4 py-1 border-x font-semibold">
//                     {quantity}
//                   </span>

//                   <button
//                     onClick={() =>
//                       setQuantity((q) =>
//                         Math.min(product.stock, q + 1)
//                       )
//                     }
//                     disabled={quantity >= product.stock}
//                     className="px-3 py-1 disabled:text-gray-400"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="flex gap-4">
//                 <button
//                   disabled={product.stock <= 0}
//                   onClick={() => addToCart(product, quantity)}
//                   className="bg-accent text-white px-6 py-3 rounded font-semibold"
//                 >
//                   Add to Cart
//                 </button>

//                 <button
//                   disabled={product.stock <= 0}
//                   onClick={() =>
//                     navigate("/checkout", {
//                       state: [
//                         {
//                           productID: product.productID,
//                           name: product.name,
//                           price: product.price,
//                           image: product.images?.[0],
//                           quantity,
//                         },
//                       ],
//                     })
//                   }
//                   className="border-2 border-accent text-accent px-6 py-3 rounded font-semibold"
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ================= SIMILAR PRODUCTS ================= */}
//           {similarProducts.length > 0 && (
//             <div className="max-w-6xl mx-auto w-full px-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-semibold">Similar Products</h2>

//                 <div className="flex gap-2">
//                   <button onClick={scrollLeft} className="border px-2 rounded">
//                     ◀
//                   </button>
//                   <button onClick={scrollRight} className="border px-2 rounded">
//                     ▶
//                   </button>
//                 </div>
//               </div>

//               <div
//                 ref={similarRef}
//                 className="flex gap-4 overflow-x-auto pb-4"
//               >
//                 {similarProducts.map((p) => (
//                   <SimilarProductCard
//                     key={p.productID || p._id}
//                     product={p}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// }
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/loder";
import ImageSlider from "../components/imageSlider";
import StarRating from "../components/StarRating";
import { CgChevronRight } from "react-icons/cg";
import { addToCart } from "../utils/cart";
import SimilarProductCard from "../components/smillerProduct";

export default function ProductOverview() {
  const navigate = useNavigate();
  const { productID } = useParams();
  const API = import.meta.env.VITE_BACKEND_URL;

  // main states
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [votedReviews, setVotedReviews] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  // quantity
  const [quantity, setQuantity] = useState(1);

  // review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    name: "",
    title: "",
    content: ""
  });
  const [reviewLoading, setReviewLoading] = useState(false);

  // ref for similar products scroll
  const similarRef = useRef(null);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (status !== "loading") return;

    axios
      .get(`${API}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Product Not Found");
        setStatus("error");
      });
  }, [API, productID, status]);

  /* ================= FETCH REVIEWS ================= */
  useEffect(() => {
    if (!productID) return;

    axios
      .get(`${API}/reviews/${productID}`)
      .then((res) => {
        const list = res.data?.reviews || res.data || [];
        setReviews(list);

        if (list.length === 0) {
          setAverageRating(0);
          return;
        }

        const avg =
          list.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
          list.length;

        setAverageRating(Number(avg.toFixed(1)));
      })
      .catch(() => setReviews([]));
  }, [API, productID]);

  /* ================= FETCH SIMILAR PRODUCTS ================= */
  useEffect(() => {
    if (!product) return;

    axios
      .get(`${API}/products`)
      .then((res) => {
        const all = res.data || [];
        const filtered = all.filter(
          (p) =>
            p.category === product.category &&
            p.productID !== product.productID
        );
        setSimilarProducts(filtered.slice(0, 8));
      })
      .catch(() => setSimilarProducts([]));
  }, [API, product]);

  /* ================= HISTOGRAM ================= */
  const histogram = useMemo(() => {
    return [1, 2, 3, 4, 5].map(
      (s) => reviews.filter((r) => Number(r.rating) === s).length
    );
  }, [reviews]);

  /* ================= REVIEW VOTE ================= */
  const handleVote = (reviewId, type) => {
    if (votedReviews[reviewId]) return;

    setReviews((prev) =>
      prev.map((r) =>
        r._id === reviewId
          ? {
              ...r,
              votes: {
                helpful:
                  (r.votes?.helpful || 0) + (type === "helpful" ? 1 : 0),
                notHelpful:
                  (r.votes?.notHelpful || 0) + (type === "notHelpful" ? 1 : 0),
              },
            }
          : r
      )
    );

    setVotedReviews((prev) => ({ ...prev, [reviewId]: true }));

    axios.patch(`${API}/reviews/${reviewId}/vote`, { type }).catch(() => {
      toast.error("Vote failed");
    });
  };

  /* ================= SCROLL ================= */
  const scrollLeft = () => {
    similarRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    similarRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  /* ================= SUBMIT REVIEW ================= */
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!reviewForm.name || !reviewForm.title || !reviewForm.content) {
      toast.error("Please fill all fields");
      return;
    }

    setReviewLoading(true);

    try {
      await axios.post(`${API}/reviews/add`, {
        productId: productID,
        name: reviewForm.name,
        title: reviewForm.title,
        rating: Number(reviewForm.rating),
        content: reviewForm.content,
        verified: false,
      });

      toast.success("Review submitted successfully!");
      
      // Refresh reviews
      const res = await axios.get(`${API}/reviews/${productID}`);
      const list = res.data?.reviews || res.data || [];
      setReviews(list);
      
      // Recalculate average
      if (list.length > 0) {
        const avg = list.reduce((sum, r) => sum + Number(r.rating || 0), 0) / list.length;
        setAverageRating(Number(avg.toFixed(1)));
      }
      
      // Reset form
      setReviewForm({ rating: 5, name: "", title: "", content: "" });
      setShowReviewForm(false);
    } catch (error) {
      toast.error("Failed to submit review");
      console.error(error);
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {status === "loading" && <Loader />}

      {status === "error" && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="text-6xl">😕</div>
            <h1 className="text-3xl font-bold text-secondary">Product Not Found</h1>
            <p className="text-secondary/60">The product you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {status === "success" && product && (
        <div className="w-full">

          {/* ================= PRODUCT TOP ================= */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* Image Section */}
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-secondary/5">
                  <ImageSlider images={product.images || []} />
                </div>
              </div>

              {/* Product Details Section */}
              <div className="space-y-6">
                
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-secondary/60">
                  <span className="hover:text-accent cursor-pointer transition-colors">Home</span>
                  <CgChevronRight className="text-xs" />
                  <span className="hover:text-accent cursor-pointer transition-colors">{product.category}</span>
                  <CgChevronRight className="text-xs" />
                  <span className="text-secondary/90">{product.name}</span>
                </div>

                {/* Product Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-secondary leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-4 pb-4 border-b border-secondary/10">
                  <div className="flex items-center gap-2">
                    <StarRating rating={averageRating} size={22} />
                    <span className="text-lg font-semibold text-secondary">
                      {averageRating}
                    </span>
                  </div>
                  <span className="text-secondary/60">
                    ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>

                {/* Stock Status */}
                <div>
                  {product.stock > 0 ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-green-700">
                        In Stock ({product.stock} available)
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full border border-red-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-red-700">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="bg-primary rounded-xl p-6 border border-secondary/10 shadow-sm">
                  <h3 className="text-sm font-semibold text-secondary/60 uppercase tracking-wider mb-3">
                    Description
                  </h3>
                  <p className="text-secondary/80 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price Section */}
                <div className="bg-linear-to-br from-accent/5 to-accent/10 rounded-xl p-6 border border-accent/20">
                  {product.labelledPrice > product.price && (
                    <div className="flex items-center gap-3 mb-2">
                      <span className="line-through text-secondary/50 text-xl">
                        LKR {product.labelledPrice.toFixed(2)}
                      </span>
                      <span className="px-3 py-1 bg-gold/20 text-gold font-bold text-sm rounded-full">
                        SAVE {Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)}%
                      </span>
                    </div>
                  )}
                  <div className="text-4xl font-bold text-accent">
                    LKR {product.price.toFixed(2)}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="bg-primary rounded-xl p-6 border border-secondary/10 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-secondary">Quantity</span>
                    
                    <div className="flex items-center bg-white border-2 border-secondary/10 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity === 1}
                        className="px-5 py-3 text-xl font-bold hover:bg-secondary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
                      >
                        −
                      </button>

                      <span className="px-8 py-3 text-xl font-bold text-secondary min-w-[60px] text-center">
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          setQuantity((q) =>
                            Math.min(product.stock, q + 1)
                          )
                        }
                        disabled={quantity >= product.stock}
                        className="px-5 py-3 text-xl font-bold hover:bg-secondary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    disabled={product.stock <= 0}
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
                  >
                    Add to Cart
                  </button>

                  <button
                    disabled={product.stock <= 0}
                    onClick={() =>
                      navigate("/checkout", {
                        state: [
                          {
                            productID: product.productID,
                            name: product.name,
                            price: product.price,
                            image: product.images?.[0],
                            quantity,
                          },
                        ],
                      })
                    }
                    className="flex-1 bg-primary border-2 border-accent text-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center p-4 bg-primary rounded-lg border border-secondary/10">
                    <div className="text-2xl mb-2">🚚</div>
                    <div className="text-xs font-semibold text-secondary/80">Free Shipping</div>
                  </div>
                  <div className="text-center p-4 bg-primary rounded-lg border border-secondary/10">
                    <div className="text-2xl mb-2">↩️</div>
                    <div className="text-xs font-semibold text-secondary/80">Easy Returns</div>
                  </div>
                  <div className="text-center p-4 bg-primary rounded-lg border border-secondary/10">
                    <div className="text-2xl mb-2">🔒</div>
                    <div className="text-xs font-semibold text-secondary/80">Secure Payment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= REVIEWS & RATINGS ================= */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden">
              
              {/* Reviews Header */}
              <div className="bg-linear-to-r from-accent/5 to-accent/10 px-8 py-6 border-b border-secondary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-secondary mb-2">Customer Reviews</h2>
                    <p className="text-secondary/60">See what others are saying about this product</p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
                  >
                    <span className="text-xl">✍️</span>
                    Write a Review
                  </button>
                </div>
              </div>

              <div className="p-8">
                {/* Review Form */}
                {showReviewForm && (
                  <div className="mb-8 bg-linear-to-br from-accent/5 to-accent/10 rounded-2xl p-8 border-2 border-accent/20">
                    <h3 className="text-2xl font-bold text-secondary mb-6">Share Your Experience</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-6">
                      
                      {/* Your Name */}
                      <div>
                        <label className="block text-sm font-semibold text-secondary mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={reviewForm.name}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your name"
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-secondary/10 focus:border-accent focus:outline-none transition-all duration-200 bg-white"
                        />
                      </div>

                      {/* Review Title */}
                      <div>
                        <label className="block text-sm font-semibold text-secondary mb-2">
                          Review Title *
                        </label>
                        <input
                          type="text"
                          value={reviewForm.title}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Sum up your experience in one line"
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-secondary/10 focus:border-accent focus:outline-none transition-all duration-200 bg-white"
                        />
                      </div>

                      {/* Rating Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-secondary mb-3">
                          Your Rating *
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                              className="text-4xl transition-all duration-200 hover:scale-110 active:scale-95"
                            >
                              {star <= reviewForm.rating ? '⭐' : '☆'}
                            </button>
                          ))}
                          <span className="ml-3 text-2xl font-bold text-accent self-center">
                            {reviewForm.rating}.0
                          </span>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div>
                        <label className="block text-sm font-semibold text-secondary mb-2">
                          Your Review *
                        </label>
                        <textarea
                          value={reviewForm.content}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="Tell us about your experience with this product..."
                          rows="5"
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-secondary/10 focus:border-accent focus:outline-none transition-all duration-200 resize-none bg-white"
                        />
                      </div>

                      {/* Submit Buttons */}
                      <div className="flex gap-4">
                        <button
                          type="submit"
                          disabled={reviewLoading}
                          className="flex-1 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {reviewLoading ? "Submitting..." : "Submit Review"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowReviewForm(false);
                            setReviewForm({ rating: 5, name: "", title: "", content: "" });
                          }}
                          className="px-6 py-3 bg-white border-2 border-secondary/20 text-secondary rounded-xl font-semibold hover:bg-secondary/5 transition-all duration-300 active:scale-95"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {reviews.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Rating Summary */}
                    <div className="lg:col-span-1 space-y-6">
                      <div className="bg-linear-to-br from-accent/5 to-accent/10 rounded-xl p-6 text-center border border-accent/20">
                        <div className="text-6xl font-bold text-accent mb-2">
                          {averageRating}
                        </div>
                        <StarRating rating={averageRating} size={24} />
                        <p className="text-secondary/60 mt-3">
                          Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                        </p>
                      </div>

                      {/* Rating Histogram */}
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = histogram[star - 1] || 0;
                          const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                          
                          return (
                            <div key={star} className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-secondary w-12">
                                {star} star
                              </span>
                              <div className="flex-1 bg-secondary/10 rounded-full h-3 overflow-hidden">
                                <div 
                                  className="bg-gold h-full rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-secondary/60 w-12 text-right">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="lg:col-span-2 space-y-6 max-h-[800px] overflow-y-auto pr-4">
                      {reviews.map((r) => (
                        <div 
                          key={r._id} 
                          className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 border border-secondary/5"
                        >
                          {/* Review Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                                  {(r.userName || r.name || 'Anonymous')[0].toUpperCase()}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-secondary">
                                    {r.userName || r.name || 'Anonymous'}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <StarRating rating={Number(r.rating)} size={16} />
                                    {r.createdAt && (
                                      <span className="text-xs text-secondary/60">
                                        {new Date(r.createdAt).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric'
                                        })}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {r.verified && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                                ✓ Verified Purchase
                              </span>
                            )}
                          </div>

                          {/* Review Title */}
                          {r.title && (
                            <h5 className="font-semibold text-secondary mb-2">
                              {r.title}
                            </h5>
                          )}

                          {/* Review Content */}
                          <p className="text-secondary/80 leading-relaxed mb-4">
                            {r.comment ?? r.review ?? r.text ?? "No review text"}
                          </p>

                          {/* Review Images */}
                          {r.images && r.images.length > 0 && (
                            <div className="flex gap-2 mb-4">
                              {r.images.slice(0, 4).map((img, idx) => (
                                <img 
                                  key={idx}
                                  src={img} 
                                  alt={`Review image ${idx + 1}`}
                                  className="w-20 h-20 object-cover rounded-lg border border-secondary/10 hover:scale-105 transition-transform duration-200 cursor-pointer"
                                />
                              ))}
                            </div>
                          )}

                          {/* Helpful Votes */}
                          <div className="flex items-center gap-4 pt-4 border-t border-secondary/10">
                            <span className="text-sm text-secondary/60">Was this helpful?</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleVote(r._id, 'helpful')}
                                disabled={votedReviews[r._id]}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  votedReviews[r._id]
                                    ? 'bg-secondary/10 text-secondary/50 cursor-not-allowed'
                                    : 'bg-primary border border-secondary/20 text-secondary hover:bg-green-50 hover:border-green-300 active:scale-95'
                                }`}
                              >
                                👍 Helpful ({r.votes?.helpful || 0})
                              </button>
                              <button
                                onClick={() => handleVote(r._id, 'notHelpful')}
                                disabled={votedReviews[r._id]}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  votedReviews[r._id]
                                    ? 'bg-secondary/10 text-secondary/50 cursor-not-allowed'
                                    : 'bg-primary border border-secondary/20 text-secondary hover:bg-red-50 hover:border-red-300 active:scale-95'
                                }`}
                              >
                                👎 Not Helpful ({r.votes?.notHelpful || 0})
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">No Reviews Yet</h3>
                    <p className="text-secondary/60">Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= SIMILAR PRODUCTS ================= */}
          {similarProducts.length > 0 && (
            <div className="bg-primary py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-secondary">Similar Products</h2>
                    <p className="text-secondary/60 mt-1">You might also like these</p>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={scrollLeft} 
                      className="w-12 h-12 flex items-center justify-center border-2 border-secondary/10 rounded-full hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 active:scale-95 bg-white"
                    >
                      ◀
                    </button>
                    <button 
                      onClick={scrollRight} 
                      className="w-12 h-12 flex items-center justify-center border-2 border-secondary/10 rounded-full hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 active:scale-95 bg-white"
                    >
                      ▶
                    </button>
                  </div>
                </div>

                <div
                  ref={similarRef}
                  className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {similarProducts.map((p) => (
                    <SimilarProductCard
                      key={p.productID || p._id}
                      product={p}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
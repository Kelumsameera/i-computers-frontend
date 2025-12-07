import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loder";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart } from "../utils/cart";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

// StarRating Component with half-star support
function StarRating({ rating, size = 20 }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} style={{ fontSize: size, color: '#e29816' }}>★</span>
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} style={{ fontSize: size, position: 'relative', display: 'inline-block' }}>
          <span style={{ color: '#E0E0E0' }}>★</span>
          <span style={{ color: '#e29816', position: 'absolute', left: 0, overflow: 'hidden', width: '50%' }}>★</span>
        </span>
      );
    } else {
      stars.push(
        <span key={i} style={{ fontSize: size, color: '#E0E0E0' }}>★</span>
      );
    }
  }
  
  return <div className="flex">{stars}</div>;
}

export default function ProductOverview() {
  const navigate = useNavigate();
  const { productID } = useParams();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Sorting + pagination
  const [sortBy, setSortBy] = useState("newest"); // newest | highest | lowest
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);

  // FIXED: Use in-memory state instead of localStorage
  const [votedReviews, setVotedReviews] = useState({});

  // fetch product
  useEffect(() => {
    setStatus("loading");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Product Not Found");
        setStatus("error");
      });
  }, [productID]);

  // fetch reviews
  useEffect(() => {
    if (!productID) return;
    setLoadingReviews(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/reviews/${productID}`)
      .then((res) => {
        // backend returns { success: true, reviews: [...] }
        const dataReviews = res.data.reviews || res.data || [];
        setReviews(dataReviews);
        setLoadingReviews(false);
      })
      .catch(() => {
        toast.error("Unable to load reviews");
        setLoadingReviews(false);
      });
  }, [productID]);

  // compute average rating and histogram
  const { averageRating, histogram } = useMemo(() => {
    const hist = [0, 0, 0, 0, 0]; // index 0 -> 1 star, index 4 -> 5 star
    if (!reviews || reviews.length === 0) return { averageRating: 0, histogram: hist };
    let sum = 0;
    reviews.forEach((r) => {
      const rt = Number(r.rating) || 0;
      sum += rt;
      const idx = Math.max(0, Math.min(4, Math.round(rt) - 1));
      hist[idx] = (hist[idx] || 0) + 1;
    });
    const avg = sum / reviews.length;
    return { averageRating: Number(avg.toFixed(1)), histogram: hist };
  }, [reviews]);

  // sorted reviews based on sortBy
  const sortedReviews = useMemo(() => {
    const copy = [...reviews];
    if (sortBy === "newest") {
      copy.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
    } else if (sortBy === "highest") {
      copy.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "lowest") {
      copy.sort((a, b) => a.rating - b.rating);
    }
    return copy;
  }, [reviews, sortBy]);

  // pagination slice
  const paginated = useMemo(() => {
    const start = 0;
    const end = page * PAGE_SIZE;
    return sortedReviews.slice(start, end);
  }, [sortedReviews, page]);

  // UI helpers: vote handler (optimistic)
  const handleVote = async (reviewId, type) => {
    // prevent double vote in same session
    if (votedReviews[reviewId]) {
      toast("You've already voted on this review.", { icon: "ℹ️" });
      return;
    }

    // optimistic update
    setReviews((prev) =>
      prev.map((r) => {
        if (r._id !== reviewId) return r;
        return {
          ...r,
          helpful: type === "helpful" ? (r.helpful || 0) + 1 : r.helpful,
          notHelpful: type === "notHelpful" ? (r.notHelpful || 0) + 1 : r.notHelpful,
        };
      })
    );

    const newVoted = { ...votedReviews, [reviewId]: type };
    setVotedReviews(newVoted);

    try {
      // call backend endpoint - implement on server: PATCH /reviews/:id/vote { type: "helpful"|"notHelpful" }
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/reviews/${reviewId}/vote`, {
        type,
      });
    } catch (err) {
      // revert optimistic update on error
      toast.error("Failed to register vote. It will be reverted.");
      setReviews((prev) =>
        prev.map((r) => {
          if (r._id !== reviewId) return r;
          return {
            ...r,
            helpful: type === "helpful" ? Math.max(0, (r.helpful || 1) - 1) : r.helpful,
            notHelpful: type === "notHelpful" ? Math.max(0, (r.notHelpful || 1) - 1) : r.notHelpful,
          };
        })
      );
      // Remove from voted reviews
      const revertedVoted = { ...newVoted };
      delete revertedVoted[reviewId];
      setVotedReviews(revertedVoted);
    }
  };

  // load more
  const loadMore = () => setPage((p) => p + 1);

  // LOADING / ERROR states
  if (status === "loading") return <Loader />;
  if (status === "error")
    return <h1 className="text-center mt-10 text-2xl">Error loading product.</h1>;

  return (
    <div className="w-full bg-linear-to-b from-primary/20 to-white">
      {/* PRODUCT TOP */}
      <div className="w-full min-h-[calc(100vh-100px)] flex flex-col lg:flex-row bg-white">
        <h1 className="text-4xl font-semibold lg:hidden text-center sticky top-0 bg-white py-2 z-10 text-secondary">
          {product.name}
        </h1>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <ImageSlider images={product.images} />
        </div>

        <div className="w-full lg:w-1/2 p-4 flex flex-col gap-6">
          <h1 className="text-4xl font-semibold hidden lg:block text-secondary">{product.name}</h1>
          <h2 className="text-lg text-secondary/80">{product.productID}</h2>

          {/* average rating with half-star support */}
          <div className="flex items-center gap-3">
            <StarRating rating={averageRating} size={22} />
            <div className="text-secondary/70 text-sm">
              {averageRating > 0 ? `${averageRating} / 5 · ${reviews.length} reviews` : "No ratings yet"}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-accent/50 via-accent/50 to-accent"></div>

          <h3 className="text-lg text-secondary/80 flex items-center"><CgChevronRight /> {product.category}</h3>

          {product.altNames?.length > 0 && <h3 className="text-md text-secondary/80">{product.altNames.join(" | ")}</h3>}
          <p className="text-md text-secondary/90 text-justify max-h-32 overflow-y-auto">{product.description}</p>

          {/* Divider */}
          <div className="h-px bg-accent/50 via-accent/50 to-accent"></div>
          <div className="flex flex-col">
            {product.labelledPrice > product.price && <h2 className="text-secondary/80 line-through decoration-gold/70 text-xl">LKR. {product.labelledPrice.toFixed(2)}</h2>}
            <h2 className="text-accent font-semibold text-3xl">LKR. {product.price.toFixed(2)}</h2>
          </div>

          <div className="flex flex-row gap-4 mt-4">
            <button onClick={() => addToCart(product, 1)} className="bg-accent text-white px-6 py-3 rounded hover:bg-accent/90 transition">Add to Cart</button>
            <button onClick={() => navigate("/checkout", { state: [{ productID: product.productID, name: product.name, price: product.price, labelledPrice: product.labelledPrice, image: product.images[0], quantity: 1 }] })} className="border-2 border-accent text-accent px-6 py-3 rounded hover:bg-accent hover:text-white transition">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center my-12"></div>
        <div className="flex-1 h-px bg-accent/50 mb-10 mx-10 via-accent/50 to-accent"></div>
      {/* REVIEWS SECTION */}
      <div className="w-full px-4 lg:px-20 pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-8">Customer Reviews</h2>

            {/* Histogram */}
            <div className="w-72 mb-8">
              {[5,4,3,2,1].map((star) => {
                const count = histogram[star - 1] || 0;
                const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-3 text-sm mb-1">
                    <div className="w-12 text-secondary/80">{star}★</div>
                    <div className="flex-1 bg-secondary/10 rounded h-3 overflow-hidden">
                      <div style={{ width: `${pct}%`, backgroundColor: '#e29816' }} className="h-3 transition-all duration-300"></div>
                    </div>
                    <div className="w-10 text-right text-secondary/70">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls: Sort + Write review */}
          <div className="flex items-center gap-3">
            <select 
              value={sortBy} 
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }} 
              className="border border-secondary/20 px-3 py-2 rounded focus:outline-none focus:border-accent transition-colors"
            >
              <option value="newest">Newest</option>
              <option value="highest">Highest rating</option>
              <option value="lowest">Lowest rating</option>
            </select>

            <button 
              onClick={() => navigate("/write-review", { state: { productId: product.productID } })} 
              className="bg-accent text-white px-5 py-2 rounded-xl hover:bg-accent/90 transition-all hover:shadow-lg"
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Simple Divider before reviews list */}
        <div className="h-px bg-secondary/10 mb-6"></div>

        {/* REVIEW LIST */}
        <div className="mt-4 space-y-4">
          {loadingReviews && <p className="text-secondary/70 text-center py-8">Loading reviews...</p>}
          {!loadingReviews && paginated.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary/70 text-lg">No reviews yet.</p>
              <p className="text-secondary/50 text-sm mt-2">Be the first to review this product!</p>
            </div>
          )}

          {paginated.map((review, index) => (
            <div key={review._id}>
              <div className="p-5 border border-secondary/10 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <StarRating rating={review.rating} size={18} />
                    <h3 className="font-semibold text-secondary mt-2 text-lg">{review.title}</h3>
                    <p className="text-secondary/90 mt-2 leading-relaxed">{review.content}</p>
                    <p className="text-sm text-secondary/70 mt-3">
                      By <span className="font-semibold text-secondary">{review.name}</span> • {new Date(review.date || review.createdAt).toLocaleDateString()}
                    </p>
                    {review.verified && <p className="text-green-600 text-sm font-semibold mt-2">✔ Verified Buyer</p>}
                  </div>

                  {/* Helpful / Not helpful */}
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <button
                      onClick={() => handleVote(review._id, "helpful")}
                      className={`px-3 py-1 rounded whitespace-nowrap transition-all ${
                        votedReviews[review._id] 
                          ? "bg-gray-200 text-gray-600 cursor-not-allowed" 
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      } border border-green-200`}
                      title="Helpful"
                      disabled={votedReviews[review._id]}
                    >
                      <ThumbsUpIcon /> {review.helpful || 0}
                    </button>

                    <button
                      onClick={() => handleVote(review._id, "notHelpful")}
                      className={`px-3 py-1 rounded whitespace-nowrap transition-all ${
                        votedReviews[review._id] 
                          ? "bg-gray-200 text-gray-600 cursor-not-allowed" 
                          : "bg-red-50 text-red-700 hover:bg-red-100"
                      } border border-red-200`}
                      title="Not helpful"
                      disabled={votedReviews[review._id]}
                    >
                      <ThumbsDownIcon/> {review.notHelpful || 0}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Subtle divider between reviews (except last one) */}
              {index < paginated.length - 1 && (
                <div className="h-px bg-linear-to-r from-transparent via-secondary/10 to-transparent my-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        {paginated.length > 0 && paginated.length < sortedReviews.length && (
          <div className="mt-8 text-center">
            <button 
              onClick={loadMore} 
              className="px-6 py-3 border-2 border-secondary/20 rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-secondary font-medium"
            >
              Load more reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
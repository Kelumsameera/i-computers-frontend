import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductReviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const productId = state?.productId;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reviews for this product
  useEffect(() => {
    if (!productId) return;

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/reviews/" + productId)
      .then((res) => {
        setReviews(res.data.reviews || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load reviews");
        setLoading(false);
      });
  }, [productId]);

  if (!productId) {
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        Error: Product ID missing
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customer Reviews</h1>

        <button
          onClick={() =>
            navigate("/write-review", { state: { productId } })
          }
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-900"
        >
          Write a Review
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600">Loading reviews...</p>
      )}

      {/* No Reviews */}
      {!loading && reviews.length === 0 && (
        <p className="text-center text-gray-600">No reviews yet.</p>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 border rounded-xl bg-white shadow"
          >
            {/* Rating */}
            <div>
              <span className="text-yellow-500 text-xl">
                {"⭐".repeat(review.rating)}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold mt-1">
              {review.title}
            </h2>

            {/* Content */}
            <p className="text-gray-700 mt-1">
              {review.content}
            </p>

            {/* Verified */}
            {review.verified && (
              <p className="text-green-600 text-sm font-semibold mt-1">
                ✔ Verified Buyer
              </p>
            )}

            {/* Name + Date */}
            <p className="text-sm text-gray-500 mt-3">
              By <span className="font-semibold">{review.name}</span> •{" "}
              {new Date(review.date || review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 w-full border-2 border-black py-2 rounded-xl font-semibold hover:bg-black hover:text-white transition"
      >
        Back
      </button>

    </div>
  );
}

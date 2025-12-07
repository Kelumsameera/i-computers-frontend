import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// ============================
// ⭐ Star Rating Component
// ============================
function StarRating({ rating = 0, size = 16 }) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(<span key={i} style={{ fontSize: size, color: "#e29816" }}>★</span>);
    } else if (i === full && half) {
      stars.push(
        <span key={i} style={{ position: "relative", display: "inline-block", fontSize: size }}>
          <span style={{ color: "#ccc" }}>★</span>
          <span style={{ color: "#e29816", position: "absolute", left: 0, width: "50%", overflow: "hidden" }}>★</span>
        </span>
      );
    } else {
      stars.push(<span key={i} style={{ fontSize: size, color: "#ccc" }}>★</span>);
    }
  }
  return <div className="flex">{stars}</div>;
}

// ============================
// ⭐ MAIN COMPONENT
// ============================
export default function ProductCard({ product }) {
  // ⭐ NEW: State for rating + review count
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  // ⭐ NEW: Fetch ratings from backend
  useEffect(() => {
    if (!product?.productID) return;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/reviews/${product.productID}`)
      .then((res) => {
        const reviews = res.data.reviews || res.data || [];

        if (reviews.length === 0) {
          setAverageRating(0);
          setReviewCount(0);
          return;
        }

        // Calculate avg rating
        const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
        const avg = sum / reviews.length;

        setAverageRating(Number(avg.toFixed(1)));
        setReviewCount(reviews.length);
      })
      .catch(() => {
        setAverageRating(0);
        setReviewCount(0);
      });
  }, [product?.productID]);

  // 🔒 Safe product fields
  const name = product?.name ?? "Unnamed Product";
  const images = product?.images ?? [];
  const mainImage = images[0] ?? "";
  const secondaryImage = images[1] ?? mainImage;

  const price = Number(product?.price ?? 0);
  const labelledPrice = Number(product?.labelledPrice ?? price);

  const discount =
    labelledPrice > price
      ? Math.round(((labelledPrice - price) / labelledPrice) * 100)
      : 0;

  return (
    <Link
      to={`/overview/${product?.productID}`}
      className="w-full sm:w-[300px] shadow-lg hover:shadow-2xl rounded-lg overflow-hidden bg-white transition"
    >
      {/* IMAGE */}
      <div className="w-full h-[200px] sm:h-[250px] relative">
        <img src={secondaryImage} className="absolute w-full h-full object-cover" />
        <img src={mainImage} className="absolute w-full h-full object-cover primary-image transition-opacity duration-500" />

        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-gold text-white px-2 py-1 rounded-full text-xs font-bold">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-4 flex flex-col gap-3">
        <h1 className="text-center text-lg font-medium line-clamp-2">{name}</h1>

        {/* ⭐ RATING DISPLAY FROM BACKEND */}
        <div className="flex items-center justify-center gap-2">
          <StarRating rating={averageRating} size={16} />
          <span className="text-xs text-gray-500">
            {averageRating > 0 ? `${averageRating} (${reviewCount})` : "No ratings"}
          </span>
        </div>

        {/* PRICE */}
        <div className="text-center">
          {discount > 0 && (
            <p className="line-through text-sm text-gray-500">
              LKR {labelledPrice.toFixed(2)}
            </p>
          )}
          <p className="text-xl font-bold text-accent">LKR {price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}

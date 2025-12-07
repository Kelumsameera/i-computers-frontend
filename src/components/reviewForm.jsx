import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReviewForm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const productId = state?.productId;

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  if (!productId) {
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        Error: Product ID missing
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!name || !title || !content) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/reviews/add", {
        productId,
        name,
        title,
        rating,
        content,
        verified: false,
      });

      toast.success("Review submitted!");

      // Go back to product page after submit
      navigate(`/product/${productId}`, { replace: true });

    } catch (err) {
      toast.error("Failed to submit review");
      console.log(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">

      <h1 className="text-3xl font-bold text-center mb-6">
        Write a Review
      </h1>

      {/* NAME */}
      <div className="mb-4">
        <label className="font-semibold">Your Name *</label>
        <input
          className="w-full border p-2 rounded-xl mt-1"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* REVIEW TITLE */}
      <div className="mb-4">
        <label className="font-semibold">Review Title *</label>
        <input
          className="w-full border p-2 rounded-xl mt-1"
          placeholder="Short headline (e.g. Great product!)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* RATING */}
      <div className="mb-4">
        <label className="font-semibold">Rating *</label>
        <select
          className="w-full border p-2 rounded-xl mt-1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="1">⭐ 1</option>
          <option value="2">⭐⭐ 2</option>
          <option value="3">⭐⭐⭐ 3</option>
          <option value="4">⭐⭐⭐⭐ 4</option>
          <option value="5">⭐⭐⭐⭐⭐ 5</option>
        </select>
      </div>

      {/* CONTENT */}
      <div className="mb-4">
        <label className="font-semibold">Your Review *</label>
        <textarea
          className="w-full border p-2 rounded-xl mt-1 h-32"
          placeholder="Write your full review..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:bg-gray-800 transition"
      >
        Submit Review
      </button>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="w-full mt-3 border-2 border-black py-2 rounded-xl font-semibold hover:bg-black hover:text-white transition"
      >
        Cancel
      </button>
    </div>
  );
}

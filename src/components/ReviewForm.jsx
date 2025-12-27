import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReviewForm() {
  const { productID } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!productID) {
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        Product ID missing
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!name || !title || !content) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/add`,
        {
          productId: productID,
          name,
          title,
          rating: Number(rating),
          content,
          verified: false,
        }
      );

      toast.success("Review submitted successfully");

      navigate(`/overview/${productID}`, { replace: true });
    } catch (err) {
      toast.error("Failed to submit review");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">

      <h1 className="text-3xl font-bold text-center mb-6">
        Write a Review
      </h1>

      {/* NAME */}
      <input
        className="w-full border p-2 rounded-xl mb-3"
        placeholder="Your Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* TITLE */}
      <input
        className="w-full border p-2 rounded-xl mb-3"
        placeholder="Review Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* RATING */}
      <select
        className="w-full border p-2 rounded-xl mb-3"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="5">⭐⭐⭐⭐⭐ 5</option>
        <option value="4">⭐⭐⭐⭐ 4</option>
        <option value="3">⭐⭐⭐ 3</option>
        <option value="2">⭐⭐ 2</option>
        <option value="1">⭐ 1</option>
      </select>

      {/* CONTENT */}
      <textarea
        className="w-full border p-2 rounded-xl h-32 mb-4"
        placeholder="Write your review *"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* SUBMIT */}
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

      {/* CANCEL */}
      <button
        onClick={() => navigate(-1)}
        className="w-full mt-3 border-2 border-black py-2 rounded-xl font-semibold hover:bg-black hover:text-white"
      >
        Cancel
      </button>
    </div>
  );
}

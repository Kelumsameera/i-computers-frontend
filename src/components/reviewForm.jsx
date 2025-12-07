import React from "react";
import { X, Star } from "lucide-react";

const InteractiveStarRating = ({ rating, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        onClick={() => onChange(star)}
        className={`w-8 h-8 cursor-pointer transition ${
          star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"
        }`}
      />
    ))}
  </div>
);

export default function ReviewForm({ formData, setFormData, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit}>
            <div className="space-y-6">

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Overall Rating *
                </label>

                <InteractiveStarRating
                  rating={formData.rating}
                  onChange={(rating) => setFormData({ ...formData, rating })}
                />

                {formData.rating > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.rating === 5 && "Excellent!"}
                    {formData.rating === 4 && "Great!"}
                    {formData.rating === 3 && "Good"}
                    {formData.rating === 2 && "Fair"}
                    {formData.rating === 1 && "Poor"}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Your Name *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Sum up your experience"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Review Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Your Review *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Share your experience..."
                  rows="6"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 resize-none"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Minimum 50 characters ({formData.content.length}/50)
                </p>
              </div>

              {/* Verified Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={formData.verified}
                  onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="verified" className="text-sm text-gray-700">
                  I purchased this product
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={formData.rating === 0 || formData.content.length < 50}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Submit Review
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

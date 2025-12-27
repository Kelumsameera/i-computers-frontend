import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function ProductReviews({
  reviews = [],
  histogram = [0, 0, 0, 0, 0],
  averageRating = 0,
  sortBy,
  setSortBy,
  votedReviews = {},
  handleVote = () => {},
  paginated = [],
  loadMore = () => {},
}) {
  return (
    <div className="bg-white/70 backdrop-blur rounded-3xl shadow-xl p-10 border border-white/30 mt-16">

      <h2 className="text-3xl font-bold text-center mb-10">Customer Reviews</h2>

      {/* ---------- SUMMARY SECTION ---------- */}
      <div className="grid md:grid-cols-3 gap-10 mb-10">

        {/* Average Rating */}
        <div className="flex flex-col items-center">
          <span className="text-6xl font-bold text-yellow-500">
            {averageRating.toFixed(1)}
          </span>

          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((s) =>
              s <= Math.round(averageRating) ? (
                <AiFillStar key={s} className="text-yellow-400" size={28} />
              ) : (
                <AiOutlineStar key={s} className="text-gray-300" size={28} />
              )
            )}
          </div>

          <p className="text-gray-600 mt-2">
            Based on {reviews.length} reviews
          </p>
        </div>

        {/* ---------- HISTOGRAM ---------- */}
        <div className="md:col-span-2 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = histogram[star - 1] || 0;
            const pct =
              reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;

            return (
              <div
                key={star}
                className="flex items-center gap-3 text-sm mb-2"
              >
                <span className="w-10 font-medium">{star}★</span>

                {/* REDUCED WIDTH BAR */}
                <div className="w-40 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 bg-yellow-400 transition-all"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>

                <span className="w-10 text-right text-gray-600">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- SORT BAR ---------- */}
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-bold">All Reviews</h3>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-xl shadow-sm bg-white"
        >
          <option value="newest">Newest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      {/* ---------- REVIEW LIST ---------- */}
      <div className="space-y-6">
        {paginated.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No reviews yet. Be the first to review!
          </p>
        )}

        {paginated.map((review) => {
          const rating = Number(review.rating) || 0;
          const voted = votedReviews[review._id] || false;

          return (
            <div
              key={review._id}
              className="bg-white rounded-2xl shadow p-6 border border-gray-100 hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) =>
                  n <= rating ? (
                    <AiFillStar key={n} className="text-yellow-400" size={20} />
                  ) : (
                    <AiOutlineStar key={n} className="text-gray-300" size={20} />
                  )
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mt-2">{review.title}</h3>

              {/* Content */}
              <p className="text-gray-700 mt-2">{review.content}</p>

              {/* Verified Buyer */}
              {review.verified && (
                <div className="mt-3 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  ✔ Verified Buyer
                </div>
              )}

              {/* Metadata */}
              <p className="text-sm text-gray-500 mt-3">
                By <span className="font-semibold">{review.name}</span> •{" "}
                {new Date(review.createdAt || review.date).toLocaleDateString()}
              </p>

              {/* VOTE BUTTONS */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleVote(review._id, "helpful")}
                  disabled={voted}
                  className={`px-4 py-1 rounded-xl border text-sm font-medium ${
                    voted
                      ? "bg-gray-200 text-gray-500"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  👍 Helpful ({review.helpful || 0})
                </button>

                <button
                  onClick={() => handleVote(review._id, "notHelpful")}
                  disabled={voted}
                  className={`px-4 py-1 rounded-xl border text-sm font-medium ${
                    voted
                      ? "bg-gray-200 text-gray-500"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  👎 Not Helpful ({review.notHelpful || 0})
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- LOAD MORE ---------- */}
      {paginated.length < reviews.length && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}

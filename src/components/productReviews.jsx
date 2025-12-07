import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Filter, Search, X } from 'lucide-react';

const ProductReviews = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    rating: 0,
    title: '',
    content: '',
    verified: false
  });

  const reviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      rating: 5,
      date: '2024-11-15',
      verified: true,
      title: 'Absolutely love this product!',
      content: 'This exceeded all my expectations. The quality is outstanding and it works exactly as described. Would definitely recommend to anyone looking for a reliable solution.',
      helpful: 42,
      notHelpful: 3
    },
    {
      id: 2,
      author: 'Michael Chen',
      rating: 4,
      date: '2024-11-10',
      verified: true,
      title: 'Great value for money',
      content: 'Very satisfied with this purchase. The only minor issue is that it took a bit longer to set up than expected, but once configured, it works perfectly.',
      helpful: 28,
      notHelpful: 2
    },
    {
      id: 3,
      author: 'Emily Rodriguez',
      rating: 5,
      date: '2024-11-08',
      verified: false,
      title: 'Best purchase this year',
      content: 'Cannot say enough good things about this. The customer service was excellent and the product quality is top-notch. Worth every penny!',
      helpful: 35,
      notHelpful: 1
    },
    {
      id: 4,
      author: 'David Park',
      rating: 3,
      date: '2024-11-05',
      verified: true,
      title: 'Good but has some issues',
      content: 'Overall decent product but I encountered a few bugs. Customer support was helpful in resolving them. It does what it promises but could use some improvements.',
      helpful: 15,
      notHelpful: 8
    },
    {
      id: 5,
      author: 'Jessica Williams',
      rating: 5,
      date: '2024-10-30',
      verified: true,
      title: 'Highly recommended!',
      content: 'This has transformed how I work. The interface is intuitive and the features are exactly what I needed. Five stars all the way!',
      helpful: 52,
      notHelpful: 2
    },
    {
      id: 6,
      author: 'Robert Kim',
      rating: 4,
      date: '2024-10-28',
      verified: true,
      title: 'Solid performance',
      content: 'Does everything advertised and more. Docking one star because the documentation could be better, but overall very happy with my purchase.',
      helpful: 19,
      notHelpful: 3
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 156, percentage: 68 },
    { stars: 4, count: 45, percentage: 20 },
    { stars: 3, count: 18, percentage: 8 },
    { stars: 2, count: 6, percentage: 3 },
    { stars: 1, count: 4, percentage: 1 }
  ];

  const totalReviews = ratingDistribution.reduce((sum, r) => sum + r.count, 0);
  const avgRating = (ratingDistribution.reduce((sum, r) => sum + (r.stars * r.count), 0) / totalReviews).toFixed(1);

  const filteredReviews = reviews
    .filter(review => filterRating === 'all' || review.rating === parseInt(filterRating))
    .filter(review => 
      searchTerm === '' || 
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      if (sortBy === 'rating-high') return b.rating - a.rating;
      if (sortBy === 'rating-low') return a.rating - b.rating;
      return 0;
    });

  const StarRating = ({ rating, size = 'w-5 h-5' }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`${size} ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  const InteractiveStarRating = ({ rating, onChange }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          onClick={() => onChange(star)}
          className={`w-8 h-8 cursor-pointer transition ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
          }`}
        />
      ))}
    </div>
  );

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Review submitted:', formData);
    setShowReviewForm(false);
    setFormData({ author: '', rating: 0, title: '', content: '', verified: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h1>
          
          {/* Rating Summary */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">{avgRating}</div>
                <StarRating rating={Math.round(parseFloat(avgRating))} />
                <div className="text-sm text-gray-600 mt-2">{totalReviews} reviews</div>
              </div>
              
              <div className="flex-1">
                {ratingDistribution.map(({ stars, count, percentage }) => (
                  <div key={stars} className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600 w-8">{stars}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="font-semibold text-gray-900 mb-3">Share your thoughts</h3>
              <p className="text-gray-600 text-sm mb-4">Help other customers by writing a review</p>
              <button 
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmitReview}>
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
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    {/* Review Title */}
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
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Your Review *
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Share your experience with this product..."
                        rows="6"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 resize-none"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Minimum 50 characters ({formData.content.length}/50)
                      </p>
                    </div>

                    {/* Verified Purchase */}
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

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
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
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none text-gray-700"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="rating-high">Highest Rating</option>
              <option value="rating-low">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map(review => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{review.author}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={review.rating} size="w-4 h-4" />
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
              <p className="text-gray-700 mb-4">{review.content}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Was this helpful?</span>
                <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">Yes ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">No ({review.notHelpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500">No reviews match your filters. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
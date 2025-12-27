import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { BsTruck } from "react-icons/bs";

export default function ProductCard({ product }) {
  const rating = product.averageRating || 0;
  const count = product.reviewCount || 0;

  const price = Number(product.price || 0);
  const labelledPrice = Number(product.labelledPrice || price);

  const hasDiscount = labelledPrice > price;

  const discount = hasDiscount
    ? Math.round(((labelledPrice - price) / labelledPrice) * 100)
    : 0;

  const label = product.label || product.badge || product.tag || null;
  const freeShipping = product.freeShipping === true;

  return (
    <Link
      to={`/overview/${product.productID}`}
      className="block w-[300px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden h-[280px] bg-gray-50">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* DISCOUNT */}
        {hasDiscount && (
          <div className="absolute top-4 right-4 bg-gold text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
            -{discount}%
          </div>
        )}

        {/* PRODUCT LABEL */}
        {label && (
          <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1.5 rounded-full font-semibold text-xs uppercase shadow-lg">
            {label}
          </div>
        )}

        {/* FREE SHIPPING BADGE */}
        {freeShipping && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            <BsTruck className="text-sm" />
            Free Shipping
          </div>
        )}

        {/* HOVER OVERLAY */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(17, 24, 39, 0.3), transparent)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h2 className="text-lg font-semibold line-clamp-2 min-h-14 mb-3 text-gray-900">
          {product.name}
        </h2>

        {/* RATING */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={16}
                color={i < Math.round(rating) ? "#e29816" : "#d1d5db"}
              />
            ))}
          </div>

          <span className="text-sm text-gray-500 font-medium">
            {count > 0 ? `${rating.toFixed(1)} (${count})` : "No reviews"}
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                LKR {labelledPrice.toFixed(2)}
              </p>
            )}

            <p className="text-2xl font-bold text-gray-900">
              LKR {price.toFixed(2)}
            </p>
          </div>

          <button
            className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            aria-label="View product"
          >
            <FiArrowRight size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
}

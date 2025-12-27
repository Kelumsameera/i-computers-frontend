import StarRating from "./StarRating";

export default function SimilarProductCard({ product }) {
  const discount =
    product?.labelledPrice > product?.price
      ? Math.round((1 - product.price / product.labelledPrice) * 100)
      : 0;

  return (
    <div
      onClick={() =>
        (window.location.href = `/overview/${product.productID}`)
      }
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-md transition
                 w-40 shrink-0"
    >
      {/* IMAGE */}
      <div className="w-full h-[140px] bg-gray-100 overflow-hidden rounded-t-xl">
        <img
          src={product?.images?.[0] || "/placeholder.jpg"}
          alt={product?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 space-y-1">
        <h3 className="text-sm font-semibold line-clamp-2">
          {product?.name}
        </h3>

        {/* RATING */}
        <div className="flex items-center gap-1">
          <StarRating rating={product?.averageRating || 0} size={14} />
          <span className="text-xs text-gray-500">
            ({product?.reviewsCount || 0})
          </span>
        </div>

        {/* PRICE */}
        <div>
          <p className="text-accent font-bold text-sm">
            LKR {Number(product?.price).toLocaleString()}
          </p>

          {discount > 0 && (
            <p className="text-[11px] text-gray-400 line-through">
              LKR {Number(product.labelledPrice).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function getRatingFromProduct(product) {
  if (!product) {
    return { rating: 0, count: 0 };
  }

  const rating = Number(product.averageRating || 0);
  const count = Number(product.reviewCount || 0);

  return {
    rating: Number(rating.toFixed(1)),
    count,
  };
}

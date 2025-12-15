// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// /* ============================================================
//    ⭐ STAR RATING COMPONENT (NO ICONS, PURE SVG)
// ============================================================ */
// function StarRating({ rating = 0, size = 18 }) {
//   const stars = [];
//   const full = Math.floor(rating);
//   const half = rating % 1 >= 0.5;

//   for (let i = 0; i < 5; i++) {
//     if (i < full) {
//       stars.push(
//         <svg key={i} width={size} height={size} fill="#e29816" viewBox="0 0 24 24">
//           <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.841 
//                    1.48 8.305L12 18.896l-7.416 4.556 
//                    1.48-8.305L0 9.306l8.332-1.151z"/>
//         </svg>
//       );
//     } else if (i === full && half) {
//       stars.push(
//         <div key={i} style={{ position: "relative", width: size, height: size }}>
//           <svg width={size} height={size} fill="#ccc" viewBox="0 0 24 24" style={{ position: "absolute" }}>
//             <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.841 
//                      1.48 8.305L12 18.896l-7.416 4.556 
//                      1.48-8.305L0 9.306l8.332-1.151z"/>
//           </svg>

//           <svg width={size} height={size} fill="#e29816" viewBox="0 0 24 24"
//                style={{
//                  position: "absolute",
//                  width: size / 2,
//                  overflow: "hidden",
//                  clipPath: "inset(0 50% 0 0)"
//                }}>
//             <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.841 
//                      1.48 8.305L12 18.896l-7.416 4.556 
//                      1.48-8.305L0 9.306l8.332-1.151z"/>
//           </svg>
//         </div>
//       );
//     } else {
//       stars.push(
//         <svg key={i} width={size} height={size} fill="#ccc" viewBox="0 0 24 24">
//           <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.841 
//                    1.48 8.305L12 18.896l-7.416 4.556 
//                    1.48-8.305L0 9.306l8.332-1.151z"/>
//         </svg>
//       );
//     }
//   }

//   return <div className="flex gap-0.5">{stars}</div>;
// }

// /* ============================================================
//    ⭐ PRODUCT CARD
// ============================================================ */
// export default function ProductCard({ product }) {
//   const [averageRating, setAverageRating] = useState(0);
//   const [reviewCount, setReviewCount] = useState(0);
//   const [hover, setHover] = useState(false);

//   const productId = product?.productID;

//   /* -------------------------------------------
//      ⭐ FETCH RATING FOR THIS SPECIFIC PRODUCT
//   -------------------------------------------- */
//   useEffect(() => {
//     if (!productId) return;

//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/reviews/${productId}`)
//       .then((res) => {
//         const reviews = res.data.reviews || [];

//         if (reviews.length === 0) {
//           setAverageRating(0);
//           setReviewCount(0);
//           return;
//         }

//         const sum = reviews.reduce((acc, r) => acc + Number(r.rating), 0);
//         const avg = sum / reviews.length;

//         setAverageRating(Number(avg.toFixed(1)));
//         setReviewCount(reviews.length);
//       })
//       .catch(() => {
//         setAverageRating(0);
//         setReviewCount(0);
//       });
//   }, [productId]);

//   /* -------------------------------------------
//      ⭐ PRODUCT SAFE DATA
//   -------------------------------------------- */
//   const name = product?.name ?? "Unnamed Product";
//   const images = product?.images ?? [];
//   const mainImage = images[0] ?? "/no-image.png";
//   const hoverImage = images[1] ?? mainImage;

//   const price = Number(product?.price ?? 0);
//   const labelledPrice = Number(product?.labelledPrice ?? price);

//   const discount =
//     labelledPrice > price
//       ? Math.round(((labelledPrice - price) / labelledPrice) * 100)
//       : 0;

//   return (
//     <Link
//       to={`/overview/${productId}`}
//       className="w-full sm:w-[300px] shadow-lg hover:shadow-2xl rounded-lg overflow-hidden bg-white transition cursor-pointer block"
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       {/* IMAGE SECTION */}
//       <div className="w-full h-[220px] sm:h-[260px] relative">
//         {/* Secondary Image (hover) */}
//         <img
//           src={hoverImage}
//           className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
//             hover ? "opacity-100" : "opacity-0"
//           }`}
//         />

//         {/* Main Image */}
//         <img
//           src={mainImage}
//           className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
//             hover ? "opacity-0" : "opacity-100"
//           }`}
//         />

//         {/* Discount Badge */}
//         {discount > 0 && (
//           <div className="absolute top-2 right-2 bg-gold text-white px-2 py-1 rounded-full text-xs font-bold">
//             {discount}% OFF
//           </div>
//         )}
//       </div>

//       {/* DETAILS */}
//       <div className="p-4 flex flex-col gap-3">
//         <h1 className="text-center text-lg font-medium line-clamp-2">{name}</h1>

//         {/* ⭐ RATING */}
//         <div className="flex items-center justify-center gap-2">
//           <StarRating rating={averageRating} size={18} />
//           <span className="text-xs text-gray-500">
//             {reviewCount > 0 ? `${averageRating} (${reviewCount})` : "No Ratings"}
//           </span>
//         </div>

//         {/* PRICE */}
//         <div className="text-center">
//           {discount > 0 && (
//             <p className="line-through text-sm text-gray-500">
//               LKR {labelledPrice.toFixed(2)}
//             </p>
//           )}
//           <p className="text-xl font-bold text-accent">LKR {price.toFixed(2)}</p>
//         </div>
//       </div>
//     </Link>
//   );
// }
import { Link } from "react-router-dom";

export default function ProductCard(props) {

    const product = props.product;
    

	return (
		<Link to={"/overview/" + product.productID} className="w-[300px] h-[400px]  m-4 shadow-2xl cursor-pointer relative hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0">

			<div className="w-full h-[250px]  relative">
				<img
					src={product.images[1]}
					className="w-full h-full absolute bg-white object-cover"/>
				<img
					src={product.images[0]}
					className="w-full h-full absolute bg-white primary-image transition-opacity duration-500 object-cover"/>
			</div>
			
			<div className="w-full h-[150px] p-2 flex flex-col  justify-between">
				<h1 className="text-center text-lg">{product.name}</h1>
				<div className="w-full flex flex-col items-center">
					{
						product.labelledPrice > product.price &&
						<h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2">
							LKR. {product.labelledPrice.toFixed(2)}
						</h2>
					}
					<h2 className="text-accent font-semibold text-2xl">
						LKR. {product.price.toFixed(2)}
					</h2>

				</div>
			</div>

			<div className="w-full h-[150px] bottom-0 opacity-0 absolute buttons bg-white flex flex-row gap-4 justify-center items-center transition-opacity duration-300">
				<button  className="border-2 border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-150 h-[50px] w-[150px] flex justify-center items-center">View Details</button >
			</div>
			
		</Link>
	);

}
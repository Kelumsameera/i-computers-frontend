import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loder";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart } from "../utils/cart";
import ProductReviews from "../components/productReviews";

export default function ProductOverview() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
      .then((response) => {
        setProduct(response.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Product not found");
        setStatus("error");
      });
  }, []);

  return (
    <>
      {status === "loading" && <Loader />}

      {status === "error" && (
        <h1 className="text-center mt-10 text-2xl">Error loading Product.</h1>
      )}

      {status === "success" && (
        <div>
        <div className="w-full min-h-[calc(100vh-100px)] flex flex-col lg:flex-row">
          <h1 className="text-4xl font-semibold lg:hidden text-center sticky top-0 bg-white">{product.name}</h1>
          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2 h-auto flex justify-center items-center p-5">
            <ImageSlider images={product.images} />
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2 h-auto p-10 flex flex-col gap-6">
            <h1 className="text-4xl font-semibold hidden lg:block">{product.name}</h1>
            <h2 className="text-lg text-secondary/80">{product.productID}</h2>

            <h3 className="text-lg text-secondary/80 flex items-center">
              <CgChevronRight /> {product.category}
            </h3>
            {/* alternative names */}
						{product.altNames && product.altNames.length > 0 && (
							<h3 className="text-md text-secondary/80">
								{product.altNames.join(" | ")}
							</h3>
						)}

            <p className="text-md text-justify text-secondary/90 h-32 overflow-y-auto">
              {product.description}
            </p>

            <div className="w-full">
              {product.labelledPrice > product.price && (
                <h2 className="text-secondary/80 line-through decoration-[gold] decoration-2 mr-2 text-xl">
                  LKR. {product.labelledPrice.toFixed(2)}
                </h2>
              )}
              <h2 className="text-accent font-semibold text-3xl">
                LKR. {product.price.toFixed(2)}
              </h2>
            </div>

            <div className="w-full flex flex-row gap-4 mt-4">
              {/* ADD TO CART */}
              <button
                onClick={() => addToCart(product, 1)}
                className="bg-accent text-white px-6 py-3 rounded hover:bg-accent/90 transition"
              >
                Add to Cart
              </button>
              {/* BUY NOW */}
              <button
                onClick={() => {
                  navigate("/checkout", { state: [
                    {
                        productID: product.productID,
                        name: product.name,
                        price: product.price,
                        labelledPrice: product.labelledPrice,
                        image: product.images[0],
                        quantity: 1

                    }
                  ] });
                }}
                className="border-2 border-accent text-accent px-6 py-3 rounded hover:bg-accent hover:text-white transition"
              >
                Buy Now
              </button>
            </div>
            
          </div>
          
        </div>
        <ProductReviews />
        </div>
      )}
    </>
  );
}

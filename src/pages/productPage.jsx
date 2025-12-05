import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loder";
import ProductCard from "../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div className="w-full h-[calc(100vh-100px)]">
      {!loaded ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center p-4 flex-row flex-wrap ">
          <div className="w-full h-[100px] sticky top-0 bg-white flex justify-center items-center text-center mb-4 shadow-md z-10">
            <input
              type="text"
              placeholder="Search products..."
              
              className="w-1/2 p-2 border border-gray-300 rounded"
              onChange={async (e) => {
                if (e.target.value === "") {
                  setLoaded(false);
                  await axios
                    .get(import.meta.env.VITE_BACKEND_URL + "/products")
                    .then((response) => {
                      console.log(response.data);
                      setProducts(response.data);
                      setLoaded(true);
                    });
                  setLoaded(true);
                } else {
                  await axios
                    .get(
                      import.meta.env.VITE_BACKEND_URL +
                        "/products/search/" +
                        e.target.value
                    )
                    .then((response) => {
                      console.log(response.data);
                      setProducts(response.data);
                    });
                  setLoaded(true);
                }
              }}
            />
          </div>
          {products.map((item) => {
            return <ProductCard key={item.productID} product={item} />;
          })}
        </div>
      )}
    </div>
  );
}

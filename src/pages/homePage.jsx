import { Route, Routes } from "react-router-dom";
import Header from "../components/Heder";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkOut";
import OrdersPage from "./ordersPage";
import Home from "./homeContent";
import ReviewForm from "../components/reviewForm";
import ProductReviewPage from "../components/productReviews";

export default function HomePage(){
    return(
        <div className="w-full h-full overflow-y-scroll max-h-full">
            < Header className="sticky top-0 z-50"/>
            <div className="w-full min-h-[calc(100%-100px)]">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/about" element={<h1>About Page</h1>} />
                    <Route path="/contact" element={<h1>Contact Page</h1>} />
                    <Route path="/overview/:productID" element={<ProductOverview/>} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/reviews" element={<ProductReviewPage />} />
                    <Route path="/write-reviews" element={<ReviewForm />} />
                    <Route path="/*" element={<h1>Page not found</h1>} />
                </Routes>
            </div>
        </div>
    )
}
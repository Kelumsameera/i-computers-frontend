import { Link, Route, Routes } from "react-router-dom";
import { LuBoxes, LuClipboardList } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductsPage";
export default function AdminPage(){
    return(
        <div className="w-full h-full flex bg-accent">
            <div className="w-[250px] bg-accent h-full">

                <div className="w-full h-[100px] flex items-center text-primary ">
                    <img src="/logo.png" className="h-full"/>
                    <h1 className="text-2xl">Admin</h1>
                </div>
                <div className="w-full h-[400px] items-center p-10 text-white text-xl flex flex-col">

                    <Link to="/admin" className="w-full flex items-center h-[50px] gap-[10px]"> <LuClipboardList />Orders</Link>
                    <Link to="/admin/products" className="w-full flex items-center h-[50px] gap-[10px]"> <LuBoxes />Products</Link>
                    <Link to="/admin/users" className="w-full flex items-center h-[50px] gap-[10px]"><FiUsers/>Users</Link>
                    <Link to="/admin/reviews" className="w-full flex items-center h-[50px] gap-[10px]"><MdOutlineRateReview />Reviews</Link>


                </div>
            </div>
            <div className="w-[calc(100%-250px)] h-full max-h-full bg-primary border-[10px] border-accent rounded-3xl overflow-y-scroll ">
                <Routes>
                    <Route path="/" element={<h1>Orders</h1>} />
                    <Route path="/products" element={<AdminProductsPage />} />
                    <Route path="/add-product" element={<AdminAddProductPage />} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/reviews" element={<h1>Reviews</h1>} />
                </Routes>
            </div>
        </div>
    )
}
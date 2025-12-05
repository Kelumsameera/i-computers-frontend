import { Link, Route, Routes } from "react-router-dom";
import { LuBoxes, LuClipboardList } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductsPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";

import axios from "axios";
import { useEffect, useState } from "react";

import Loader from "../components/loder";

export default function AdminPage() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token == null) {
			window.location.href = "/";
			return;
		}

		axios
			.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				if (response.data.role === "admin") {
					setUser(response.data);
				} else {
					window.location.href = "/";
				}
			})
			.catch(() => {
				window.location.href = "/login";
			});
	}, []);

	return (
		<div className="w-full h-full flex bg-accent">
			{user ? (
				<>
					{/* SIDEBAR */}
					<div className="w-[250px] bg-accent h-full">
						<div className="w-full h-[100px] flex items-center text-primary">
							<img src="/logo.png" className="h-full" />
							<h1 className="text-2xl">Admin</h1>
						</div>

						<div className="w-full h-[400px] p-2.5 text-white text-2xl flex flex-col items-center">
							<Link to="/admin" className="w-full flex items-center h-[50px] gap-2.5">
								<LuClipboardList /> Orders
							</Link>

							<Link to="/admin/products" className="w-full flex items-center h-[50px] gap-2.5">
								<LuBoxes /> Products
							</Link>

							<Link to="/admin/users" className="w-full flex items-center h-[50px] gap-2.5">
								<FiUsers /> Users
							</Link>

							<Link to="/admin/reviews" className="w-full flex items-center h-[50px] gap-2.5">
								<MdOutlineRateReview /> Reviews
							</Link>
						</div>
					</div>

					{/* MAIN CONTENT */}
					<div className="w-[calc(100%-250px)] h-full max-h-full bg-primary border-10 border-accent rounded-3xl overflow-y-scroll">
						<Routes>
							<Route path="/" element={<AdminOrdersPage />} />
							<Route path="/products" element={<AdminProductsPage />} />
							<Route path="/add-product" element={<AdminAddProductPage />} />
							<Route path="/update-product" element={<AdminUpdateProductPage />} />
							<Route path="/users" element={<h1>Users</h1>} />
							<Route path="/reviews" element={<h1>Reviews</h1>} />
						</Routes>
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
}

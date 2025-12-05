import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsChevronUp } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [cart, setCart] = useState(location.state || []);

	// Redirect if no cart
	useEffect(() => {
		if (!location.state || location.state.length === 0) {
			navigate("/products");
		}
	}, [location.state]);

	// Calculate total
	const getCartTotal = () => {
		let total = 0;
		for (const item of cart) {
			total += item.price * item.quantity;
		}
		return total;
	};

	// Submit order
	function submitOrder() {
		const token = localStorage.getItem("token");

		if (token == null) {
			toast.error("You must be logged in to place an order");
			navigate("/login");
			return;
		}

		const orderItems = [];
		cart.forEach((item) => {
			orderItems.push({
				productID: item.productID,
				quantity: item.quantity,
			});
		});

		axios
			.post(
				import.meta.env.VITE_BACKEND_URL + "/orders",
				{
					name: name,
					address: address,
					phone: phone,
					items: orderItems,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => {
				toast.success("Order placed successfully");
				navigate("/orders");
			})
			.catch(() => {
				toast.error("Error placing order");
			});
	}

	return (
		<div className="w-full flex flex-col items-center p-5">

			{/* CART ITEMS */}
			{cart.map((item, index) => (
				<div
					key={index}
					className="w-full lg:w-[50%] pt-5 lg:h-[150px] rounded-xl relative overflow-hidden shadow-2xl my-1 flex justify-between"
				>
					<h1 className="lg:hidden w-full h-5 overflow-hidden absolute top-0">
						{item.name}
					</h1>

					{/* IMAGE + PRICE */}
					<div className="h-full flex flex-col">
						<img
						src={item.image}   
						className="h-20 lg:h-full aspect-square object-cover"
					/>

						{item.labelledPrice > item.price && (
							<h2 className="text-secondary/80 line-through decoration-[gold] decoration-2 mr-2 text-sm">
								LKR. {item.labelledPrice.toFixed(2)}
							</h2>
						)}

						<h2 className="text-sm text-accent font-semibold mt-2">
							LKR. {item.price.toFixed(2)}
						</h2>
					</div>

					{/* ITEM INFO */}
					<div className="hidden lg:flex flex-col justify-center pl-4 w-[300px]">
						<h1 className="text-2xl font-semibold">
							{item.name.length > 20
								? item.name.substring(0, 20) + "..."
								: item.name}
						</h1>

						<h2 className="text-xl text-accent font-semibold mt-2">
							LKR {item.price.toFixed(2)}
						</h2>

						<h3 className="text-lg mt-2">{item.productID}</h3>
					</div>

					{/* QTY CONTROLS */}
					<div className="min-h-full flex flex-row items-center gap-4">
						<div className="h-full flex flex-col justify-center items-center">
							<BsChevronUp
								onClick={() => {
									const newCart = [...cart];
									newCart[index].quantity++;
									setCart(newCart);
								}}
								className="text-2xl cursor-pointer hover:text-accent transition"
							/>

							<span className="text-lg">{item.quantity}</span>

							<BsChevronUp
								onClick={() => {
									const newCart = [...cart];
									newCart[index].quantity--;

									if (newCart[index].quantity < 1) {
										newCart.splice(index, 1);
									}

									setCart(newCart);
								}}
								className="rotate-180 text-2xl cursor-pointer hover:text-accent transition"
							/>
						</div>

						<span className="pr-4 text-lg font-semibold min-w-[150px] text-right">
							LKR {(item.price * item.quantity).toFixed(2)}
						</span>
					</div>
				</div>
			))}

			{/* INPUTS */}
			<div className="lg:w-[50%] p-4 rounded-xl shadow-2xl my-1 flex flex-wrap justify-between items-center">
				<div className="flex flex-col lg:w-[50%]">
					<label>Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="px-6 py-3 rounded border-2 border-secondary/30 focus:border-accent outline-none transition w-[300px]"
					/>
				</div>

				<div className="flex flex-col lg:w-[50%]">
					<label>Phone</label>
					<input
						type="text"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="px-6 py-3 rounded border-2 border-secondary/30 focus:border-accent outline-none transition w-[300px]"
					/>
				</div>

				<div className="flex flex-col w-full">
					<label>Address</label>
					<textarea
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="px-6 py-3 rounded border-2 border-secondary/30 focus:border-accent outline-none transition w-full"
					/>
				</div>
			</div>

			{/* TOTAL + BUTTON */}
			<div className="w-full lg:w-[50%] h-[150px] rounded-xl shadow-2xl my-1 flex justify-between items-center">
				<button
					onClick={submitOrder}
					className="ml-4 px-6 py-3 rounded bg-accent text-white hover:bg-accent/90 transition"
				>
					Order Now
				</button>

				<span className="pr-4 text-xl font-bold min-w-[150px] text-right">
					LKR {getCartTotal().toFixed(2)}
				</span>
			</div>
		</div>
	);
}

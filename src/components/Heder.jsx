import { LucideListCollapse } from "lucide-react";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {
	const [sideBarOpen, setSideBarOpen] = useState(false);
	return (
		<header className="w-full h-[100px] bg-gray-900 border-b border-gray-800 flex sticky top-0 z-50">

			<LucideListCollapse
				onClick={() => {
					setSideBarOpen(true);
				}}
				className="text-cyan-400 my-auto text-2xl ml-6 lg:hidden cursor-pointer hover:text-cyan-300 transition"
			/>
			<img src="/logo.png" className="h-full" alt="logo" />
			<div className="w-full h-full hidden lg:flex text-xl text-gray-300 justify-center items-center gap-[30px]">
				<Link to="/" className="hover:text-cyan-400 transition">Home</Link>
				<Link to="/products" className="hover:text-cyan-400 transition">Products</Link>
				<Link to="/about" className="hover:text-cyan-400 transition">About</Link>
				<Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link>
			</div>
			<div className="absolute right-24 top-0 h-full items-center hidden lg:flex">
				<UserData />
			</div>
			<Link
				to="/cart"
				className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300 text-2xl transition"
			>
				<BiShoppingBag />
			</Link>
			{sideBarOpen && (
				<div className="fixed lg:hidden w-screen h-screen top-0 left-0 bg-black/70 z-20 transition-all duration-300">
					<div className="w-[250px] h-screen flex-col relative">
						<div className="absolute w-full h-full bg-gray-900 left-[-250px] transform-flat translate-x-[250px] transition-transform duration-1000 flex flex-col border-r border-gray-800">
							<div className="w-full h-[100px] bg-gray-800 flex justify-center items-center border-b border-gray-700">
								<img src="/logo.png" className="h-full" alt="logo" />
								<LucideListCollapse
									onClick={() => {
										setSideBarOpen(false);
									}}
									className="text-cyan-400 my-auto text-2xl ml-6 lg:hidden rotate-180 cursor-pointer hover:text-cyan-300 transition"
								/>
							</div>
							<div className="w-full h-full flex flex-col text-xl text-gray-300 justify-start items-start gap-6 mt-10 pl-6">
								<a
									className="hover:text-cyan-400 transition"
									href="/"
									onClick={() => setSideBarOpen(false)}
								>
									Home
								</a>
								<a
									className="hover:text-cyan-400 transition"
									href="/products"
									onClick={() => setSideBarOpen(false)}
								>
									Products
								</a>
								<a
									className="hover:text-cyan-400 transition"
									href="/about"
									onClick={() => setSideBarOpen(false)}
								>
									About
								</a>
								<a
									className="hover:text-cyan-400 transition"
									href="/contact"
									onClick={() => setSideBarOpen(false)}
								>
									Contact
								</a>
								<div className="flex justify-center bg-gray-800 border border-cyan-400 p-2 rounded-full">
									<UserData />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";
import Loader from "../components/loder";

export default function RegisterPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	
//Normal Register
	
	async function register() {
		if (firstName.trim() === "") {
			toast.error("First name is required");
			return;
		}
		if (lastName.trim() === "") {
			toast.error("Last name is required");
			return;
		}
		if (email.trim() === "") {
			toast.error("Email is required");
			return;
		}
		if (password.trim() === "") {
			toast.error("Password is required");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		setIsLoading(true);
		try {
			await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/users/",
				{
					email: email.trim(),
					password: password.trim(),
					firstName: firstName.trim(),
					lastName: lastName.trim(),
				}
			);

			toast.success("Registration successful! Welcome to I Computers.");
			navigate("/login");
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			toast.error("Registration failed! Please try again.");
			setIsLoading(false);
		}
	}

	// Google Login / Signup

	const googleLogin = useGoogleLogin({
		onSuccess: (response) => {
			setIsLoading(true);

			axios
				.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
					token: response.access_token,
				})
				.then((res) => {
					localStorage.setItem("token", res.data.token);

					if (res.data.role === "admin") {
						navigate("/admin");
					} else {
						navigate("/");
					}

					toast.success("Login successful!");
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err);
					toast.error("Google Login Failed");
					setIsLoading(false);
				});
		},
		onError: () => {
			toast.error("Google Login Failed");
		},
		onNonOAuthError: () => {
			toast.error("Google Login Failed");
		},
	});

	return (
		<div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex flex-col lg:flex-row">
			
			{/* LEFT SECTION */}
			<div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 text-center">
				<img
					src="/logo.png"
					alt="logo"
					className="w-36 h-36 lg:w-52 lg:h-52 mb-5 object-cover"
				/>
				<h1 className="text-3xl lg:text-5xl text-gold font-bold">
					Plug In. Power Up. Play Hard.
				</h1>
				<p className="text-lg lg:text-3xl text-white italic mt-2">
					Your Ultimate Destination for Gaming Gear
				</p>
			</div>

			{/* RIGHT SECTION */}
			<div className="w-full lg:w-1/2 flex justify-center items-center p-4">
				<div className="w-full max-w-md backdrop-blur-lg shadow-2xl rounded-2xl p-6 flex flex-col items-center">
					<h1 className="text-xl font-semibold mb-5 text-white">
						Register
					</h1>

					<input
						type="text"
						placeholder="your first name"
						onChange={(e) => setFirstName(e.target.value)}
						className="w-full h-12 mb-4 rounded-lg border border-accent p-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-gold"
					/>

					<input
						type="text"
						placeholder="your last name"
						onChange={(e) => setLastName(e.target.value)}
						className="w-full h-12 mb-4 rounded-lg border border-accent p-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-gold"
					/>

					<input
						type="email"
						placeholder="your email"
						onChange={(e) => setEmail(e.target.value)}
						className="w-full h-12 mb-4 rounded-lg border border-accent p-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-gold"
					/>

					<input
						type="password"
						placeholder="your password"
						onChange={(e) => setPassword(e.target.value)}
						className="w-full h-12 mb-4 rounded-lg border border-accent p-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-gold"
					/>

					<input
						type="password"
						placeholder="confirm your password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="w-full h-12 mb-5 rounded-lg border border-accent p-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-gold"
					/>

					<button
						onClick={register}
						disabled={isLoading}
						className="w-full h-12 lg:h-14 bg-accent text-white font-bold text-base lg:text-lg rounded-lg border-2 border-accent hover:bg-transparent hover:text-accent transition disabled:opacity-50"
					>
						Register Now
					</button>

					{/* GOOGLE BUTTON */}
					<button
						onClick={() => googleLogin()}
						disabled={isLoading}
						className="w-full h-12 lg:h-14 mt-4 bg-white text-accent font-bold text-base lg:text-lg rounded-lg border-2 border-white hover:bg-transparent hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<GrGoogle className="text-xl" />
						Continue with Google
					</button>

					<p className="text-white mt-4 text-sm lg:text-base">
						Already have an account?
						<Link to="/login" className="text-gold italic ml-1">
							Login here
						</Link>
					</p>
				</div>
			</div>

			{isLoading && <Loader />}
		</div>
	);
}

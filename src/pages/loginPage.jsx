import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loder";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	
	const googleLogin = useGoogleLogin({
		onSuccess: (response) => { 
			setIsLoading(true);
			axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
				token: response.access_token,
			}).then((res) => {
				// Use sessionStorage instead of localStorage
				localStorage.setItem("token", res.data.token);
				if (res.data.role === "admin") {
					navigate("/admin");
				} else {
					navigate("/");
				}
				toast.success("Login successful!");
				setIsLoading(false);
			}).catch((err) => {
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

	async function login() {
		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		setIsLoading(true);
		try {
			const res = await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/users/login",
				{
					email: email,
					password: password,
				}
			);

			// Use sessionStorage instead of localStorage
			localStorage.setItem("token", res.data.token);
			
			if (res.data.role === "admin") {
				navigate("/admin");
			} else {
				navigate("/");
			}

			toast.success("Login successful! Welcome back.");
			setIsLoading(false);
		} catch (err) {
			toast.error("Login failed! Please check your credentials and try again.");
			console.log("Error during login:", err);
			setIsLoading(false);
		}
	}

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			login();
		}
	};

	return (
		<div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex flex-col lg:flex-row">
			{/* Left Side - Branding */}
			<div className="w-full lg:w-1/2 h-auto lg:h-full flex justify-center items-center flex-col p-8 lg:p-12">
				<img
					src="/logo.png"
					alt="logo"
					className="w-32 h-32 lg:w-48 lg:h-48 mb-4 lg:mb-5 object-cover"
				/>
				<h1 className="text-3xl lg:text-5xl text-gold text-center font-bold mb-2 drop-shadow-lg">
					Plug In. Power Up. Play Hard.
				</h1>
				<p className="text-lg lg:text-2xl text-white italic text-center">
					Your Ultimate Destination for Gaming Gear
				</p>
			</div>

			{/* Right Side - Login Form */}
			<div className="w-full lg:w-1/2 h-auto lg:h-full flex justify-center items-center p-4 lg:p-8">
				<div className="w-full max-w-md backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center p-6 lg:p-8 bg-white/10">
					<h1 className="text-3xl lg:text-4xl font-bold mb-6 text-white drop-shadow-lg">
						Login
					</h1>
					
					<input
						onChange={(e) => setEmail(e.target.value)}
						onKeyPress={handleKeyPress}
						type="email"
						placeholder="Your email"
						value={email}
						className="w-full h-12 lg:h-14 mb-4 rounded-lg border-2 border-accent/50 p-3 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
					/>
					
					<input
						onChange={(e) => setPassword(e.target.value)}
						onKeyPress={handleKeyPress}
						type="password"
						placeholder="Your password"
						value={password}
						className="w-full h-12 lg:h-14 mb-3 rounded-lg border-2 border-accent/50 p-3 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
					/>
					
					<div className="w-full mb-5 text-right">
						<Link to="/forgot-password" className="text-gold hover:text-gold/80 text-sm lg:text-base transition-colors">
							Forgot password?
						</Link>
					</div>

					<button
						onClick={login}
						disabled={isLoading}
						className="w-full h-12 lg:h-14 mb-4 bg-accent text-white font-bold text-lg lg:text-xl rounded-lg border-2 border-accent hover:bg-transparent hover:text-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Login
					</button>
					
					<button 
						onClick={googleLogin}
						disabled={isLoading}
						className="w-full h-12 lg:h-14 mb-4 bg-white text-accent font-bold text-base lg:text-lg rounded-lg border-2 border-white hover:bg-transparent hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<GrGoogle className="text-xl" />
						Login with Google
					</button>
					
					<p className="text-white text-sm lg:text-base text-center">
						Don't have an account?{" "}
						<Link to="/register" className="text-gold hover:text-gold/80 font-semibold transition-colors">
							Register here
						</Link>
					</p>
				</div>
			</div>

			{isLoading && <Loader />}
		</div>
	);
}
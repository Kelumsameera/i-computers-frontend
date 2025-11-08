import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        { email, password }
      );

      const data = res.data;
      localStorage.setItem("token", data.token);

      toast.success("Login successful! Welcome back.");

      // Navigate based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex">
      {/* Left section */}
      <div className="w-[50%] h-full flex justify-center items-center flex-col p-[50px]">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[200px] h-[200px] mb-5 object-cover"
        />
        <h1 className="text-[50px] text-gold text-shadow-accent text-center font-bold">
          Plug In. Power Up. Play Hard.
        </h1>
        <p className="text-[30px] text-white italic text-center">
          Your Ultimate Destination for Gaming Gear
        </p>
      </div>

      {/* Right section */}
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[500px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center p-5">
          <h1 className="text-[40px] font-bold mb-5 text-white text-shadow-accent">
            Login
          </h1>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your email"
            className="w-[350px] h-[50px] mb-5 rounded-lg border border-accent p-2.5 text-[20px] focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="your password"
            className="w-[350px] h-[50px] rounded-lg border border-accent p-2.5 text-[20px] focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <p className="text-white w-full mb-5 p-2.5 text-right not-italic">
            Forget your password?
            <Link to="/reset-password" className="text-gold italic">
              Reset here
            </Link>
          </p>

          <button
            onClick={login}
            className="w-[350px] h-[50px] mb-5 font-bold rounded-lg bg-accent text-white border-accent border-2 p-2.5 text-[20px] hover:bg-transparent hover:text-accent transition-all"
          >
            Login
          </button>

          <p className="text-white not-italic">
            Don't have an account?
            <Link to="/register" className="text-gold italic">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

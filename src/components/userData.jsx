import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

export default function UserData({ compact = false }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // 🔹 NOT LOGGED IN
  if (!user) {
    return (
      <div className="relative">
        {/* USER ICON */}
        <FaUserPlus
          onClick={() => setOpen(!open)}
          className="text-gold text-2xl cursor-pointer"
        />

        {/* LOGIN / REGISTER MENU */}
        {open && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-700 rounded-lg p-3 z-50">
            <Link
              to="/login"
              className="block px-3 py-2 text-sm hover:bg-gray-700 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 text-sm hover:bg-gray-700 rounded"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    );
  }

  // 🔹 LOGGED IN
  return (
    <div className="relative">
      {/* USER IMAGE */}
      <img
        src={user.image}
        referrerPolicy="no-referrer"
        alt="user"
        onClick={() => setOpen(!open)}
        className={`rounded-full object-cover border border-cyan-400 cursor-pointer ${
          compact ? "w-8 h-8" : "w-10 h-10"
        }`}
      />

      {/* DROPDOWN */}
      {open && (
        <div className="absolute left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg w-40 z-50">
          <button
            onClick={() => navigate("/orders")}
            className="w-full text-left px-4 py-2 hover:bg-white/15 text-gray-300 lg:font-semibold"
          >
            My Orders
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 lg:font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

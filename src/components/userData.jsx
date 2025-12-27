import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserData({ compact = false }) {
  const [user, setUser] = useState(null);
  const [selectedOption, setSelectedOption] = useState("user");

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

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link to="/login" className="px-3 py-1.5 bg-white text-accent rounded-full text-sm">
          Login
        </Link>
        <Link to="/register" className="px-3 py-1.5 bg-white text-accent rounded-full text-sm">
          Register
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 ${
        compact ? "w-auto" : "w-40"
      }`}
    >
      <img
        src={user.image}
        referrerPolicy="no-referrer"
        alt="user"
        className={`rounded-full object-cover ${
          compact ? "w-8 h-8" : "w-11 h-11"
        }`}
      />

      <select
        value={selectedOption}
        onChange={(e) => {
          if (e.target.value === "logout") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          if (e.target.value === "my-orders") {
            window.location.href = "/orders";
          }
          setSelectedOption("user");
        }}
        className={`bg-transparent outline-none cursor-pointer text-white ${
          compact ? "text-sm" : ""
        }`}
      >
        <option className="bg-accent" value="user">
          {user.firstName}
        </option>
        <option className="bg-accent" value="my-orders">
          My Orders
        </option>
        <option className="bg-accent" value="logout">
          Logout
        </option>
      </select>
    </div>
  );
}

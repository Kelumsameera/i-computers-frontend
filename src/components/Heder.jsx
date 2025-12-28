import { LucideListCollapse } from "lucide-react";
import { Link } from "react-router-dom";

import { RiContactsBook2Fill, RiInformationFill, RiPlayList2Fill, RiShoppingBag3Fill } from "react-icons/ri";
import { useState } from "react";
import UserData from "./userData";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { HiHome } from "react-icons/hi";

export default function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
 


  return (
    <header className="w-full h-[100px] bg-gray-900 border-b border-gray-800 flex sticky top-0 z-50">
      
      {/* MOBILE MENU ICON */}
      <RiPlayList2Fill
        onClick={() => setSideBarOpen(true)}
        className="text-gold my-auto text-2xl ml-6 lg:hidden cursor-pointer"
      />

      {/* LOGO */}
      <img src="/logo.png" className="h-full" alt="logo" />

      {/* DESKTOP NAV */}
      <div className="w-full hidden lg:flex text-xl text-gray-300 justify-center items-center gap-8">
        <Link to="/" className="hover:text-gold">Home</Link>
        <Link to="/products" className="hover:text-gold">Products</Link>
        <Link to="/about" className="hover:text-gold">About</Link>
        <Link to="/contact" className="hover:text-gold">Contact</Link>
      </div>

      {/* USER DATA (DESKTOP) */}
      <div className="absolute right-22 top-0 h-full hidden lg:flex items-center">
        <UserData />
      </div>
      <div className="absolute right-18 top-1/2 -translate-y-1/2 lg:hidden">
  <UserData compact />
</div>

 

      {/* CART ICON */}
      <Link
        to="/cart"
        className="absolute right-6 top-1/2 -translate-y-1/2 text-gold text-2xl"
      >
        <FiShoppingCart />
      </Link>

      {/* MOBILE SIDEBAR */}
      {sideBarOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 lg:hidden">
          <div className="w-[260px] h-full bg-gray-900 border-r border-gray-800 flex flex-col">

            {/* SIDEBAR HEADER */}
            <div className="h-[100px] flex items-center justify-between px-4 bg-gray-800 border-b border-gray-700">
              <img src="/logo.png" className="h-full" alt="logo" />
              <RiPlayList2Fill
                onClick={() => setSideBarOpen(false)}
                className="text-gold text-2xl rotate-180 cursor-pointer"
              />
            </div>

            {/* SIDEBAR LINKS */}
            <div className="flex flex-col gap-6 text-xl text-gray-300 mt-8 px-6">
              
              <Link
                to="/"
                onClick={() => setSideBarOpen(false)}
                className="flex items-center gap-3 hover:text-cyan-400 transition-colors duration-300"
              >
                <HiHome className="text-2xl" />
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setSideBarOpen(false)}
                className="flex items-center gap-3 hover:text-cyan-400 transition-colors duration-300"
              >
                <RiShoppingBag3Fill className="text-2xl" />
                Products
              </Link>

              <Link
                to="/about"
                onClick={() => setSideBarOpen(false)}
                className="flex items-center gap-3 hover:text-cyan-400 transition-colors duration-300"
              >
                <RiInformationFill className="text-2xl" />
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setSideBarOpen(false)}
                className="flex items-center gap-3 hover:text-cyan-400 transition-colors duration-300"
              >
                <RiContactsBook2Fill className="text-2xl" />
                Contact
              </Link>

            </div>
                          {/* USER DATA (MOBILE) */}
                          <div className="mt-6 bg-gray-800 border border-cyan-400 px-3 py-2 rounded-lg w-fit">
              <UserData compact />
            </div>

            </div>
          </div>
        
      )}
    </header>
  );
}

import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebookMessenger,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";


export default function Footer() {
  return (
    <>
      {/* ======================= FOOTER ======================= */}
      <footer className="bg-accent border-t border-secondary/10 py-16 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          {/* GRID SECTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

            {/* BRAND */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img src="/logo.png" className="w-14 h-14 object-contain" alt="logo" />
                <span className="text-xl font-bold">Isuri Technologies</span>
              </div>

              <p className="text-white/70 text-sm leading-relaxed">
                Premium computer hardware & IT solutions for gamers, creators, and professionals.
              </p>

              <div className="mt-6 space-y-3 text-white/70 text-sm">
                <p className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer">
                  <FaPhoneAlt className="text-gold" /> +94 704 685 300
                </p>
                <p className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer">
                  <FaEnvelope className="text-gold" /> support@isuritech.com
                </p>
                <p className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer">
                  <FaMapMarkerAlt className="text-gold" /> Colombo, Sri Lanka
                </p>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-gold font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3 text-white/70 text-sm">
                <li>
                  <Link to="/" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    → Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    → Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    → About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    → Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* MINI SITEMAP */}
            <div>
              <h3 className="text-gold font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3 text-white/70 text-sm">
                <li>
                  <Link to="/faq" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    → FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    → Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    → Return Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    → Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div>
              <h3 className="text-gold font-bold text-lg mb-4">Stay Connected</h3>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                Get updates on new arrivals & exclusive offers.
              </p>

              <div className="flex items-center bg-white/10 rounded-xl p-2 border border-white/20 hover:border-gold transition-all duration-300">
                <FiMail className="text-white/70 ml-2" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent text-white placeholder:text-white/50 px-3 py-2 focus:outline-none text-sm"
                />
                <button className="bg-gold px-4 py-2 rounded-lg font-semibold text-secondary hover:bg-gold/90 transition-all duration-300 active:scale-95 shadow-lg">
                  Subscribe
                </button>
              </div>

              {/* PAYMENT ICONS */}
              <div className="mt-6">
                <p className="text-white/70 text-xs mb-3">We Accept</p>
                <div className="flex gap-4 text-3xl text-white/50">
                  <FaCcVisa className="hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer" />
                  <FaCcMastercard className="hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer" />
                  <FaCcAmex className="hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer" />
                  <FaCcPaypal className="hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SOCIAL + COPYRIGHT */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-white/70">
            <p className="text-sm">
              © {new Date().getFullYear()} <span className="text-gold font-semibold">Isuru Technologies</span>. All rights reserved.
            </p>

            {/* SOCIAL ICONS WITH ANIMATION */}
            <div className="flex gap-5 mt-4 md:mt-0 text-xl">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-600 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <FaFacebookF />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-sky-500 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <FaTwitter />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-pink-600 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <FaInstagram />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ======================= FLOATING CONTACT WIDGET ======================= */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">

        <a
          href="tel:+94704685300"
          className="w-14 h-14 flex items-center justify-center rounded-full bg-gold text-secondary shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-gold/50 group relative"
          aria-label="Call us"
        >
          <FaPhoneAlt size={20} className="group-hover:animate-bounce" />
          <span className="absolute right-16 bg-secondary text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Call Us
          </span>
        </a>

        <a
          href="https://wa.me/94704685300"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-white shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-green-500/50 group relative"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={24} className="group-hover:animate-bounce" />
          <span className="absolute right-16 bg-secondary text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            WhatsApp
          </span>
        </a>

        <a
          href="#"
          className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-blue-600/50 group relative"
          aria-label="Messenger"
        >
          <FaFacebookMessenger size={24} className="group-hover:animate-bounce" />
          <span className="absolute right-16 bg-secondary text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Messenger
          </span>
        </a>

      </div>
    </>
  );
}
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState(null);

  // Scroll spy for active FAQ highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (let i = faqs.length - 1; i >= 0; i--) {
        const el = document.getElementById(`faq-${i}`);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs = [
    {
      icon: "🛒",
      question: "How do I place an order?",
      answer:
        "You can place an order by browsing our products, adding items to your cart, and completing checkout. Orders can be placed online 24/7 through our website.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: "💳",
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, bank transfers, and cash on delivery (COD) where available. All card payments are processed securely via trusted payment gateways.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: "🚚",
      question: "How long does delivery take?",
      answer:
        "Delivery times depend on your location and product availability. Typically, deliveries within Sri Lanka take 1–5 business days.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: "↩️",
      question: "What is your return and refund policy?",
      answer:
        "We offer refunds or replacements for eligible items according to our Refund Policy. DOA items must be reported within 3 days of delivery.",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: "🛡️",
      question: "Do products come with warranty?",
      answer:
        "Yes. Most products include manufacturer warranties. Warranty duration and coverage vary by brand and product type.",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: "👤",
      question: "Do I need an account to place an order?",
      answer:
        "You can browse products without an account, but creating an account is required to place orders and track order history.",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: "🔐",
      question: "Is my personal data secure?",
      answer:
        "Yes. Isuru Computers follows strict security practices and complies with the Personal Data Protection Act (PDPA) of Sri Lanka.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: "📦",
      question: "Can I track my order?",
      answer:
        "Yes. Once your order is shipped, tracking details will be shared via email or available in your account dashboard.",
      color: "from-fuchsia-500 to-pink-600",
    },
    {
      icon: "📞",
      question: "How can I contact customer support?",
      answer:
        "You can contact our support team via email, phone, or the contact form on our website. We’re happy to help!",
      color: "from-blue-500 to-cyan-600",
    },
  ];

  const scrollToFAQ = (index) => {
    setActiveSection(index);
    document.getElementById(`faq-${index}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 mb-8 shadow-2xl shadow-cyan-500/20">
            <span className="text-5xl">❓</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about shopping, payments, delivery,
            warranty, and support at Isuru Computers.
          </p>
        </div>

        {/* FAQ INDEX */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-16 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">📑</span> FAQ Index
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => scrollToFAQ(i)}
                className={`text-left px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                  activeSection === i
                    ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-transparent"
                }`}
              >
                <span className="text-cyan-400 mr-2">{i + 1}.</span>
                {faq.question}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ SECTIONS */}
        <div className="space-y-12">
          {faqs.map((faq, i) => (
            <section
              key={i}
              id={`faq-${i}`}
              className={`group relative bg-slate-900/50 backdrop-blur-sm border rounded-3xl p-10 transition-all duration-500 overflow-hidden ${
                activeSection === i
                  ? "border-cyan-500/70 ring-4 ring-cyan-500/20 shadow-2xl shadow-cyan-500/30"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-linear-to-br ${faq.color}`}
              />

              <div className="relative flex gap-8">
                <div
                  className={`w-20 h-20 rounded-3xl bg-linear-to-br ${faq.color} flex items-center justify-center text-4xl shrink-0 shadow-2xl`}
                >
                  {faq.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    {faq.question}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}

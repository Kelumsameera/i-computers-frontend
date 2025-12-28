import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowCookieBanner(true);
    } else {
      try {
        setCookiePreferences(JSON.parse(consent));
      } catch {
        setShowCookieBanner(true);
      }
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(`section-${i}`);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const acceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    setCookiePreferences(allAccepted);
    setShowCookieBanner(false);
  };

  const rejectNonEssential = () => {
    const minimal = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem("cookieConsent", JSON.stringify(minimal));
    setCookiePreferences(minimal);
    setShowCookieBanner(false);
  };

  const savePreferences = () => {
    const prefs = { ...cookiePreferences, necessary: true };
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    setCookiePreferences(prefs);
    setShowCookieBanner(false);
  };

  const sections = [
    {
      icon: "📜",
      title: "Introduction",
      content:
        "These Terms and Conditions govern your use of the Isuru Computers website and the purchase of products and services from us. By accessing or using our website and placing orders, you agree to be bound by these Terms. If you do not agree, please do not use our services.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: "🏢",
      title: "About Isuru Computers",
      content:
        "Isuru Computers is a registered technology retailer in Sri Lanka, specializing in computers, laptops, accessories, components, and IT services. We operate online and through physical stores across the country.",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: "🛒",
      title: "Products and Pricing",
      content:
        "All product specifications, images, and prices are subject to change without prior notice. Prices are quoted in Sri Lankan Rupees (LKR) and include applicable taxes unless stated otherwise. We strive for accuracy but are not responsible for typographical errors.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: "💳",
      title: "Ordering and Payment",
      content:
        "Orders are confirmed only upon successful payment. We accept major credit/debit cards, bank transfers, and cash on delivery (where available). We reserve the right to refuse or cancel any order for any reason, including stock availability or suspected fraud.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: "🚚",
      title: "Shipping and Delivery",
      content:
        "Delivery times vary by location and product availability. Shipping charges are calculated at checkout. Risk of loss and title for items pass to you upon delivery. We are not liable for delays caused by couriers or unforeseen events.",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: "↩️",
      title: "Returns and Refunds",
      content:
        "Defective products may be returned within 7 days of delivery with original packaging and proof of purchase. Non-defective items are not eligible for return unless stated otherwise. Refunds are processed within 14 business days to the original payment method.",
      color: "from-red-500 to-rose-600",
    },
    {
      icon: "🛡️",
      title: "Warranty Policy",
      content:
        "Isuru Computers provides warranties on products as follows:\n\n" +
        "• Manufacturer Warranty: All products carry the original manufacturer's warranty (typically 1–3 years depending on brand and product type).\n\n" +
        "• Agent/Distributor Warranty: For brands where Isuru Computers is the authorized agent.\n\n" +
        "• Isuru Extended Care (Optional): Certain products may be eligible for additional paid extended warranty coverage.\n\n" +
        "• Warranty Does Not Cover: Misuse, liquid damage, unauthorized repairs, normal wear and tear, software issues, or tampered warranty seals.\n\n" +
        "Isuru Computers acts only as a facilitator for manufacturer warranties.",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: "⚖️",
      title: "Limitation of Liability",
      content:
        "To the fullest extent permitted by Sri Lankan law, Isuru Computers shall not be liable for any indirect or consequential damages. Liability is limited to the amount paid for the product or service.",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: "©️",
      title: "Intellectual Property",
      content:
        "All content on this website, including text, images, logos, and designs, is the property of Isuru Computers or its licensors and protected by law.",
      color: "from-fuchsia-500 to-pink-600",
    },
    {
      icon: "🔐",
      title: "User Accounts",
      content:
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: "🌍",
      title: "Governing Law",
      content:
        "These Terms are governed by the laws of the Democratic Socialist Republic of Sri Lanka. Disputes shall be subject to the courts in Colombo.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: "📝",
      title: "Changes to Terms",
      content:
        "We reserve the right to update these Terms at any time. Continued use of the website constitutes acceptance of changes.",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const scrollToSection = (index) => {
    setActiveSection(index);
    document
      .getElementById(`section-${index}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Hero Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 mb-8 shadow-2xl shadow-cyan-500/20">
              <span className="text-5xl">⚖️</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Please read these Terms carefully. They form a legal agreement between you and MSK Computers for the use of our website and services.
            </p>
            <p className="text-gray-500 mt-6 text-lg">
              Effective Date: <span className="font-semibold text-gray-300">December 28, 2025</span>
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-16 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">📑</span> Table of Contents
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(i)}
                  className={`text-left px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    activeSection === i
                      ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                      : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-transparent"
                  }`}
                  aria-current={activeSection === i ? "location" : undefined}
                >
                  <span className="text-cyan-400 mr-2">{i + 1}.</span>
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <section
                key={index}
                id={`section-${index}`}
                className={`group relative bg-slate-900/50 backdrop-blur-sm border rounded-3xl p-10 transition-all duration-500 overflow-hidden ${
                  activeSection === index
                    ? "border-cyan-500/70 ring-4 ring-cyan-500/20 shadow-2xl shadow-cyan-500/30"
                    : "border-white/10 hover:border-white/20"
                }`}
                aria-labelledby={`heading-${index}`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none bg-linear-to-br ${section.color}`} />
                
                <div className="relative flex gap-8">
                  <div
                    className={`w-20 h-20 rounded-3xl bg-linear-to-br ${section.color} flex items-center justify-center text-4xl shrink-0 shadow-2xl`}
                    aria-hidden="true"
                  >
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2
                      id={`heading-${index}`}
                      className="text-3xl font-bold text-white mb-6"
                    >
                      {section.title}
                    </h2>
                    <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Closing Statement */}
          <div className="mt-20 text-center bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 p-1 rounded-3xl shadow-2xl">
            <div className="bg-slate-950/90 backdrop-blur rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Thank You for Choosing Isuru Computers
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We are committed to providing you with the best products and services while maintaining transparency and fairness in all our dealings.
              </p>
            </div>
          </div>

          

        <Footer />
    </div>
        </div>
      

    </>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
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
        const el = document.getElementById(`section-${i}`);
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

  const acceptAll = () => {
    const all = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("cookieConsent", JSON.stringify(all));
    setCookiePreferences(all);
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
      icon: "🔒",
      title: "Introduction",
      content:
        "Isuru Computers (\"we\", \"us\", or \"our\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, retain, and safeguard your personal information when you visit our website, create an account, or purchase products and services. We fully comply with the Personal Data Protection Act No. 9 of 2022 of Sri Lanka (PDPA).",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: "📋",
      title: "Personal Information We Collect",
      content:
        "We collect the following types of personal data:\n\n• Name, email address, phone number, billing and delivery addresses\n• Account credentials and order history\n• Payment data (securely processed via third-party gateways)\n• IP address, browser type, device data, and cookies\n• Customer support communications",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: "🎯",
      title: "Purpose of Processing",
      content:
        "Your personal data is processed to:\n\n• Fulfill orders and deliveries\n• Provide customer support\n• Process payments and prevent fraud\n• Improve website performance\n• Send promotions (only with consent)\n• Comply with Sri Lankan legal obligations",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: "⏱️",
      title: "Data Retention",
      content:
        "We retain data only as long as necessary:\n\n• Transaction data: 7 years\n• Support communications: 3 years\n• Marketing consent: until withdrawn\n• Inactive accounts: anonymized after 3 years",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: "🔗",
      title: "Disclosure of Personal Data",
      content:
        "We share data only with trusted partners such as payment gateways, couriers, hosting providers, and analytics services under strict agreements. We do not sell your personal data.",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: "🛡️",
      title: "Data Security",
      content:
        "Security measures include SSL encryption, access control, regular audits, and staff training. No system is completely secure, but we continuously improve our safeguards.",
      color: "from-red-500 to-rose-600",
    },
    {
      icon: "⚖️",
      title: "Compliance with Sri Lankan Law",
      content:
        "Isuru Computers complies fully with the Personal Data Protection Act No. 9 of 2022 and applies best practices in data protection and privacy management.",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: "👤",
      title: "Your Rights",
      content:
        "You have the right to access, correct, delete, restrict processing, withdraw consent, and lodge complaints with the Data Protection Authority of Sri Lanka.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: "🍪",
      title: "Cookies",
      content:
        "We use essential, analytics, and marketing cookies. Optional cookies are used only with your consent and can be managed via the cookie banner.",
      color: "from-fuchsia-500 to-pink-600",
    },
    {
      icon: "🌐",
      title: "Third-Party Links",
      content:
        "Our site may link to external websites. We are not responsible for their privacy practices and encourage reviewing their policies.",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: "📧",
      title: "Contact Information",
      content:
        "Data Protection Officer\nIsuru Computers\nEmail: privacy@isurucomputers.lk\nPhone: +94 11 234 5678",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: "📝",
      title: "Policy Updates",
      content:
        "We may update this policy from time to time. Changes will be posted on this page with a revised effective date.",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const scrollToSection = (i) => {
    setActiveSection(i);
    document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* HERO */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 mb-8 shadow-2xl shadow-cyan-500/20">
              <span className="text-5xl">🔒</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Isuru Computers is committed to protecting your personal data and complying with Sri Lankan privacy laws.
            </p>
            <p className="text-gray-500 mt-6 text-lg">
              Effective Date: <span className="text-gray-300 font-semibold">December 28, 2025</span>
            </p>
          </div>

          {/* TOC */}
          <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">📑 Table of Contents</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((s, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(i)}
                  className={`px-6 py-4 rounded-2xl text-left transition ${
                    activeSection === i
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "bg-white/5 hover:bg-white/10 text-gray-300"
                  }`}
                >
                  {i + 1}. {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* SECTIONS */}
          <div className="space-y-12">
            {sections.map((s, i) => (
              <section
                key={i}
                id={`section-${i}`}
                className={`relative bg-slate-900/50 border rounded-3xl p-10 ${
                  activeSection === i
                    ? "border-cyan-500/70 ring-4 ring-cyan-500/20"
                    : "border-white/10"
                }`}
              >
                <div className="flex gap-8">
                  <div className={`w-20 h-20 rounded-3xl bg-linear-to-br ${s.color} flex items-center justify-center text-4xl`}>
                    {s.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">{s.title}</h2>
                    <div className="text-gray-300 text-lg whitespace-pre-line">{s.content}</div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          
        </div>
        <div className="pt-20">
           {/* FOOTER */}
          <Footer  />
        </div>
       
      </div>

      {/* COOKIE BANNER */}
      {showCookieBanner && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-6">
          <div className="max-w-5xl mx-auto bg-slate-900/95 border border-white/20 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">🍪 Cookie Preferences</h3>
            <p className="text-gray-300 mb-4">
              We use cookies to improve your experience. Manage your preferences below.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={rejectNonEssential} className="px-6 py-3 border border-white/30 rounded-xl text-white">
                Reject Optional
              </button>
              <button onClick={savePreferences} className="px-6 py-3 bg-white/10 rounded-xl text-white">
                Save Preferences
              </button>
              <button onClick={acceptAll} className="px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl text-white">
                Accept All
              </button>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
}

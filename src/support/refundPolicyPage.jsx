import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function RefundPolicy() {
  const [activeSection, setActiveSection] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Cookie consent logic
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

    // Scroll handler for TOC active highlighting
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
        "This Refund Policy outlines the conditions under which Isuru Computers will process refunds and replacements for products purchased through our website or physical stores. We are committed to customer satisfaction while ensuring fairness and compliance with Sri Lankan consumer protection laws.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: "⚠️",
      title: "Dead on Arrival (DOA) Policy",
      content:
        "A product is considered Dead on Arrival (DOA) if it is completely non-functional due to a manufacturing defect upon first use.\n\n" +
        "Key Requirements:\n" +
        "• Reported within 3 calendar days of delivery\n" +
        "• Unused, in original sealed packaging with all accessories and invoice\n" +
        "• Hardware manufacturing defect only (excludes software, compatibility, or user damage)\n\n" +
        "Eligible DOA items receive priority replacement (same model, subject to stock) or full refund after quick verification (typically 24–48 hours).\n\n" +
        "Examples of Valid DOA Claims:\n" +
        "✓ Laptop does not power on at all\n" +
        "✓ Desktop PC shows no display or POST beep despite correct assembly\n" +
        "✓ Monitor remains completely black with no backlight\n" +
        "✓ SSD/HDD not detected in BIOS at all\n\n" +
        "Examples of Non-DOA Issues:\n" +
        "✗ Windows installation errors or driver issues\n" +
        "✗ Minor cosmetic scratches\n" +
        "✗ Incompatibility with existing hardware\n" +
        "✗ Damage from improper handling after delivery",
      color: "from-red-500 to-rose-600",
    },
    {
      icon: "↩️",
      title: "General Eligibility for Refund",
      content:
        "Beyond DOA, refunds are available for:\n\n" +
        "• Incorrect item delivered\n" +
        "• Product damaged in transit (reported within 24 hours with photos)\n" +
        "• Verifiable manufacturing defect found within 7 days\n\n" +
        "Correctly delivered, non-defective items are not eligible for refund unless stated otherwise at purchase.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: "⏰",
      title: "Timeframe for Refund Requests",
      content:
        "• DOA claims: Within 3 days of delivery\n" +
        "• Damaged in transit: Within 24 hours of delivery\n" +
        "• Other eligible defects/incorrect items: Within 7 days of delivery\n\n" +
        "Later claims fall under manufacturer warranty.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: "📦",
      title: "Condition of Returned Products",
      content:
        "Returned items must be:\n\n" +
        "• Unused and in new condition\n" +
        "• In original undamaged packaging with all accessories and warranty cards\n" +
        "• Accompanied by original invoice\n" +
        "• Free from damage or modifications\n\n" +
        "Broken seals or missing items disqualify the return.",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: "🔍",
      title: "Refund Process",
      content:
        "1. Contact support@isurucomputers.lk or +94 11 234 5678 with order details\n" +
        "2. Submit photos/video evidence if required\n" +
        "3. Receive Return Authorization and instructions\n" +
        "4. Return via branch or designated courier\n" +
        "5. Refund/replacement processed within 7–14 business days after verification\n\n" +
        "We cover return shipping for DOA, wrong items, or transit damage.",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: "💳",
      title: "Refund Method",
      content:
        "Refunds are issued via the original payment method:\n\n" +
        "• Card payments: Back to the same card\n" +
        "• Bank transfer/COD: To your bank account\n\n" +
        "Processing: 7–14 business days.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: "🚫",
      title: "Non-Refundable Items",
      content:
        "• Software & digital licenses\n" +
        "• Custom-built PCs\n" +
        "• Clearance/as-is items\n" +
        "• Opened consumables\n" +
        "• Hygiene items\n" +
        "• Items beyond refund timeframe",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: "⚖️",
      title: "Consumer Rights",
      content:
        "This policy complements your statutory rights under the Consumer Affairs Authority Act of Sri Lanka and does not limit legal remedies for faulty goods.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: "📝",
      title: "Changes to This Policy",
      content:
        "We may update this Refund Policy periodically. Changes will be posted here with a revised effective date. Continued use implies acceptance.",
      color: "from-violet-500 to-purple-600",
    },
  ];

  const scrollToSection = (index) => {
    setActiveSection(index);
    document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Hero Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 mb-8 shadow-2xl shadow-cyan-500/20">
              <span className="text-5xl">↩️</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Refund Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We want you to be completely satisfied with your purchase. This policy details our refund and Dead on Arrival (DOA) procedures.
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
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-linear-to-br ${section.color}`} />
                <div className="relative flex gap-8">
                  <div className={`w-20 h-20 rounded-3xl bg-linear-to-br ${section.color} flex items-center justify-center text-4xl shadow-2xl`}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-6">
                      {section.title}
                    </h2>
                    <div className="text-gray-300 text-lg whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="text-3xl">🍪</span> We Value Your Privacy
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                  </p>
                  <div className="mt-4 space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" checked disabled className="w-5 h-5 text-cyan-500 rounded" />
                      <span className="text-gray-200">Necessary cookies (required)</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={cookiePreferences.analytics}
                        onChange={(e) => setCookiePreferences({ ...cookiePreferences, analytics: e.target.checked })}
                        className="w-5 h-5 text-cyan-500 rounded"
                      />
                      <span className="text-gray-300">Analytics cookies</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={cookiePreferences.marketing}
                        onChange={(e) => setCookiePreferences({ ...cookiePreferences, marketing: e.target.checked })}
                        className="w-5 h-5 text-cyan-500 rounded"
                      />
                      <span className="text-gray-300">Marketing cookies</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <button onClick={rejectNonEssential} className="px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition">
                    Reject Optional
                  </button>
                  <button onClick={savePreferences} className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
                    Save Preferences
                  </button>
                  <button onClick={acceptAll} className="px-8 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg transition">
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

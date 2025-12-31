import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/contact",
        { name, email, subject, message }
      );

      toast.success("Message sent! We'll get back soon.");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-400 mt-3 text-lg">
          We're here to help. Reach out anytime.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-10 py-16 w-full">
        {/* LEFT INFO */}
        <div className="flex flex-col gap-6 w-full lg:w-1/3">
          <h2 className="text-2xl font-bold">Get in Touch</h2>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-cyan-400 font-semibold">Email</h3>
            <p className="text-gray-300 mt-1">support@isurutech.lk</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-cyan-400 font-semibold">Phone</h3>
            <p className="text-gray-300 mt-1">+94 76 77 85 300</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-cyan-400 font-semibold">Address</h3>
            <p className="text-gray-300 mt-1">
              Colombo, Sri Lanka <br />
              9:00 AM – 7:00 PM (Mon–Sat)
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex flex-col w-full lg:w-2/3 bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

          <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
            {/* NAME */}
            <div className="flex flex-col w-full lg:w-[48%]">
              <label className="mb-1">Name *</label>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col w-full lg:w-[48%]">
              <label className="mb-1">Email *</label>
              <input
                type="email"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* SUBJECT */}
            <div className="flex flex-col w-full">
              <label className="mb-1">Subject</label>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col w-full">
              <label className="mb-1">Message *</label>
              <textarea
                rows="5"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* BUTTON */}
            <div className="w-full">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-400 text-black py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* MAP */}
      <section className="max-w-6xl mx-auto px-6 pb-16 w-full">
        <h2 className="text-2xl font-bold mb-4">Our Location</h2>
        <div className="w-full h-72 rounded-2xl overflow-hidden border border-gray-800">
          <iframe
            title="map"
            className="w-full h-full"
            src="https://maps.google.com/maps?q=colombo&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 pb-20 w-full">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="flex flex-col gap-4">
          {[
            {
              q: "How long does it take for support to respond?",
              a: "We usually reply within 1–3 hours during working days.",
            },
            {
              q: "Do you offer on-site repairs?",
              a: "Yes, we provide on-site service for businesses in Colombo.",
            },
            {
              q: "Can I request a custom PC quote?",
              a: "Absolutely — send us your budget and requirements.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="bg-gray-900 border border-gray-800 p-4 rounded-xl"
            >
              <summary className="font-semibold cursor-pointer">
                {faq.q}
              </summary>
              <p className="text-gray-400 mt-2">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

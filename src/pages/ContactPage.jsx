import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

      // If you want backend API, replace this:
      // await axios.post(import.meta.env.VITE_BACKEND_URL + "/contact", { name, email, subject, message });

      setLoading(false);
      toast.success("Message sent! We'll get back soon.");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error("Failed to send message");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER / TITLE */}
      <section className="bg-linear-to-b from-black to-gray-900 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-gray-400 mt-3 text-lg">
            We're here to help. Reach out anytime — our team responds fast!
          </p>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT - CONTACT DETAILS */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Get in Touch</h2>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-cyan-400">Email</h3>
            <p className="text-gray-300 mt-1">support@isurutech.lk</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-cyan-400">Phone</h3>
            <p className="text-gray-300 mt-1">+94 7X XXX XXXX</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-cyan-400">Address</h3>
            <p className="text-gray-300 mt-1">
              Colombo, Sri Lanka  
              <br /> 9:00 AM – 7:00 PM (Mon–Sat)
            </p>
          </div>
        </div>

        {/* RIGHT - CONTACT FORM */}
        <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Name *</label>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 outline-none"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email *</label>
              <input
                type="email"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 outline-none"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium">Subject</label>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 outline-none"
                placeholder="How can we help?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium">Message *</label>
              <textarea
                rows="5"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 outline-none"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-400 text-black py-3 rounded-lg font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* MAP */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-4">Our Location</h2>
        <div className="w-full h-72 rounded-2xl overflow-hidden border border-gray-800 shadow-lg">
          <iframe
            title="map"
            className="w-full h-full"
            src="https://maps.google.com/maps?q=colombo&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
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
              className="bg-gray-900 border border-gray-800 p-4 rounded-xl cursor-pointer"
            >
              <summary className="text-white font-semibold">{faq.q}</summary>
              <p className="text-gray-400 mt-2">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

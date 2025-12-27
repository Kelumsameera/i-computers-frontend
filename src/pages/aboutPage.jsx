import React from "react";
import { Link } from "react-router-dom";

const TeamCard = ({ person }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col items-center text-center">
    <img
      src={person.image}
      alt={person.name}
      className="w-24 h-24 rounded-full object-cover mb-3 shadow-lg"
    />
    <h4 className="font-semibold text-white">{person.name}</h4>
    <p className="text-sm text-gray-400 mt-1">{person.role}</p>
    <p className="text-gray-400 text-sm mt-3">{person.bio}</p>
    <div className="mt-4 flex gap-3">
      {person.twitter && (
        <a href={person.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400">
          Twitter
        </a>
      )}
      {person.linkedin && (
        <a href={person.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400">
          LinkedIn
        </a>
      )}
    </div>
  </div>
);

export default function AboutPage() {
  const team = [
    {
      name: "Isuru Silva",
      role: "Founder & CEO",
      image: "/team/isuru.jpg",
      bio: "Leads product & strategy. 10+ years building systems for businesses.",
      twitter: "#",
      linkedin: "#",
    },
    {
      name: "Sameera Kelum",
      role: "Lead Developer",
      image: "/team/sameera.jpg",
      bio: "Fullstack engineer — loves performance, UX and embedded IoT projects.",
      twitter: "#",
      linkedin: "#",
    },
    {
      name: "Nisha Perera",
      role: "Head of Design",
      image: "/team/nisha.jpg",
      bio: "Designs delightful experiences and polished UI systems.",
      twitter: "#",
      linkedin: "#",
    },
  ];

  const faqs = [
    {
      q: "Where are you located?",
      a: "We are based in Colombo, Sri Lanka and serve local & international customers.",
    },
    {
      q: "Do you offer warranty?",
      a: "Yes — all hardware sold by us includes a standard 1 year warranty. Extended plans are also available.",
    },
    {
      q: "Can you build custom systems?",
      a: "Absolutely. We design and build custom PCs, kiosks and IoT solutions for businesses.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative bg-linear-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              About Isuri Technologies
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-xl">
              We build reliable hardware and software solutions for businesses
              and enthusiasts. From custom rigs and retail POS to IoT and
              automation — our goal is simple: deliver smart, usable technology
              that just works.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-cyan-400 text-black px-5 py-3 rounded-full font-semibold shadow-lg hover:bg-cyan-300"
              >
                Shop Products
              </Link>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-gray-700 px-5 py-3 rounded-full text-gray-300 hover:border-cyan-400"
              >
                Contact Sales
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/2">
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
              <img
                src="/about-hero.jpg"
                alt="Team working"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION + VALUES */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white">Our Mission</h3>
            <p className="text-gray-400 mt-3">
              To empower small businesses and creators with affordable,
              maintainable technology — thoughtfully designed and built to last.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white">What we value</h3>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li>• Practical engineering over complexity</li>
              <li>• Transparency in pricing and support</li>
              <li>• Long-term relationships with customers</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white">How we work</h3>
            <p className="text-gray-400 mt-3">
              Small cross-functional teams, fast iterations, and strong QA —
              we ship reliable products and keep improving them.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE / MILESTONES */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h4 className="text-lg font-semibold">2020</h4>
            <p className="text-gray-400 mt-2">Founded and launched first custom PC line.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h4 className="text-lg font-semibold">2022</h4>
            <p className="text-gray-400 mt-2">Introduced POS & retail solutions for local shops.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h4 className="text-lg font-semibold">2024</h4>
            <p className="text-gray-400 mt-2">Expanded into IoT and industrial automation projects.</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {team.map((p) => (
            <TeamCard key={p.name} person={p} />
          ))}
        </div>
      </section>

      {/* TOP SELLING / CTA (optional quick section) */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Looking for a custom system?</h3>
            <p className="text-gray-400 mt-2">Tell us your budget and use-case — we’ll propose a build.</p>
          </div>

          <div className="flex gap-4">
            <Link to="/contact" className="px-5 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-cyan-300">
              Get Quote
            </Link>
            <Link to="/products" className="px-5 py-3 rounded-full border border-gray-700 text-gray-300 hover:border-cyan-400">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((f, i) => (
            <details key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <summary className="cursor-pointer font-semibold text-white">{f.q}</summary>
              <p className="text-gray-400 mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h4 className="font-semibold">Get in touch</h4>
            <p className="text-gray-400 mt-2">Email us at <a href="mailto:support@isuri.tech" className="text-cyan-400">support@isuri.tech</a> or use the form.</p>
            <p className="text-gray-400 mt-4">Phone: +94 7XX XXX XXX</p>
            <p className="text-gray-400 mt-2">Address: Colombo, Sri Lanka</p>
          </div>

          <form className="md:col-span-2 grid grid-cols-1 gap-3" onSubmit={(e) => { e.preventDefault(); alert("Contact form demo — hook to backend"); }}>
            <input className="p-3 bg-gray-800 border border-gray-700 rounded" placeholder="Your name" required />
            <input className="p-3 bg-gray-800 border border-gray-700 rounded" placeholder="Email" type="email" required />
            <input className="p-3 bg-gray-800 border border-gray-700 rounded" placeholder="Subject" />
            <textarea className="p-3 bg-gray-800 border border-gray-700 rounded" rows="4" placeholder="Message" required />
            <div className="flex justify-end">
              <button type="submit" className="px-5 py-2 bg-cyan-400 text-black rounded-full font-semibold hover:bg-cyan-300">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* small footer CTA */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          © {new Date().getFullYear()} Isuri Technologies — Built with care.
        </div>
      </footer>
    </div>
  );
}

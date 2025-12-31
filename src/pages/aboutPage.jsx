import React, { useState } from "react";
import { 
  FaRocket, 
  FaShieldAlt, 
  FaUsers, 
  FaAward,
  FaTwitter,
  FaLinkedin,
  FaChevronDown
} from "react-icons/fa";
import Footer from "../components/Footer";

const TeamCard = ({ person, index }) => (
  <div 
    className="group relative bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-6 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-400/20 w-full lg:w-[32%]"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="absolute inset-0 bg-linear-to-br from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/10 group-hover:via-transparent group-hover:to-purple-400/10 transition-all duration-500"></div>
    
    <div className="relative z-10 flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-400 to-purple-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
        <img
          src={person.image}
          alt={person.name}
          className="relative w-full h-full rounded-full object-cover border-4 border-gray-700 group-hover:border-cyan-400 transition-all duration-500"
        />
      </div>
      
      <h4 className="text-xl font-bold text-white text-center">{person.name}</h4>
      <p className="text-cyan-400 text-sm text-center mt-1 font-semibold">{person.role}</p>
      <p className="text-gray-400 text-sm text-center mt-3 leading-relaxed">{person.bio}</p>
      
      <div className="mt-6 flex flex-row gap-4 justify-center">
        {person.twitter && (
          <a 
            href={person.twitter} 
            target="_blank" 
            rel="noreferrer" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-110"
          >
            <FaTwitter />
          </a>
        )}
        {person.linkedin && (
          <a 
            href={person.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-110"
          >
            <FaLinkedin />
          </a>
        )}
      </div>
    </div>
  </div>
);

const StatCard = ({ number, label, icon: Icon }) => (
  <div className="text-center group flex flex-col items-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-400 to-purple-400 mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-400/50">
      <Icon className="text-3xl text-black" />
    </div>
    <h3 className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{number}</h3>
    <p className="text-gray-400 mt-1">{label}</p>
  </div>
);

const ValueCard = ({ title, description, icon: Icon }) => (
  <div className="relative group w-full lg:w-[32%]">
    <div className="absolute inset-0 bg-linear-to-br from-cyan-400/20 to-purple-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    <div className="relative bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 transition-all duration-500 group-hover:border-cyan-400 group-hover:shadow-2xl">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-400 to-purple-400 mb-4 group-hover:scale-110 transition-all duration-300">
        <Icon className="text-2xl text-black" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const team = [
    {
      name: "Isuru Silva",
      role: "Founder & CEO",
      image: "/default.jpg",
      bio: "Leads product & strategy with 10+ years of experience building systems for businesses.",
      twitter: "#",
      linkedin: "#",
    },
    {
      name: "Sameera Kelum",
      role: "Lead Developer",
      image: "/default.jpg",
      bio: "Fullstack engineer who loves performance optimization, UX design, and embedded IoT projects.",
      twitter: "#",
      linkedin: "#",
    },
    {
      name: "Nisha Perera",
      role: "Head of Design",
      image: "/default.jpg",
      bio: "Creates delightful user experiences and polished UI systems that users love.",
      twitter: "#",
      linkedin: "#",
    },
  ];

  const faqs = [
    {
      q: "Where are you located?",
      a: "We are based in Colombo, Sri Lanka and serve local & international customers with pride.",
    },
    {
      q: "Do you offer warranty?",
      a: "Yes — all hardware sold by us includes a standard 1 year warranty with extended options available.",
    },
    {
      q: "Can you build custom systems?",
      a: "Absolutely. We design and build custom PCs, kiosks and IoT solutions tailored to your specific needs.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, PayPal, bank transfers, and various local payment options.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-block px-4 py-2 bg-linear-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-semibold mb-8 animate-pulse">
            Building the Future of Technology
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            About Isuru Technologies
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            We build reliable hardware and software solutions for businesses and enthusiasts. From custom rigs to IoT automation, we turn your vision into reality.
          </p>

          <div className="flex flex-row gap-4 justify-center flex-wrap">
            <button 
              onClick={() => window.location.href = '/products'}
              className="group relative px-8 py-4 bg-linear-to-r from-cyan-400 to-purple-400 text-black rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/50"
            >
              <span className="relative z-10">Explore Products</span>
              <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-full font-bold text-lg transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-105"
            >
              Contact Sales
            </button>
          </div>

          <div className="flex flex-row flex-wrap gap-8 mt-20 max-w-4xl mx-auto justify-center lg:justify-between">
            <StatCard number="10+" label="Years Experience" icon={FaAward} />
            <StatCard number="500+" label="Projects Delivered" icon={FaRocket} />
            <StatCard number="300+" label="Happy Clients" icon={FaUsers} />
            <StatCard number="99%" label="Satisfaction Rate" icon={FaShieldAlt} />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <FaChevronDown className="text-cyan-400 text-3xl" />
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              What Drives Us
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our core values guide everything we do, from product design to customer support.
            </p>
          </div>

          <div className="flex flex-row flex-wrap gap-3 justify-center lg:justify-between">
            <ValueCard
              icon={FaRocket}
              title="Innovation First"
              description="We embrace cutting-edge technology and continuously push boundaries to deliver solutions that keep you ahead of the curve."
            />
            <ValueCard
              icon={FaShieldAlt}
              title="Quality & Reliability"
              description="Every product undergoes rigorous testing and quality assurance to ensure it meets our high standards and your expectations."
            />
            <ValueCard
              icon={FaUsers}
              title="Customer Success"
              description="Your success is our success. We provide comprehensive support and guidance to help you achieve your goals."
            />
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="relative py-20 px-6 bg-linear-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Talented individuals passionate about technology and dedicated to your success.
            </p>
          </div>

          <div className="flex flex-row flex-wrap gap-3 justify-center lg:justify-between">
            {team.map((person, index) => (
              <TeamCard key={person.name} person={person} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-lg">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex flex-row justify-between items-center text-left transition-all duration-300"
                >
                  <span className="font-semibold text-white text-lg">{faq.q}</span>
                  <FaChevronDown 
                    className={`text-cyan-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-5' : 'max-h-0'}`}
                >
                  <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative py-20 px-6 bg-linear-to-b from-black to-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-gray-400 text-lg">
              Ready to start your next project? Get in touch with us today.
            </p>
          </div>

          <div className="bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-400 to-purple-400 flex items-center justify-center shrink-0">
                      <span className="text-black text-xl">📧</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-semibold">support@isuru.tech</p>
                    </div>
                  </div>

                  <div className="flex flex-row items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-400 to-purple-400 flex items-center justify-center shrink-0">
                      <span className="text-black text-xl">📞</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-semibold">+94 76 77 85 300</p>
                    </div>
                  </div>

                  <div className="flex flex-row items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-400 to-purple-400 flex items-center justify-center shrink-0">
                      <span className="text-black text-xl">📍</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-semibold">Colombo, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your Name" 
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                />
                
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Your Email" 
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                />
                
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Your Message"
                  rows="5" 
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none"
                />
                
                <button 
                  onClick={handleSubmit}
                  className="w-full py-4 bg-linear-to-r from-cyan-400 to-purple-400 text-black rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer  />
    </div>
  );
}
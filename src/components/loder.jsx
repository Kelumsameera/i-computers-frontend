// import { useEffect, useState } from "react";

// export default function Loader() {
//   const [dots, setDots] = useState(".");

//   // Animated dots logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDots((prev) => (prev.length === 3 ? "." : prev + "."));
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full h-screen fixed top-0 left-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-50">
//       {/* Golden bubble ring */}
//       <div className="relative w-36 h-36">
//         {[...Array(18)].map((_, index) => {
//           const rotation = (index * 360) / 18;
//           const delay = index * 0.08;
//           const fade = 1 - index / 18;

//           return (
//             <div
//               key={index}
//               className="absolute w-full h-full"
//               style={{
//                 transform: `rotate(${rotation}deg)`,
//               }}
//             >
//               <div
//                 className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
//                 style={{
//                   width: "10px",
//                   height: "10px",
//                   background: `radial-gradient(circle at 30% 30%, rgba(255,215,0,${fade}), rgba(184,134,11,${fade * 0.8}))`,
//                   boxShadow: `0 0 10px rgba(255,215,0,${fade * 0.6}), 0 0 25px rgba(255,215,0,${fade * 0.3})`,
//                   animation: `bubblePulse 1.5s ease-in-out ${delay}s infinite`,
//                 }}
//               ></div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Animated Loading text */}
//       <p className="text-white text-lg mt-10 tracking-wide font-medium drop-shadow-lg flex items-center">
//         Loading{dots}
//       </p>

//       {/* Animations */}
//       <style>{`
//         @keyframes bubblePulse {
//           0%, 100% {
//             transform: scale(0.8);
//             opacity: 0.3;
//           }
//           50% {
//             transform: scale(1.3);
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
import { Monitor, Gamepad2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-screen relative bg-black/70 backdrop-blur-2xl flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes glow {
          0%,100% {
            box-shadow:
              0 0 20px rgba(0,255,255,.6),
              0 0 40px rgba(168,85,247,.4);
          }
          50% {
            box-shadow:
              0 0 50px rgba(0,255,255,.9),
              0 0 90px rgba(168,85,247,.8);
          }
        }
        @keyframes pulseText {
          0%,100% { opacity: .6; }
          50% { opacity: 1; }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 120px 120px; }
        }
      `}</style>

      {/* Cyber Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,255,255,.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168,85,247,.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Glow Orbs */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-fuchsia-600/20 blur-3xl rounded-full bottom-0 right-0" />

      <div className="relative text-center z-10">
        {/* Loader Core */}
        <div className="w-40 h-40 mx-auto relative animate-float">
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 border-t-fuchsia-500 animate-spin" />

          <div
            className="absolute inset-4 rounded-full bg-black/80 border-2 border-cyan-400"
            style={{ animation: "glow 2s infinite" }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 drop-shadow-[0_0_20px_cyan]" />
          </div>
        </div>

        {/* Brand */}
        <h2 className="text-2xl font-bold mt-6 text-cyan-400 drop-shadow-[0_0_12px_cyan]">
          ISURU COMPUTER
        </h2>

        <p className="text-fuchsia-400 text-sm tracking-widest animate-pulseText">
          GAMING SYSTEMS & PERIPHERALS
        </p>

        {/* Icons */}
        <div className="flex justify-center gap-4 mt-5">
          <Monitor className="text-cyan-400 animate-bounce drop-shadow-[0_0_10px_cyan]" />
          <Gamepad2 className="text-fuchsia-500 animate-bounce delay-150 drop-shadow-[0_0_10px_fuchsia]" />
        </div>

        {/* Loading Text */}
        <p className="text-white/80 text-sm mt-4 tracking-wider animate-pulseText">
         Loading your gaming paradise...
        </p>
      </div>
    </div>
  );
}

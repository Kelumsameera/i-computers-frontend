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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-orange-900/20 to-gray-900 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%,100% { box-shadow: 0 0 20px rgba(249,115,22,.5); }
          50% { box-shadow: 0 0 60px rgba(249,115,22,.8); }
        }
      `}</style>

      <div className="relative text-center">
        <div className="w-40 h-40 mx-auto relative animate-float">
          <div className="absolute inset-0 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          <div
            className="absolute inset-4 rounded-full bg-black/80 border-2 border-orange-600"
            style={{ animation: "glow 2s infinite" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-orange-400">
            <img src="/logo.png" alt="Logo" className="w-16 h-16" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-6">ISURU COMPUTER</h2>
        <p className="text-orange-400 text-sm tracking-widest">
          GAMING SYSTEMS & PERIPHERALS
        </p>

        <div className="flex justify-center gap-3 mt-4">
          <Monitor className="text-orange-400 animate-bounce" />
          <Gamepad2 className="text-yellow-400 animate-bounce delay-150" />
        </div>

        <p className="text-white text-sm mt-4">Loading your gaming paradise...</p>
      </div>
    </div>
  );
}

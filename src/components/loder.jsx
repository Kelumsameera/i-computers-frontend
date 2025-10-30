import { useEffect, useState } from "react";

export default function Loader() {
  const [dots, setDots] = useState(".");

  // Animated dots logic
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-50">
      {/* Golden bubble ring */}
      <div className="relative w-36 h-36">
        {[...Array(18)].map((_, index) => {
          const rotation = (index * 360) / 18;
          const delay = index * 0.08;
          const fade = 1 - index / 18;

          return (
            <div
              key={index}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  width: "10px",
                  height: "10px",
                  background: `radial-gradient(circle at 30% 30%, rgba(255,215,0,${fade}), rgba(184,134,11,${fade * 0.8}))`,
                  boxShadow: `0 0 10px rgba(255,215,0,${fade * 0.6}), 0 0 25px rgba(255,215,0,${fade * 0.3})`,
                  animation: `bubblePulse 1.5s ease-in-out ${delay}s infinite`,
                }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Animated Loading text */}
      <p className="text-white text-lg mt-10 tracking-wide font-medium drop-shadow-lg flex items-center">
        Loading{dots}
      </p>

      {/* Animations */}
      <style>{`
        @keyframes bubblePulse {
          0%, 100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

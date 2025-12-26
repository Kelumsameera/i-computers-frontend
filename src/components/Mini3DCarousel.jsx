import { useEffect, useState } from "react";
import ProductCard from "./productCard";

export default function Mini3DCarousel({ items = [] }) {
  const [index, setIndex] = useState(0);
  const visibleItems = items.slice(0, 5);

  useEffect(() => {
    if (visibleItems.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % visibleItems.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [visibleItems.length]);

  if (!visibleItems.length) return null;

  return (
    <div className="relative hidden lg:flex w-60 h-[210px] items-center justify-center">
      <div
        className="relative w-full h-full"
        style={{ perspective: "700px" }}
      >
        {visibleItems.map((item, i) => {
          const offset = i - index;
          const isActive = offset === 0;

          return (
            <div
              key={item.productID || item._id}
              className="absolute top-0 right-1/2 transition-all duration-500 ease-in-out"
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${offset * 65}px)
                  translateZ(${isActive ? 70 : -45}px)
                  rotateY(${offset * -12}deg)
                  scale(${isActive ? 1 : 0.65})
                `,
                opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.45,
                zIndex: isActive ? 10 : 5 - Math.abs(offset),
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {/* 🔽 CARD SIZE REDUCED HERE */}
              <div className="w-[70px] h-[50px]">
                <ProductCard product={item.product || item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

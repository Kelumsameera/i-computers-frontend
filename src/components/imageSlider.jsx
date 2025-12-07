import { useState } from "react";

export default function ImageSlider({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  if (!images || images.length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-64 bg-primary text-secondary/50">
        No images available
      </div>
    );
  }

  const handleMouseMove = (e) => {
    if (!zoom) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* MAIN IMAGE WITH ZOOM ON HOVER */}
      <div
        className="relative w-[80%] h-[450px] overflow-hidden rounded-xl bg-primary/30"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[activeIndex]}
          alt={`Product image ${activeIndex + 1}`}
          className="w-full h-full object-contain transition-transform duration-300"
          style={{
            transform: zoom ? 'scale(2)' : 'scale(1)',
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
          }}
        />
      </div>

      {/* THUMBNAILS — HOVER TO CHANGE */}
      <div className="w-full h-[100px] flex flex-row justify-center gap-4 items-center mt-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setActiveIndex(idx)}
            className={`cursor-pointer rounded-lg border transition-all 
              ${idx === activeIndex ? "border-accent scale-105 shadow-lg" : "border-secondary/20"}`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-[90px] h-[90px] object-contain rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
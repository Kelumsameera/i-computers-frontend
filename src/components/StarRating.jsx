import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function StarRating({
  rating = 0,
  size = 24,
  color = "#f5c518",
  onChange = null, // enables clicking
}) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const diff = rating - i + 1;

    let type = "empty"; // default star

    if (diff >= 1) type = "full";
    else if (diff >= 0.5) type = "half";

    stars.push(
      <span
        key={i}
        onClick={() => onChange && onChange(i)}
        className={onChange ? "cursor-pointer" : ""}
        style={{ display: "flex", position: "relative" }}
      >
        {/* Empty Star */}
        <AiOutlineStar size={size} color={color} />

        {/* Full Star */}
        {type === "full" && (
          <AiFillStar
            size={size}
            color={color}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}

        {/* Half Star (mask 50%) */}
        {type === "half" && (
          <AiFillStar
            size={size}
            color={color}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              overflow: "hidden",
              clipPath: "inset(0 50% 0 0)",
            }}
          />
        )}
      </span>
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
}

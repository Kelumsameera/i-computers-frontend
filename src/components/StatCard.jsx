import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendText,
  onClick,
  tint = "blue", // blue, green, amber, purple
}) {
  const tintColors = {
    blue: {
      bg: "from-blue-500/5 to-blue-600/5",
      iconBg: "bg-blue-100 group-hover:bg-blue-200",
      iconText: "text-blue-600",
    },
    green: {
      bg: "from-green-500/5 to-green-600/5",
      iconBg: "bg-green-100 group-hover:bg-green-200",
      iconText: "text-green-600",
    },
    amber: {
      bg: "from-amber-500/5 to-amber-600/5",
      iconBg: "bg-amber-100 group-hover:bg-amber-200",
      iconText: "text-amber-600",
    },
    purple: {
      bg: "from-purple-500/5 to-purple-600/5",
      iconBg: "bg-purple-100 group-hover:bg-purple-200",
      iconText: "text-purple-600",
    },
  };

  const colors = tintColors[tint] || tintColors.blue;

  return (
    <div
      onClick={onClick}
      className={`
        group relative w-full sm:w-[260px]
        bg-white/80 backdrop-blur-sm
        border border-gray-200 rounded-2xl
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        overflow-hidden
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-linear-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative p-6 flex flex-col gap-4">

        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div
            className={`
              flex items-center justify-center
              h-12 w-12 rounded-xl
              ${colors.iconBg}
              transition-all duration-300
              shadow-sm
            `}
          >
            <div className={`${colors.iconText} transition-all duration-300`}>
              {icon}
            </div>
          </div>

          {trend !== undefined && (
            <div
              className={`
                flex items-center gap-1.5 
                text-xs font-semibold
                px-2.5 py-1.5 rounded-full
                ${
                  trend
                    ? "text-green-600 bg-green-50"
                    : "text-red-600 bg-red-50"
                }
              `}
            >
              {trend ? (
                <FiTrendingUp size={12} />
              ) : (
                <FiTrendingDown size={12} />
              )}
              {trendText || (trend ? "Up" : "Down")}
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
        </div>

        {onClick && (
          <div className="pt-1 text-sm font-medium text-gray-500 group-hover:text-gray-800 transition-colors duration-200 flex items-center gap-1">
            View details 
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
        )}
      </div>
    </div>
  );
}
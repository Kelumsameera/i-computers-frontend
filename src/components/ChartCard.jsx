export default function ChartCard({ title, children }) {
  return (
    <div
      className="
        bg-white
        border border-gray-200
        rounded-xl
        shadow-lg
        p-6
        transition
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-gray-400">
        <h3 className="text-gray-900 font-semibold text-base">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div>
        {children}
      </div>
    </div>
  );
}

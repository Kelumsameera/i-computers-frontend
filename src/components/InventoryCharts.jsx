import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

export default function InventoryCharts({ stats }) {
  const barData = [
    { name: "In Stock", value: stats.inStock },
    { name: "Low Stock", value: stats.lowStock },
    { name: "Out of Stock", value: stats.outStock },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* ================= BAR CHART ================= */}
      <div className="bg-white p-4 rounded-lg shadow flex-1">
        <h3 className="text-lg font-semibold mb-4">
          Stock Status Overview
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value">
              {barData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PIE CHART ================= */}
      <div className="bg-white p-4 rounded-lg shadow flex-1">
        <h3 className="text-lg font-semibold mb-4">
          Inventory Distribution
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={barData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              label
            >
              {barData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

const AttendanceChart = ({ stats }) => {
  const barData = [
    { name: "Present", value: stats.present || 0 },
    { name: "Late", value: stats.late || 0 },
    { name: "Absent", value: stats.absent || 0 },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Bar Chart */}
      <BarChart width={300} height={250} data={barData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>

      {/* Pie Chart */}
      <PieChart width={300} height={250}>
        <Pie
          data={barData}
          dataKey="value"
          outerRadius={80}
          label
        >
          {barData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default AttendanceChart;
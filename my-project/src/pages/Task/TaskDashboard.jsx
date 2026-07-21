import { useEffect, useState } from "react";

import {
  FiClipboard,
  FiClock,
  FiActivity,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { getDashboardStats } from "../../services/taskService";

const COLORS = [
  "#3B82F6",
  "#F59E0B",
  "#10B981",
  "#EF4444",
];

const TaskDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      const res = await getDashboardStats();

      setStats(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks || 0,
      color: "bg-blue-500",
      icon: <FiClipboard size={26} />,
    },

    {
      title: "Pending",
      value: stats.pendingTasks || 0,
      color: "bg-yellow-500",
      icon: <FiClock size={26} />,
    },

    {
      title: "In Progress",
      value: stats.inProgressTasks || 0,
      color: "bg-indigo-500",
      icon: <FiActivity size={26} />,
    },

    {
      title: "Completed",
      value: stats.doneTasks || 0,
      color: "bg-green-500",
      icon: <FiCheckCircle size={26} />,
    },

    {
      title: "Overdue",
      value: stats.overdueTasks || 0,
      color: "bg-red-500",
      icon: <FiAlertTriangle size={26} />,
    },
  ];

  const chartData = [
    {
      name: "Pending",
      value: stats.pendingTasks || 0,
    },

    {
      name: "Progress",
      value: stats.inProgressTasks || 0,
    },

    {
      name: "Done",
      value: stats.doneTasks || 0,
    },

    {
      name: "Overdue",
      value: stats.overdueTasks || 0,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl shadow p-6 animate-pulse"
          >
            <div className="h-5 bg-gray-200 rounded w-24 mb-5"></div>

            <div className="h-10 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
            {/* ===================== Summary Cards ===================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-3">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} text-white w-14 h-14 rounded-xl flex items-center justify-center shadow`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== Charts ===================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Bar Chart */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Task Status Overview
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Compare all task statuses.
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="4 4" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  fill="#3B82F6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart যাবে Part 3-এ */}
                {/* ===================== Pie Chart ===================== */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Task Distribution
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Percentage of task status.
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===================== Quick Analytics ===================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Completion Rate
          </h3>

          <h2 className="text-3xl font-bold text-green-600 mt-3">
            {stats.totalTasks
              ? Math.round(
                  (stats.doneTasks / stats.totalTasks) * 100
                )
              : 0}
            %
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Completed tasks out of total.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Pending Tasks
          </h3>

          <h2 className="text-3xl font-bold text-yellow-500 mt-3">
            {stats.pendingTasks || 0}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Tasks waiting to be started.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Overdue Tasks
          </h3>

          <h2 className="text-3xl font-bold text-red-500 mt-3">
            {stats.overdueTasks || 0}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Tasks that missed their deadline.
          </p>
        </div>

      </div>

    </div>
  );
};

export default TaskDashboard;
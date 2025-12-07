import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers, FiMap } from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

// Date formatter
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
};

const COLORS = [
  "#4F46E5",
  "#22C55E",
  "#EC4899",
  "#F59E0B",
  "#06B6D4",
  "#DC2626",
];

const ClientCards = () => {
  const [todaysClients, setTodaysClients] = useState([]);
  const [recentClients, setRecentClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/v1/client/getDashboardData",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );
         console.log(res.data,"4999")
        setTodaysClients(res.data.todaysClients || []);
        setRecentClients(res.data.recentClients || []);
      } catch (err) {
        setError("Failed to load client dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  // Client Type Summary (Pie)
  const typeData = Object.entries(
    recentClients.reduce((acc, client) => {
      acc[client.type || "Unknown"] = (acc[client.type || "Unknown"] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  // Client Location Summary (Bar)
  const locationData = Object.entries(
    recentClients.reduce((acc, client) => {
      acc[client.currentLocation || "Unknown"] =
        (acc[client.currentLocation || "Unknown"] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  return (
    <div className="p-6 space-y-6">

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <FiUsers size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm tracking-wide">Today's Clients</p>
            <h3 className="text-3xl font-bold text-gray-900">{todaysClients.length}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <FiMap size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm tracking-wide">Recent Clients (Last 7 days)</p>
            <h3 className="text-3xl font-bold text-gray-900">{recentClients.length}</h3>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Type Pie Chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Client Type Summary</h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={typeData} outerRadius={100} label>
                  {typeData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Client Location Bar Chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Client Location Summary</h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={locationData}>
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Bar dataKey="value">
                  {locationData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Today's Clients List */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Today's Clients</h3>
        {todaysClients.length === 0 ? (
          <p className="text-gray-500">No clients added today.</p>
        ) : (
          <div className="space-y-3">
            {todaysClients.map((client) => (
              <div
                key={client.id}
                className="flex justify-between p-3 border-b last:border-none"
              >
                <div>
                  <div className="font-semibold text-gray-900">
                    {client.firstName} {client.lastName} ({client.type})
                  </div>
                  <div className="text-sm text-gray-500">
                    Location: <span className="text-gray-700">{client.currentLocation}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Stage: <span className="text-gray-700">{client.stage}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-700 font-medium">{client.phone}</div>
                  <div className="text-xs text-gray-400">{formatDate(client.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Clients List */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Clients (Last 7 days)</h3>
        {recentClients.length === 0 ? (
          <p className="text-gray-500">No recent clients found.</p>
        ) : (
          <div className="space-y-3">
            {recentClients.map((client) => (
              <div
                key={client.id}
                className="flex justify-between p-3 border-b last:border-none"
              >
                <div>
                  <div className="font-semibold text-gray-900">
                    {client.firstName} {client.lastName} ({client.type})
                  </div>
                  <div className="text-sm text-gray-500">
                    Location: <span className="text-gray-700">{client.currentLocation}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Stage: <span className="text-gray-700">{client.stage}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-700 font-medium">{client.phone}</div>
                  <div className="text-xs text-gray-400">{formatDate(client.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCards;

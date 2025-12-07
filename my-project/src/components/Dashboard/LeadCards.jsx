import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers, FiActivity } from "react-icons/fi";
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

const LeadCards = () => {
  const [todaysLeads, setTodaysLeads] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/v1/lead/dasboradData",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        setTodaysLeads(res.data.todaysLeads);
        setRecentLeads(res.data.recentLeads);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  // Lead Status Summary
  const pieData = Object.entries(
    recentLeads.reduce((acc, lead) => {
      acc[lead.leadStatus || "Unknown"] =
        (acc[lead.leadStatus || "Unknown"] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  // Lead Source Summary (Bar)
  const sourcePieData = Object.entries(
    recentLeads.reduce((acc, lead) => {
      acc[lead.leadSource || "Unknown"] =
        (acc[lead.leadSource || "Unknown"] || 0) + 1;
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
            <p className="text-gray-500 text-sm tracking-wide">
              Today's Leads
            </p>
            <h3 className="text-3xl font-bold text-gray-900">
              {todaysLeads.length}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <FiActivity size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm tracking-wide">
              Recent Leads (Last 7 days)
            </p>
            <h3 className="text-3xl font-bold text-gray-900">
              {recentLeads.length}
            </h3>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Lead Status Pie Chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Lead Status Summary
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={pieData} outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Bar Chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Lead Source Summary
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={sourcePieData}>
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Bar dataKey="value">
                  {sourcePieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Today's Leads */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Today's Leads
        </h3>

        {todaysLeads.length === 0 ? (
          <p className="text-gray-500">No leads created today.</p>
        ) : (
          <div className="space-y-3">
            {todaysLeads.map((lead) => (
              <div
                key={lead._id}
                className="flex justify-between p-3 border-b last:border-none"
              >
                <div>
                  <div className="font-semibold text-gray-900">
                    {lead.firstName} {lead.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    Source: <span className="text-gray-700">{lead.leadSource}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Status: <span className="text-gray-700">{lead.leadStatus}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-700 font-medium">
                    {lead.phone}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(lead.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Recent Leads (Last 7 days)
        </h3>

        {recentLeads.length === 0 ? (
          <p className="text-gray-500">No recent leads found.</p>
        ) : (
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div
                key={lead._id}
                className="flex justify-between p-3 border-b last:border-none"
              >
                <div>
                  <div className="font-semibold text-gray-900">
                    {lead.firstName} {lead.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    Source: <span className="text-gray-700">{lead.leadSource}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Status: <span className="text-gray-700">{lead.leadStatus}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-700 font-medium">
                    {lead.phone}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(lead.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default LeadCards;

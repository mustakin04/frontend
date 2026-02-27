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
  const [leads, setLeads] = useState([]);
  const [dateFilter, setDateFilter] = useState("last7");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://crm-api.iatlasstudy.com/api/v1/lead/dasboradData?dateFilter=${dateFilter}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        setLeads(res.data.leads || []);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [dateFilter]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  /* ===== Charts Data ===== */
  const statusData = Object.entries(
    leads.reduce((acc, lead) => {
      acc[lead.leadStatus || "Unknown"] =
        (acc[lead.leadStatus || "Unknown"] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const sourceData = Object.entries(
    leads.reduce((acc, lead) => {
      acc[lead.leadSource || "Unknown"] =
        (acc[lead.leadSource || "Unknown"] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 space-y-6">
      {/* Date Filters */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "Last 7 Days", value: "last7" },
          { label: "Today", value: "today" },
          { label: "Yesterday", value: "yesterday" },
          { label: "This Week", value: "thisWeek" },
          { label: "This Month", value: "thisMonth" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setDateFilter(btn.value)}
            className={`px-4 py-2 rounded-lg border ${
              dateFilter === btn.value
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <FiUsers size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Leads</p>
            <h3 className="text-3xl font-bold">{leads.length}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <FiActivity size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Filter</p>
            <h3 className="text-lg font-semibold capitalize">{dateFilter}</h3>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-3">Lead Status</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusData} dataKey="value" label outerRadius={100}>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-3">Lead Source</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={sourceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {sourceData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold mb-3">Leads</h3>

        {leads.length === 0 ? (
          <p className="text-gray-500">No leads found.</p>
        ) : (
          leads.map((lead) => (
            <div
              key={lead._id}
              className="flex justify-between p-3 border-b last:border-none"
            >
              <div>
                <div className="font-semibold">
                  {lead.firstName} {lead.lastName}
                </div>
                <div className="text-sm text-gray-500">
                  Source: {lead.leadSource} | Status: {lead.leadStatus}
                </div>
              </div>
              <div className="text-right text-sm">
                <div>{lead.phone}</div>
                <div className="text-gray-400">
                  {formatDate(lead.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeadCards;

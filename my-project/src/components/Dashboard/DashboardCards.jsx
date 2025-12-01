import React from "react";
import { FiUsers, FiUserCheck, FiUserPlus, FiFolder, FiDollarSign } from "react-icons/fi";

const DashboardCards = ({ stats }) => {
  const cards = [
    { label: "Total Leads", value: stats.leads, icon: <FiUsers size={24} /> },
    { label: "Total Clients", value: stats.clients, icon: <FiUserCheck size={24} /> },
    { label: "External Clients", value: stats.externalClients, icon: <FiUserPlus size={24} /> },
    { label: "Total Applications", value: stats.applications, icon: <FiFolder size={24} /> },
    { label: "Total Transactions", value: stats.transactions, icon: <FiDollarSign size={24} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow p-4 flex items-center gap-4 hover:shadow-md transition"
        >
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            {card.icon}
          </div>

          <div>
            <p className="text-gray-500 text-sm">{card.label}</p>
            <h3 className="text-2xl font-bold">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;

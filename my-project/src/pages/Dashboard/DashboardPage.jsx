import React from "react";

const DashboardPage = () => {
  const cards = [
    { title: "Total Leads", value: "125" },
    { title: "Total Clients", value: "54" },
    { title: "External Clients", value: "18" },
    { title: "Total Transactions", value: "37" },
    { title: "Total Applications", value: "26" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-white p-5 shadow rounded-xl">
            <h3 className="text-gray-500 text-sm">{c.title}</h3>
            <p className="text-3xl font-bold mt-2">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="mt-8 bg-white p-5 shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-3">Recent Leads</h2>
        <p className="text-gray-500">Data আসলে backend থেকে আসবে...</p>
      </div>
    </div>
  );
};

export default DashboardPage;

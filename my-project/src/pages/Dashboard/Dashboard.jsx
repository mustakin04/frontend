import React, { useState } from "react";
import DashboardCards from "../../components/Dashboard/LeadCards";
import RecentLeads from "../../components/Dashboard/RecentLeads";
import RecentActivities from "../../components/Dashboard/RecentActivities";

const Dashboard = () => {
  const [stats] = useState({
    leads: 120,
    clients: 85,
    externalClients: 12,
    applications: 40,
    transactions: 55,
  });

  const recentLeads = [
    { name: "Ali Hasan", phone: "01234", visaType: "Student", status: "New" },
    { name: "Sara Khan", phone: "09876", visaType: "Work", status: "Follow-up" },
  ];

  const activities = [
    { text: "New lead added: Ali Hasan", time: "2 hours ago" },
    { text: "Application submitted for Sara Khan", time: "5 hours ago" },
    { text: "Payment received from John Doe", time: "1 day ago" },
  ];

  return (
    <div>
      <DashboardCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentLeads leads={recentLeads} />
        <RecentActivities activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;

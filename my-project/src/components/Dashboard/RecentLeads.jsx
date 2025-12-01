import React from "react";

const RecentLeads = ({ leads }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-3">Recent Leads</h2>

      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left text-sm text-gray-500">Name</th>
            <th className="px-4 py-2 text-left text-sm text-gray-500">Phone</th>
            <th className="px-4 py-2 text-left text-sm text-gray-500">Visa</th>
            <th className="px-4 py-2 text-left text-sm text-gray-500">Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.phone}</td>
              <td className="px-4 py-2">{lead.visaType}</td>
              <td className="px-4 py-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentLeads;

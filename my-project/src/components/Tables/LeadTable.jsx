import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";

const LeadTable = ({ leads }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "First Name",
              "Company",
              "Email",
              "Phone",
              "Lead Source",
              "Lead Status",
              "Country",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {leads && leads.length > 0 ? (
            leads.map((lead, idx) => (
              <tr
                key={lead.id || idx}
                className={clsx(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
              >
                <td className="px-6 py-4 whitespace-nowrap">{lead.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.leadSource}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={clsx(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      lead.leadStatus === "New" && "bg-blue-100 text-blue-800",
                      lead.leadStatus === "Contacted" && "bg-yellow-100 text-yellow-800",
                      lead.leadStatus === "Qualified" && "bg-green-100 text-green-800",
                      lead.leadStatus === "Lost" && "bg-red-100 text-red-800"
                    )}
                  >
                    {lead.leadStatus || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.country}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FiEdit2 />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="10"
                className="px-6 py-6 text-center text-gray-500"
              >
                No Leads Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;

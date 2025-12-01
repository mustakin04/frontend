import React from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";

const ApplicationsTable = ({ applications }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Application ID",
              "Client Name",
              "Visa Type",
              "Submission Date",
              "Status",
              "Next Follow-up",
              "Notes",
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
          {applications.map((app, idx) => (
            <tr key={app.id || idx} className={clsx(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}>
              <td className="px-6 py-4 whitespace-nowrap">{app.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{app.clientName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{app.visaType}</td>
              <td className="px-6 py-4 whitespace-nowrap">{app.submissionDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={clsx(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                    app.status === "Pending" && "bg-yellow-100 text-yellow-800",
                    app.status === "Submitted" && "bg-blue-100 text-blue-800",
                    app.status === "Approved" && "bg-green-100 text-green-800",
                    app.status === "Rejected" && "bg-red-100 text-red-800"
                  )}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{app.nextFollowUp}</td>
              <td className="px-6 py-4 whitespace-nowrap">{app.notes}</td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button className="text-blue-500 hover:text-blue-700"><FiEye /></button>
                <button className="text-green-500 hover:text-green-700"><FiEdit2 /></button>
                <button className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;

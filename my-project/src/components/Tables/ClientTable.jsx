import React from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import clsx from "clsx";

const ClientTable = ({ clients }) => {
  return (
    <div className="bg-white shadow rounded-xl">
      {/* Horizontal scroll wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Account",
                "Entity",
                "Type",
                "First Name",
                "Last Name",
                "Email",
                "Phone",
                "Nationality",
                "Current Location",
                "Alternative Name",
                "DOB",
                "Civil Status",
                "Address",
                "Admin1",
                "Admin2",
                "Alt Phone",
                "Pref Service",
                "Stage",
                "Resp Type",
                "Ref Type",
                "Referred By",
                "Next Action",
                "Next Action Date",
                "Agent Promo",
                "Active",
                "Description",
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
            {clients.map((client, idx) => (
              <tr
                key={client._id || idx}
                className={clsx(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
              >
                <td className="px-6 py-4 whitespace-nowrap">{client.account}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.entity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.nationality}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.currentLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.altName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.dob}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.civilStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.admin1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.admin2}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.altPhone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.prefService}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.stage}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.respType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.refType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.referredBy}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.nextAction}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.nextActionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.agentPromo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={clsx(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      client.active === "Yes" && "bg-green-100 text-green-800",
                      client.active === "No" && "bg-red-100 text-red-800"
                    )}
                  >
                    {client.active}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{client.description}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={client.onView}
                  >
                    <FiEye />
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    <FiEdit2 />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientTable;

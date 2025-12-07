import React from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import clsx from "clsx";

const ClientTable = ({ clients }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            <tr>
              {[
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
                "Account",
                "Entity",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
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
                className={clsx(
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50",
                  "hover:bg-indigo-50 transition-colors duration-200"
                )}
              >
                {/* FIRST NAME */}
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                  {client.firstName}
                </td>

                {/* LAST NAME */}
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                  {client.lastName}
                </td>

                {/* OTHER COLUMNS */}
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {client.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {client.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {client.nationality}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {client.currentLocation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {client.altName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {client.dob}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {client.civilStatus}
                </td>

                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                  {client.address}
                </td>

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

                <td className="px-6 py-4">
                  <span
                    className={clsx(
                      "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
                      client.active === "Yes"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    )}
                  >
                    {client.active}
                  </span>
                </td>

                {/* DESCRIPTION */}
                <td className="px-6 py-4 whitespace-normal break-words max-w-[200px]">
                  {client.description}
                </td>

                {/* ACCOUNT */}
                <td className="px-6 py-4 whitespace-nowrap">{client.account}</td>

                {/* ENTITY */}
                <td className="px-6 py-4 whitespace-nowrap">{client.entity}</td>

                {/* ACTIONS */}
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700" onClick={client.onView}>
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

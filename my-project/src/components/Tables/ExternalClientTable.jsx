import React from "react";

const ExternalClientTable = ({ clients }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 text-left">Apprentice Global</th>
            <th className="px-4 py-3 text-left">First Name</th>
            <th className="px-4 py-3 text-left">Last Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone Number</th>
            <th className="px-4 py-3 text-left">Source</th>
          </tr>
        </thead>

        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-4 text-gray-500 italic"
              >
                No external clients found
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr
                key={client._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{client.apprenticeGlobal || "-"}</td>
                <td className="px-4 py-3">{client.firstName}</td>
                <td className="px-4 py-3">{client.lastName}</td>
                <td className="px-4 py-3">{client.email}</td>
                <td className="px-4 py-3">{client.phoneNumber}</td>
                <td className="px-4 py-3">{client.source || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExternalClientTable;

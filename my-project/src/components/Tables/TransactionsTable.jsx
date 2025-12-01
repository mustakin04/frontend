import React from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import clsx from "clsx";

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Transaction ID",
              "Client Name",
              "Service",
              "Total Fee",
              "Paid",
              "Due",
              "Payment Date",
              "Payment Method",
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
          {transactions.map((txn, idx) => (
            <tr key={txn.id || idx} className={clsx(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}>
              <td className="px-6 py-4 whitespace-nowrap">{txn.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{txn.clientName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{txn.serviceName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{txn.totalFee}</td>
              <td className="px-6 py-4 whitespace-nowrap">{txn.paid}</td>
              <td className="px-6 py-4 whitespace-nowrap">{txn.due}</td>
              <td className="px-6 py-4 whitespace-nowrap">{txn.paymentDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{txn.paymentMethod}</td>
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

export default TransactionsTable;

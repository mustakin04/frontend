import React from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";

/**
 * props:
 * - columns: array of { key, label }
 * - data: array of objects
 * - actions: object { onView, onEdit, onDelete } or per-row actions
 */
const ZohoTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={row.id || idx} className={clsx(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}>
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                  {row[col.key]}
                </td>
              ))}

              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                {row.onView && (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={row.onView}
                  >
                    <FiEye />
                  </button>
                )}
                {row.onEdit && (
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={row.onEdit}
                  >
                    <FiEdit2 />
                  </button>
                )}
                {row.onDelete && (
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={row.onDelete}
                  >
                    <FiTrash2 />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ZohoTable;

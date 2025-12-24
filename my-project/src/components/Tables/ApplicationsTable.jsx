import React, { useState } from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";
import ViewApplicationModal from "../Modals/ViewApplicationModal";
import { Link } from "react-router";
import DeleteApplication from "../Modals/DeleteApplication";

const ApplicationsTable = ({ applications, isLoading }) => {
  const [applicationShow, setApplicationShow] = useState(false);
  const [applicationData, setApplicationData] = useState("");
  const [applicationDeleteShow, setApplicationDeleteShow] = useState(false);
  const [applicationID, setApplicationID] = useState(null);
  const [confirm, setConfirm] = useState("");

  const handleApplicationEye = (app) => {
    setApplicationShow(true);
    setApplicationData(app);
  };

  const handleApplicationDeleted = (id) => {
    setApplicationDeleteShow(true);
    setApplicationID(id);
    console.log(id, "ok");
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl relative">
      <table className="min-w-full lg:min-w-[1600px] divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            {[
              "Account",
              "Entity",
              "Ownership",
              "Client",
              "Transaction",
              "Title",
              "Stage",
              "Type",
              "University",
              "Course",
              "Intake Date",
              "Priority",
              "Due Date",
              "Responsible Type",
              "Responsible",
              "Notes",
              "Active",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-6 lg:py-3 text-left text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={18} className="text-center py-10 text-xs sm:text-sm">
                Loading applications...
              </td>
            </tr>
          ) : applications.length > 0 ? (
            applications.map((app, idx) => (
              <tr
                key={app._id || idx}
                className={clsx(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
              >
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.account}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.entity}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.ownership}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.client}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.transaction}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.title}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.stage}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.type}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.university}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.course}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.intakeDate}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.priority}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.dueDate}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.responsibleType}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.responsible}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.notes}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {app.isActive ? "Yes" : "No"}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap">
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 p-1"
                      onClick={() => handleApplicationEye(app)}
                    >
                      <FiEye size={16} className="sm:w-4 sm:h-4" />
                    </button>
                    <button className="text-green-500 hover:text-green-700 p-1">
                      <Link
                        to={`/dashboard/services/applications/updateAplicaiton/${app._id}`}
                      >
                        <FiEdit2 size={16} className="sm:w-4 sm:h-4" />
                      </Link>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => handleApplicationDeleted(app._id)}
                    >
                      <FiTrash2 size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={18} className="text-center py-10 text-xs sm:text-sm">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {applicationShow && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl max-w-3xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
            <ViewApplicationModal
              application={applicationData}
              onClose={() => setApplicationShow(false)}
            />
          </div>
        </div>
      )}

      {applicationDeleteShow && (
        <DeleteApplication
          deleteID={applicationID}
          confirmText="delete"
          inputValue={confirm}
          setInputValue={setConfirm}
          onCancel={() => {
            setApplicationDeleteShow(false);
            setApplicationID(null);
            setConfirm("");
          }}
        />
      )}
    </div>
  );
};

export default ApplicationsTable;
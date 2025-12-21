import React, { useState } from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";
import ViewApplicationModal from "../Modals/ViewApplicationModal";
import { Link } from "react-router";
import DeleteApplication from "../Modals/DeleteApplication";

const ApplicationsTable = ({ applications, isLoading }) => {
  const [applicationShow, setApplicationShow] = useState(false);
  const [applicationData, setApplicationData] = useState("");
  const [applicationDeleteShow,setApplicationDeleteShow]=useState(false)
  const [applicationID,setApplicationID]=useState(null)
   const [confirm,setConfirm]=useState("")
  const handleApplicationEye = (app) => {
    setApplicationShow(true);
    setApplicationData(app);
  };
  
  const handleApplicationDeleted=(id)=>{
       setApplicationDeleteShow(true)
       setApplicationID(id)
       console.log(id,'ok')
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl relative">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={18} className="text-center py-10">
                Loading applications...
              </td>
            </tr>
          ) : applications.length > 0 ? (
            applications.map((app, idx) => (
              <tr
                key={app._id || idx}
                className={clsx(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
              >
                <td className="px-6 py-4 whitespace-nowrap">{app.account}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.entity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.ownership}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.client}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.transaction}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.stage}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.university}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.intakeDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.priority}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.responsibleType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.responsible}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {app.isActive ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleApplicationEye(app)}
                  >
                    <FiEye />
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    <Link to={`/dashboard/services/applications/updateAplicaiton/${app._id}`}><FiEdit2 /></Link>
                  </button>
                  <button className="text-red-500 hover:text-red-700"
                  onClick={()=>handleApplicationDeleted(app._id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={18} className="text-center py-10">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {applicationShow && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl max-w-3xl w-full shadow-lg">
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

import React, { useState } from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";
import ViewExternalClientModal from "../Modals/ViewExternalClientModal";
import DeleteExternalClient from "../Modals/DeleteExternalClient";
const ExternalClientTable = ({ clients }) => {
  const [exShow,setExShow]=useState(false)
  const [deleteShow,setDeleteShow]=useState(false)
  const [exClientData,setExClientData]=useState(null)
  const [deleteId,setDeleteId]=useState(null)
  const [confirm, setConfirm] = useState("");
  const  handleExClient=(client)=>{
          setExShow(true)
          setExClientData(client)
  }
  const handleExDelete=(id)=>{
             setDeleteShow(true)
             setDeleteId(id)
  }
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="min-w-full lg:min-w-[900px] text-sm">
        <thead className="bg-gray-100 border-b sticky top-0 z-10">
          <tr>
            <th className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
              Account
            </th>
            <th className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
              First Name
            </th>
            <th className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
              Last Name
            </th>
            <th className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
              Email
            </th>
            <th className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
              Phone Number
            </th>
            <th className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
              Source
            </th>
            <th className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-6 md:py-8 text-gray-500 italic text-xs sm:text-sm"
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
                <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-3 text-xs sm:text-sm whitespace-nowrap">
                  {client.apprenticeGlobal || "-"}
                </td>
                <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-3 text-xs sm:text-sm whitespace-nowrap">
                  {client.firstName}
                </td>
                <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-3 text-xs sm:text-sm whitespace-nowrap">
                  {client.lastName}
                </td>
                <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-3 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[200px]">
                  {client.email}
                </td>
                <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-3 text-xs sm:text-sm whitespace-nowrap">
                  {client.phoneNumber}
                </td>
                <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-3 text-xs sm:text-sm whitespace-nowrap">
                  {client.source || "-"}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap">
                  <div className="flex gap-1 sm:gap-2">
                    <button className="text-blue-500 hover:text-blue-700 p-1"
                    onClick={()=>handleExClient(client)}>
                      <FiEye size={16} className="sm:w-4 sm:h-4" />
                    </button>
                    <button className="text-green-500 hover:text-green-700 p-1">
                      <Link to={`/dashboard/sales/external/updateExternalClient/${client._id}`}>
                        <FiEdit2 size={16} className="sm:w-4 sm:h-4" />
                      </Link>
                    </button>
                    <button className="text-red-500 hover:text-red-700 p-1"
                    onClick={()=>handleExDelete(client._id)}>
                      <FiTrash2 size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {
        exShow&&(
          <ViewExternalClientModal client={exClientData} onClose={()=>setExShow(false)}></ViewExternalClientModal>
        )
      }
      {
        deleteShow&&(<DeleteExternalClient 
        deleteID={deleteId}
          confirmText="delete"
          inputValue={confirm}
          setInputValue={setConfirm}
          onCancel={() => {
            setDeleteShow(false);
            setDeleteId(null);
            setConfirm("");
          }}/>)
      }
    </div>
  );
};

export default ExternalClientTable;

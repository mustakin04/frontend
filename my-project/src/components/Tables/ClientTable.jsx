import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import clsx from "clsx";
import { Link } from "react-router";
import axios from "axios";
import ViewClientModal from "../Modals/ViewClientModal";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";

const ClientTable = ({ clients }) => {
  const [show, setShow] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [getData, setGetData] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deletedID, setDeletedID] = useState(null);
  const [confirmTextValue, setConfirmTextValue] = useState("");

  const handleClick = (id) => {
    setSelectedID(id);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
    setSelectedID(null);
    setGetData(null);
  };

  useEffect(() => {
    if (!selectedID) return;

    const fetchSingleClient = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://crm-backend-ig92.onrender.com/api/v1/client/getSingleClient/${selectedID}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        setGetData(res.data?.data || res.data);
      } catch (err) {
        console.log("Error loading single client:", err);
      }
    };

    fetchSingleClient();
  }, [selectedID]);

  const handleDeleted = (id) => {
    setDeletedID(id);
    setDeleteShow(true);
    setConfirmTextValue(""); // input clear
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `https://crm-backend-ig92.onrender.com/api/v1/client/deleted/${deletedID}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setDeleteShow(false);
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full lg:min-w-[1800px] divide-y divide-gray-200 table-fixed">
          <thead className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 sticky top-0 z-10">
            <tr>
              {[
                "#",
                "Full Name",
                "Last Name",
                "Email",
                "Phone",
                "Emergency Contact",
                "Emergency Phone",
                "Nationality",
                "Passport",
                "DOB",
                "Civil Status",
                "Current Location",
                "Address",
                "Police Station",
                "District",
                "Responsible Type",
                "Pref Service",
                "Stage",
                "Type",
                "Responsible",
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
                  className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-6 lg:py-3 text-left text-[9px] sm:text-[10px] md:text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap"
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
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 text-xs sm:text-sm">
                  {idx + 1}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.firstName}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.lastName}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.email}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.phone}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.emergencyContact}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.emergencyPhone}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.nationality}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.passport}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.dob}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.civilStatus}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.currentLocation}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.address}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.policeStation}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.district}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.responsibleType}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.prefService}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.stage}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.type}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.responsible}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.refType}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.referredBy}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.nextAction}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.nextActionDate}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 truncate text-xs sm:text-sm">
                  {client.agentPromo}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4">
                  <span
                    className={clsx(
                      "px-1.5 py-0.5 sm:px-2 sm:py-1 inline-flex text-[10px] sm:text-xs leading-5 font-semibold rounded-full",
                      client.active === "Yes"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    )}
                  >
                    {client.active}
                  </span>
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 max-w-[150px] sm:max-w-[200px] md:max-w-[220px] break-words text-xs sm:text-sm">
                  {client.description}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 text-xs sm:text-sm">
                  {client.account}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 text-xs sm:text-sm">
                  {client.entity}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4">
                  <div className="flex gap-1 sm:gap-2 md:gap-3">
                    <button
                      className="text-blue-500 hover:text-blue-700 p-1"
                      onClick={() => handleClick(client._id)}
                    >
                      <FiEye size={16} className="sm:w-4 sm:h-4" />
                    </button>

                    <Link
                      to={`/dashboard/sales/clients/updateClient/${client._id}`}
                      className="text-green-500 hover:text-green-700 p-1"
                    >
                      <FiEdit2 size={16} className="sm:w-4 sm:h-4" />
                    </Link>

                    <button className="text-red-500 hover:text-red-700 p-1">
                      <FiTrash2 
                        onClick={() => handleDeleted(client._id)}
                        size={16} 
                        className="sm:w-4 sm:h-4"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl max-w-3xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
            <ViewClientModal client={getData} onClose={closeModal} />
          </div>
        </div>
      )}

      {deleteShow && (
        <DeleteConfirmationModal
          title="Only admins can delete this client"
          message="Type"
          confirmText="deleted"
          inputValue={confirmTextValue}
          setInputValue={setConfirmTextValue}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteShow(false)}
        />
      )}
    </div>
  );
};

export default ClientTable;
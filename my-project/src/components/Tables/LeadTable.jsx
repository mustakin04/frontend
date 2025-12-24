import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import clsx from "clsx";
import axios from "axios";
import ViewLeadModal from "../Modals/ViewLeadModal";
import UpdateLeadModal from "../Modals/UpdateLeadModal";
import DeleteLeadModal from "../Modals/DeleteLeadModal";

const LeadTable = ({ leads }) => {
  const headers = [
    "#",
    "Lead Owner",
    "Account",
    "Entity",
    "First Name",
    "Last Name",
    "DOB",
    "Passport",
    "Nationality",
    "Civil Status",
    "Email",
    "Phone",
    "Emergency Contact",
    "Emergency Phone",
    "Current Location",
    "Address",
    "Police Station",
    "District",
    "Responsible Type",
    "Pref Service",
    "First Service Pref",
    "Second Service Pref",
    "Campaign Code",
    "Stage",
    "Type",
    "Responsible",
    "Referral Type",
    "Referred By",
    "Next Action",
    "Next Action Date",
    "Agent Promo",
    "Active",
    "Description",
    "Actions",
  ];

  const [showEye, setShowEye] = useState(false);
  const [eyeID, setEyeID] = useState(null);
  const [eyeData, setEyeData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, seteditID] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [confirm, setConfirm] = useState("");

  const closeModal = () => {
    setShowEye(false);
    setEyeID(null);
    setEyeData(null);
  };

  const handleEye = (id) => {
    setShowEye(true);
    setEyeID(id);
  };

  useEffect(() => {
    if (!eyeID) return;

    const fetchSingleClient = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://crm-backend-ig92.onrender.com/api/v1/lead/getSingleLead/${eyeID}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );
        setEyeData(res.data?.lead || res.data);
      } catch (err) {
        console.log("Error loading single client:", err);
      }
    };

    fetchSingleClient();
  }, [eyeID]);

  const closeEditModal = () => {
    setShowEdit(false);
    seteditID(null);
  };

  const handleEdit = async (id) => {
    setShowEdit(true);
    seteditID(id);
  };

  const closeDeleted = () => {
    setDeleteShow(false);
  };

  const handleDeleted = (id) => {
    setDeleteShow(true);
    setDeleteID(id);
  };

  return (
    <div className="relative w-full overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full lg:min-w-[1600px] divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {leads && leads.length > 0 ? (
            leads.map((lead, idx) => (
              <tr
                key={lead.id || idx}
                className={clsx(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
              >
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {idx + 1}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.leadOwner}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.account}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.entity}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.firstName}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.lastName}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.dob}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.passport}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.nationality}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.civilStatus}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.email}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.phone}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.emergencyContact}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.emergencyPhone}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.currentLocation}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.address}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.policeStation}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.district}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.responsibleType}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.prefService}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.firstServicePref}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.secondServicePref}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.campaignCode}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.stage}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.type}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.responsible}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.refType}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.referredBy}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.nextAction}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.nextActionDate}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.agentPromo}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.active}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.description}
                </td>
                <td className="px-2 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap">
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      className="text-green-500 hover:text-green-700 p-1"
                      onClick={() => handleEye(lead._id)}
                    >
                      <FiEye size={16} className="sm:w-4 sm:h-4" />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 p-1"
                      onClick={() => handleEdit(lead._id)}
                    >
                      <FiEdit2 size={16} className="sm:w-4 sm:h-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => handleDeleted(lead._id)}
                    >
                      <FiTrash2 size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="px-6 py-6 text-center text-gray-500"
              >
                No Leads Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showEye && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl max-w-3xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
            <ViewLeadModal lead={eyeData} onClose={closeModal} />
          </div>
        </div>
      )}

      {showEdit && (
        <UpdateLeadModal
          isOpen={showEdit}
          onClose={closeEditModal}
          id={editId}
        />
      )}

      {deleteShow && (
        <DeleteLeadModal
          deleteID={deleteID}
          onCancel={closeDeleted}
          confirmText="delete"
          inputValue={confirm}
          setInputValue={setConfirm}
        />
      )}
    </div>
  );
};

export default LeadTable;
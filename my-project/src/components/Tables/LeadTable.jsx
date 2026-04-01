import React, { useEffect, useState, useRef } from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import clsx from "clsx";
import axios from "axios";
import ViewLeadModal from "../Modals/ViewLeadModal";
import UpdateLeadModal from "../Modals/UpdateLeadModal";
import DeleteLeadModal from "../Modals/DeleteLeadModal";

// ✅ Custom Tooltip Component
const Tooltip = ({ text }) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setVisible(true);
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  if (!text) return <span className="text-gray-400">—</span>;

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-[140px] truncate text-gray-700 cursor-default"
      >
        {text}
      </div>

      {visible && (
        <div
          style={{
            position: "fixed",
            top: pos.y + 14,
            left: pos.x + 12,
            zIndex: 9999,
            pointerEvents: "none",
          }}
          className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl max-w-[280px] break-words leading-relaxed"
        >
          {text}
        </div>
      )}
    </>
  );
};

const LeadTable = ({ leads }) => {
  const headers = [
    // "#",
    "#",
    "Actions",
    "First Name",
    "Highest Education",
    "Passport",
    "Phone",
    "Stage",
    "Next Action",
    "Next Action Date",
    "call count",
    "Description",
    "Email",
    "Address",
    "Account",
    "Entity",
    "DOB",

    "Nationality",
    "Civil Status",
    "Emergency Contact",
    "Emergency Phone",
    "Current Location",
    "Police Station",
    "District",
    "Responsible Type",
    "Pref Service",
    "First Service Pref",
    "Second Service Pref",
    "Campaign Code",
    "Type",
    "Responsible",
    "Referral Type",
    "Referred By",

    "Agent Promo",
    "Active",
    "Lead Owner",
  ];

  const [showEye, setShowEye] = useState(false);
  const [eyeID, setEyeID] = useState(null);
  const [eyeData, setEyeData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, seteditID] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [confirm, setConfirm] = useState("");

  const handleCallLog = async (leadId) => {
    try {
      const token = localStorage.getItem("token");
      //  console.log(leadId,'allsdjkuy')
      await axios.patch(
        `https://crm-api.iatlasstudy.com/api/v1/lead/add-call/${leadId}`,
        {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      alert("Call logged ✅");
    } catch (err) {
      console.error(err);
    }
  };

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
          `https://crm-api.iatlasstudy.com/api/v1/lead/getSingleLead/${eyeID}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          },
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

  const closeDeleted = () => setDeleteShow(false);

  const handleDeleted = (id) => {
    setDeleteShow(true);
    setDeleteID(id);
  };

  return (
    <div className="relative w-full bg-white shadow rounded-xl h-f overflow-auto">
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
                className={clsx(
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50",
                  "hover:bg-gradient-to-r hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 transition-all duration-300",
                )}
              >
                {/* <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {idx + 1}
                </td> */}
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.leadNumber}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap">
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      className="text-green-500 hover:text-green-700 p-1"
                      onClick={() => handleEye(lead._id)}
                    >
                      <FiEye size={16} />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 p-1"
                      onClick={() => handleEdit(lead._id)}
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => handleDeleted(lead._id)}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>

                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.firstName}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.lastName}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.passport}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.phone}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.stage}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.nextAction}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.nextActionDate?.split("T")[0]}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  <button
                    className="text-purple-500 hover:text-purple-700 p-1"
                    onClick={() => handleCallLog(lead._id)}
                  >
                    📞
                  </button>
                </td>
                {/* ✅ Description — Custom Tooltip on Hover */}
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 text-xs sm:text-sm">
                  <Tooltip text={lead.description} />
                </td>
                 <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.email}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.address}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.account}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.entity}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.dob}
                </td>
                {/* password */}
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.nationality}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.civilStatus}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.emergencyContact}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.emergencyPhone}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.currentLocation}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.policeStation}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.district}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.responsibleType}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.prefService}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.firstServicePref}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.secondServicePref}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.campaignCode}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.type}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.responsible}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.refType}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.referredBy}
                </td>

                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.agentPromo}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.active}
                </td>
                <td className="px-2 py-3 sm:px-4 md:px-6 md:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {lead.leadOwner}
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

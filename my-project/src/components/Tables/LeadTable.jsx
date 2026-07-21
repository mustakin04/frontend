import React, { useEffect, useState, useRef } from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import clsx from "clsx";
import axios from "axios";
import ViewLeadModal from "../Modals/ViewLeadModal";
import UpdateLeadModal from "../Modals/UpdateLeadModal";
import DeleteLeadModal from "../Modals/DeleteLeadModal";
import { FiPhone } from "react-icons/fi";

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
        className="w-[120px] truncate text-gray-700 cursor-default"
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

// ── Column group left-border colours (header + td must match) ──────────────
const GROUP = {
  meta: "border-l-2 border-l-slate-300",
  identity: "border-l-2 border-l-violet-300",
  contact: "border-l-2 border-l-sky-300",
  stage: "border-l-2 border-l-amber-300",
  personal: "border-l-2 border-l-emerald-300",
  location: "border-l-2 border-l-rose-300",
  service: "border-l-2 border-l-orange-300",
};

const LeadTable = ({ leads }) => {
  const headers = [
    { label: "#", group: "meta" },
    { label: "Actions", group: "meta" },
    { label: "First Name", group: "identity" },
    { label: "Highest Education", group: "identity" },
    { label: "Passport", group: "identity" },
    { label: "Phone", group: "contact" },
    { label: "Stage", group: "stage" },
    { label: "Next Action", group: "stage" },
    { label: "Next Action Date", group: "stage" },
    { label: "Call Count", group: "stage" },
    { label: "Description", group: "stage" },
    { label: "Email", group: "contact" },
    { label: "Address", group: "contact" },
    { label: "Account", group: "identity" },
    { label: "Entity", group: "identity" },
    { label: "DOB", group: "personal" },
    { label: "Nationality", group: "personal" },
    { label: "Civil Status", group: "personal" },
    { label: "Interested Subject", group: "identity" },
    { label: "Age", group: "personal" },
    { label: "Current Location", group: "location" },
    { label: "Program", group: "identity" },
    { label: "District", group: "location" },
    { label: "Responsible Type", group: "service" },
    { label: "Pref Service", group: "service" },
    { label: "First Service Pref", group: "service" },
    { label: "Second Service Pref", group: "service" },
    { label: "Campaign Code", group: "meta" },
    { label: "Type", group: "meta" },
    { label: "Responsible", group: "meta" },
    { label: "Referral Type", group: "meta" },
    { label: "Interested Subject", group: "meta" },
    { label: "Agent Promo", group: "meta" },
    { label: "Active", group: "meta" },
    { label: "Lead Owner", group: "meta" },
  ];

  const [showEye, setShowEye] = useState(false);
  const [eyeID, setEyeID] = useState(null);
  const [eyeData, setEyeData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, seteditID] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [confirm, setConfirm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [calledButtons, setCalledButtons] = useState({});
  const [selectedLead, setSelectedLead] = useState(null);

  const handleCallLog = async (leadId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://crm-api.iatlasstudy.com/api/v1/lead/add-call/${leadId}`,
        {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      setCalledButtons((prev) => ({
        ...prev,
        [leadId]: true, // অথবা !prev[leadId] দিলে toggle হবে
      }));
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

  const handleRowClick = (id) => {
    setSelectedRow((prev) => (prev === id ? null : id));
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Enter = View Lead
      if (e.key === "Enter" && selectedLead) {
        handleEye(selectedLead._id);
      }

      // Esc = Close সব Modal
      if (e.key === "Escape") {
        closeModal();
        closeEditModal();
        closeDeleted();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLead]);

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
    <div className="relative w-full bg-white shadow rounded-xl overflow-auto">
      <table className="min-w-full lg:min-w-[1600px] divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            {headers.map(({ label, group }) => (
              <th
                key={label}
                className={clsx(
                  "px-2 py-1.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap",
                  GROUP[group],
                )}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {leads && leads.length > 0 ? (
            leads.map((lead, idx) => (
              <tr
                key={lead._id}
                onClick={() => {
                  handleRowClick(lead._id);
                  setSelectedLead(lead);
                }}
                className={clsx(
                  selectedRow === lead._id
                    ? "bg-indigo-100"
                    : idx % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50",

                  "cursor-pointer hover:bg-gradient-to-r hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 transition-all duration-300",
                )}
              >
                {/* # */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px] text-gray-500 font-mono",
                    GROUP.meta,
                  )}
                >
                  {lead.leadNumber}
                </td>

                {/* Actions */}
                <td className={clsx("px-2 py-1 whitespace-nowrap", GROUP.meta)}>
                  <div className="flex gap-1">
                    <button
                      className="text-green-500 hover:text-green-700 p-0.5"
                      onClick={() => handleEye(lead._id)}
                    >
                      <FiEye size={14} />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 p-0.5"
                      onClick={() => handleEdit(lead._id)}
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 p-0.5"
                      onClick={() => handleDeleted(lead._id)}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </td>

                {/* First Name */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.identity)}>
                  <Tooltip text={lead.firstName} />
                </td>

                {/* Highest Education */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.identity)}>
                  <Tooltip text={lead.highesteducation} />
                </td>

                {/* Passport */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.identity,
                  )}
                >
                  {lead.passport}
                </td>

                {/* Phone */}
                <td className={clsx("px-3 py-1  text-[11px]", GROUP.contact)}>
                  {lead.phone}
                </td>

                {/* Stage */}
                <td className={clsx("px-1 py-1 text-[11px]", GROUP.stage)}>
                  <Tooltip text={lead.stage} />
                </td>

                {/* Next Action */}
                <td className={clsx("px-1 py-1 text-[11px]", GROUP.stage)}>
                  <Tooltip text={lead.nextAction} />
                </td>

                {/* Next Action Date */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.stage,
                  )}
                >
                  {lead.nextActionDate?.split("T")[0]}
                </td>

                {/* Call Count */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.stage,
                  )}
                >
                  <button
  onClick={() => handleCallLog(lead._id)}
  className={
    lead.callLogs?.length > 0
      ? "text-green-600"
      : "text-purple-600"
  }
>
  <FiPhone size={16} />
</button>
                </td>

                {/* Description */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.stage)}>
                  <Tooltip text={lead.description} />
                </td>

                {/* Email */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.contact)}>
                  <Tooltip text={lead.email} />
                </td>

                {/* Address */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.contact)}>
                  <Tooltip text={lead.address} />
                </td>

                {/* Account */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.identity,
                  )}
                >
                  {lead.account}
                </td>

                {/* Entity */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.identity,
                  )}
                >
                  {lead.entity}
                </td>

                {/* DOB */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.personal,
                  )}
                >
                  {lead.dob}
                </td>

                {/* Nationality */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.personal)}>
                  <Tooltip text={lead.nationality} />
                </td>

                {/* Civil Status */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.personal,
                  )}
                >
                  {lead.civilStatus}
                </td>

                {/* Emergency Contact */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.identity)}>
                  <Tooltip text={lead.interestate} />
                </td>

                {/* Emergency Phone */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.personal,
                  )}
                >
                  {lead.age}
                </td>

                {/* Current Location */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.location)}>
                  <Tooltip text={lead.currentLocation} />
                </td>

                {/* Police Station */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.identity)}>
                  <Tooltip text={lead.program} />
                </td>

                {/* District */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.location,
                  )}
                >
                  {lead.district}
                </td>

                {/* Responsible Type */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.service,
                  )}
                >
                  {lead.responsibleType}
                </td>

                {/* Pref Service */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.service,
                  )}
                >
                  {lead.prefService}
                </td>

                {/* First Service Pref */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.service)}>
                  <Tooltip text={lead.firstServicePref} />
                </td>

                {/* Second Service Pref */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.service)}>
                  <Tooltip text={lead.secondServicePref} />
                </td>

                {/* Campaign Code */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.meta,
                  )}
                >
                  {lead.campaignCode}
                </td>

                {/* Type */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.meta,
                  )}
                >
                  {lead.type}
                </td>

                {/* Responsible */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.meta)}>
                  <Tooltip text={lead.responsible} />
                </td>

                {/* Referral Type */}
                <td
                  className={clsx(
                    "px-1 py-1 whitespace-nowrap text-[11px]",
                    GROUP.meta,
                  )}
                >
                  {lead.refType}
                </td>

                {/* Interested Subject */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.meta)}>
                  <Tooltip text={lead.referredBy} />
                </td>

                {/* Agent Promo */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.meta,
                  )}
                >
                  {lead.agentPromo}
                </td>

                {/* Active */}
                <td
                  className={clsx(
                    "px-2 py-1 whitespace-nowrap text-[11px]",
                    GROUP.meta,
                  )}
                >
                  {lead.active}
                </td>

                {/* Lead Owner */}
                <td className={clsx("px-2 py-1 text-[11px]", GROUP.meta)}>
                  <Tooltip text={lead.leadOwner} />
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

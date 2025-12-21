import React from "react";
import { Calendar, Edit2, X } from "lucide-react";

export default function ViewApplicationModal({
  application = {},
  onEdit,
  onClose,
  className = "",
}) {
  if (!application || !application._id) return null;

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString();
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-slate-50 via-white to-indigo-50 border border-indigo-200 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {application.title || "Application"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {application.account || "—"} • {application.entity || "—"}
          </p>
        </div>

        <div className="flex gap-3">
          {onEdit && (
            <button
              onClick={() => onEdit(application._id)}
              className="p-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 shadow"
            >
              <Edit2 size={18} />
            </button>
          )}

          {onClose && (
            <button
              onClick={() => onClose(application._id)}
              className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 shadow"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoBox title="Client">
          <p className="font-semibold">{application.client || "—"}</p>
        </InfoBox>

        <InfoBox title="Transaction">
          <p className="font-semibold">{application.transaction || "—"}</p>
        </InfoBox>

        <InfoBox title="Ownership">
          <p className="font-semibold">{application.ownership || "—"}</p>
          <p className="text-sm">Branch: {application.branch || "—"}</p>
        </InfoBox>
      </div>

      {/* Academic / Education */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoBox title="Education">
          <p className="font-semibold">
            University: {application.university || "—"}
          </p>
          <p className="text-sm">Course: {application.course || "—"}</p>
          <p className="text-sm">Intake Date: {application.intakeDate || "—"}</p>
        </InfoBox>

        <InfoBox title="Responsible">
          <p className="font-semibold">{application.responsible || "—"}</p>
          <p className="text-sm">Type: {application.responsibleType || "—"}</p>
        </InfoBox>

        <InfoBox title="Meta">
          <p className="font-semibold">Priority: {application.priority || "—"}</p>
          <p className="text-sm">Due Date: {application.dueDate || "—"}</p>
          <p className="text-sm">Stage: {application.stage || "—"}</p>
          <p className="text-sm">Active: {application.isActive ? "Yes" : "No"}</p>
        </InfoBox>
      </div>

      {/* Notes / Description */}
      {application.notes && (
        <div className="mt-6 bg-white/70 p-4 rounded-xl border">
          <h3 className="text-xs uppercase text-gray-500 font-bold">Notes</h3>
          <p className="mt-2">{application.notes}</p>
        </div>
      )}

      {/* System Info */}
      <div className="mt-6 text-sm text-gray-600">
        <p>Created: {formatDate(application.createdAt)}</p>
        <p>Updated: {formatDate(application.updatedAt)}</p>
      </div>
    </div>
  );
}

/* Reusable Info Box */
const InfoBox = ({ title, children }) => (
  <div className="bg-white/70 p-4 rounded-xl shadow-sm border">
    <h3 className="text-xs uppercase text-gray-500 font-bold">{title}</h3>
    <div className="mt-2">{children}</div>
  </div>
);

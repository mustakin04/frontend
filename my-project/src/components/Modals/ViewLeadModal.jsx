import React from "react";
import { Phone, Mail, Edit2, X, Calendar } from "lucide-react";

export default function ViewLeadModal({
  lead = {},
  onEdit,
  onClose,
  className = "",
}) {
  if (!lead || !lead._id) return null;

  const fullName =
    [lead.firstName, lead.middleName, lead.lastName]
      .filter(Boolean)
      .join(" ") || "Unknown";

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString();
  };

  const initials = fullName
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`max-w-3xl mx-auto p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-200 ${className}`}
    >
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
          {initials}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{fullName}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {lead.account || "—"} • {lead.type || "—"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {onEdit && (
                <button
                  onClick={() => onEdit(lead._id)}
                  className="p-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 shadow"
                >
                  <Edit2 size={18} />
                </button>
              )}

              {onClose && (
                <button
                  onClick={() => onClose(lead._id)}
                  className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 shadow"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Contact / Personal / Service */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border">
              <h3 className="text-xs uppercase text-gray-500 font-bold">
                Contact
              </h3>
              <p className="mt-2 font-semibold text-lg">{lead.phone || "—"}</p>
              <p className="text-sm text-gray-600">{lead.email || "—"}</p>

              <div className="mt-3 flex gap-2">
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-1 text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded"
                  >
                    <Phone size={14} /> Call
                  </a>
                )}
                {lead.email && (
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-1 text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded"
                  >
                    <Mail size={14} /> Email
                  </a>
                )}
              </div>
            </div>

            {/* Personal */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border">
              <h3 className="text-xs uppercase text-gray-500 font-bold">
                Personal
              </h3>
              <p className="mt-2 font-semibold">
                {lead.nationality || "—"} • {lead.civilStatus || "—"}
              </p>
              <p className="text-sm">DOB: {lead.dob || "—"}</p>
              <p className="text-sm">Passport: {lead.passport || "—"}</p>
            </div>

            {/* Service */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border">
              <h3 className="text-xs uppercase text-gray-500 font-bold">
                Service
              </h3>
              <p className="mt-2 font-semibold">
                {lead.prefService || "—"}
              </p>
              <p className="text-sm">Stage: {lead.stage || "—"}</p>
              <p className="text-sm">
                Responsible: {lead.responsible || "—"} (
                {lead.responsibleType || "—"})
              </p>
            </div>
          </div>

          {/* Location & Next Action */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-xl border">
              <h3 className="text-xs uppercase text-blue-700 font-bold">
                Location
              </h3>
              <p className="mt-2 font-semibold">
                {lead.currentLocation ||
                  lead.district ||
                  lead.address ||
                  "—"}
              </p>
              <p className="text-sm">
                Police Station: {lead.policeStation || "—"}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border">
              <h3 className="text-xs uppercase text-purple-700 font-bold">
                Next Action
              </h3>

              <div className="flex items-center gap-3 mt-2">
                <Calendar size={18} />
                <div>
                  <p className="font-semibold">
                    {lead.nextAction || "—"}
                  </p>
                  <p className="text-sm">
                    {formatDate(lead.nextActionDate)}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm">
                Created: {formatDate(lead.createdAt)} by{" "}
                {lead.createdBy?.name || "—"}
              </p>
              <p className="text-sm">
                Updated: {formatDate(lead.updatedAt)}
              </p>
            </div>
          </div>

          {/* Notes */}
          {lead.description && (
            <div className="mt-6 bg-white/70 p-4 rounded-xl border">
              <h3 className="text-xs uppercase text-gray-500 font-bold">
                Notes
              </h3>
              <p className="mt-2">{lead.description}</p>
            </div>
          )}

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-4 py-1 text-sm rounded-full bg-green-100 text-green-700">
              Active: {lead.active || "—"}
            </span>
            <span className="px-4 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
              Agent Promo: {lead.agentPromo || "—"}
            </span>
            <span className="px-4 py-1 text-sm rounded-full bg-pink-100 text-pink-700">
              Ref: {lead.refType || "—"} — {lead.referredBy || "—"}
            </span>
            <span className="px-4 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700">
              Entity: {lead.entity || "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

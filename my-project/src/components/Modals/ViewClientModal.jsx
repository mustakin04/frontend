import React from "react";
import { Phone, Mail, Edit2, X, Calendar } from "lucide-react";

export default function ViewClientModal({
  client = {},
  onEdit,
  onClose,
  className = "",
}) {
  if (!client || !client._id) return null;

  const fullName =
    [client.firstName, client.middleName, client.lastName]
      .filter(Boolean)
      .join(" ") || "Unknown";

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString();
  };

  const initials = fullName
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`max-w-3xl mx-auto p-4 sm:p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-200 ${className}`}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg">
          {initials}
        </div>

        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{fullName}</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {client.account} • {client.type}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {onEdit && (
                <button
                  onClick={() => onEdit(client._id)}
                  className="p-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 shadow"
                >
                  <Edit2 size={18} />
                </button>
              )}

              {onClose && (
                <button
                  onClick={() => onClose(client._id)}
                  className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 shadow"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Contact / Personal / Service */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Contact */}
            <div className="bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xs uppercase text-gray-500 font-bold tracking-wide">
                Contact
              </h3>

              <p className="mt-2 font-semibold text-gray-800 text-base sm:text-lg">
                {client.phone || "—"}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">{client.email || "—"}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {client.phone && (
                  <a
                    href={`tel:${client.phone}`}
                    className="flex items-center gap-2 text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                  >
                    <Phone size={14} /> Call
                  </a>
                )}
                {client.email && (
                  <a
                    href={`mailto:${client.email}`}
                    className="flex items-center gap-2 text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                  >
                    <Mail size={14} /> Email
                  </a>
                )}
              </div>
            </div>

            {/* Personal */}
            <div className="bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xs uppercase text-gray-500 font-bold tracking-wide">
                Personal
              </h3>

              <p className="mt-2 font-semibold text-gray-800 text-sm sm:text-base">
                {client.nationality} • {client.civilStatus}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">DOB: {client.dob || "—"}</p>
              <p className="text-gray-600 text-xs sm:text-sm">
                Passport: {client.passport || "—"}
              </p>
            </div>

            {/* Service */}
            <div className="bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xs uppercase text-gray-500 font-bold tracking-wide">
                Service
              </h3>

              <p className="mt-2 font-semibold text-gray-800 text-sm sm:text-base">
                {client.prefService || "—"}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">Stage: {client.stage}</p>
              <p className="text-gray-600 text-xs sm:text-sm">
                Responsible: {client.responsible} ({client.responsibleType})
              </p>
            </div>
          </div>

          {/* Location + Next Action */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Location */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-xl shadow border border-blue-200">
              <h3 className="text-xs uppercase text-blue-700 font-bold tracking-wide">
                Location
              </h3>

              <p className="font-semibold text-gray-900 mt-2 text-sm sm:text-base">
                {client.currentLocation || client.district || client.address}
              </p>
              <p className="text-gray-700 text-xs sm:text-sm">
                Police Station: {client.policeStation || "—"}
              </p>
            </div>

            {/* Next Action */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-xl shadow border border-purple-200">
              <h3 className="text-xs uppercase text-purple-700 font-bold tracking-wide">
                Next Action
              </h3>

              <div className="flex items-center gap-3 mt-2">
                <Calendar size={18} className="text-purple-700" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {client.nextAction || "—"}
                  </p>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    {formatDate(client.nextActionDate)}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500 font-bold uppercase">
                Meta Info
              </p>
              <p className="text-gray-700 text-xs sm:text-sm">
                Created: {formatDate(client.createdAt)} by{" "}
                {client.createdBy?.name || "—"}
              </p>
              <p className="text-gray-700 text-xs sm:text-sm">
                Updated: {formatDate(client.updatedAt)}
              </p>
            </div>
          </div>

          {/* Description */}
          {client.description && (
            <div className="mt-4 sm:mt-6 bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xs uppercase text-gray-500 font-bold tracking-wide">
                Notes
              </h3>
              <p className="mt-2 text-gray-700 text-sm sm:text-base">{client.description}</p>
            </div>
          )}

          {/* Status Tags */}
          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
            <span
              className={`px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full shadow border ${
                client.active === "Yes"
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-red-100 text-red-700 border-red-200"
              }`}
            >
              Active: {client.active}
            </span>

            <span className="px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full shadow border bg-yellow-100 text-yellow-700 border-yellow-200">
              Agent Promo: {client.agentPromo}
            </span>

            <span className="px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full shadow border bg-pink-100 text-pink-700 border-pink-200">
              Ref: {client.refType} — {client.referredBy}
            </span>

            <span className="px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full shadow border bg-indigo-100 text-indigo-700 border-indigo-200">
              Entity: {client.entity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
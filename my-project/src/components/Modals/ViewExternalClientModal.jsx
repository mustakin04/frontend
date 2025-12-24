import React from "react";
import { Phone, Mail, X } from "lucide-react";

export default function ViewExternalClientModal({
  client,
  onClose,
}) {
  if (!client) return null;

  const fullName =
    [client.firstName, client.lastName].filter(Boolean).join(" ") || "Unknown";

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3">
      <div className="w-full max-w-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl shadow-2xl border border-indigo-200 p-5 sm:p-6 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
            {initials}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {fullName}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {client.apprenticeGlobal || "External Client"}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Contact */}
          <div className="bg-white/70 p-4 rounded-xl border shadow-sm">
            <h3 className="text-xs uppercase text-gray-500 font-bold">
              Contact
            </h3>

            <p className="mt-2 font-semibold text-gray-800">
              {client.phoneNumber || "—"}
            </p>
            <p className="text-sm text-gray-600">
              {client.email || "—"}
            </p>

            <div className="mt-3 flex gap-2">
              {client.phoneNumber && (
                <a
                  href={`tel:${client.phoneNumber}`}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg"
                >
                  <Phone size={14} /> Call
                </a>
              )}
              {client.email && (
                <a
                  href={`mailto:${client.email}`}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-lg"
                >
                  <Mail size={14} /> Email
                </a>
              )}
            </div>
          </div>

          {/* Source */}
          <div className="bg-white/70 p-4 rounded-xl border shadow-sm">
            <h3 className="text-xs uppercase text-gray-500 font-bold">
              Source Info
            </h3>

            <p className="mt-2 text-sm text-gray-800">
              <span className="font-semibold">Source:</span>{" "}
              {client.source || "—"}
            </p>

            <p className="mt-1 text-sm text-gray-800">
              <span className="font-semibold">Account:</span>{" "}
              {client.apprenticeGlobal || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

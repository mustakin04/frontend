import React from "react";
import { Calendar, Edit2, X } from "lucide-react";

export default function ViewTransactionModal({
  transaction = {},
  onEdit,
  onClose,
  className = "",
}) {
  if (!transaction || !transaction._id) return null;

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
            {transaction.title || "Transaction"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {transaction.account || "—"} • {transaction.entity || "—"}
          </p>
        </div>

        <div className="flex gap-3">
          {onEdit && (
            <button
              onClick={() => onEdit(transaction._id)}
              className="p-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 shadow"
            >
              <Edit2 size={18} />
            </button>
          )}

          {onClose && (
            <button
              onClick={() => onClose(transaction._id)}
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
          <p className="font-semibold">{transaction.client || "—"}</p>
          <p className="text-sm">Applicant: {transaction.applicantType || "—"}</p>
        </InfoBox>

        <InfoBox title="Service">
          <p className="font-semibold">{transaction.type || "—"}</p>
          <p className="text-sm">Subtype: {transaction.subtype || "—"}</p>
          <p className="text-sm">Stage: {transaction.stage || "—"}</p>
        </InfoBox>

        <InfoBox title="Ownership">
          <p className="font-semibold">{transaction.ownership || "—"}</p>
          <p className="text-sm">Branch: {transaction.branch || "—"}</p>
        </InfoBox>
      </div>

      {/* Academic / Destination */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoBox title="Education">
          <p className="font-semibold">
            University: {transaction.university || "—"}
          </p>
          <p className="text-sm">Courses: {transaction.courses || "—"}</p>
        </InfoBox>

        <InfoBox title="Destination">
          <p className="font-semibold">{transaction.destination || "—"}</p>
        </InfoBox>

        <InfoBox title="Responsible">
          <p className="font-semibold">
            {transaction.responsible || "—"}
          </p>
          <p className="text-sm">
            Type: {transaction.responsibleType || "—"}
          </p>
        </InfoBox>
      </div>

      {/* Payment */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-4 rounded-xl border">
          <h3 className="text-xs uppercase text-green-700 font-bold">
            Payment
          </h3>
          <p className="mt-2 font-semibold">
            Total Fee: {transaction.totalFee ?? "—"}
          </p>
          <p className="text-sm">Paid: {transaction.paid ?? "—"}</p>
          <p className="text-sm">Due: {transaction.due ?? "—"}</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-xl border">
          <h3 className="text-xs uppercase text-purple-700 font-bold">
            Next Action
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <Calendar size={18} />
            <div>
              <p className="font-semibold">
                {transaction.nextAction || "—"}
              </p>
              <p className="text-sm">
                {formatDate(transaction.nextActionDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border">
          <h3 className="text-xs uppercase text-blue-700 font-bold">
            Status
          </h3>
          <p className="mt-2 font-semibold">
            Active: {transaction.isActive ? "Yes" : "No"}
          </p>
          <p className="text-sm">
            Reference: {transaction.isReference ? "Yes" : "No"}
          </p>
        </div>
      </div>

      {/* Description */}
      {transaction.description && (
        <div className="mt-6 bg-white/70 p-4 rounded-xl border">
          <h3 className="text-xs uppercase text-gray-500 font-bold">
            Description
          </h3>
          <p className="mt-2">{transaction.description}</p>
        </div>
      )}

      {/* Meta */}
      <div className="mt-6 text-sm text-gray-600">
        <p>
          Created: {formatDate(transaction.createdAt)} by{" "}
          {transaction.createdBy?.name || "—"}
        </p>
        <p>Updated: {formatDate(transaction.updatedAt)}</p>
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

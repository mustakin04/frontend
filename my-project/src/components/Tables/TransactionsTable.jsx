import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import clsx from "clsx";
import ViewTransactionModal from "../Modals/ViewTransactionModal";
import { Link } from "react-router";
import DeleteTransaction from "../Modals/DeleteTransaction";

const TransactionsTable = ({ transactions = [] }) => {
  const [showTransaction, setShowTransaction] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [showTransactionDeleted, setShowTransactionDeleted] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState(null);
  const [confirm, setConfirm] = useState("");

  const handleTransaction = (txn) => {
    setShowTransaction(true);
    setTransactionData(txn);
  };

  const handleClose = () => {
    setShowTransaction(false);
    setTransactionData(null);
  };

  const handleTransactionDeleted = (id) => {
    setShowTransactionDeleted(true);
    setDeleteTransactionId(id);
  };

  const handleCancel = () => {
    setShowTransactionDeleted(false);
    setDeleteTransactionId(null);
  };

  console.log(transactionData, "id");

  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full lg:min-w-[1800px] divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            {[
              "#",
              "Transaction ID",
              "Client",
              "Title",
              "Type",
              "Total Fee",
              "Paid",
              "Due",
              "Account",
              "Entity",
              "Ownership",
              "Applicant Type",
              "Destination",
              "University",
              "Course",
              "Responsible Type",
              "Responsible",
              "Secondary Responsible",
              "Next Action",
              "Next Action Date",
              "Stage",
              "Status",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-600 uppercase whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {transactions.map((txn, idx) => (
            <tr
              key={txn._id || idx}
              className={clsx(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
            >
              {/* 🔢 INDEX */}
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-4 font-medium text-xs sm:text-sm">
                {idx + 1}
              </td>

              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-4 truncate text-xs sm:text-sm max-w-[100px] sm:max-w-[150px]">
                {txn._id}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-4 truncate text-xs sm:text-sm">
                {txn.client}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-4 truncate text-xs sm:text-sm">
                {txn.title}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-4 truncate text-xs sm:text-sm">
                {txn.type}
              </td>

              {/* 💰 PAYMENT */}
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 font-medium text-xs sm:text-sm">
                {txn.totalFee}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 text-green-600 text-xs sm:text-sm">
                {txn.paid}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 text-red-600 text-xs sm:text-sm">
                {txn.due}
              </td>

              {/* 📌 BASIC INFO */}
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.account}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.entity}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.ownership}
              </td>

              {/* 🎓 STUDY INFO */}
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.applicantType}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.destination}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.university}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.courses}
              </td>

              {/* 👤 RESPONSIBILITY */}
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.responsibleType}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.responsible}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.hasSecondaryResponsible ? "Yes" : "No"}
              </td>

              {/* ⏭ NEXT ACTION */}
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.nextAction}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.nextActionDate}
              </td>

              {/* ⚙ STATUS */}
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.stage}
              </td>
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2 truncate text-xs sm:text-sm">
                {txn.isActive ? "Active" : "Inactive"}
              </td>

              {/* 🔧 ACTIONS */}
              <td className="px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-2">
                <div className="flex gap-1 sm:gap-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 p-1"
                    onClick={() => handleTransaction(txn)}
                  >
                    <FiEye size={16} className="sm:w-4 sm:h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-800 p-1">
                    <Link
                      to={`/dashboard/services/transaction/updateTransaction/${txn._id}`}
                    >
                      <FiEdit2 size={16} className="sm:w-4 sm:h-4" />
                    </Link>
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 p-1"
                    onClick={() => handleTransactionDeleted(txn._id)}
                  >
                    <FiTrash2 size={16} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-xs sm:text-sm">
          No transactions found
        </div>
      )}

      {showTransaction && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl max-w-3xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
            <ViewTransactionModal
              transaction={transactionData}
              onClose={handleClose}
            />
          </div>
        </div>
      )}

      {showTransactionDeleted && (
        <DeleteTransaction
          deleteID={deleteTransactionId}
          onCancel={handleCancel}
          confirmText="delete"
          inputValue={confirm}
          setInputValue={setConfirm}
        />
      )}
    </div>
  );
};

export default TransactionsTable;
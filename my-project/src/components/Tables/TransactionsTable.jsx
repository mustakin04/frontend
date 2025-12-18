import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import clsx from "clsx";
import ViewTransactionModal from "../Modals/ViewTransactionModal";
import { Link } from "react-router";
import DeleteTransaction from "../Modals/DeleteTransaction";

const TransactionsTable = ({ transactions = [] }) => {
  const [showTransaction, setShowTransaction] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [showTransactionDeleted,setShowTransactionDeleted]=useState(false)
  const [deleteTransactionId,setDeleteTransactionId]=useState(null)
  const [confirm,setConfirm]=useState("")
  const handleTransaction = (txn) => {
    setShowTransaction(true);
    setTransactionData(txn);
  };
  const handleClose = () => {
    setShowTransaction(false);
     setTransactionData(null)
  };
  const handleTransactionDeleted=(id)=>{
         setShowTransactionDeleted(true)
         setDeleteTransactionId(id)
  }
  const handleCancel=()=>{
    setShowTransactionDeleted(false)
    setDeleteTransactionId(null)
  }
  console.log(transactionData, "id");
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
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
                className="px-4 py-3 text-left font-semibold text-gray-600 uppercase whitespace-nowrap"
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
              <td className="px-4 py-4 font-medium">{idx + 1}</td>

              <td className="px-4 py-4 truncate">{txn._id}</td>
              <td className="px-4 py-4 truncate">{txn.client}</td>
              <td className="px-4 py-4 truncate">{txn.title}</td>
              <td className="px-4 py-4 truncate">{txn.type}</td>

              {/* 💰 PAYMENT */}
              <td className="px-4 py-2 font-medium">{txn.totalFee}</td>
              <td className="px-4 py-2 text-green-600">{txn.paid}</td>
              <td className="px-4 py-2 text-red-600">{txn.due}</td>

              {/* 📌 BASIC INFO */}
              <td className="px-4 py-2 truncate">{txn.account}</td>
              <td className="px-4 py-2 truncate">{txn.entity}</td>
              <td className="px-4 py-2 truncate">{txn.ownership}</td>

              {/* 🎓 STUDY INFO */}
              <td className="px-4 py-2 truncate">{txn.applicantType}</td>
              <td className="px-4 py-2 truncate">{txn.destination}</td>
              <td className="px-4 py-2 truncate">{txn.university}</td>
              <td className="px-4 py-2 truncate">{txn.courses}</td>

              {/* 👤 RESPONSIBILITY */}
              <td className="px-4 py-2 truncate">{txn.responsibleType}</td>
              <td className="px-4 py-2 truncate">{txn.responsible}</td>
              <td className="px-4 py-2 truncate">
                {txn.hasSecondaryResponsible ? "Yes" : "No"}
              </td>

              {/* ⏭ NEXT ACTION */}
              <td className="px-4 py-2 truncate">{txn.nextAction}</td>
              <td className="px-4 py-2 truncate">{txn.nextActionDate}</td>

              {/* ⚙ STATUS */}
              <td className="px-4 py-2 truncate">{txn.stage}</td>
              <td className="px-4 py-2 truncate">
                {txn.isActive ? "Active" : "Inactive"}
              </td>

              {/* 🔧 ACTIONS */}
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleTransaction(txn)}
                >
                  <FiEye />
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <Link to={`/dashboard/services/transaction/updateTransaction/${txn._id}`}>
                    {" "}
                    <FiEdit2 />
                  </Link>
                </button>
                <button className="text-red-600 hover:text-red-800"
                onClick={()=>handleTransactionDeleted(txn._id)}>
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No transactions found
        </div>
      )}
      {showTransaction && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl max-w-3xl w-full shadow-lg">
            <ViewTransactionModal
              transaction={transactionData}
              onClose={handleClose}
            ></ViewTransactionModal>
          </div>
        </div>
      )}
      {
        showTransactionDeleted&&(<DeleteTransaction 
          deleteID={deleteTransactionId}
          onCancel={handleCancel}
          confirmText="delete"
          inputValue={confirm}
          setInputValue={setConfirm}/>)
      }
    </div>
  );
};

export default TransactionsTable;

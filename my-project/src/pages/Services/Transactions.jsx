import React, { useState } from "react";
import TransactionsTable from "../../components/Tables/TransactionsTable";

const sampleTransactions = [
  {
    id: "TXN001",
    clientName: "Ali Hasan",
    serviceName: "Student Visa",
    totalFee: 2000,
    paid: 1000,
    due: 1000,
    paymentDate: "2025-11-25",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TXN002",
    clientName: "Sara Khan",
    serviceName: "Work Visa",
    totalFee: 3000,
    paid: 3000,
    due: 0,
    paymentDate: "2025-11-20",
    paymentMethod: "Credit Card",
  },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(sampleTransactions);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Transaction
        </button>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default Transactions;

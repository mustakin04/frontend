import React, { useEffect, useState } from "react";
import TransactionsTable from "../../components/Tables/TransactionsTable";
import { Link } from "react-router";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://crm-backend-ig92.onrender.com/api/v1/transaction/getTransactions",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        // console.log(res.data, "API Response");

        // FIXED
        setTransactions(res.data.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchData();
  }, []); // FIXED: added dependency array

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Link to="/dashboard/services/transactions/addtransaction">+ Add Transaction</Link>
        </button>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default Transactions;

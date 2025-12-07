import React, { useEffect, useState } from "react";
import ClientTable from "../../components/Tables/ClientTable";
import ViewClientModal from "../../components/Modals/ViewClientModal";
import { Link } from "react-router";
import axios from "axios";
import ExternalClientTable from "../../components/Tables/ExternalClientTable";

const ExternalClients = () => {
  const [externalClients, setExternalClients] = useState([]);
  useEffect(() => {
    const fetchExternalClients = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/v1/externalClient/getExternalClients",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        setExternalClients(res.data.clients);
        console.log(res.data,"ex")
      } catch (err) {
        console.error("Failed to fetch external clients:", err);
      }
    };

    fetchExternalClients();
  }, []);

  return (
    <div className="p-6 max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">External Clients</h1>

        <Link
          to="/dashboard/sales/external/addExternalClient"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          + Add External Client
        </Link>
      </div>

      <div className="w-full overflow-hidden">
        <ExternalClientTable clients={externalClients} />
      </div>

    
    </div>
  );
};

export default ExternalClients;

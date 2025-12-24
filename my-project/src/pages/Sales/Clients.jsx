import React, { useEffect, useState } from "react";
import ClientTable from "../../components/Tables/ClientTable";
import ViewClientModal from "../../components/Modals/ViewClientModal";
import { Link } from "react-router";
import axios from "axios";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setIsViewModalOpen(true);
  };

  // ✅ Fetch Clients from Backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://crm-backend-ig92.onrender.com/api/v1/client/getClient",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );
        setClients(res.data);
        // console.log(res.data,"client")
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="md:p-6 max-w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link
          to="/dashboard/sales/clients/addClient"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Client
        </Link>
      </div>

      {/* Table Container with proper overflow handling */}
      <div className="w-full overflow-hidden">
        <ClientTable
          clients={clients.map((client) => ({
            ...client,
            onView: () => handleViewClient(client),
          }))}
        />
      </div>

      {/* View Modal */}
      <ViewClientModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        client={selectedClient}
      />
    </div>
  );
};
export default Clients;
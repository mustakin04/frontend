import React, { useEffect, useState } from "react";
import axios from "axios";
import LeadTable from "../../components/Tables/LeadTable";
import AddLeadModal from "../../components/Modals/AddLeadModal";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError(null);

        // Token thakle Authorization header add koro
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/v1/lead/getLead",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true, // if backend uses cookies
          }
        );
         console.log(res,"ik")
        setLeads(res.data || []);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleAddLead = (lead) => {
    setLeads((prev) => [...prev, { ...lead, id: Date.now() }]);
  };

  if (loading) return <div className="p-4">Loading leads...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Lead
        </button>
      </div>

      <LeadTable leads={leads} />

      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLead={handleAddLead}
      />
    </div>
  );
};

export default Leads;

import React, { useEffect, useState } from "react";
import axios from "axios";
import LeadTable from "../../components/Tables/LeadTable";
import AddLeadModal from "../../components/Modals/AddLeadModal";
// import FilterBar from "../../components/Leads/FilterBar";
import { Link } from "react-router";
import FilterBar from "../../components/Tables/FilterBar";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callStats, setCallStats] = useState([]);
  // 🔎 FILTER STATE
  const [filters, setFilters] = useState({
  search: "",
  stage: "",
  owner: "",
  dateFilter: "",
  fromDate: "",
  toDate: "",
  nextActionType: "",
  nextActionDate: "",
});

  console.log("Filters:", filters);
  useEffect(() => {
    fetchLeads();
  }, []);


const fetchCallStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `https://crm-api.iatlasstudy.com/api/v1/lead/call-stats?fromDate=${filters.fromDate}&toDate=${filters.toDate}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    setCallStats(res.data.data);
    // console.log(res.data,"ok ok ok")
  } catch (err) {
    console.error(err);
  }
};

  const fetchLeads = async (customFilters = filters) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      let query = "";
      Object.entries(customFilters).forEach(([key, value]) => {
        if (value) query += `&${key}=${value}`;
      });

      const res = await axios.get(
        `https://crm-api.iatlasstudy.com/api/v1/lead/filter?${query}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        },
      );

      setLeads(
  res.data.leads.sort((a, b) => b.leadNumber - a.leadNumber)
);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    fetchLeads(filters);
    fetchCallStats();
  };

  const resetFilters = () => {
    const reset = {
      search: "",
      stage: "",
      owner: "",
      dateFilter: "",
      fromDate: "",
      toDate: "",
      nextActionType: "",
      nextActionDate: "",
    };
    setFilters(reset);
    fetchLeads(reset);
    setCallStats([]);
  };

  return (
    <div className="h-[840px] flex flex-col space-y-4 overflow-hidden">
      {/* ✅ FILTER BAR */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onReset={resetFilters}
        
      />
      
      {callStats.length > 0 && (
  <div className="bg-purple-50 p-3 rounded-lg border mb-2">
    <h3 className="font-bold mb-2">📞 Call রিপোর্ট</h3>

    {callStats.map((item, i) => (
      <div key={i} className="flex justify-between text-sm">
        <span>{item._id.date}</span>
        <span className="font-bold text-purple-600">
          {item.totalCalls} calls
        </span>
      </div>
    ))}
  </div>
)}


      {/* 🔘 ACTION BUTTONS */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Lead
          </button>

          <Link
            to="/dashboard/sales/leadsUplodad"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block"
          >
            + Upload CSV
          </Link>
        </div>
      </div>

      {/* 📊 TABLE */}
      {loading ? (
        <div>Loading leads...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <LeadTable leads={leads} />
      )}

      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLead={(lead) => setLeads((p) => [ ...p , lead])}
      />
    </div>
  );
};

export default Leads;

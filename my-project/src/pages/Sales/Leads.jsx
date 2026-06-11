import React, { useEffect, useState } from "react";
import axios from "axios";
import LeadTable from "../../components/Tables/LeadTable";
import AddLeadModal from "../../components/Modals/AddLeadModal";
import { Link } from "react-router";
import FilterBar from "../../components/Tables/FilterBar";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callStats, setCallStats] = useState([]);

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

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchCallStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `https://crm-api.iatlasstudy.com/api/v1/lead/call-stats?fromDate=${filters.fromDate}&toDate=${filters.toDate}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setCallStats(res.data.data);
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
        { headers: token ? { Authorization: `Bearer ${token}` } : {}, withCredentials: true }
      );
      setLeads(res.data.leads.sort((a, b) => b.leadNumber - a.leadNumber));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => { fetchLeads(filters); fetchCallStats(); };

  const resetFilters = () => {
    const reset = { search: "", stage: "", owner: "", dateFilter: "", fromDate: "", toDate: "", nextActionType: "", nextActionDate: "" };
    setFilters(reset);
    fetchLeads(reset);
    setCallStats([]);
  };

  return (
    <div className="h-[840px] flex flex-col space-y-2 overflow-hidden">

      {/* FILTER BAR */}
      <FilterBar filters={filters} setFilters={setFilters} onApply={applyFilters} onReset={resetFilters} />

      {/* ACTION ROW + CALL STATS */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <h1 className="text-sm font-bold text-gray-800">Leads</h1>

          {/* Call stats inline */}
          {callStats.length > 0 && (
            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-[10px] text-gray-400">📞</span>
              {callStats.map((item, i) => (
                <span key={i} className="text-[10px] bg-purple-50 border border-purple-200 text-purple-700 px-1.5 py-0.5 rounded-full font-medium">
                  {item._id.date}: {item.totalCalls}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            + Add Lead
          </button>
          <Link
            to="/dashboard/sales/leadsUplodad"
            className="bg-blue-600 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            + Upload CSV
          </Link>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="text-sm text-gray-500">Loading leads...</div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <LeadTable leads={leads} />
      )}

      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLead={(lead) => setLeads((p) => [...p, lead])}
      />
    </div>
  );
};

export default Leads;
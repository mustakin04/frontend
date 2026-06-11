import axios from "axios";
import { Search, Calendar, RefreshCw, Filter } from "lucide-react";
import { useEffect, useState } from "react";

const FilterBar = ({ filters, setFilters, onApply, onReset }) => {
  const update = (k, v) => setFilters((p) => ({ ...p, [k]: v }));
  const [stageOptions, setStageOptions] = useState([]);

  useEffect(() => {
    const fetchStageOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://crm-api.iatlasstudy.com/api/v1/lead/stage",
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        setStageOptions(res.data.stages);
      } catch (err) {
        console.error("Failed to fetch stage options:", err);
      }
    };
    fetchStageOptions();
  }, []);

  const inputCls =
    "px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white h-7 shrink-0";

  const iconInputCls =
    "pl-7 pr-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none h-7 shrink-0";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Single row container */}
      <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto whitespace-nowrap">

        {/* Icon */}
        <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />

        {/* Search */}
        <div className="relative w-44 shrink-0">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            placeholder="Name, email, phone..."
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            className={`w-full ${iconInputCls}`}
          />
        </div>

        {/* Stage */}
        <select
          value={filters.stage}
          onChange={(e) => update("stage", e.target.value)}
          className={`${inputCls} w-28`}
        >
          <option value="">All Stages</option>
          {stageOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Next Action Type */}
        <select
          value={filters.nextActionType}
          onChange={(e) => update("nextActionType", e.target.value)}
          className={`${inputCls} w-28`}
        >
          <option value="">All Actions</option>
          <option value="Call">Call</option>
          <option value="Mail">Mail</option>
          <option value="Meeting">Meeting</option>
          <option value="Follow-up">Follow-up</option>
        </select>

        {/* Quick Date */}
        <select
          value={filters.dateFilter}
          onChange={(e) =>
            setFilters({
              ...filters,
              dateFilter: e.target.value,
              fromDate: "",
              toDate: "",
            })
          }
          className={`${inputCls} w-28`}
        >
          <option value="">Quick Date</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
        </select>

        {/* From Date */}
        <div className="relative flex items-center w-36 shrink-0">
          <span className="absolute left-2 text-[10px] text-gray-400 font-medium">
            From
          </span>
          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({
                ...filters,
                fromDate: e.target.value,
                dateFilter: "",
              })
            }
            className="w-full pl-9 pr-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none h-7"
          />
        </div>

        {/* To Date */}
        <div className="relative flex items-center w-36 shrink-0">
          <span className="absolute left-2 text-[10px] text-gray-400 font-medium">
            To
          </span>
          <input
            type="date"
            value={filters.toDate}
            onChange={(e) =>
              setFilters({
                ...filters,
                toDate: e.target.value,
                dateFilter: "",
              })
            }
            className="w-full pl-6 pr-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none h-7"
          />
        </div>

        {/* Next Action Date */}
        <div className="relative flex items-center w-52 shrink-0">
          <span className="absolute left-2 text-[10px] text-gray-400 font-medium whitespace-nowrap">
            Action Date
          </span>
          <input
            type="date"
            value={filters.nextActionDate}
            onChange={(e) => update("nextActionDate", e.target.value)}
            className="w-full pl-16 pr-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none h-7"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Active filters */}
        {Object.values(filters).filter(Boolean).length > 0 && (
          <span className="text-[10px] font-medium text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full shrink-0">
            {Object.values(filters).filter(Boolean).length} active
          </span>
        )}

        {/* Reset */}
        <button
          onClick={onReset}
          className="flex items-center gap-1 px-2.5 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded shrink-0"
        >
          <RefreshCw className="w-3 h-3" />
          Reset
        </button>

        {/* Apply */}
        <button
          onClick={onApply}
          className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 font-medium shrink-0"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
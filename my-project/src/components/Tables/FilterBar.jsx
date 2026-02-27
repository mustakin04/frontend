import { Search, Calendar, RefreshCw, Filter } from "lucide-react";

const FilterBar = ({ filters, setFilters, onApply, onReset }) => {
  const update = (k, v) => setFilters((p) => ({ ...p, [k]: v }));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={onApply}
            className="flex items-center gap-2 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Filters Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Name, email, or phone..."
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Stage Select */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Stage
          </label>
          <select
            value={filters.stage}
            onChange={(e) => update("stage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option value="">All Stages</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Next Action Type */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Next Action
          </label>
          <select
            value={filters.nextActionType}
            onChange={(e) => update("nextActionType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option value="">All Actions</option>
            <option value="Call">Call</option>
            <option value="Mail">Mail</option>
            <option value="Meeting">Meeting</option>
            <option value="Follow-up">Follow-up</option>
          </select>
        </div>

        {/* Quick Date Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Quick Date Range
          </label>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option value="">Custom Range</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            From Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) =>
                setFilters({ ...filters, fromDate: e.target.value, dateFilter: "" })
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* To Date */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            To Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) =>
                setFilters({ ...filters, toDate: e.target.value, dateFilter: "" })
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Next Action Date */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Next Action Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={filters.nextActionDate}
              onChange={(e) => update("nextActionDate", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Count (Optional) */}
      {Object.values(filters).filter(Boolean).length > 0 && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 text-xs text-blue-700">
          <span className="font-medium">
            {Object.values(filters).filter(Boolean).length} filter(s) active
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
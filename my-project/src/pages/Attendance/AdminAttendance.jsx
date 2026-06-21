import React, { useEffect, useState } from "react";
import { getAllAttendance, getMonthlyReport, getStats } from "../../services/attendanceService";
import AttendanceChart from "../../components/Attendancepart/AttendanceChart";

const AdminAttendance = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({});
  const [monthlyReport, setMonthlyReport] = useState({});
const [selectedMonth, setSelectedMonth] = useState("");
  const [filters, setFilters] = useState({
    date: "",      // single date
    month: "",     // month filter
    userName: "",
    status: "",
  });

  const fetchData = async () => {
    // console.log(filters,"1515")
    try {
      const res = await getAllAttendance(filters);
      setData(res.data);

      const statRes = await getStats();
      setStats(statRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleMonthlyReport = async () => {
  if (!selectedMonth) {
    alert("Please select a month");
    return;
  }

  try {
    const res = await getMonthlyReport(selectedMonth);
    setMonthlyReport(res.data);
    console.log(res.data,"iklkld ik ok")
  } catch (err) {
    console.error(err);
  }
};

// csv part
const downloadMonthlyCSV = () => {
  const rows = Object.entries(monthlyReport).map(([name, val]) => ({
    Name: name,
    Present: val.present,
    Late: val.late,
    Absent: val.absent,
  }));

  const csv = [
    ["Name", "Present", "Late", "Absent"],
    ...rows.map((r) => Object.values(r)),
  ]
    .map((e) => e.join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `monthly-report-${selectedMonth}.csv`;
  a.click();
};

 return (
  <div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
    {/* Header */}
    <h1 className="text-xl md:text-2xl font-bold">
      Admin Attendance
    </h1>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Total Employees</p>
        <h2 className="text-xl md:text-2xl font-bold">
          {stats.totalEmployees || 0}
        </h2>
      </div>

      <div className="bg-green-100 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-600">Present</p>
        <h2 className="text-xl md:text-2xl font-bold text-green-700">
          {stats.present || 0}
        </h2>
      </div>

      <div className="bg-yellow-100 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-600">Late</p>
        <h2 className="text-xl md:text-2xl font-bold text-yellow-700">
          {stats.late || 0}
        </h2>
      </div>

      <div className="bg-red-100 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-600">Absent</p>
        <h2 className="text-xl md:text-2xl font-bold text-red-700">
          {stats.absent || 0}
        </h2>
      </div>
    </div>

    {/* Chart */}
    <div className="bg-white p-4 rounded-xl shadow">
      <AttendanceChart stats={stats} />
    </div>

    {/* Filters */}
   {/* Filters */}
<div className="bg-white p-4 rounded-xl shadow">
  <div className="flex flex-col gap-3 lg:flex-row">
    <input
      type="date"
      name="date"
      value={filters.date}
      onChange={handleFilterChange}
      className="border p-2 rounded w-full lg:w-auto lg:flex-1"
    />

    <input
      type="month"
      name="month"
      value={filters.month}
      onChange={handleFilterChange}
      className="border p-2 rounded w-full lg:w-auto lg:flex-1"
    />

    <input
      type="text"
      name="userName"
      value={filters.userName}
      onChange={handleFilterChange}
      placeholder="Search by Name"
      className="border p-2 rounded w-full lg:w-auto lg:flex-1"
    />

    <select
      name="status"
      value={filters.status}
      onChange={handleFilterChange}
      className="border p-2 rounded w-full lg:w-auto lg:flex-1"
    >
      <option value="">All Status</option>
      <option value="on-time">On-time</option>
      <option value="late">Late</option>
      <option value="absent">Absent</option>
    </select>
  </div>
</div>

   {/* Attendance Table */}
<div className="bg-white rounded-xl shadow">
  <div className=" overflow-x-scroll">
    <table className="w-full border-collapse border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-3 whitespace-nowrap">Name</th>
          <th className="border px-4 py-3 whitespace-nowrap">Date</th>
          <th className="border px-4 py-3 whitespace-nowrap">Check-in</th>
          <th className="border px-4 py-3 whitespace-nowrap">Check-out</th>
          <th className="border px-4 py-3 whitespace-nowrap">Status</th>
          <th className="border px-4 py-3 whitespace-nowrap">Hours</th>
        </tr>
      </thead>

      <tbody>
        {data.length ? (
          data.map((a) => (
            <tr key={a._id}>
              <td className="border px-4 py-3 whitespace-nowrap">
                {a.userId?.name}
              </td>

              <td className="border px-4 py-3 whitespace-nowrap">
                {a.date}
              </td>

              <td className="border px-4 py-3 whitespace-nowrap">
                {a.checkIn || "-"}
              </td>

              <td className="border px-4 py-3 whitespace-nowrap">
                {a.checkOut || "-"}
              </td>

              <td className="border px-4 py-3 whitespace-nowrap">
                {a.status || "-"}
              </td>

              <td className="border px-4 py-3 whitespace-nowrap">
                {a.workHours || "-"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-6">
              No attendance found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    {/* Monthly Report */}
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2 rounded w-full md:w-auto"
        />

        <button
          onClick={handleMonthlyReport}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Generate Monthly Report
        </button>

        <button
          onClick={downloadMonthlyCSV}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Download Monthly CSV
        </button>
      </div>

      {Object.keys(monthlyReport).length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Monthly Report ({selectedMonth})
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 whitespace-nowrap">
                    Name
                  </th>
                  <th className="border p-3 whitespace-nowrap">
                    Present
                  </th>
                  <th className="border p-3 whitespace-nowrap">
                    Late
                  </th>
                  <th className="border p-3 whitespace-nowrap">
                    Absent
                  </th>
                  <th className="border p-3 whitespace-nowrap">
                    Rate
                  </th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(monthlyReport).map(([name, val]) => (
                  <tr key={name}>
                    <td className="border p-3 whitespace-nowrap">
                      {name}
                    </td>

                    <td className="border p-3 whitespace-nowrap">
                      {val.present}
                    </td>

                    <td className="border p-3 whitespace-nowrap">
                      {val.late}
                    </td>

                    <td className="border p-3 whitespace-nowrap">
                      {val.absent}
                    </td>

                    <td className="border p-3 whitespace-nowrap">
                      {val.attendanceRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
export default AdminAttendance;
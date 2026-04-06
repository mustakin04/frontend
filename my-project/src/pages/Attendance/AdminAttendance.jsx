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
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold mb-4">Admin Attendance</h1>

    {/* 🔥 Stats */}
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-xl shadow">
        <p>Total Employees</p>
        <h2>{stats.totalEmployees || 0}</h2>
      </div>
      <div className="bg-green-100 p-4 rounded-xl shadow">
        <p>Present</p>
        <h2>{stats.present || 0}</h2>
      </div>
      <div className="bg-yellow-100 p-4 rounded-xl shadow">
        <p>Late</p>
        <h2>{stats.late || 0}</h2>
      </div>
      <div className="bg-red-100 p-4 rounded-xl shadow">
        <p>Absent</p>
        <h2>{stats.absent || 0}</h2>
      </div>
    </div>

    {/* 📊 Chart */}
    <AttendanceChart stats={stats} />

    {/* 🔥 Filters */}
    <div className="flex gap-4 items-center mb-4">
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleFilterChange}
        className="border p-2 rounded"
      />

      <input
        type="month"
        name="month"
        value={filters.month}
        onChange={handleFilterChange}
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="userName"
        value={filters.userName}
        onChange={handleFilterChange}
        className="border p-2 rounded"
        placeholder="Search by Name"
      />

      <select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
        className="border p-2 rounded"
      >
        <option value="">All Status</option>
        <option value="on-time">On-time</option>
        <option value="late">Late</option>
        <option value="absent">Absent</option>
      </select>
    </div>

    {/* 🔥 Table */}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Check-in</th>
            <th className="border px-4 py-2">Check-out</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Hours</th>
          </tr>
        </thead>

        <tbody>
          {data.length ? (
            data.map((a) => (
              <tr key={a._id}>
                <td className="border px-4 py-2">{a.userId?.name}</td>
                <td className="border px-4 py-2">{a.date}</td>
                <td className="border px-4 py-2">{a.checkIn || "-"}</td>
                <td className="border px-4 py-2">{a.checkOut || "-"}</td>
                <td className="border px-4 py-2">{a.status || "-"}</td>
                <td className="border px-4 py-2">{a.workHours || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No attendance found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* 📅 Monthly Report Section */}
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex gap-4 items-center">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleMonthlyReport}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Monthly Report
        </button>

        <button
          onClick={downloadMonthlyCSV}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Download Monthly CSV
        </button>
      </div>

      {Object.keys(monthlyReport).length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Report ({selectedMonth})
          </h2>

          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Present</th>
                <th className="border p-2">Late</th>
                <th className="border p-2">Absent</th>
                <th className="border p-2">Rate</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(monthlyReport).map(([name, val]) => (
                <tr key={name}>
                  <td className="border p-2">{name}</td>
                  <td className="border p-2">{val.present}</td>
                  <td className="border p-2">{val.late}</td>
                  <td className="border p-2">{val.absent}</td>
                  <td className="border p-2">{val.attendanceRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);
}
export default AdminAttendance;
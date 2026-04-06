import React, { useEffect, useState } from "react";
// import {
//   checkIn,
//   checkOut,
//   getMyAttendance,
// } from "../services/attendanceService";
// import AttendanceCard from "../components/AttendanceCard";
import { useNavigate } from "react-router";
import { checkIn, checkOut, getMyAttendance } from "../../services/attendanceService";
import AttendanceCard from "../../components/Attendancepart/AttendanceCard";

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 Admin redirect
 useEffect(() => {
  if (user?.role === "admin") {
    navigate("/dashboard/admin/attendance");
  }
}, [user, navigate]);

  // load data
 const fetchData = async () => {
  try {
    const res = await getMyAttendance();
    console.log("attendance response:", res.data); // check কি আসছে
    setAttendance(Array.isArray(res.data) ? res.data : []);
    
    const todayDate = new Date().toISOString().split("T")[0];
    const todayData = Array.isArray(res.data)
      ? res.data.find((a) => a.date === todayDate)
      : null;

    setToday(todayData);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      await checkIn();
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      await checkOut();
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
    
    {/* 🔷 Header */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold">Attendance Dashboard</h1>
      <p className="text-sm opacity-90 mt-1">
        Welcome back 👋 Track your daily attendance easily
      </p>
    </div>

    {/* 🔷 Attendance Card */}
    <AttendanceCard
      today={today}
      onCheckIn={handleCheckIn}
      onCheckOut={handleCheckOut}
      loading={loading}
    />

    {/* 🔷 Stats Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
        <p className="text-sm text-gray-500">Total Days</p>
        <h2 className="text-2xl font-bold">{attendance.length}</h2>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
        <p className="text-sm text-gray-500">Present</p>
        <h2 className="text-2xl font-bold text-green-600">
          {attendance.length}
          {/* {attendance.filter(a => a.status === "Present").length} */}
        </h2>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
        <p className="text-sm text-gray-500">Total Hours</p>
        <h2 className="text-2xl font-bold text-blue-600">
          {attendance.reduce((acc, a) => acc + (a.workHours || 0), 0)} hrs
        </h2>
      </div>

    </div>

    {/* 🔷 History Table */}
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Attendance History</h2>
        <span className="text-sm text-gray-500">
          Last {attendance.length} records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3 rounded-l-lg">Date</th>
              <th className="p-3">Check-in</th>
              <th className="p-3">Check-out</th>
              <th className="p-3">Status</th>
              <th className="p-3 rounded-r-lg">Hours</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((a) => (
              <tr
                key={a._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{a.date}</td>
                <td className="p-3">{a.checkIn}</td>
                <td className="p-3">{a.checkOut || "-"}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      a.status === "Present"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>

                <td className="p-3 font-semibold text-blue-600">
                  {a.workHours ? `${a.workHours}h` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default AttendancePage;
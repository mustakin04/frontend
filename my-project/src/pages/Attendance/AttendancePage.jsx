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
  <div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-50 min-h-screen">

    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md">
      <h1 className="text-xl md:text-2xl font-bold">
        Attendance Dashboard
      </h1>

      <p className="text-xs md:text-sm opacity-90 mt-1">
        Welcome back 👋 Track your daily attendance easily
      </p>
    </div>

    <AttendanceCard
      today={today}
      onCheckIn={handleCheckIn}
      onCheckOut={handleCheckOut}
      loading={loading}
    />

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      <div className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow">
        <p className="text-sm text-gray-500">Total Days</p>
        <h2 className="text-xl md:text-2xl font-bold">
          {attendance.length}
        </h2>
      </div>

      <div className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow">
        <p className="text-sm text-gray-500">Present</p>
        <h2 className="text-xl md:text-2xl font-bold text-green-600">
          {attendance.length}
        </h2>
      </div>

      <div className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow">
        <p className="text-sm text-gray-500">Total Hours</p>
        <h2 className="text-xl md:text-2xl font-bold text-blue-600">
          {attendance.reduce((acc, a) => acc + (a.workHours || 0), 0)} hrs
        </h2>
      </div>

    </div>

    {/* History */}
    <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
        <h2 className="text-lg md:text-xl font-semibold">
          Attendance History
        </h2>

        <span className="text-xs md:text-sm text-gray-500">
          Last {attendance.length} records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-left border-collapse">
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
                <td className="p-3 font-medium whitespace-nowrap">
                  {a.date}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {a.checkIn}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {a.checkOut || "-"}
                </td>

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

                <td className="p-3 font-semibold text-blue-600 whitespace-nowrap">
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
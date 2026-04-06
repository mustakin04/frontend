import React from "react";

const AttendanceCard = ({ today, onCheckIn, onCheckOut, loading }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Today's Attendance</h2>

      <p>Check-in: {today?.checkIn || "Not yet"}</p>
      <p>Check-out: {today?.checkOut || "Not yet"}</p>
      <p>Status: {today?.status || "-"}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onCheckIn}
          disabled={loading || today?.checkIn}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Check In
        </button>

        <button
          onClick={onCheckOut}
          disabled={loading || !today?.checkIn || today?.checkOut}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default AttendanceCard;
import React from "react";
import { FiClock } from "react-icons/fi";

const RecentActivities = ({ activities }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-3">Recent Activities</h2>

      <ul className="space-y-3">
        {activities.map((activity, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <FiClock size={20} className="text-blue-600 mt-1" />
            <div>
              <p className="font-medium">{activity.text}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;

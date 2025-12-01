import React, { useState } from "react";
import ApplicationsTable from "../../components/Tables/ApplicationsTable";

const sampleApplications = [
  {
    id: "APP001",
    clientName: "Ali Hasan",
    visaType: "Student",
    submissionDate: "2025-11-25",
    status: "Pending",
    nextFollowUp: "2025-12-01",
    notes: "Documents under review",
  },
  {
    id: "APP002",
    clientName: "Sara Khan",
    visaType: "Work",
    submissionDate: "2025-11-20",
    status: "Approved",
    nextFollowUp: "N/A",
    notes: "Visa approved successfully",
  },
  {
    id: "APP003",
    clientName: "John Doe",
    visaType: "Tourist",
    submissionDate: "2025-11-18",
    status: "Rejected",
    nextFollowUp: "N/A",
    notes: "Missing documents",
  },
];

const Applications = () => {
  const [applications, setApplications] = useState(sampleApplications);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Applications</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Application
        </button>
      </div>

      <ApplicationsTable applications={applications} />
    </div>
  );
};

export default Applications;

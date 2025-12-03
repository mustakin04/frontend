import React, { useEffect, useState } from "react";
import ApplicationsTable from "../../components/Tables/ApplicationsTable";
import { Link } from "react-router";
import axios from "axios";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/v1/application/getapplications",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        console.log(res.data, "API Response");

        // same as code-1
        setApplications(res.data.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchData();
  }, []); // same as code-1

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Applications</h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Link to="/dashboard/services/applications/addapplication">
            + Add Application
          </Link>
        </button>
      </div>

      <ApplicationsTable applications={applications} />
    </div>
  );
};

export default Applications;

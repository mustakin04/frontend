import { useEffect, useState } from "react";
import { getPerformanceReport } from "../../services/taskService";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const res =
        await getPerformanceReport();

      setReports(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Employee Performance Report
        </h2>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          Total Employees : {reports.length}
        </span>

      </div>

      {reports.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No Report Found
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full border">

            <thead className="bg-gray-100">

              <tr>

                <th className="border p-3">
                  Employee
                </th>

                <th className="border p-3 text-center">
                  Assigned
                </th>

                <th className="border p-3 text-center">
                  Completed
                </th>

                <th className="border p-3 text-center">
                  Pending
                </th>

                <th className="border p-3 text-center">
                  In Progress
                </th>

                <th className="border p-3">
                  Completion
                </th>

              </tr>

            </thead>

            <tbody>

              {reports.map((item) => {

                const percentage =
                  Math.round(
                    item.completionRate
                  );

                return (

                  <tr
                    key={
                      item.employeeId
                    }
                    className="hover:bg-gray-50"
                  >

                    <td className="border p-3">

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.email}
                      </p>

                    </td>

                    <td className="border text-center">
                      {item.assignedTasks}
                    </td>

                    <td className="border text-center">

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                        {item.completedTasks}

                      </span>

                    </td>

                    <td className="border text-center">

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

                        {item.pendingTasks}

                      </span>

                    </td>

                    <td className="border text-center">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                        {item.inProgressTasks}

                      </span>

                    </td>

                    <td className="border p-3">

                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

                        <div
                          className="bg-green-500 h-3"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                      <p className="text-center mt-2 text-sm font-medium">

                        {percentage}%

                      </p>

                    </td>

                  </tr>

                );
              })}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default Reports;
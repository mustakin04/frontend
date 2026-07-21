import { useEffect, useState } from "react";
import { getActivityLogs } from "../../services/taskService";

const ActivityTimeline = ({ taskId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, [taskId]);

  const loadLogs = async () => {
    try {
      const res = await getActivityLogs(taskId);
      setLogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-4">
        Activity Timeline
      </h2>

      {logs.length === 0 ? (
        <p>No Activity Found</p>
      ) : (
        <div className="space-y-4">
          {logs.map((log, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-500 pl-4"
            >
              <h4 className="font-semibold">
                {log.user?.name}
              </h4>

              <p>{log.action}</p>

              <small className="text-gray-500">
                {new Date(
                  log.createdAt
                ).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
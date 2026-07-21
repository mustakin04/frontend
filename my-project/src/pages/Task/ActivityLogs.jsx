import { useCallback, useEffect, useState } from "react";
import {
  FiActivity,
  FiClock,
  FiUser,
} from "react-icons/fi";

import { getAllActivityLogs } from "../../services/taskService";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const loadLogs =
    useCallback(async () => {
      try {
        setLoading(true);

        const res =
          await getAllActivityLogs();

        setLogs(res.data || []);
      } catch (err) {
        console.log(err);
        setError(
          "Failed to load activity logs."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
      </div>
    );
  }

  if (!logs.length) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
        <div className="text-6xl mb-4">
          📋
        </div>

        <h2 className="text-2xl font-bold">
          No Activity Found
        </h2>

        <p className="mt-2 text-slate-500">
          Activity logs will appear
          here once users interact
          with tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 p-8 text-white shadow-xl">

        <div className="flex justify-between items-center flex-wrap gap-4">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-white/20 p-4">
              <FiActivity size={36} />
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Activity Logs
              </h1>

              <p className="mt-2 text-blue-100">
                Track every action
                performed on tasks.
              </p>

            </div>

          </div>

          <div className="rounded-2xl bg-white/20 px-6 py-3 text-lg font-semibold">
            {logs.length} Activities
          </div>

        </div>

      </div>

      {/* Timeline */}

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="relative">

          {logs.map((log, index) => (

            <div
              key={index}
              className="relative flex gap-6 pb-8 last:pb-0"
            >

              {/* Timeline Line */}

              {index !== logs.length - 1 && (
                <div className="absolute left-6 top-14 h-full w-0.5 bg-slate-200"></div>
              )}

              {/* Icon */}

              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">

                <FiActivity size={20} />

              </div>

              {/* Content */}

              <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">

                <div className="flex justify-between items-start gap-4 flex-wrap">

                  <div>

                    <h2 className="text-xl font-bold text-slate-800">
                      {log.taskTitle}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                      <FiUser />

                      <span>
                        {log.user?.name}
                      </span>

                    </div>

                    <p className="mt-4 text-slate-700">
                      {log.action}
                    </p>

                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">

                    <FiClock />

                    <span>
                      {new Date(
                        log.createdAt
                      ).toLocaleString()}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default ActivityLogs;
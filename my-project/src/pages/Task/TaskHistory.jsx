import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiCalendar,
  FiClock,
  FiEye,
  FiArchive,
} from "react-icons/fi";

import { getTaskHistory } from "../../services/taskService";

const TaskHistory = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const loadHistory =
    useCallback(async () => {
      try {
        setLoading(true);

        const res =
          await getTaskHistory();

        setTasks(res.data || []);
      } catch (err) {
        console.log(err);
        setError(
          "Failed to load task history."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const statusColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-500 text-white";

      case "Pending":
        return "bg-yellow-500 text-white";

      default:
        return "bg-blue-500 text-white";
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Medium":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

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

  if (!tasks.length) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
        <div className="text-6xl mb-4">
          📂
        </div>

        <h2 className="text-2xl font-bold">
          No Task History
        </h2>

        <p className="text-slate-500 mt-2">
          Your completed and previous
          tasks will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 p-8 text-white shadow-xl">

        <div className="flex justify-between items-center flex-wrap gap-4">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 rounded-2xl p-4">
              <FiArchive size={34} />
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Task History
              </h1>

              <p className="text-blue-100 mt-2">
                Browse all of your task
                history in one place.
              </p>

            </div>

          </div>

          <div className="bg-white/20 px-6 py-3 rounded-2xl font-semibold text-lg">
            {tasks.length} Tasks
          </div>

        </div>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {tasks.map((task) => (
          <div
            key={task._id}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="flex justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition">
                  {task.title}
                </h2>

                <p className="mt-3 text-slate-500 line-clamp-3">
                  {task.description}
                </p>

              </div>

              <Link
                to={`/dashboard/task-management/${task._id}`}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white transition hover:scale-110"
              >
                <FiEye />
              </Link>

            </div>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between">

                <span
                  className={`rounded-full px-4 py-1 text-sm font-medium ${statusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>

                <span
                  className={`rounded-full px-4 py-1 text-sm font-medium ${priorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>

              </div>

              <div className="border-t pt-4 space-y-2 text-sm text-slate-500">

                <div className="flex items-center gap-2">

                  <FiClock />

                  <span>
                    {new Date(
                      task.updatedAt
                    ).toLocaleString()}
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <FiCalendar />

                  <span>
                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      : "No Due Date"}
                  </span>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default TaskHistory;
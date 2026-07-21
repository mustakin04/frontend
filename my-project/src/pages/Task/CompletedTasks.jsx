import { useCallback, useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { getMyTasks } from "../../services/taskService";

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const loadTasks =
    useCallback(async () => {
      try {
        setLoading(true);

        const res =
          await getMyTasks();

        const completed =
          res.data.filter(
            (task) =>
              task.status ===
              "Done"
          );

        setTasks(completed);
      } catch (err) {
        console.log(err);
        setError(
          "Failed to load completed tasks."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg text-success"></span>
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

  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl bg-white shadow-md p-12 text-center">
        <div className="text-6xl mb-4">
          ✅
        </div>

        <h2 className="text-2xl font-bold">
          No Completed Tasks
        </h2>

        <p className="text-gray-500 mt-2">
          Complete your assigned
          tasks to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 p-8 text-white shadow-xl">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 rounded-2xl p-4">
            <FaCheckCircle className="text-4xl" />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Completed Tasks
            </h1>

            <p className="text-green-100 mt-2">
              All successfully
              completed tasks are
              listed here.
            </p>

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
            <div className="flex justify-between items-start">

              <h2 className="text-xl font-bold text-slate-800 group-hover:text-green-600 transition">
                {task.title}
              </h2>

              <span className="badge bg-green-500 text-white border-none">
                Done
              </span>

            </div>

            <p className="mt-4 text-slate-500 line-clamp-3">
              {task.description}
            </p>

            <div className="mt-6 border-t pt-4 flex items-center justify-between">

              <div className="flex items-center gap-2 text-sm text-slate-500">

                <FaCalendarAlt />

                <span>
                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "No Due Date"}
                </span>

              </div>

              <div className="text-green-600 font-semibold">
                ✓ Completed
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CompletedTasks;
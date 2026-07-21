import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyTasks } from "../../services/taskService";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getMyTasks();

      setTasks(data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">No Tasks Found</h2>
        <p className="text-gray-500 mt-2">
          You don't have any assigned tasks yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 p-8 text-white shadow-lg">
  <h1 className="text-4xl font-bold">📋 My Tasks</h1>
  <p className="mt-2 text-blue-100">
    Keep track of your assigned work and complete tasks on time.
  </p>
</div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  {tasks.map((task) => (
    <div
      key={task._id}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition">
            {task.title}
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
            {task.description}
          </p>
        </div>

        <span
          className={`badge text-white px-4 py-3 font-semibold ${
            task.status === "Completed"
              ? "bg-green-500 border-none"
              : task.status === "In Progress"
              ? "bg-amber-500 border-none"
              : "bg-slate-500 border-none"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-dashed border-slate-300"></div>

      {/* Bottom */}
      <div className="flex justify-end">
        <Link
          to={`/dashboard/task-management/${task._id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-600 hover:to-purple-600 hover:shadow-xl"
        >
          View Details
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Decorative Circle */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-200/20 blur-3xl"></div>
    </div>
  ))}
</div>
    </div>
  );
};

export default MyTasks;
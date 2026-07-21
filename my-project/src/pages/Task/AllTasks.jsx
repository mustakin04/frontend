import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiPlus,
} from "react-icons/fi";

import { getAllTasks, deleteTask } from "../../services/taskService";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const res = await getAllTasks();

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!ok) return;

    try {
      await deleteTask(id);

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        status === "" || task.status === status;

      const matchPriority =
        priority === "" || task.priority === priority;

      return (
        matchSearch &&
        matchStatus &&
        matchPriority
      );
    });
  }, [tasks, search, status, priority]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-red-100 text-red-700";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Medium":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="h-11 bg-gray-200 rounded"></div>

            <div className="h-11 bg-gray-200 rounded"></div>

            <div className="h-11 bg-gray-200 rounded"></div>
          </div>

          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-14 bg-gray-100 rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            All Tasks
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Total Tasks :
            <span className="font-semibold text-blue-600 ml-1">
              {filteredTasks.length}
            </span>
          </p>
        </div>

        <Link
          to="/dashboard/task-management/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-5 py-2.5 rounded-lg shadow"
        >
          <FiPlus />
          Create Task
        </Link>
      </div>

      {/* Filters */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="relative">

          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border border-gray-300 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Status</option>

          <option>Pending</option>

          <option>In Progress</option>

          <option>Done</option>
        </select>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="border border-gray-300 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Priority</option>

          <option>Low</option>

          <option>Medium</option>

          <option>High</option>

          <option>Urgent</option>
        </select>
      </div>
            {/* Table */}

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                Title
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                Employee
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                Priority
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                Due Date
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition duration-200"
                >
                  {/* Title */}

                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-800">
                      {task.title}
                    </div>

                    {task.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {task.description}
                      </p>
                    )}
                  </td>

                  {/* Employee */}

                  <td className="px-5 py-4">
                    <span className="font-medium text-gray-700">
                      {task.assignedTo?.name || "Not Assigned"}
                    </span>
                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>

                  {/* Priority */}

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityClass(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  {/* Due Date */}

                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-700 text-sm">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "-"}
                      </span>

                      {task.isOverdue && (
                        <span className="inline-block w-fit bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                          Overdue
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Action */}

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/dashboard/task-management/${task._id}`}
                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-lg transition"
                      >
                        <FiEye size={15} />
                        View
                      </Link>

                      <Link
                        to={`/dashboard/task-management/edit/${task._id}`}
                        className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 py-2 rounded-lg transition"
                      >
                        <FiEdit2 size={15} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(task._id)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-lg transition"
                      >
                        <FiTrash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-14 text-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="text-6xl mb-3">📋</div>

                    <h2 className="text-xl font-semibold text-gray-700">
                      No Tasks Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Try changing the search or filter.
                    </p>

                    <Link
                      to="/dashboard/task-management/create"
                      className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                    >
                      <FiPlus />
                      Create Task
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
          </div>
  );
};

export default AllTasks;
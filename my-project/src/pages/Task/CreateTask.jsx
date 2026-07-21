import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiClipboard,
  FiUser,
  FiFlag,
  FiCalendar,
  FiFileText,
  FiSave,
  FiArrowLeft,
} from "react-icons/fi";

import {
  createTask,
  getUsers,
} from "../../services/taskService";

const CreateTask = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);

      const data = await getUsers();

      setUsers(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const result = await createTask(formData);

      alert(
        result.message ||
          "Task Created Successfully"
      );

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        dueDate: "",
      });
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to create task"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Create New Task
          </h1>

          <p className="text-gray-500 mt-2">
            Assign new tasks to employees quickly and efficiently.
          </p>

        </div>

        <Link
          to="/dashboard/task-management"
          className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FiArrowLeft />
          Back
        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
                {/* ================= Form Fields ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Task Title */}

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Task Title <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <FiClipboard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* Assign Employee */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Assign Employee <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
              disabled={loadingUsers}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">
                {loadingUsers
                  ? "Loading employees..."
                  : "Select Employee"}
              </option>

              {users.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Priority */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Priority
          </label>

          <div className="relative">
            <FiFlag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🔵 Medium</option>
              <option value="High">🟠 High</option>
              <option value="Urgent">🔴 Urgent</option>
            </select>
          </div>
        </div>

        {/* Due Date */}

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Due Date
          </label>

          <div className="relative">
            <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Description */}

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>

          <div className="relative">
            <FiFileText className="absolute left-4 top-5 text-gray-400" />

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write task description..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div className="text-right text-xs text-gray-400 mt-2">
            {formData.description.length} characters
          </div>
        </div>

      </div>
            {/* ===================== Action Buttons ===================== */}

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">

        <button
          type="button"
          onClick={() =>
            setFormData({
              title: "",
              description: "",
              assignedTo: "",
              priority: "Medium",
              dueDate: "",
            })
          }
          className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={submitting}
          className={`px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300
            ${
              submitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            }`}
        >
          {submitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>

              Creating...
            </>
          ) : (
            <>
              <FiSave />
              Create Task
            </>
          )}
        </button>

      </div>

        </form>

      </div>

    </div>
  );
};

export default CreateTask;
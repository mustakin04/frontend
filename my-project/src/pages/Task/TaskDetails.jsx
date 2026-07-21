import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaClipboardList,
  FaExclamationTriangle,
  FaUser,
  FaUserTie,
  FaFlag,
  FaCalendarAlt,
  FaClock,
  FaHistory,
  FaTasks,
  FaSyncAlt,
   FaComments,
  FaStream,
} from "react-icons/fa";
import {
  getTaskDetails,
  updateTaskStatus,
} from "../../services/taskService";

import CommentSection from "../../components/Task/CommentSection";
import ActivityTimeline from "../../components/Task/ActivityTimeline";



const TaskDetails = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTask = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getTaskDetails(id);

      setTask(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load task details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  const refreshTask = () => {
    loadTask();
  };

  const handleStatusChange = async (status) => {
    try {
      await updateTaskStatus(id, status);
      loadTask();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Done":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-slate-100 text-slate-700";

      case "Medium":
        return "bg-blue-100 text-blue-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Urgent":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>

          <p className="mt-4 text-gray-500 font-medium">
            Loading task details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-md">
        <FaExclamationTriangle />
        <span>{error}</span>
      </div>
    );
  }
  return (
  <div className="min-h-screen space-y-6 bg-slate-100 p-4 md:p-6">

    {/* Hero Section */}

    <div className="rounded-3xl bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 p-8 text-white shadow-xl">

      <div className="flex flex-col lg:flex-row justify-between gap-6">

        <div>

          <div className="flex items-center gap-3">

            <FaClipboardList className="text-4xl" />

            <h1 className="text-4xl font-bold">
              {task.title}
            </h1>

          </div>

          <p className="mt-5 max-w-3xl text-blue-50 leading-7">
            {task.description}
          </p>

        </div>

        <div className="flex flex-wrap items-start gap-3">

          <span
            className={`rounded-full px-5 py-2 text-sm font-semibold shadow ${getPriorityColor(
              task.priority
            )}`}
          >
            Priority : {task.priority}
          </span>

          <span
            className={`rounded-full px-5 py-2 text-sm font-semibold shadow ${getStatusColor(
              task.status
            )}`}
          >
            Status : {task.status}
          </span>

          {task.isOverdue && (
            <span className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white animate-pulse">
              🔥 Overdue
            </span>
          )}

        </div>

      </div>

    </div>
    {/* Task Information */}

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

  {/* Assigned To */}

  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <div className="flex items-center gap-3">

      <div className="rounded-xl bg-blue-100 p-3">
        <FaUser className="text-blue-600 text-xl" />
      </div>

      <div>
        <p className="text-sm text-slate-500">
          Assigned To
        </p>

        <h3 className="text-lg font-semibold text-slate-800">
          {task.assignedTo?.name || "N/A"}
        </h3>
      </div>

    </div>

  </div>

  {/* Assigned By */}

  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <div className="flex items-center gap-3">

      <div className="rounded-xl bg-green-100 p-3">
        <FaUserTie className="text-green-600 text-xl" />
      </div>

      <div>
        <p className="text-sm text-slate-500">
          Assigned By
        </p>

        <h3 className="text-lg font-semibold text-slate-800">
          {task.assignedBy?.name || "N/A"}
        </h3>
      </div>

    </div>

  </div>

  {/* Priority */}

  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <div className="flex items-center gap-3">

      <div className="rounded-xl bg-orange-100 p-3">
        <FaFlag className="text-orange-600 text-xl" />
      </div>

      <div>

        <p className="text-sm text-slate-500">
          Priority
        </p>

        <span
          className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>

      </div>

    </div>

  </div>

  {/* Due Date */}

  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <div className="flex items-center gap-3">

      <div className="rounded-xl bg-purple-100 p-3">
        <FaCalendarAlt className="text-purple-600 text-xl" />
      </div>

      <div>

        <p className="text-sm text-slate-500">
          Due Date
        </p>

        <h3 className="text-lg font-semibold text-slate-800">
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No Due Date"}
        </h3>

      </div>

    </div>

  </div>

  {/* Created */}

  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <div className="flex items-center gap-3">

      <div className="rounded-xl bg-cyan-100 p-3">
        <FaClock className="text-cyan-600 text-xl" />
      </div>

      <div>

        <p className="text-sm text-slate-500">
          Created At
        </p>

        <h3 className="text-sm font-semibold text-slate-800">
          {new Date(task.createdAt).toLocaleString()}
        </h3>

      </div>

    </div>

  </div>

  {/* Updated */}

  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <div className="flex items-center gap-3">

      <div className="rounded-xl bg-pink-100 p-3">
        <FaHistory className="text-pink-600 text-xl" />
      </div>

      <div>

        <p className="text-sm text-slate-500">
          Updated At
        </p>

        <h3 className="text-sm font-semibold text-slate-800">
          {new Date(task.updatedAt).toLocaleString()}
        </h3>

      </div>

    </div>

  </div>

</div>
{/* Status & Actions */}

<div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">

  <div className="flex items-center gap-3 mb-6">

    <div className="bg-blue-100 p-3 rounded-xl">
      <FaTasks className="text-blue-600 text-xl" />
    </div>

    <div>

      <h2 className="text-2xl font-bold text-slate-800">
        Task Status
      </h2>

      <p className="text-slate-500 text-sm">
        Monitor and update the current progress of this task.
      </p>

    </div>

  </div>

  <div className="grid gap-6 lg:grid-cols-2">

    {/* Current Status */}

    <div className="rounded-xl bg-slate-50 border p-5">

      <p className="text-sm text-slate-500 mb-3">
        Current Status
      </p>

      <span
        className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold shadow-sm ${getStatusColor(
          task.status
        )}`}
      >
        {task.status}
      </span>

    </div>

    {/* Change Status */}

    <div className="rounded-xl bg-slate-50 border p-5">

      <p className="text-sm text-slate-500 mb-3">
        Update Status
      </p>

      <div className="flex flex-col sm:flex-row gap-3">

        <select
          value={task.status}
          onChange={(e) =>
            handleStatusChange(e.target.value)
          }
          className="
            select
            select-bordered
            w-full
            rounded-xl
            focus:border-blue-500
            focus:outline-none
          "
        >
          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Done">
            Done
          </option>

        </select>

        <button
          onClick={refreshTask}
          className="
            btn
            bg-blue-600
            hover:bg-blue-700
            text-white
            rounded-xl
            border-none
            px-6
          "
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>

    </div>

  </div>

  {/* Progress Indicator */}

  <div className="mt-8">

    <div className="flex justify-between text-sm font-medium mb-2">

      <span className="text-slate-600">
        Progress
      </span>

      <span className="text-slate-600">
        {task.status === "Done"
          ? "100%"
          : task.status === "In Progress"
          ? "50%"
          : "10%"}
      </span>

    </div>

    <progress
      className={`progress w-full ${
        task.status === "Done"
          ? "progress-success"
          : task.status === "In Progress"
          ? "progress-info"
          : "progress-warning"
      }`}
      value={
        task.status === "Done"
          ? 100
          : task.status === "In Progress"
          ? 50
          : 10
      }
      max="100"
    ></progress>

  </div>

</div>
{/* Comments & Activity */}

<div className="grid gap-6 xl:grid-cols-2">

  {/* Comments Card */}

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300">

    {/* Header */}

    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
          <FaComments className="text-2xl text-blue-600" />
        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Comments
          </h2>

          <p className="text-sm text-slate-500">
            Team discussion and feedback
          </p>

        </div>

      </div>

      <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600">
        Discussion
      </span>

    </div>

    {/* Body */}

    <div className="p-6">

      <CommentSection
        taskId={task._id}
        refreshTask={refreshTask}
      />

    </div>

  </div>

  {/* Activity Card */}

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300">

    {/* Header */}

    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
          <FaStream className="text-2xl text-green-600" />
        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Activity Timeline
          </h2>

          <p className="text-sm text-slate-500">
            Recent task activities
          </p>

        </div>

      </div>

      <span className="rounded-full bg-green-50 px-4 py-1 text-sm font-medium text-green-600">
        History
      </span>

    </div>

    {/* Body */}

    <div className="p-6">

      <ActivityTimeline
        taskId={task._id}
        key={task.updatedAt}
      />

    </div>

  </div>

</div>
</div>
);
}
export default TaskDetails;
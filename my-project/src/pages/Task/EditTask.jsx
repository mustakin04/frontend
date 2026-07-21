import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getTaskById, getUsers, updateTask } from "../../services/taskService";

const EditTask = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    loadTask();
    loadUsers();
  }, []);

  const loadTask = async () => {
    const res = await getTaskById(id);

    const task = res.data;

    setFormData({
      title: task.title,

      description: task.description,

      assignedTo: task.assignedTo?._id,

      priority: task.priority,

      status: task.status,

      dueDate: task.dueDate?.slice(0, 10),
    });
  };

  const loadUsers = async () => {
    const res = await getUsers();

    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateTask(id, formData);

    alert("Task Updated Successfully");

    navigate("/dashboard/task-management/all");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border w-full p-3 rounded"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />

        <textarea
          className="border w-full p-3 rounded"
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />

        <select
          className="border w-full p-3 rounded"
          value={formData.assignedTo}
          onChange={(e) =>
            setFormData({
              ...formData,
              assignedTo: e.target.value,
            })
          }
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          className="border w-full p-3 rounded"
          value={formData.priority}
          onChange={(e) =>
            setFormData({
              ...formData,
              priority: e.target.value,
            })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>

        <select
          className="border w-full p-3 rounded"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
        >
          <option>Pending</option>

          <option>In Progress</option>

          <option>Done</option>
        </select>

        <input
          type="date"
          className="border w-full p-3 rounded"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({
              ...formData,
              dueDate: e.target.value,
            })
          }
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;

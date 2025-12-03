import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

export default function NewApplicationModal() {
  const [formData, setFormData] = useState({
    account: "",
    entity: "",
    ownership: "",
    client: "",
    transaction: "",
    title: "",
    stage: "",
    type: "",
    location: "",
    university: "",
    course: "",
    intakeDate: "",
    priority: "",
    dueDate: "",
    responsibleType: "",
    responsible: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      account: "",
      entity: "",
      ownership: "",
      client: "",
      transaction: "",
      title: "",
      stage: "",
      type: "",
      location: "",
      university: "",
      course: "",
      intakeDate: "",
      priority: "",
      dueDate: "",
      responsibleType: "",
      responsible: ""
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/v1/application/createApplication",
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      console.log(res);

      // RESET form after success
      resetForm();

    } catch (err) {
      console.error("Error creating application:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 px-12 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-2">
        <h2 className="text-xl font-semibold">New Application</h2>
      </div>

      {error && (
        <div className="col-span-2 text-red-600 font-semibold">{error}</div>
      )}

      {/* Account */}
      <div>
        <label className="block mb-1">Account *</label>
        <input
          name="account"
          value={formData.account}
          onChange={handleChange}
          placeholder="Apprent Global"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Entity */}
      <div>
        <label className="block mb-1">Entity *</label>
        <input
          name="entity"
          value={formData.entity}
          onChange={handleChange}
          placeholder="Select Branch"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Ownership */}
      <div>
        <label className="block mb-1">Ownership *</label>
        <select
          name="ownership"
          value={formData.ownership}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option value="">Select Ownership</option>
          <option value="Own">Own</option>
          <option value="Company">Company</option>
        </select>
      </div>

      {/* Client */}
      <div>
        <label className="block mb-1">Client *</label>
        <input
          name="client"
          value={formData.client}
          onChange={handleChange}
          placeholder="Select Client ID"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Transaction */}
      <div>
        <label className="block mb-1">Transaction</label>
        <input
          name="transaction"
          value={formData.transaction}
          onChange={handleChange}
          placeholder="Enter Transaction ID"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block mb-1">Title *</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder=""
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Stage */}
      <div>
        <label className="block mb-1">Stage *</label>
        <input
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          placeholder="College-List"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block mb-1">Type *</label>
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Select Type"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block mb-1">Location *</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Country or City"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* University */}
      <div>
        <label className="block mb-1">University *</label>
        <select
          name="university"
          value={formData.university}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select University</option>
        </select>
      </div>

      {/* Course */}
      <div>
        <label className="block mb-1">Courses *</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select Course</option>
        </select>
      </div>

      {/* Intake Date */}
      <div>
        <label className="block mb-1">Intake Date</label>
        <input
          type="date"
          name="intakeDate"
          value={formData.intakeDate}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="block mb-1">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option value="">Normal</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label className="block mb-1">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Responsible Type */}
      <div>
        <label className="block mb-1">Responsible Type</label>
        <select
          name="responsibleType"
          value={formData.responsibleType}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>AZ Shakil | CEO, founder</option>
        </select>
      </div>

      {/* Responsible */}
      <div>
        <label className="block mb-1">Responsible *</label>
        <input
          name="responsible"
          value={formData.responsible}
          onChange={handleChange}
          placeholder="User ID"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Buttons */}
      <div className="col-span-2 flex justify-end gap-4 mt-4">
        <button className="px-4 py-2 bg-gray-400 text-white rounded">
          <Link to="/dashboard/services/applications">Cancel</Link>
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Application"}
        </button>
      </div>
    </div>
  );
}

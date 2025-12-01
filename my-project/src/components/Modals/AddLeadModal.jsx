import React, { useState, useEffect } from "react";
import axios from "axios";

const AddLeadModal = ({ isOpen, onClose, onAddLead }) => {
  const [formData, setFormData] = useState({
    leadOwner: "",
    firstName: "",
    lastName: "",
    title: "",
    phone: "",
    mobile: "",
    leadSource: "",
    industry: "",
    annualRevenue: "",
    email: "",
    company: "",
    leadStatus: "New",
    noOfEmployees: "",
    rating: "",
    skypeId: "",
    secondaryEmail: "",
    twitter: "",
    street: "",
    state: "",
    country: "",
    city: "",
    zipCode: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch logged-in user to set Lead Owner
  useEffect(() => {
  if (!isOpen) return;

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/v1/authentication/me",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      // OPTIONAL CHAINING + FALLBACK
      const user = res.data?.user || res.data;

      if (user) {
        setFormData((prev) => ({
          ...prev,
          leadOwner: `${user.name || "Unknown"} (${user.role || "User"})`,
        }));
      } else {
        console.warn("User not found in response:", res.data);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  fetchUser();
}, [isOpen]);
  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/v1/lead/createLead",
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      onAddLead(res.data.lead || res.data);

      // Reset except leadOwner
      setFormData((prev) => ({
        ...prev,
        firstName: "",
        lastName: "",
        title: "",
        phone: "",
        mobile: "",
        leadSource: "",
        industry: "",
        annualRevenue: "",
        email: "",
        company: "",
        leadStatus: "New",
        noOfEmployees: "",
        rating: "",
        skypeId: "",
        secondaryEmail: "",
        twitter: "",
        street: "",
        state: "",
        country: "",
        city: "",
        zipCode: "",
        description: "",
      }));

      onClose();
    } catch (err) {
      console.error("Error creating lead:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-11/12 max-w-3xl p-6 overflow-y-scroll max-h-[90vh] shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Add Lead</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 font-bold text-lg">
            ✕
          </button>
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Lead Owner */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">Lead Owner</label>
            <input
              type="text"
              name="leadOwner"
              value={formData.leadOwner}
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Lead Status */}
          <div>
            <label className="text-sm font-medium text-gray-700">Lead Status</label>
            <select
              name="leadStatus"
              value={formData.leadStatus}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Lead Source */}
          <div>
            <label className="text-sm font-medium text-gray-700">Lead Source</label>
            <select
              name="leadSource"
              value={formData.leadSource}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Source</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Employee Referral">Employee Referral</option>
              <option value="External Referral">External Referral</option>
              <option value="Online Store">Online Store</option>
              <option value="X (Twitter)">X (Twitter)</option>
              <option value="Facebook">Facebook</option>
              <option value="Partner">Partner</option>
              <option value="Public Relations">Public Relations</option>
              <option value="Sales Email Alias">Sales Email Alias</option>
              <option value="Seminar Partner">Seminar Partner</option>
              <option value="Internal Seminar">Internal Seminar</option>
              <option value="Trade Show">Trade Show</option>
              <option value="Web Download">Web Download</option>
              <option value="Web Research">Web Research</option>
              <option value="Chat">Chat</option>
            </select>
          </div>

          {/* Street */}
          <div>
            <label className="text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* State */}
          <div>
            <label className="text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Country */}
          <div>
            <label className="text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Zip */}
          <div>
            <label className="text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-md px-3 py-2"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Adding..." : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;

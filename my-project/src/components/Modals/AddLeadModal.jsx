import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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

  const inputBase =
    "w-full p-3 rounded-xl border-[3px] border-slate-800 bg-white shadow-[6px_6px_0_0_#1e293b] focus:outline-none focus:ring-4 focus:ring-indigo-300";

  const selectBase =
    "w-full p-3 rounded-xl border-[3px] border-slate-800 bg-white shadow-[6px_6px_0_0_#1e293b] focus:outline-none focus:ring-4 focus:ring-indigo-300";

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

        const user = res.data?.user || res.data;

        if (user) {
          setFormData((prev) => ({
            ...prev,
            leadOwner: `${user.name || "Unknown"} (${user.role || "User"})`,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [isOpen]);

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
   console.log(formData,"84")
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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-[#fefaf5] rounded-2xl w-full max-w-7xl p-10 grid grid-cols-1 md:grid-cols-2 gap-6 border-[3px] border-slate-800 shadow-[10px_10px_0_0_#1e293b] max-h-[90vh] overflow-y-scroll"
      >
        {/* Header */}
        <div className="col-span-2 flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-slate-900">Add Lead</h2>
          <button
            onClick={onClose}
            className="px-6 py-2 text-slate-900 bg-white border-[3px] border-slate-800 rounded-xl shadow-[5px_5px_0_0_#1e293b]"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="col-span-2 text-red-600 font-semibold">{error}</div>
        )}

        {/* ----------- Form Fields -------------- */}

        <div className="col-span-2">
          <label className="block mb-1 font-bold">Lead Owner</label>
          <input
            name="leadOwner"
            value={formData.leadOwner}
            readOnly
            className={inputBase + " bg-gray-100"}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">Mobile</label>
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">Company</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">Lead Status</label>
          <select
            name="leadStatus"
            value={formData.leadStatus}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-bold">Lead Source</label>
          <select
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            className={selectBase}
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

        <div>
          <label className="block mb-1 font-bold">Street</label>
          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">City</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">State</label>
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">Country</label>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">Zip Code</label>
          <input
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block mb-1 font-bold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={inputBase}
          />
        </div>

        {/* Submit */}
        <div className="col-span-2 flex justify-end mt-4">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 font-extrabold text-white bg-indigo-600 rounded-xl border-[3px] border-indigo-900 shadow-[6px_6px_0_0_#312e81] transition-all hover:-translate-y-1"
          >
            {loading ? "Adding..." : "Add Lead"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddLeadModal;

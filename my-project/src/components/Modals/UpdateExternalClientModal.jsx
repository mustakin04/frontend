import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function UpdateExternalClientModal() {
  const { id } = useParams();

  const initialState = {
    apprenticeGlobal: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    source: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputBase =
    "w-full p-3 rounded-xl border-[3px] border-slate-800 bg-white shadow-[6px_6px_0_0_#1e293b] focus:outline-none focus:ring-4 focus:ring-indigo-300";



  /* ------------------ HANDLE CHANGE ------------------ */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ------------------ UPDATE CLIENT ------------------ */
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://crm-backend-ig92.onrender.com/api/v1/externalClient/updateExternalClient/${id}`,
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      alert("External Client Updated Successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 border-[3px] border-slate-800 rounded-2xl bg-[#fefaf5]"
    >
      {/* HEADER */}
      <div className="col-span-1 md:col-span-2 flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Update External Client
        </h2>

        <motion.button
          whileTap={{ scale: 0.92 }}
          className="px-6 py-2 bg-white border-[3px] border-slate-800 rounded-xl"
        >
          <Link to="/dashboard/sales/external">Cancel</Link>
        </motion.button>
      </div>

      {error && (
        <div className="col-span-1 md:col-span-2 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* ACCOUNT */}
      <div>
        <label className="block mb-1 font-bold text-sm">Account</label>
        <input
          name="apprenticeGlobal"
          value={formData.apprenticeGlobal}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* SOURCE */}
      <div>
        <label className="block mb-1 font-bold text-sm">Lead Source</label>
        <input
          name="source"
          value={formData.source}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* FIRST NAME */}
      <div>
        <label className="block mb-1 font-bold text-sm">First Name</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={inputBase}
        
        />
      </div>

      {/* LAST NAME */}
      <div>
        <label className="block mb-1 font-bold text-sm">Last Name</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={inputBase}
        
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block mb-1 font-bold text-sm">Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputBase}
          
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="block mb-1 font-bold text-sm">Phone Number</label>
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={inputBase}
        
        />
      </div>

      {/* BUTTON */}
      <div className="col-span-1 md:col-span-2 flex justify-end">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleUpdate}
          disabled={loading}
          className="px-6 py-3 font-extrabold text-white bg-indigo-600 rounded-xl border-[3px] border-indigo-900 w-full sm:w-auto"
        >
          {loading ? "Updating..." : "Update Client"}
        </motion.button>
      </div>
    </motion.div>
  );
}

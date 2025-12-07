import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function AddClientModal() {
  const initialState = {
    account: "",
    entity: "",
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    currentLocation: "",
    altName: "",
    dob: "",
    civilStatus: "",
    address: "",
    admin1: "",
    admin2: "",
    altPhone: "",
    prefService: "",
    stage: "",
    respType: "",
    refType: "",
    referredBy: "",
    nextAction: "",
    nextActionDate: "",
    agentPromo: "",
    active: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputBase =
    "w-full p-3 rounded-xl border-[3px] border-slate-800 bg-white shadow-[6px_6px_0_0_#1e293b] focus:outline-none focus:ring-4 focus:ring-indigo-300";

  const selectBase = inputBase;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/v1/client/createClient",
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      console.log("Client added:", res.data);
      setFormData(initialState);
    } catch (err) {
      console.error("Error creating client:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 border-[3px] border-slate-800 rounded-2xl bg-[#fefaf5] shadow-[10px_10px_0_0_#1e293b]"
    >
      <div className="col-span-2 flex justify-between items-center mb-4">
        <h2 className="text-3xl font-extrabold text-slate-900">New Client</h2>
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="px-6 py-2 text-slate-900 bg-white border-[3px] border-slate-800 rounded-xl shadow-[5px_5px_0_0_#1e293b]"
        >
          <Link to="/dashboard/sales/clients">Cancel</Link>
        </motion.button>
      </div>

      {error && <div className="col-span-2 text-red-600 font-semibold">{error}</div>}

      {/* ------- All Fields -------- */}
      {Object.keys(initialState).map((key) => {
        // Render select fields
        if (["type","nationality","currentLocation","civilStatus","stage","respType","refType","active"].includes(key)) {
          return (
            <div key={key}>
              <label className="block mb-1 font-bold">{key.replace(/([A-Z])/g, ' $1')}</label>
              <select name={key} value={formData[key]} onChange={handleChange} className={selectBase}>
                <option value="">Select {key.replace(/([A-Z])/g, ' $1')}</option>
                {/* Specific options */}
                {key === "type" && <><option>Individual</option><option>Company</option></>}
                {key === "nationality" && <><option>Bangladesh</option><option>India</option><option>Pakistan</option></>}
                {key === "currentLocation" && <><option>Dhaka</option><option>Chittagong</option><option>Rajshahi</option></>}
                {key === "civilStatus" && <><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option></>}
                {key === "stage" && <><option>New</option><option>In Progress</option><option>Closed</option></>}
                {key === "respType" && <><option>AZ Shakil | CEO, Founder</option></>}
                {key === "refType" && <><option>Internal</option><option>External</option></>}
                {key === "active" && <><option>Yes</option><option>No</option></>}
              </select>
            </div>
          );
        }

        // Render textarea for description
        if (key === "description") {
          return (
            <div className="col-span-2" key={key}>
              <label className="block mb-1 font-bold">Description</label>
              <textarea
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className={inputBase}
                rows={3}
              />
            </div>
          );
        }

        // Render date input
        if (key === "dob" || key === "nextActionDate") {
          return (
            <div key={key}>
              <label className="block mb-1 font-bold">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input type="date" name={key} value={formData[key]} onChange={handleChange} className={inputBase} />
            </div>
          );
        }

        // Default text input
        return (
          <div key={key}>
            <label className="block mb-1 font-bold">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input name={key} value={formData[key]} onChange={handleChange} className={inputBase} />
          </div>
        );
      })}

      {/* ---------- Buttons ---------- */}
      <div className="col-span-2 flex justify-end gap-4 mt-4">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleClick}
          disabled={loading}
          className="px-6 py-3 font-extrabold text-white bg-indigo-600 rounded-xl border-[3px] border-indigo-900 shadow-[6px_6px_0_0_#312e81] transition-all hover:-translate-y-1"
        >
          {loading ? "Adding..." : "Add Client"}
        </motion.button>
      </div>
    </motion.div>
  );
}

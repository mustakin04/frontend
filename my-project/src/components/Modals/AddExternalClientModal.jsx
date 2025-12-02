import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const AddExternalClientModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    apprenticeGlobal: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    source: "",
  });

  // Input Handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/v1/externalClient/addExternalClient",
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      alert("External Client Added Successfully!");
      navigate("/sales/clients/externalClients");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add external client");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white/90 w-full max-w-lg rounded-2xl shadow-2xl p-8 animate-fadeIn scale-100 border border-gray-200">
        
        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add External Client
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Apprentice Global */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Apprentice Global
            </label>
            <input
              type="text"
              name="apprenticeGlobal"
              value={formData.apprenticeGlobal}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Apprentice Global"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="First Name"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Last Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="+8801XXXXXXXXX"
              required
            />
          </div>

          {/* Source */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Lead Source
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Facebook, Referral, Website..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 pt-4">
            
            {/* Cancel Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-200 transition"
            >
             <Link to="/dashboard/sales/external">Cancel</Link>
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-1/2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>

      {/* Animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AddExternalClientModal;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const AddExternalClientModal = ({ onClose }) => {
  // const navigate = useNavigate();

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
        "https://crm-backend-ig92.onrender.com/api/v1/externalClient/addExternalClient",
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      alert("External Client Added Successfully!");
      // navigate("/sales/clients/externalClients");
      // onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add external client");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-3 sm:p-4 md:p-6">
      <div className="bg-white/90 w-full max-w-sm sm:max-w-md md:max-w-lg rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 animate-fadeIn scale-100 border border-gray-200 max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6 text-center">
          Add External Client
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
          
          {/* Apprentice Global */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Account
            </label>
            <input
              type="text"
              name="apprenticeGlobal"
              value={formData.apprenticeGlobal}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              placeholder="Atlas"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              placeholder="First Name"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              placeholder="Last Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              placeholder="+8801XXXXXXXXX"
              required
            />
          </div>

          {/* Source */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Lead Source
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              placeholder="Facebook, Referral, Website..."
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-3 sm:pt-4">
            
            {/* Cancel Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/2 py-2 sm:py-2.5 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-200 transition text-sm sm:text-base font-medium"
            >
              <Link to="/dashboard/sales/external">Cancel</Link>
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-1/2 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base font-medium"
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
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";

export default function AddClientModal() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        "http://localhost:3000/api/v1/client/createClient", // ✔ correct route
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

     console.log(res,)

      // ✔ Reset all client fields  
      setFormData({
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
      });

    } catch (err) {
      console.error("Error creating client:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 px-12 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div className="col-span-2">
        <h2 className="text-xl font-semibold">New Client</h2>
      </div>

      {error && (
        <div className="col-span-2 text-red-600 font-semibold">
          {error}
        </div>
      )}

      {/* Account */}
      <div>
        <label className="block mb-1">Account *</label>
        <input
          name="account"
          value={formData.account || ""}
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
          value={formData.entity || ""}
          onChange={handleChange}
          placeholder="Branch"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block mb-1">Type</label>
        <select
          name="type"
          value={formData.type || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option value="">Select Type</option>
          <option value="Individual">Individual</option>
        </select>
      </div>

      {/* First Name */}
      <div>
        <label className="block mb-1">First / Middle Name *</label>
        <input
          name="firstName"
          value={formData.firstName || ""}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block mb-1">Last Name *</label>
        <input
          name="lastName"
          value={formData.lastName || ""}
          onChange={handleChange}
          placeholder="Enter Last Name"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1">Email Address *</label>
        <input
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="Enter Email"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-1">Phone Number *</label>
        <input
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Nationality */}
      <div>
        <label className="block mb-1">Nationality *</label>
        <select
          name="nationality"
          value={formData.nationality || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select Country</option>
        </select>
      </div>

      {/* Current Location */}
      <div>
        <label className="block mb-1">Current Location *</label>
        <select
          name="currentLocation"
          value={formData.currentLocation || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select Country</option>
        </select>
      </div>

      {/* Alternative Name */}
      <div>
        <label className="block mb-1">Alternative Name</label>
        <input
          name="altName"
          value={formData.altName || ""}
          onChange={handleChange}
          placeholder="Enter Alternative Name"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block mb-1">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Civil Status */}
      <div>
        <label className="block mb-1">Civil Status</label>
        <select
          name="civilStatus"
          value={formData.civilStatus || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select Civil Status</option>
        </select>
      </div>

      {/* Address */}
      <div>
        <label className="block mb-1">Address</label>
        <input
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          placeholder="Enter Address"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Admin Region 1 */}
      <div>
        <label className="block mb-1">Administrative Region 1</label>
        <select
          name="admin1"
          value={formData.admin1 || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select Admin Region</option>
        </select>
      </div>

      {/* Admin Region 2 */}
      <div>
        <label className="block mb-1">Administrative Region 2</label>
        <select
          name="admin2"
          value={formData.admin2 || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select Admin Region</option>
        </select>
      </div>

      {/* Alternative Phone */}
      <div>
        <label className="block mb-1">Alternative Phone Number</label>
        <input
          name="altPhone"
          value={formData.altPhone || ""}
          onChange={handleChange}
          placeholder="Enter Alternative Phone Number"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* First Preference Service */}
      <div>
        <label className="block mb-1">First Preference Service</label>
        <select
          name="prefService"
          value={formData.prefService || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select Service</option>
        </select>
      </div>

      {/* Stage */}
      <div>
        <label className="block mb-1">Stage *</label>
        <input
          name="stage"
          value={formData.stage || ""}
          onChange={handleChange}
          placeholder="Stage ID"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Responsible Type */}
      <div>
        <label className="block mb-1">Responsible Type *</label>
        <select
          name="respType"
          value={formData.respType || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>AZ Shakil | CEO, Founder</option>
        </select>
      </div>

      {/* Referral Type */}
      <div>
        <label className="block mb-1">Referral Type</label>
        <select
          name="refType"
          value={formData.refType || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select Referral Type</option>
        </select>
      </div>

      {/* Referred By */}
      <div>
        <label className="block mb-1">Referred By</label>
        <input
          name="referredBy"
          value={formData.referredBy || ""}
          onChange={handleChange}
          placeholder="Enter EduxGateway ID"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Next Action */}
      <div>
        <label className="block mb-1">Next Action</label>
        <select
          name="nextAction"
          value={formData.nextAction || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select Next Action</option>
        </select>
      </div>

      {/* Next Action Date */}
      <div>
        <label className="block mb-1">Next Action Date</label>
        <input
          type="date"
          name="nextActionDate"
          value={formData.nextActionDate || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Agent Promotion */}
      <div>
        <label className="block mb-1">Agent Promotion</label>
        <select
          name="agentPromo"
          value={formData.agentPromo || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Select Agent Promotion</option>
        </select>
      </div>

      {/* Active */}
      <div>
        <label className="block mb-1">Is Active?</label>
        <select
          name="active"
          value={formData.active || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      {/* Description */}
      <div className="col-span-2">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Buttons */}
      <div className="col-span-2 flex justify-end gap-4 mt-4">
        <button className="px-4 py-2 bg-gray-400 text-white rounded">
          <Link to="/dashboard/sales/clients">Cancel</Link>
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Client"}
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const UpdateLeadModal = ({ isOpen, onClose ,id }) => {
  if (!isOpen) return null;

  const inputBase =
    "w-full p-3 rounded-xl border-[3px] border-slate-800 bg-white shadow-[6px_6px_0_0_#1e293b] focus:outline-none";
  const selectBase = inputBase;

  // 🔹 State for entire form
  const [formData, setFormData] = useState ({
    leadOwner: "Admin",
    account: "Atlas Study",
    entity: "",
    firstName: "",
    lastName: "",
    dob: "",
    passport: "",
    nationality: "",
    civilStatus: "",
    email: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    currentLocation: "",
    address: "",
    policeStation: "",
    district: "",
    responsibleType: "",
    prefService: "",
    firstServicePref: "",
    secondServicePref: "",
    campaignCode: "",
    stage: "",
    type: "",
    responsible: "",
    refType: "",
    referredBy: "",
    nextAction: "",
    nextActionDate: "",
    agentPromo: "",
    active: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(id,"after")
  const handleSubmit = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(
      `http://localhost:3000/api/v1/lead/updateLead/${id}`,
      formData,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      }
    );
    console.log("Lead updated:", res.data);
    onClose(); // Close modal after successful update
  } catch (error) {
    console.error("Error updating lead:", error);
    alert("Failed to update lead. Please try again.");
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#fefaf5] rounded-2xl w-full max-w-7xl p-10 border-[3px] border-slate-800 max-h-[90vh] overflow-y-scroll"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Update Lead
          </h2>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border-[3px] border-slate-800 rounded-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lead Owner */}
          <div className="col-span-2">
            <label className="font-bold">Lead Owner</label>
            <input
              name="leadOwner"
              disabled
              value={formData.leadOwner}
              onChange={handleChange}
              className={inputBase + " bg-gray-100"}
            />
          </div>

          {/* Account */}
          <div>
            <label className="font-bold">Account</label>
            <input
              name="account"
              disabled
              value={formData.account}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Entity */}
          <div>
            <label className="font-bold">Entity</label>
            <select
              name="entity"
              value={formData.entity}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select Entity</option>
              <option>Dhaka</option>
              <option>China</option>
              <option>Chittagong</option>
              <option>Rajshahi</option>
            </select>
          </div>

          {/* First Name & Last Name */}
          <div>
            <label className="font-bold">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
          <div>
            <label className="font-bold">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* DOB & Passport */}
          <div>
            <label className="font-bold">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
          <div>
            <label className="font-bold">Passport Number</label>
            <input
              name="passport"
              value={formData.passport}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Nationality & Civil Status */}
          <div>
            <label className="font-bold">Nationality</label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select Nationality</option>
              <option>Bangladesh</option>
              <option>India</option>
              <option>Pakistan</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Civil Status</label>
            <select
              name="civilStatus"
              value={formData.civilStatus}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select Status</option>
              <option>Single</option>
              <option>Married</option>
            </select>
          </div>

          {/* Email & Phone */}
          <div>
            <label className="font-bold">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
          <div>
            <label className="font-bold">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="font-bold">Emergency Contact Name</label>
            <input
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
          <div>
            <label className="font-bold">Emergency Phone</label>
            <input
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Location & Address */}
          <div>
            <label className="font-bold">Current Location</label>
            <select
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select Location</option>
              <option>Dhaka</option>
              <option>Chittagong</option>
              <option>Khulna</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Police Station & District */}
          <div>
            <label className="font-bold">Police Station</label>
            <input
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
          <div>
            <label className="font-bold">District</label>
            <input
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Responsible Type */}
          <div>
            <label className="font-bold">Responsible Type</label>
            <select
              name="responsibleType"
              value={formData.responsibleType}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select Type</option>
              <option>Nehal | CEO</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Services */}
          <div>
            <label className="font-bold">Preferred Service</label>
            <select
              name="prefService"
              value={formData.prefService}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select Service</option>
              <option>Student Visa</option>
              <option>Tourist Visa</option>
            </select>
          </div>
          <div>
            <label className="font-bold">First Service Preference</label>
            <select
              name="firstServicePref"
              value={formData.firstServicePref}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select Service</option>
              <option>Student Visa</option>
              <option>Tourist Visa</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Second Service Preference</label>
            <select
              name="secondServicePref"
              value={formData.secondServicePref}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select Service</option>
              <option>Student Visa</option>
              <option>Tourist Visa</option>
            </select>
          </div>

          {/* Campaign Code */}
          <div>
            <label className="font-bold">Campaign Code</label>
            <input
              name="campaignCode"
              value={formData.campaignCode}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Stage, Type, Responsible */}
          <div>
            <label className="font-bold">Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select Stage</option>
              <option>New</option>
              <option>In Progress</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select</option>
              <option>Individual</option>
              <option>Company</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Responsible</label>
            <select
              name="responsible"
              value={formData.responsible}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select</option>
              <option>Nehal</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Referral */}
          <div>
            <label className="font-bold">Referral Type</label>
            <select
              name="refType"
              value={formData.refType}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select</option>
              <option>Internal</option>
              <option>External</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Referred By</label>
            <input
              name="referredBy"
              value={formData.referredBy}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Next Action */}
          <div>
            <label className="font-bold">Next Action</label>
            <select
              name="nextAction"
              value={formData.nextAction}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select Action</option>
              <option>Call</option>
              <option>Mail</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Next Action Date</label>
            <input
              type="date"
              name="nextActionDate"
              value={formData.nextActionDate}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Agent Promotion & Active */}
          <div>
            <label className="font-bold">Agent Promotion</label>
            <select
              name="agentPromo"
              value={formData.agentPromo}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div>
            <label className="font-bold">Is Active?</label>
            <select
              name="active"
              value={formData.active}
              onChange={handleChange}
              className={selectBase}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="font-bold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={inputBase}
            />
          </div>

          {/* Footer */}
          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white border-[3px] border-slate-800 rounded-xl font-bold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-indigo-600 text-white border-[3px] border-indigo-900 rounded-xl font-bold"
            >
              Update Lead
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateLeadModal;

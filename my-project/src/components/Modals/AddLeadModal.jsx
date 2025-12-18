import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddLeadModal = ({ isOpen, onClose, onAddLead }) => {
  const initialState = {
    leadOwner: "",
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
    prefService: "",         // added
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
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputBase =
    "w-full p-3 rounded-xl border-[3px] border-slate-800 bg-white shadow-[6px_6px_0_0_#1e293b] focus:outline-none focus:ring-4 focus:ring-indigo-300";
  const selectBase = inputBase;

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

    try {
      const token = localStorage.getItem("token");

      // Convert date strings to Date objects
      const payload = {
        ...formData,
        dob: formData.dob ? new Date(formData.dob) : null,
        nextActionDate: formData.nextActionDate
          ? new Date(formData.nextActionDate)
          : null,
      };

      const res = await axios.post(
        "http://localhost:3000/api/v1/lead/createLead",
        payload,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      onAddLead(res.data.lead || res.data);
      setFormData(initialState);
      onClose();
    } catch (err) {
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
        transition={{ duration: 0.4 }}
        className="bg-[#fefaf5] rounded-2xl w-full max-w-7xl p-10 grid grid-cols-1 md:grid-cols-2 gap-6 border-[3px] border-slate-800 max-h-[90vh] overflow-y-scroll"
      >
        {/* Header */}
        <div className="col-span-2 flex justify-between items-center mb-4">
          <h2 className="text-3xl font-extrabold text-slate-900">Add Lead</h2>
          <button
            onClick={onClose}
            className="px-6 py-2 text-slate-900 bg-white border-[3px] border-slate-800 rounded-xl"
          >
            ✕
          </button>
        </div>

        {error && <div className="col-span-2 text-red-600">{error}</div>}

        {/* Lead Owner */}
        <div className="col-span-2">
          <label className="block mb-1 font-bold">Lead Owner</label>
          <input
            readOnly
            value={formData.leadOwner}
            className={inputBase + " bg-gray-100"}
          />
        </div>

        {/* Account */}
        <div>
          <label className="block mb-1 font-bold">Account</label>
          <input disabled value={formData.account} className={inputBase} />
        </div>

        {/* Entity */}
        <div>
          <label className="block mb-1 font-bold">Entity</label>
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

        {/* Name */}
        <div>
          <label className="block mb-1 font-bold">First Name,Middle Name</label>
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

        {/* DOB */}
        <div>
          <label className="block mb-1 font-bold">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Passport */}
        <div>
          <label className="block mb-1 font-bold">Passport Number</label>
          <input
            name="passport"
            value={formData.passport}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block mb-1 font-bold">Nationality</label>
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
            <option>China</option>
            <option>Malaysia</option>
          </select>
        </div>

        {/* Civil Status */}
        <div>
          <label className="block mb-1 font-bold">Civil Status</label>
          <select
            name="civilStatus"
            value={formData.civilStatus}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Select Status</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </div>

        {/* Contact */}
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
          <label className="block mb-1 font-bold">Phone Number</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Emergency Contact */}
        <div>
          <label className="block mb-1 font-bold">Emergency Contact Name</label>
          <input
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Emergency Phone</label>
          <input
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Current Location */}
        <div>
          <label className="block mb-1 font-bold">Current Location</label>
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

        {/* Address */}
        <div>
          <label className="block mb-1 font-bold">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Police Station</label>
          <input
            name="policeStation"
            value={formData.policeStation}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">District</label>
          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Responsible Type */}
        <div>
          <label className="block mb-1 font-bold">Responsible Type</label>
          <select
            name="responsibleType"
            value={formData.responsibleType}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Select Type</option>
            <option>Nehal | CEO</option>
            <option>Admin</option>
            <option>Counsellor</option>
          </select>
        </div>

        {/* Preferred Service */}
        <div>
          <label className="block mb-1 font-bold">Preferred Service</label>
          <select
            name="prefService"
            value={formData.prefService}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Select Service</option>
            <option>Student Visa</option>
            <option>Tourist Visa</option>
            <option>Work Permit</option>
          </select>
        </div>

        {/* First & Second Service Preference */}
        <div>
          <label className="block mb-1 font-bold">First Service Preference</label>
          <select
            name="firstServicePref"
            value={formData.firstServicePref}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Select Service</option>
            <option>Student Visa</option>
            <option>Tourist Visa</option>
            <option>Work Permit</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-bold">Second Service Preference</label>
          <select
            name="secondServicePref"
            value={formData.secondServicePref}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Select Service</option>
            <option>Student Visa</option>
            <option>Tourist Visa</option>
            <option>Work Permit</option>
          </select>
        </div>

        {/* Campaign Code */}
        <div>
          <label className="block mb-1 font-bold">Campaign Code</label>
          <input
            name="campaignCode"
            value={formData.campaignCode}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Stage */}
        <div>
          <label className="block mb-1 font-bold">Stage</label>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Select Stage</option>
            <option>New</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-bold">Type</label>
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

        {/* Responsible */}
        <div>
          <label className="block mb-1 font-bold">Responsible</label>
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

        {/* Referral Type */}
        <div>
          <label className="block mb-1 font-bold">Referral Type</label>
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

        {/* Referred By */}
        <div>
          <label className="block mb-1 font-bold">Referred By</label>
          <input
            name="referredBy"
            value={formData.referredBy}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Next Action */}
        <div>
          <label className="block mb-1 font-bold">Next Action</label>
          <select
            name="nextAction"
            value={formData.nextAction}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Select Next Action</option>
            <option>Call</option>
            <option>Mail</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-bold">Next Action Date</label>
          <input
            type="date"
            name="nextActionDate"
            value={formData.nextActionDate}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Agent Promo */}
        <div>
          <label className="block mb-1 font-bold">Agent Promotion</label>
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

        {/* Active */}
        <div>
          <label className="block mb-1 font-bold">Is Active?</label>
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
          <label className="block mb-1 font-bold">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Submit */}
        <div className="col-span-2 flex justify-end">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 font-extrabold text-white bg-indigo-600 rounded-xl border-[3px] border-indigo-900"
          >
            {loading ? "Adding..." : "Add Lead"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddLeadModal;

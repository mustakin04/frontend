import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function AddClientModal() {
  const initialState = {
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
  const [suggestedLeads, setSuggestedLeads] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [clientExists, setClientExists] = useState(false);
  const [existingClient, setExistingClient] = useState(null);

  const autofillFromLead = (lead) => {
    setFormData((prev) => ({
      ...prev,
      firstName: lead.firstName || "",
      lastName: lead.lastName || "",
      email: lead.email || "",
      phone: lead.phone || "",
      dob: lead.dob || "",
      passport: lead.passport || "",
      nationality: lead.nationality || "",
      civilStatus: lead.civilStatus || "",
      currentLocation: lead.currentLocation || "",
      address: lead.address || "",
      policeStation: lead.policeStation || "",
      district: lead.district || "",
      emergencyContact: lead.emergencyContact || "",
      emergencyPhone: lead.emergencyPhone || "",
      prefService: lead.prefService || "",
      firstServicePref: lead.firstServicePref || "",
      secondServicePref: lead.secondServicePref || "",
      campaignCode: lead.campaignCode || "",
      responsibleType: lead.responsibleType || "",
      responsible: lead.responsible || "",
      stage: "In Progress",
    }));

    setShowSuggestions(false);
  };

  const inputBase =
    "w-full p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl border-2 sm:border-[3px] border-slate-800 bg-white shadow-[4px_4px_0_0_#1e293b] sm:shadow-[6px_6px_0_0_#1e293b] focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-indigo-300 text-sm sm:text-base";

  const selectBase = inputBase;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log("Searching lead:", name, value);

    setFormData({ ...formData, [name]: value });

    if (name === "email" && value.length >= 5) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://crm-backend-ig92.onrender.com/api/v1/client/check?email=${value}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (res.data.exists) {
          setClientExists(true);
          setExistingClient(res.data.client);
          setShowSuggestions(false);
          return;
        } else {
          setClientExists(false);
          setExistingClient(null);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if ((name === "email" || name === "phone") && value.length >= 3) {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://crm-backend-ig92.onrender.com/api/v1/lead/similar?${name}=${value}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        // console.log("Leads found:", res.data);

        if (res.data.length > 0) {
          setSuggestedLeads(res.data);
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://crm-backend-ig92.onrender.com/api/v1/client/createClient",
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      setFormData(initialState);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 border-2 sm:border-[3px] border-slate-800 rounded-xl sm:rounded-2xl bg-[#fefaf5]"
    >
      <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-2 sm:mb-3 md:mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
          New Client
        </h2>
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="px-4 py-2 sm:px-5 sm:py-2 md:px-6 text-sm sm:text-base text-slate-900 bg-white border-2 sm:border-[3px] border-slate-800 rounded-lg sm:rounded-xl"
        >
          <Link to="/dashboard/sales/clients">Cancel</Link>
        </motion.button>
      </div>

      {error && (
        <div className="col-span-1 md:col-span-2 text-red-600 text-sm sm:text-base">
          {error}
        </div>
      )}

      {/* ACCOUNT (STATIC) */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Account
        </label>
        <input disabled className={inputBase} value="Atlas Study" />
      </div>

      {/* ENTITY DROPDOWN */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Entity
        </label>
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

      {/* NAME FIELDS */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          First Name, Middle Name
        </label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={inputBase}
        />
      </div>
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Last Name
        </label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* DOB */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* PASSPORT */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Passport Number
        </label>
        <input
          name="passport"
          value={formData.passport}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* Nationality */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Nationality
        </label>
        <select
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className={selectBase}
        >
          <option value="">Select Nationality</option>
          <option>Azerbaijan</option>
          <option>Bahrain</option>
          <option>Bangladesh</option>
          <option>Bhutan</option>
          <option>Cambodia</option>
          <option>Georgia</option>
          <option>India</option>
          <option>Indonesia</option>
          <option>Iran</option>
          <option>Iraq</option>
          <option>Lebanon</option>
          <option>Malaysia</option>
          <option>Myanmar</option>
          <option>Nepal</option>
          <option>Oman</option>
          <option>Pakistan</option>
          <option>Palestine</option>
          <option>Philippines</option>
          <option>Qatar</option>
          <option>Saudi Arabia</option>
          <option>Singapore</option>
          <option>Sri Lanka</option>
          <option>Syria</option>
          <option>Taiwan</option>
          <option>Tajikistan</option>
          <option>Thailand</option>
          <option>Turkey</option>
          <option>Turkmenistan</option>
          <option>Vietnam</option>
          <option>Yemen</option>
        </select>
      </div>

      {/* CIVIL STATUS */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Civil Status
        </label>
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

      {/* EMAIL WITH SUGGESTIONS */}
      <div className="relative">
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Email
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputBase}
        />

        {/* CLIENT EXISTS WARNING */}
        {clientExists && (
          <div className="mt-2 p-2 sm:p-3 bg-red-100 border border-red-400 rounded-lg sm:rounded-xl text-xs sm:text-sm">
            ❌ <b>Client already exists</b>
            <div className="mt-1">
              {existingClient?.firstName} {existingClient?.lastName} —{" "}
              {existingClient?.email}
            </div>
          </div>
        )}

        {/* LEAD SUGGESTIONS */}
        {showSuggestions && !clientExists && (
          <div className="absolute w-full bg-white border rounded-lg sm:rounded-xl shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
            {suggestedLeads.map((lead) => (
              <div
                key={lead._id}
                onClick={() => autofillFromLead(lead)}
                className="p-2 sm:p-3 hover:bg-indigo-50 cursor-pointer border-b last:border-b-0"
              >
                <p className="font-bold text-sm sm:text-base">
                  {lead.firstName} {lead.lastName}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {lead.email} • {lead.phone}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Phone Number
        </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* EMERGENCY CONTACT */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Emergency Contact Name
        </label>
        <input
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          className={inputBase}
        />
      </div>
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Emergency Phone
        </label>
        <input
          name="emergencyPhone"
          value={formData.emergencyPhone}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* LOCATION FIELDS */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Current Location
        </label>
        <select
          name="currentLocation"
          value={formData.currentLocation}
          onChange={handleChange}
          className={selectBase}
        >
          <option value="">Select Location</option>
          <option>Chittagong</option>
          <option>Rajshahi</option>
          <option>Khulna</option>
          <option>Barishal</option>
          <option>Sylhet</option>
          <option>Rangpur</option>
          <option>Mymensingh</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Address
        </label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Police Station
        </label>
        <input
          name="policeStation"
          value={formData.policeStation}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          District
        </label>
        <input
          name="district"
          value={formData.district}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* RESPONSIBLE TYPE */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Responsible Type
        </label>
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

      {/* FIRST PREFERENCE SERVICE */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          First Preference Service
        </label>
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

      {/* STAGE */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Stage
        </label>
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

      {/* CLIENT TYPE */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Type
        </label>
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

      {/* RESPONSIBLE */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Responsible
        </label>
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

      {/* REF TYPE */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Referral Type
        </label>
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

      {/* REFERRED BY */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Referred By
        </label>
        <input
          name="referredBy"
          value={formData.referredBy}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* NEXT ACTION */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Next Action
        </label>
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
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Next Action Date
        </label>
        <input
          type="date"
          name="nextActionDate"
          value={formData.nextActionDate}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* AGENT PROMO */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Agent Promotion
        </label>
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

      {/* ACTIVE STATUS */}
      <div>
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Is Active?
        </label>
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

      {/* DESCRIPTION */}
      <div className="col-span-1 md:col-span-2">
        <label className="block mb-1 font-bold text-sm sm:text-base">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={inputBase}
        ></textarea>
      </div>

      {/* BUTTON */}
      <div className="col-span-1 md:col-span-2 flex justify-end">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleClick}
          disabled={loading}
          className="px-5 py-2.5 sm:px-6 sm:py-3 font-bold sm:font-extrabold text-sm sm:text-base text-white bg-indigo-600 rounded-lg sm:rounded-xl border-2 sm:border-[3px] border-indigo-900"
        >
          {loading ? "Adding..." : "Add Client"}
        </motion.button>
      </div>

      {showSuggestions && (
        <p className="col-span-1 md:col-span-2 text-xs sm:text-sm text-orange-600 mt-1">
          Similar lead found — click to autofill
        </p>
      )}
    </motion.div>
  );
}
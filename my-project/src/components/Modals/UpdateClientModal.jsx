import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function UpdateClientModal() {
    const {id}=useParams()
    console.log(id,"ami")
  const initialState = {
    account: "Atlas Study", // STATIC VALUE
    entity: "",
    firstName: "",
    middleName: "",
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
  //  console.log(formData,"errror")
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:3000/api/v1/client/updateClient/${id}`,
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      // console.log("Client added:", res.data);
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
      className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 border-[3px] border-slate-800 rounded-2xl bg-[#fefaf5]"
    >
      <div className="col-span-2 flex justify-between items-center mb-4">
        <h2 className="text-3xl font-extrabold text-slate-900">Update Client</h2>
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="px-6 py-2 text-slate-900 bg-white border-[3px] border-slate-800 rounded-xl"
        >
          <Link to="/dashboard/sales/clients">Cancel</Link>
        </motion.button>
      </div>

      {error && <div className="col-span-2 text-red-600">{error}</div>}

      {/* ------------------ ACCOUNT (STATIC) ------------------ */}
      <div>
        <label className="block mb-1 font-bold">Account</label>
        <input disabled className={inputBase} value="Atlas Study" />
      </div>

      {/* ------------------ ENTITY DROPDOWN ------------------ */}
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

      {/* NAME FIELDS */}
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

      {/* PASSPORT */}
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

      {/* CONTACT */}
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

      {/* EMERGENCY CONTACT */}
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

      {/* LOCATION FIELDS */}
      <div>
        <label className="block mb-1 font-bold">Current Location</label>
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

      {/* RESPONSIBLE TYPE */}
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

      {/* FIRST PREFERENCE SERVICE */}
      <div>
        <label className="block mb-1 font-bold">First Preference Service</label>
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

      {/* CLIENT TYPE */}
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

      {/* RESPONSIBLE */}
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

      {/* REF TYPE */}
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

      {/* REFERRED BY */}
      <div>
        <label className="block mb-1 font-bold">Referred By</label>
        <input
          name="referredBy"
          value={formData.referredBy}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* NEXT ACTION */}
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

      {/* AGENT PROMO */}
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

      {/* ACTIVE STATUS */}
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

      {/* DESCRIPTION */}
      <div className="col-span-2">
        <label className="block mb-1 font-bold">Description</label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={inputBase}
        ></textarea>
      </div>
  
      {/* BUTTON */}
      <div className="col-span-2 flex justify-end">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleClick}
          disabled={loading}
          className="px-6 py-3 font-extrabold text-white bg-indigo-600 rounded-xl border-[3px] border-indigo-900"
        >
          {loading ? "Adding..." : "Add Client"}
        </motion.button>
      </div>
      
    </motion.div>
  );
}

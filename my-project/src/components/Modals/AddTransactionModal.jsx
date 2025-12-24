import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const AddTransactionModal = () => {
  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    account: "Atlas",
    entity: "",
    ownership: "Own",
    client: "",
    title: "",
    type: "",
    subtype: "",
    applicantType: "",
    destination: "",
    university: "",
    courses: "",
    totalFee: "",
    paid: "",
    due: "",
    responsibleType: "User",
    responsible: "Atlas Account",
    hasSecondaryResponsible: false,
    nextAction: "",
    nextActionDate: "",
    stage: "Open",
    isReference: false,
    isActive: true,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    // Recalculate due if totalFee or paid changes
    if (name === "totalFee" || name === "paid") {
      const total = Number(updatedData.totalFee || 0);
      const paid = Number(updatedData.paid || 0);
      updatedData.due = Math.max(total - paid, 0);
    }

    setFormData(updatedData);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // console.log("Submitting formData:", formData);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://crm-backend-ig92.onrender.com/api/v1/transaction/createTransaction",
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      setFormData({
        ...formData,
        entity: "",
        client: "",
        title: "",
        type: "",
        subtype: "",
        applicantType: "",
        destination: "",
        university: "",
        courses: "",
        totalFee: "",
        paid: "",
        due: "",
        nextAction: "",
        nextActionDate: "",
        stage: "Open",
        isReference: false,
        description: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://crm-backend-ig92.onrender.com/api/v1/client/getClient",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );
        setClients(res.data);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };
    fetchClients();
  }, []);

  const inputClass =
    "w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base";
  const labelClass = "block mb-1 font-bold text-xs sm:text-sm";
  const sectionTitle =
    "col-span-1 md:col-span-2 font-semibold text-base sm:text-lg text-gray-700 mt-4 sm:mt-5 md:mt-6 border-b pb-1";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-4 sm:pt-8 md:pt-10 z-50 p-3 sm:p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold col-span-1 md:col-span-2">
          New Transaction
        </h2>

        {error && (
          <div className="col-span-1 md:col-span-2 bg-red-50 text-red-600 p-2 sm:p-3 rounded-lg sm:rounded-xl text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* BASIC INFO */}
        <div className={sectionTitle}>Basic Info</div>

        <div>
          <label className={labelClass}>Account</label>
          <input className={inputClass} value={formData.account} disabled />
        </div>

        <div>
          <label className={labelClass}>Entity</label>
          <select
            className={inputClass}
            name="entity"
            value={formData.entity}
            onChange={handleChange}
          >
            <option value="">Select Entity</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Chittagong">Chittagong</option>
            <option value="China">China</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Ownership</label>
          <input className={inputClass} value={formData.ownership} disabled />
        </div>

        <div>
          <label className={labelClass}>Client *</label>
          <select
            className={inputClass}
            name="client"
            value={formData.client}
            required
            onChange={handleChange}
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option
                key={client._id}
                value={`${client.firstName} | ${client.email}`}
              >
                {client.firstName} ({client.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Title *</label>
          <input
            className={inputClass}
            name="title"
            value={formData.title}
            required
            onChange={handleChange}
          />
        </div>

        {/* TYPE INFO */}
        <div>
          <label className={labelClass}>Type</label>
          <select
            className={inputClass}
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Evisa">Evisa</option>
            <option value="Enrollment & Visa">Enrollment & Visa</option>
            <option value="Enrollment">Enrollment</option>
            <option value="B2B Visa">B2B Visa</option>
            <option value="B2B Enrollment & Visa">B2B Enrollment & Visa</option>
            <option value="B2B Enrollment">B2B Enrollment</option>
            <option value="Client Support">Client Support</option>
            <option value="IELTS">IELTS</option>
            <option value="TOEFL">TOEFL</option>
            <option value="PTE">PTE</option>
            <option value="OET">OET</option>
            <option value="English - Other">English - Other</option>
            <option value="Banking">Banking</option>
            <option value="Telecommunication">Telecommunication</option>
            <option value="Document Support">Document Support</option>
            <option value="Travel">Travel</option>
            <option value="Insurance">Insurance</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Subtype</label>
          <input
            className={inputClass}
            name="subtype"
            value={formData.subtype}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className={labelClass}>Applicant Type</label>
          <input
            className={inputClass}
            name="applicantType"
            value={formData.applicantType}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className={labelClass}>Destination</label>
          <select
            className={inputClass}
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          >
            <option value="">Select Destination</option>
            <option value="China">China</option>
            <option value="UK">UK</option>
            <option value="USA">USA</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>University</label>
          <input
            className={inputClass}
            name="university"
            value={formData.university}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className={labelClass}>Courses</label>
          <input
            className={inputClass}
            name="courses"
            value={formData.courses}
            onChange={handleChange}
          />
        </div>

        {/* PAYMENT INFO */}
        <div className={sectionTitle}>Payment Info</div>

        <div>
          <label className={labelClass}>Total Fee</label>
          <input
            type="number"
            className={inputClass}
            name="totalFee"
            value={formData.totalFee}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className={labelClass}>Paid</label>
          <input
            type="number"
            className={inputClass}
            name="paid"
            value={formData.paid}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className={labelClass}>Due</label>
          <input
            type="number"
            className={`${inputClass} bg-gray-100`}
            value={formData.due}
            readOnly
          />
        </div>

        {/* RESPONSIBILITY */}
        <div className={sectionTitle}>Responsibility</div>

        <div>
          <label className={labelClass}>Responsible Type</label>
          <select
            className={inputClass}
            name="responsibleType"
            value={formData.responsibleType}
            onChange={handleChange}
          >
            <option value="User">User</option>
            <option value="Team">Team</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Responsible</label>
          <input className={inputClass} value={formData.responsible} disabled />
        </div>

        <label className="flex items-center gap-2 col-span-1 md:col-span-2 font-bold text-xs sm:text-sm">
          <input
            type="checkbox"
            name="hasSecondaryResponsible"
            checked={formData.hasSecondaryResponsible}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Has Secondary Responsible?
        </label>

        {/* NEXT ACTION */}
        <div>
          <label className={labelClass}>Next Action</label>
          <select
            className={inputClass}
            name="nextAction"
            value={formData.nextAction}
            onChange={handleChange}
          >
            <option value="">Select Action</option>
            <option value="Call">Call</option>
            <option value="Email">Email</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Next Action Date</label>
          <input
            type="date"
            className={inputClass}
            name="nextActionDate"
            value={formData.nextActionDate}
            onChange={handleChange}
          />
        </div>

        {/* STATUS */}
        <div>
          <label className={labelClass}>Stage</label>
          <select
            className={inputClass}
            name="stage"
            value={formData.stage}
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <label className="flex items-center gap-2 font-bold text-xs sm:text-sm">
          <input
            type="checkbox"
            name="isReference"
            checked={formData.isReference}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Is Reference?
        </label>

        <label className="flex items-center gap-2 font-bold text-xs sm:text-sm">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Is Active?
        </label>

        <div className="col-span-1 md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea
            className={inputClass}
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* BUTTONS */}
        <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-3 sm:mt-4">
          <Link
            to="/dashboard/services/transactions"
            className="px-4 py-2 sm:px-5 border rounded-lg sm:rounded-xl text-center text-sm sm:text-base"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 sm:px-6 bg-blue-600 text-white rounded-lg sm:rounded-xl text-sm sm:text-base"
          >
            {loading ? "Saving..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionModal;
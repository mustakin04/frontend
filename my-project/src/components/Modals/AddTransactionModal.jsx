import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const AddTransactionModal = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    transactionId: "",
    clientName: "",
    service: "",
    totalFee: "",
    paid: "",
    due: "",
    paymentDate: "",
    paymentMethod: "",
    apprenticeGlobal: "",
    account: "",
    entity: "",
    branch: "",
    ownership: "",
    title: "",
    visaType: "",
    subtype: "",
    applicantType: "",
    destination: "",
    university: "",
    course: "",
    responsibleType: "",
    responsible: "",
    hasSecondaryResponsible: false,
    nextAction: "",
    nextActionDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/v1/transaction/createTransaction",
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all";

  const sectionTitle =
    "col-span-2 font-semibold text-lg text-gray-700 mt-6 mb-1 border-b pb-1";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-10 p-4 z-50 overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-full max-w-5xl shadow-xl max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <h2 className="text-2xl font-bold col-span-2 mb-2">Add Transaction</h2>

        {error && (
          <div className="col-span-2 text-red-600 font-medium bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Section 1 */}
        <div className={sectionTitle}>Transaction Details</div>

        <div>
          <label className="font-medium">Transaction ID</label>
          <input
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Client Name</label>
          <input
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Service</label>
          <input
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Total Fee</label>
          <input
            type="number"
            name="totalFee"
            value={formData.totalFee}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Paid</label>
          <input
            type="number"
            name="paid"
            value={formData.paid}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Due</label>
          <input
            type="number"
            name="due"
            value={formData.due}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Payment Date</label>
          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select Method</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        {/* Section 2 */}
        <div className={sectionTitle}>Additional Info</div>

        <div>
          <label className="font-medium">Apprent Global</label>
          <input
            name="apprenticeGlobal"
            value={formData.apprenticeGlobal}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Account</label>
          <input
            name="account"
            value={formData.account}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Entity</label>
          <input
            name="entity"
            value={formData.entity}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Branch</label>
          <input
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Ownership</label>
          <input
            name="ownership"
            value={formData.ownership}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Visa Type</label>
          <input
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Subtype</label>
          <input
            name="subtype"
            value={formData.subtype}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Applicant Type</label>
          <input
            name="applicantType"
            value={formData.applicantType}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Destination</label>
          <input
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">University</label>
          <input
            name="university"
            value={formData.university}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Course</label>
          <input
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Section 3 */}
        <div className={sectionTitle}>Responsibility</div>

        <div>
          <label className="font-medium">Responsible Type</label>
          <input
            name="responsibleType"
            value={formData.responsibleType}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Responsible</label>
          <input
            name="responsible"
            value={formData.responsible}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3 col-span-2">
          <input
            type="checkbox"
            name="hasSecondaryResponsible"
            checked={formData.hasSecondaryResponsible}
            onChange={handleChange}
          />
          <label className="font-medium">Has Secondary Responsible?</label>
        </div>

        <div>
          <label className="font-medium">Next Action</label>
          <input
            name="nextAction"
            value={formData.nextAction}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-medium">Next Action Date</label>
          <input
            type="date"
            name="nextActionDate"
            value={formData.nextActionDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-xl border border-gray-400 hover:bg-gray-100 transition"
          >
          <Link to="/dashboard/services/transactions">Cancel</Link>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionModal;

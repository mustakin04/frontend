import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";

export default function UpdateApplicationModal() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ---------------- STATES ---------------- */
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    account: "Atlas",
    entity: "",
    branch: "",
    ownership: "Own",
    client: "",
    transaction: "",
    title: "",
    stage: "Open",
    type: "College-List",
    location: "",
    university: "",
    course: "",
    intakeDate: "",
    priority: "Normal",
    dueDate: "",
    responsibleType: "User",
    responsible: "Nehal | CEO, Founder",
    notes: "",
    isActive: true,
  });

  /* ---------------- HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------------- FETCH APPLICATION ---------------- */
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:3000/api/v1/application/getapplication/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData(res.data.data); // 🔥 preload all fields
      } catch (err) {
        console.error("Fetch application failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  /* ---------------- UPDATE SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/v1/application/updateApplicaiton/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Application Updated Successfully");
      navigate("/dashboard/services/applications");
    } catch (error) {
      console.error("Update application error:", error);
    }
  };

  /* ---------------- FETCH TRANSACTIONS ---------------- */
  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/v1/transaction/getTransactions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTransactions(res.data.data);
    };

    fetchTransactions();
  }, []);

  /* ---------------- FETCH CLIENTS ---------------- */
  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/v1/client/getClient",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setClients(res.data);
    };

    fetchClients();
  }, []);

  /* ---------------- UI HELPERS ---------------- */
  const Input = ({ label, children }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      {children}
    </div>
  );

  const baseInput =
    "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  if (loading) {
    return <div className="text-center py-20">Loading application...</div>;
  }

  /* ---------------- JSX ---------------- */
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-6xl space-y-8 rounded-2xl bg-white p-8 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Update Application
        </h2>
        <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600">
          Stage: {formData.stage}
        </span>
      </div>

      {/* BASIC INFO */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Basic Info</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Input label="Account">
            <select name="account" value={formData.account} onChange={handleChange} className={baseInput}>
              <option value="Atlas">Atlas</option>
            </select>
          </Input>

          <Input label="Entity">
            <select name="entity" value={formData.entity} onChange={handleChange} className={baseInput}>
              <option value="">Select Entity</option>
              <option value="Dhaka">Dhaka</option>
              <option value="China">China</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Rajshahi">Rajshahi</option>
            </select>
          </Input>

          <Input label="Branch">
            <select name="branch" value={formData.branch} onChange={handleChange} className={baseInput}>
              <option value="">Select Branch</option>
              <option value="Dhaka">Dhaka</option>
            </select>
          </Input>
        </div>
      </section>

      {/* APPLICATION DETAILS */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Application Details</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Input label="Client">
            <select name="client" value={formData.client} onChange={handleChange} className={baseInput}>
              <option value="">Select Client</option>
              {clients.map((c) => (
                <option key={c._id} value={c.firstName}>
                  {c.firstName}
                </option>
              ))}
            </select>
          </Input>

          <Input label="Transaction">
            <select name="transaction" value={formData.transaction} onChange={handleChange} className={baseInput}>
              <option value="">Select Transaction</option>
              {transactions.map((t) => (
                <option key={t._id} value={`${t.client} - ${t.createdAt?.slice(0, 10)}`}>
                  {t.client} - {t.createdAt?.slice(0, 10)}
                </option>
              ))}
            </select>
          </Input>

          <Input label="Purpose">
            <input name="title" value={formData.title} onChange={handleChange} className={baseInput} />
          </Input>

          <Input label="Stage">
            <select name="stage" value={formData.stage} onChange={handleChange} className={baseInput}>
              <option value="Open">Open</option>
              <option value="Submitted">Submitted</option>
              <option value="Rejected">Rejected</option>
              <option value="Approved">Approved</option>
            </select>
          </Input>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Education</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Input label="Type">
            <select name="type" value={formData.type} onChange={handleChange} className={baseInput}>
              <option value="College-List">College-List</option>
              <option value="College-Manual-Enter">College-Manual-Enter</option>
              <option value="Insurance">Insurance</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Visa">Visa</option>
              <option value="Other">Other</option>
            </select>
          </Input>

          <Input label="University">
            <input name="university" value={formData.university} onChange={handleChange} className={baseInput} />
          </Input>

          <Input label="Course">
            <input name="course" value={formData.course} onChange={handleChange} className={baseInput} />
          </Input>

          <Input label="Intake Date">
            <input type="date" name="intakeDate" value={formData.intakeDate} onChange={handleChange} className={baseInput} />
          </Input>
        </div>
      </section>

      {/* META */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Meta</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Input label="Priority">
            <select name="priority" value={formData.priority} onChange={handleChange} className={baseInput}>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </Input>

          <Input label="Due Date">
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className={baseInput} />
          </Input>

          <Input label="Responsible">
            <select name="responsible" value={formData.responsible} onChange={handleChange} className={baseInput}>
              <option value="Nehal | CEO, Founder">Nehal | CEO, Founder</option>
            </select>
          </Input>

          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
            <span className="text-sm">Active</span>
          </div>
        </div>
      </section>

      {/* NOTES */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className={`${baseInput} h-24`}
        />
      </section>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4 border-t pt-6">
        <Link to="/dashboard/services/applications" className="rounded-xl border px-6 py-2">
          Cancel
        </Link>

        <button type="submit" className="rounded-xl bg-blue-600 px-6 py-2 text-white">
          Update Application
        </button>
      </div>
    </motion.form>
  );
}

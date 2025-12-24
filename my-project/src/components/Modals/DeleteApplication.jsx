import React from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function DeleteApplication({
  applicationName = "this application",
  confirmText = "delete",
  inputValue,
  setInputValue,
  deleteID,
  onCancel,
  onSuccess, // optional callback
}) {
  const onConfirm = async () => {
    if (!deleteID) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://crm-backend-ig92.onrender.com/api/v1/application/deleteApplication/${deleteID}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      setInputValue("");
      onCancel();

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Delete application failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="
          bg-[#fefaf5]
          w-full max-w-md
          rounded-2xl
          p-8
          border-[3px] border-slate-800
          shadow-[6px_6px_0_0_#1e293b]
        "
      >
        {/* Header */}
        <h2 className="text-2xl font-extrabold text-slate-900 text-center">
          Delete Application
        </h2>

        {/* Description */}
        <p className="text-slate-700 font-medium text-lg mt-4 text-center">
          Only admins can delete{" "}
          <span className="font-bold">{applicationName}</span>.
          <br />
          Type{" "}
          <span className="text-red-600 font-extrabold">{confirmText}</span>{" "}
          to confirm.
        </p>

        {/* Input */}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder={confirmText}
          className="
            w-full mt-5 p-3 rounded-xl
            border-[3px] border-slate-800
            bg-white
            shadow-[4px_4px_0_0_#1e293b]
            focus:outline-none focus:ring-4 focus:ring-red-300
          "
        />

        {/* Actions */}
        <div className="flex justify-center gap-6 mt-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            disabled={inputValue !== confirmText}
            className={`px-6 py-3 font-extrabold rounded-xl border-[3px]
              ${
                inputValue === confirmText
                  ? "bg-red-600 text-white border-red-900 shadow-[4px_4px_0_0_#7f1d1d]"
                  : "bg-gray-300 text-gray-600 border-gray-500 cursor-not-allowed"
              }`}
          >
            Delete
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="
              px-6 py-3
              font-extrabold
              bg-white text-slate-900
              rounded-xl
              border-[3px] border-slate-800
              shadow-[4px_4px_0_0_#1e293b]
            "
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function DeleteTransaction({
  leadName = "this lead",
  confirmText = "delete",
  inputValue,
  setInputValue,
  deleteID,
  onCancel,
}) {
  const onConfirm = async () => {
    if (!deleteID) return;
    console.log(deleteID,'id')
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/v1/transaction/deleteTransaction/${deleteID}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      // ✅ reset & close modal
      setInputValue("");
      onCancel();

      // 🔄 optional
      // window.location.reload();

    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-orange-300 w-[420px] rounded-xl px-6 py-5 shadow-lg"
      >
        <h2 className="text-white font-semibold text-xl text-center">
          Delete Lead
        </h2>

        <p className="text-white font-medium text-lg mt-4 text-center">
          Only admins can delete this client{" "}
          <span className="font-bold">{leadName}</span>?
          <br />
          Type{" "}
          <span className="text-red-600 font-bold">{confirmText}</span> to confirm.
        </p>

        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder={confirmText}
          className="w-full px-3 py-2 mt-4 rounded-md outline-none border focus:ring-2 focus:ring-red-400"
        />

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={onConfirm}
            disabled={inputValue !== confirmText}
            className={`px-6 py-2 rounded-md 
              ${
                inputValue === confirmText
                  ? "bg-red-600 text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
          >
            Delete
          </button>

          <button
            onClick={onCancel}
            className="px-6 py-2 bg-white text-black rounded-md shadow"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

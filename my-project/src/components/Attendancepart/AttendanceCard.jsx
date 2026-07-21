import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiClock,
  FiLoader,
  FiLogIn,
  FiLogOut,
  FiActivity,
} from "react-icons/fi";
const AttendanceCard = ({ today, onCheckIn, onCheckOut, loading }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="flex-1"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center"
            >
              <FiClock className="text-blue-600 text-2xl" />
            </motion.div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Today's Attendance
              </h2>

              <p className="text-sm text-slate-500">Your attendance summary</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Check In */}

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-between bg-slate-50 border rounded-xl px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center">
                  <FiLogIn className="text-green-600 text-xl" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Check In</p>

                  <h3 className="font-semibold text-slate-800">
                    {today?.checkIn || "Not Yet"}
                  </h3>
                </div>
              </div>

              {today?.checkIn && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold"
                >
                  Completed
                </motion.span>
              )}
            </motion.div>

            {/* Check Out */}

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-between bg-slate-50 border rounded-xl px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiLogOut className="text-blue-600 text-xl" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Check Out</p>

                  <h3 className="font-semibold text-slate-800">
                    {today?.checkOut || "Not Yet"}
                  </h3>
                </div>
              </div>

              {today?.checkOut && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold"
                >
                  Completed
                </motion.span>
              )}
            </motion.div>

            {/* Status */}

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl px-5 py-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <FiActivity className="text-2xl" />

                <div>
                  <p className="text-sm opacity-80">Attendance Status</p>

                  <h3 className="font-bold text-lg">
                    {today?.status || "Pending"}
                  </h3>
                </div>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className={`h-4 w-4 rounded-full ${
                  today?.status === "Present"
                    ? "bg-green-400"
                    : today?.status === "Late"
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                }`}
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-4 flex   gap-3">
          <button
            onClick={onCheckIn}
            disabled={loading || today?.checkIn}
            className={`relative h-20 w-full rounded-xl font-bold text-white overflow-hidden transition-all duration-300
  ${today?.checkIn ? "bg-emerald-500" : "bg-green-500 hover:bg-green-600"}
  disabled:cursor-not-allowed`}
          >
            <AnimatePresence mode="wait">
              {loading && !today?.checkIn ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center"
                >
                  <FiLoader className="animate-spin text-2xl mb-1" />
                  <span className="text-sm">Checking...</span>
                </motion.div>
              ) : today?.checkIn ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <FiCheck className="text-3xl mb-1" />
                  <span>Checked In</span>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center"
                >
                  <FiLogIn className="text-2xl mb-1" />
                  <span>Check In</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

         
          <button
            onClick={onCheckOut}
            disabled={loading || !today?.checkIn || today?.checkOut}
            className={`relative h-20 w-full rounded-xl font-bold text-white overflow-hidden transition-all duration-300
  ${today?.checkOut ? "bg-sky-600" : "bg-blue-500 hover:bg-blue-600"}
  disabled:cursor-not-allowed`}
          >
            <AnimatePresence mode="wait">
              {loading && !today?.checkOut ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center"
                >
                  <FiLoader className="animate-spin text-2xl mb-1" />
                  <span className="text-sm">Saving...</span>
                </motion.div>
              ) : today?.checkOut ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <FiCheck className="text-3xl mb-1" />
                  <span>Checked Out</span>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center"
                >
                  <FiLogOut className="text-2xl mb-1" />
                  <span>Check Out</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, Shield, BadgeCheck, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { updateProfile } from "../../services/profileService";

const ProfileModal = ({ open, onClose, user, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    phone: "",
    designation: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        employeeId: user.employeeId || "",
        phone: user.phone || "",
        designation: user.designation || "",
      });
    }
  }, [user]);
  if (!open) return null;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSave = async () => {
    try {
      setLoading(true);

      const updatedUser = await updateProfile(formData);

      // Parent কে নতুন user পাঠানো
      if (onEdit) {
        onEdit(updatedUser);
      }

      setIsEditing(false);

      alert("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/30 bg-white/90 shadow-2xl backdrop-blur-xl"
        >
          {/* Close Button */}

          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>

          {/* Header */}

          <div className="bg-gradient-to-r from-red-600 to-indigo-600 h-28" />

          {/* Avatar */}

          <div className="-mt-14 flex flex-col items-center">
            <div className="h-28 w-28 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center shadow-lg">
              <User size={50} className="text-blue-600" />
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-800">
              {user?.name || "Unknown User"}
            </h2>

            <p className="text-sm text-slate-500">
              {user?.designation || "Not Set"}
            </p>
          </div>

          {/* Body */}
          {/* Body */}

          <div className="mt-8 px-6 pb-6">
            {!isEditing ? (
              <div className="space-y-4">
                {/* Employee ID */}

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <BadgeCheck size={20} className="text-blue-600" />

                    <span className="text-sm font-medium">Employee ID</span>
                  </div>

                  <span className="text-sm text-slate-600">
                    {user?.employeeId || "Not Set"}
                  </span>
                </div>

                {/* Email */}

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-blue-600" />

                    <span className="text-sm font-medium">Email</span>
                  </div>

                  <span className="text-sm text-slate-600">{user?.email}</span>
                </div>

                {/* Phone */}

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-blue-600" />

                    <span className="text-sm font-medium">Phone</span>
                  </div>

                  <span className="text-sm text-slate-600">
                    {user?.phone || "Not Set"}
                  </span>
                </div>

                {/* Designation */}

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-blue-600" />

                    <span className="text-sm font-medium">Designation</span>
                  </div>

                  <span className="text-sm text-slate-600">
                    {user?.designation || "Not Set"}
                  </span>
                </div>

                {/* Role */}

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-blue-600" />

                    <span className="text-sm font-medium">Role</span>
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {user?.role}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Employee ID</label>

                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone</label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Designation</label>

                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => {
                setIsEditing(false);

                onClose();
              }}
              className="rounded-xl border px-5 py-2 mb-4"
            >
              Cancel
            </button>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-xl bg-blue-600 px-5 py-2 text-white mb-4 mr-7"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={loading}
                className="rounded-xl bg-green-600 px-5 py-2 mb-4 mr-7 text-white disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileModal;

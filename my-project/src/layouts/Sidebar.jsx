// Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiUserPlus,
  FiLayers,
  FiFileText,
  FiX,
  FiCheckSquare,
  FiCalendar,
} from "react-icons/fi";
import { MdFingerprint, MdOutlineWorkHistory } from "react-icons/md";
import { HiCheckBadge } from "react-icons/hi2";
import { FiTrendingUp } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FcParallelTasks } from "react-icons/fc";

import { TbReport, TbReportAnalytics } from "react-icons/tb";
import logo from "../assets/Atlas.png";

const Sidebar = ({ isOpen, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition";

  const active =
    "flex items-center gap-3 px-4 py-2 bg-blue-500 text-white rounded-lg";

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50
  w-64 bg-slate-50 border-r border-slate-200
  h-screen overflow-y-auto shadow-xl
  transition-all duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-4">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <img src={logo} alt="Atlas" className="h-8" />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Logo for desktop */}
          <div className="hidden lg:block">
            <img src={logo} alt="" className="p-6 w-full" />
          </div>

          <nav className="flex flex-col gap-3">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? active : linkClass)}
              onClick={onClose}
            >
              <FiHome /> Dashboard
            </NavLink>

            <p className="text-xs font-bold text-gray-500 mt-4">SALES</p>

            <NavLink
              to="/dashboard/sales/leads"
              className={({ isActive }) => (isActive ? active : linkClass)}
              onClick={onClose}
            >
              <FiUserPlus /> Leads
            </NavLink>

            <NavLink
              to="/dashboard/sales/clients"
              className={({ isActive }) => (isActive ? active : linkClass)}
              onClick={onClose}
            >
              <FiUsers /> Clients
            </NavLink>

            <NavLink
              to="/dashboard/sales/external"
              className={({ isActive }) => (isActive ? active : linkClass)}
              onClick={onClose}
            >
              <FiLayers /> External Clients
            </NavLink>

            <p className="text-xs font-bold text-gray-500 mt-4">SERVICES</p>

            <NavLink
              to="/dashboard/services/transactions"
              className={({ isActive }) => (isActive ? active : linkClass)}
              onClick={onClose}
            >
              <FiFileText /> Transactions
            </NavLink>

            <NavLink
              to="/dashboard/services/applications"
              className={({ isActive }) => (isActive ? active : linkClass)}
              onClick={onClose}
            >
              <FiFileText /> Applications
            </NavLink>

            {/* Task Management */}
            <p className="text-xs font-bold text-gray-500 mt-4">
              TASK MANAGEMENT
            </p>

            {user?.role === "admin" ? (
              <>
                <NavLink
                  to="/dashboard/task-management"
                  className={({ isActive }) => (isActive ? active : linkClass)}
                >
                  <FiCheckSquare />
                  Task Dashboard
                </NavLink>

                <NavLink
                  to="/dashboard/task-management/all"
                  className={({ isActive }) => (isActive ? active : linkClass)}
                >
                  <FcParallelTasks />
                  All Tasks
                </NavLink>

                <NavLink
                  to="/dashboard/task-management/create"
                  className={({ isActive }) => (isActive ? active : linkClass)}
                >
                  <IoIosCreate />
                  Create Task
                </NavLink>

                <NavLink
                  to="/dashboard/task-management/activity"
                  className={({ isActive }) => (isActive ? active : linkClass)}
                >
                  <TbReportAnalytics />
                  Activity Logs
                </NavLink>

                <NavLink
                  to="/dashboard/task-management/reports"
                  className={({ isActive }) => (isActive ? active : linkClass)}
                >
                  <TbReport />
                  Reports
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard/task-management/my-tasks"
                  className={({ isActive }) => (isActive ? active : linkClass)}
                >
                  <FaTasks />
                  My Tasks
                </NavLink>

                <NavLink
                  to="/dashboard/task-management/completed"
                  className={({ isActive }) => (isActive ? active : linkClass)}
                >
                  <HiCheckBadge className="text-xl" />
                  Completed Tasks
                </NavLink>

                <NavLink
                  to="/dashboard/task-management/history"
                  className={({ isActive }) => (isActive ? active : linkClass)}
                >
                  <MdOutlineWorkHistory className="text-xl" />
                  Task History
                </NavLink>
              </>
            )}
          </nav>
        </div>
        {/* Attendance */}
        {user?.role === "admin" ? (
          <NavLink
            to="/dashboard/admin/attendance"
            className={({ isActive }) => (isActive ? active : linkClass)}
            onClick={onClose}
          >
            <MdFingerprint className="text-2xl" /> Admin Attendance
          </NavLink>
        ) : (
          <NavLink
            to="/dashboard/attendance"
            className={({ isActive }) => (isActive ? active : linkClass)}
            onClick={onClose}
          >
            <MdFingerprint className="text-2xl" /> Attendance
          </NavLink>
        )}

        <NavLink
          to="/dashboard/campaignlead"
          className={({ isActive }) => (isActive ? active : linkClass)}
          onClick={onClose}
        >
          <FiTrendingUp /> campaign lead
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;

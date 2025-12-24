// Sidebar.jsx
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiUserPlus, FiLayers, FiFileText, FiX } from "react-icons/fi";
import logo from "../assets/Atlas.png";

const Sidebar = ({ isOpen, onClose }) => {
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
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r h-full transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiUserPlus,
  FiLayers,
  FiFileText,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import logo from "../assets/Atlas.png";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition";

  const active =
    "flex items-center gap-3 px-4 py-2 bg-blue-500 text-white rounded-lg";

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white">
        <img src={logo} alt="logo" className="h-8" />
        <button onClick={() => setOpen(true)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white border-r p-4 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <div className="flex justify-between items-center md:hidden">
          <img src={logo} alt="logo" className="h-8" />
          <button onClick={() => setOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        {/* Logo (desktop) */}
        <img src={logo} alt="logo" className="p-6 w-full hidden md:block" />

        <nav className="flex flex-col gap-3 mt-4">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? active : linkClass)}>
            <FiHome /> Dashboard
          </NavLink>

          <p className="text-xs font-bold text-gray-500 mt-4">SALES</p>

          <NavLink to="/dashboard/sales/leads" className={({ isActive }) => (isActive ? active : linkClass)}>
            <FiUserPlus /> Leads
          </NavLink>

          <NavLink to="/dashboard/sales/clients" className={({ isActive }) => (isActive ? active : linkClass)}>
            <FiUsers /> Clients
          </NavLink>

          <NavLink to="/dashboard/sales/external" className={({ isActive }) => (isActive ? active : linkClass)}>
            <FiLayers /> External Clients
          </NavLink>

          <p className="text-xs font-bold text-gray-500 mt-4">SERVICES</p>

          <NavLink to="/dashboard/services/transactions" className={({ isActive }) => (isActive ? active : linkClass)}>
            <FiFileText /> Transactions
          </NavLink>

          <NavLink to="/dashboard/services/applications" className={({ isActive }) => (isActive ? active : linkClass)}>
            <FiFileText /> Applications
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

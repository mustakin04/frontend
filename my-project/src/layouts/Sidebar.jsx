import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiUserPlus, FiLayers, FiFileText } from "react-icons/fi";

const Sidebar = () => {
  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition";

  const active =
    "flex items-center gap-3 px-4 py-2 bg-blue-500 text-white rounded-lg";

  return (
    <div className="w-64 bg-white border-r h-full p-4">
      <h1 className="text-2xl font-bold mb-6">Apprent CRM</h1>

      <nav className="flex flex-col gap-3">

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
  );
};

export default Sidebar;

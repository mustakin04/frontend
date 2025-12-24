// Navbar.jsx
import { useState, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import axios from "axios";

const Navbar = ({ onMenuClick }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://crm-backend-ig92.onrender.com/api/v1/authentication/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-4 md:px-6">
      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu size={24} className="text-gray-600" />
      </button>

      {/* Search Bar */}
      <div className="flex items-center gap-2 flex-1 max-w-md mx-2 md:mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 md:px-4 py-2 rounded-lg border focus:ring focus:ring-blue-200 outline-none text-sm"
        />
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Notification */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell size={20} md:size={22} className="text-gray-600" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="h-8 w-8 md:h-10 md:w-10 rounded-full border"
          />
          <div className="hidden sm:block">
            <p className="font-medium text-sm">{user?.name || "User"}</p>
            <p className="text-xs text-gray-500">{user?.role || "Role"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

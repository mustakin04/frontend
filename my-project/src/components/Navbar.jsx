import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/v1/authentication/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res,"llsdjalj")
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex items-center gap-2 w-96">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative">
          <Bell size={22} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="h-10 w-10 rounded-full border"
          />
          <div>
            <p className="font-medium text-sm">{user?.name || "User"}</p>
            <p className="text-xs text-gray-500">{user?.role || "Role"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

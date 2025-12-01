import Sidebar from "./Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full flex h-screen">
      {/* Sidebar */}
     <div className="w-[15%]">
       <Sidebar />
     </div>

      {/* Main Content */}
      <div className="w-[85%] flex-1 flex flex-col bg-gray-50">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default MainLayout;

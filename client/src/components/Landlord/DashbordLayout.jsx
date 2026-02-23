import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:ml-64">
        <div className="md:hidden h-14 flex items-center px-4 bg-white shadow-sm">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
        <Outlet/>
      </div>
    </div>
  );
};

export default DashboardLayout;

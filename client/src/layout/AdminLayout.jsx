import React from "react";
import Sidebard from "../Components/admin/Sidebar";
import Topbar from "../Components/admin/Topbar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div>
      <main>
        <div className="flex">
          <Sidebard />
          <div className="flex flex-col gap-5">
            <Topbar />
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

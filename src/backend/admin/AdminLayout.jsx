import { useState } from "react";
import AdminHeader from "./components/Header";
import AdminFooter from "./components/Footer";
import AdminSidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import "./assets/css/Admin.css";

const AdminLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleFilter = (filterValue) => {
    setFilterValue(filterValue);
  };

  return (
    <div
      className={`grid-container ${openSidebarToggle ? "sidebar-open" : ""}`}
    >
      <AdminHeader OpenSidebar={toggleSidebar} onFilter={handleFilter} />
      <AdminSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={toggleSidebar}
      />
      <main className="main-container mb-5">
        <Outlet context={{ filterValue }} />{" "}
        {/* Provide filterValue to nested routes */}
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;

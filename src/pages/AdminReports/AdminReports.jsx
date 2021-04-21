import React from "react";
import styles from "./AdminReports.module.scss";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";

const AdminReports = () => {
  const adminRoutes = routes[4];
  const location = useLocation();

  return (
    <Dashboard sidebarRoutes={adminRoutes} location={location}></Dashboard>
  );
};

export default AdminReports;

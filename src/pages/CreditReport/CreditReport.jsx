import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { clientRoutes } from "../../routes/sidebarRoutes";
import { useLocation } from "react-router-dom";

const CreditReport = () => {
  const location = useLocation();

  return (
    <Dashboard sidebarRoutes={clientRoutes} location={location}></Dashboard>
  );
};

export default CreditReport;

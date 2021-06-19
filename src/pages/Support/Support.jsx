import React from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import { routes } from "../../routes/sidebarRoutes";
// import styles from './Support.module.scss';

const Support = () => {
  const location = useLocation();
  const salesRoutes = routes[1];

  return (
    <>
      <Dashboard sidebarRoutes={salesRoutes} location={location}></Dashboard>
    </>
  );
};

export default Support;

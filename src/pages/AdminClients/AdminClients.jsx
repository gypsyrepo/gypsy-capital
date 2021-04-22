import React, { useContext, useEffect, useMemo } from "react";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import ClientList from "../../components/ClientList/ClientList";
import Loader from "../../components/Loader/Loader";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";

const AdminClients = () => {
  const adminRoutes = routes[4];
  const location = useLocation();

  const {
    state: { clientsForRole, loading },
    getClientListForRole,
  } = useContext(UserContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    getClientListForRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lenders = useMemo(() => {
    return clientsForRole.filter((user) => user.role === "client");
  }, [clientsForRole]);

  return (
    <Dashboard sidebarRoutes={adminRoutes} location={location}>
      {!loading ? (
        <ClientList clientList={lenders} role={user.role} />
      ) : (
        <Loader />
      )}
    </Dashboard>
  );
};

export default AdminClients;

import React, { useEffect, useContext } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation } from "react-router-dom";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import ClientList from "../../components/ClientList/ClientList";
import Loader from "../../components/Loader/Loader";

const ProcessorClients = () => {
  const processorRoute = routes[2];
  const location = useLocation();

  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { clientsForRole, loading },
    getClientListForRole,
  } = useContext(UserContext);

  useEffect(() => {
    getClientListForRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dashboard sidebarRoutes={processorRoute} location={location}>
      {!loading ? (
        <ClientList clientList={clientsForRole} role={user.role} />
      ) : (
        <Loader />
      )}
    </Dashboard>
  );
};

export default ProcessorClients;

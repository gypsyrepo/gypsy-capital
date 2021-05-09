import React, { useContext } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import ClientList from "../../components/ClientList/ClientList";
import Loader from "../../components/Loader/Loader";
import useUserList from "../../hooks/useUserList";

const ProcessorClients = () => {
  const processorRoute = routes[2];
  const location = useLocation();
  const [staffList, loading] = useUserList(false);

  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <Dashboard sidebarRoutes={processorRoute} location={location}>
      {!loading ? (
        <ClientList clientList={staffList} role={user.role} />
      ) : (
        <Loader />
      )}
    </Dashboard>
  );
};

export default ProcessorClients;

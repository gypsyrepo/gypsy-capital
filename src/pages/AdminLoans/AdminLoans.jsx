import React, { useContext, useEffect } from "react";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import LoanList from "../../components/LoanList/LoanList";
import Loader from "../../components/Loader/Loader";
import { Context as LoanContext } from "../../context/LoanContext";
import { Context as AuthContext } from "../../context/AuthContext";

const AdminLoans = () => {
  const adminRoutes = routes[4];
  const location = useLocation();

  const {
    state: { loading, loans },
    retrieveClientLoans,
  } = useContext(LoanContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    retrieveClientLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dashboard sidebarRoutes={adminRoutes} location={location}>
      {loading ? (
        <Loader />
      ) : (
        <LoanList loanList={loans} userRole={user?.role} />
      )}
    </Dashboard>
  );
};

export default AdminLoans;

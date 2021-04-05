import React, { useEffect, useContext } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation } from "react-router";
import LoanList from "../../components/LoanList/LoanList";
import { Context as LoanContext } from "../../context/LoanContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";

const ProcessorLoans = () => {
  const location = useLocation();
  const processorRoutes = routes[2];

  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { loans, loading },
    retrieveClientLoans,
  } = useContext(LoanContext);

  useEffect(() => {
    retrieveClientLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dashboard sidebarRoutes={processorRoutes} location={location}>
      {!loading ? (
        <LoanList loanList={loans} userRole={user.role} />
      ) : (
        <Loader />
      )}
    </Dashboard>
  );
};

export default ProcessorLoans;

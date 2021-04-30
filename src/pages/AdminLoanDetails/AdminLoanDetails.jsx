import React, { useContext, useEffect, useState } from "react";
import styles from "./AdminLoanDetails.module.scss";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation, useParams } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import NavTabs from "../../components/NavTabs/NavTabs";
import { Context as LoanContext } from "../../context/LoanContext";
import { Context as AuthContext } from "../../context/AuthContext";
import {
  BasicInfo,
  RepaymentSchedule,
  LoanStatus,
} from "../LoanDetail/LoanDetail";
import Loader from "../../components/Loader/Loader";

const AdminLoanDetails = () => {
  const adminRoutes = routes[4];
  const location = useLocation();
  const { loanId } = useParams();

  const [visibleSection, setVisibleSection] = useState("basic");

  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { loanDetails },
    retrieveLoan,
  } = useContext(LoanContext);

  useEffect(() => {
    retrieveLoan(loanId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navsArray = [
    {
      title: "Basic Info",
      shortlink: "basic",
    },
    {
      title: "Status and Underwriting",
      shortlink: "status",
    },
    {
      title: "Repayment Schedule",
      shortlink: "repayment",
    },
  ];

  const reloadLoan = () => {
    retrieveLoan(loanId);
  };

  const setActiveTab = (link) => {
    setVisibleSection(link);
  };

  return (
    <Dashboard sidebarRoutes={adminRoutes} location={location}>
      <NavTabs
        currentTab={visibleSection}
        navs={navsArray}
        setActive={setActiveTab}
      />
      {loanDetails ? (
        <div className={styles.detailFields}>
          {visibleSection === "basic" && (
            <BasicInfo
              data={
                loanDetails
                  ? {
                      client: { ...loanDetails.client[0]?.bioData },
                      ...loanDetails.loan,
                      dti: loanDetails[0]?.DTI,
                    }
                  : null
              }
              userRole={user.role}
            />
          )}
          {visibleSection === "status" && (
            <LoanStatus
              data={
                loanDetails
                  ? {
                      ...loanDetails.loan,
                    }
                  : null
              }
            />
          )}
          {visibleSection === "repayment" && (
            <RepaymentSchedule
              data={
                loanDetails
                  ? {
                      ...loanDetails.loan,
                      payments: loanDetails.payments,
                    }
                  : null
              }
              reloadLoan={reloadLoan}
              userRole={user.role}
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </Dashboard>
  );
};

export default AdminLoanDetails;

import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import styles from "./AuthorizerLoanDetails.module.scss";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation, useParams } from "react-router-dom";
import NavTabs from "../../components/NavTabs/NavTabs";
import { BasicInfo } from "../LoanDetail/LoanDetail";
import { Context as LoanContext } from "../../context/LoanContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";
import {
  DecisionApproval,
  RepaySetup,
  MonoTab,
} from "../ProcessorLoanDetails/ProcessorLoanDetails";
import { RepaymentSchedule } from "../LoanDetail/LoanDetail";

const AuthorizerLoanDetails = () => {
  const [visibleSection, setVisibleSection] = useState("basic");

  const location = useLocation();
  const authorizerRoutes = routes[3];
  const { loanId } = useParams();

  const {
    state: { loanDetails },
    retrieveLoan,
  } = useContext(LoanContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    retrieveLoan(loanId);
  }, []);

  const navArray = [
    {
      title: "Basic Info",
      shortlink: "basic",
    },
    {
      title: "Decision & Approval",
      shortlink: "decision",
    },
    {
      title: "Repayment Setup",
      shortlink: "setup",
    },
    {
      title: "Repayment Schedule",
      shortlink: "repay",
    },
    {
      title: "Mono",
      shortlink: "mono",
    },
  ];

  const setActiveTab = (link) => {
    setVisibleSection(link);
  };

  console.log(loanDetails);

  return (
    <Dashboard sidebarRoutes={authorizerRoutes} location={location}>
      <NavTabs
        navs={navArray}
        setActive={setActiveTab}
        currentTab={visibleSection}
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
          {visibleSection === "decision" && (
            <DecisionApproval
              loanData={loanDetails.loan}
              loanId={loanId}
              userRole={user.role}
              disburseBank={loanDetails?.bank[0]}
            />
          )}
          {visibleSection === "setup" && (
            <RepaySetup loanData={loanDetails.loan} loanId={loanId} />
          )}
          {visibleSection === "repay" && (
            <RepaymentSchedule
              data={
                loanDetails
                  ? {
                      ...loanDetails?.loan,
                      payments: loanDetails?.payments,
                    }
                  : null
              }
              userRole={user.role}
              loanId={loanId}
            />
          )}
          {visibleSection === "mono" && (
            <MonoTab clientId={loanDetails?.client[0]?.clientId} />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </Dashboard>
  );
};

export default AuthorizerLoanDetails;

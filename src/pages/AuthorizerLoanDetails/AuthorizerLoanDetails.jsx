import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import styles from "./AuthorizerLoanDetails.module.scss";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation, useParams } from "react-router-dom";
import NavTabs from "../../components/NavTabs/NavTabs";
import { BasicInfo } from "../LoanDetail/LoanDetail";
import { Context as LoanContext } from "../../context/LoanContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ApprovalContext } from "../../context/ApprovalContext";
import { Context as BankContext } from "../../context/BankCotext";
import { Row, Col } from "react-bootstrap";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import {
  RepayPlusApprove,
  MonoTab,
} from "../ProcessorLoanDetails/ProcessorLoanDetails";
import { RepaymentSchedule } from "../LoanDetail/LoanDetail";
import _ from "lodash";
import { numberWithCommas } from "../../utils/nigeriaStates";
import { toast, ToastContainer } from "react-toastify";

const Disbursal = ({ loanId, disburseBank, loanData }) => {
  const {
    state: { loading, error, disbursedStatus },
    disburseLoan,
    clearError,
    resetDisburseStatus,
  } = useContext(ApprovalContext);

  const {
    state: { bankList },
    getBankList,
  } = useContext(BankContext);

  const [disburseData, setDisburseData] = useState({
    bankName: "",
    accountNumber: "",
    amount: "",
  });

  useEffect(() => {
    (async () => {
      await getBankList();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (disburseBank && disburseBank.isDisbursement) {
      setDisburseData({
        ...disburseData,
        bankName: _.startCase(disburseBank.bank),
        accountNumber: disburseBank.accountNumber,
        amount: numberWithCommas(loanData.approvedAmount),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disburseBank]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (disbursedStatus) {
      toast.success("Loan was disbursed successfully!");
      resetDisburseStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disbursedStatus]);

  const transferPaymentToClient = () => {
    const bankInfo = bankList.filter(
      (bank) => bank.name.toLowerCase() === disburseBank.bank.toLowerCase()
    );
    // console.log(bankInfo[0].code);
    const paymentData = {
      account_bank: bankInfo[0].code,
      account_number: disburseBank.accountNumber,
      amount: loanData.amount,
    };
    disburseLoan(loanId, paymentData);
  };

  if (!bankList) {
    return null;
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            label="Bank Name"
            nameAttr="bankName"
            value={disburseData.bankName}
            disable={true}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            label="Account Number"
            nameAttr="accNumber"
            value={disburseData.accountNumber}
            disable={true}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            label="Amount"
            nameAttr="amount"
            value={disburseData.amount}
            disable={true}
          />
        </Col>
      </Row>
      <Button
        className="mt-4"
        fullWidth
        clicked={transferPaymentToClient}
        bgColor="#741763"
        size="lg"
        color="#EBEBEB"
        disabled={loading || loanData?.adminDecision !== "approve"}
        loading={loading}
      >
        Disburse
      </Button>
    </>
  );
};

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // {
    //   title: "Repayment Setup",
    //   shortlink: "setup",
    // },
    {
      title: "Repayment Schedule",
      shortlink: "repay",
    },
    {
      title: "Mono",
      shortlink: "mono",
    },
    {
      title: "Disbursal",
      shortlink: "disburse",
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
            <RepayPlusApprove
              loanId={loanId}
              loanData={loanDetails?.loan}
              userRole={user?.role}
              setActiveTab={setActiveTab}
            />
          )}
          {/* {visibleSection === "setup" && (
            <RepaySetup loanData={loanDetails.loan} loanId={loanId} />
          )} */}
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
          {visibleSection === "disburse" && (
            <Disbursal
              loanData={loanDetails.loan}
              loanId={loanId}
              disburseBank={loanDetails?.bank[0]}
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </Dashboard>
  );
};

export default AuthorizerLoanDetails;

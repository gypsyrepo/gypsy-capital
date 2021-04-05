import React, { useState, useContext, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import styles from "./ProcessorLoanDetails.module.scss";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation, useParams } from "react-router-dom";
import NavTabs from "../../components/NavTabs/NavTabs";
import { BasicInfo, RepaymentSchedule } from "../LoanDetail/LoanDetail";
import { Context as LoanContext } from "../../context/LoanContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ApprovalContext } from "../../context/ApprovalContext";
import { Context as RepaymentContext } from "../../context/RepaymentContext";
import { Context as MonoContext } from "../../context/MonoContext";
import { Context as BankContext } from "../../context/BankCotext";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Row, Col, Modal } from "react-bootstrap";
import ProcessOffer from "../../components/ProcessOffer/ProcessOffer";
import { validateInput } from "../../utils/validateInput";
import _ from "lodash";
import { numberWithCommas } from "../../utils/nigeriaStates";
import { toast, ToastContainer } from "react-toastify";
import { DtiRangeSlider } from "../../components/LoanCalculatorForm/LoanCalculatorForm";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import {
  convertInput,
  stripCommasInNumber,
} from "../../utils/convertInputType";
import { RiSendPlaneFill } from "react-icons/ri";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const MonoTab = ({ clientId }) => {
  const {
    state: { loading },
    getAccountInfo,
    getAccountStatement,
  } = useContext(MonoContext);

  const retrieveAccountInfo = () => {
    console.log(clientId);
    getAccountInfo(clientId);
  };

  const retrieveAccountStatement = () => {
    console.log(clientId);
    getAccountStatement(clientId, 3);
  };

  return (
    <>
      <div className={styles.status}>
        <p>Status: Inactive</p>
      </div>
      <div className={styles.monoContainer}>
        <Row>
          <Col>
            <Button
              className="mt-4"
              fullWidth
              clicked={retrieveAccountStatement}
              bgColor="#741763"
              size="lg"
              color="#EBEBEB"
              disabled={loading}
              loading={loading}
            >
              Get Account Statement
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              className="mt-4"
              fullWidth
              // clicked={updateContactInfo}
              bgColor="#741763"
              size="lg"
              color="#EBEBEB"
              // disabled={loading}
              // loading={loading}
            >
              Get Transaction History
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              className="mt-4"
              fullWidth
              clicked={retrieveAccountInfo}
              bgColor="#741763"
              size="lg"
              color="#EBEBEB"
              disabled={loading}
              loading={loading}
            >
              Get Account Info
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export const RepayPlusApprove = ({
  loanData,
  loanId,
  userRole,
  setActiveTab,
}) => {
  const {
    state: { loading, repaymentStatus, error },
    setupRepayment,
    resetRepaymentStatus,
    clearError,
  } = useContext(RepaymentContext);

  const {
    state: {
      loading: approvalLoading,
      error: approveLoanError,
      approvedStatus,
    },
    decideApproval,
    disburseLoan,
    clearError: clearApprovalError,
    resetApprovalStatus,
  } = useContext(ApprovalContext);

  const { retrieveLoan } = useContext(LoanContext);

  const [setupData, setSetupData] = useState({
    decision: null,
    approvedPayDay: null,
    repaymentStartDate: null,
    approvedLoanAmount: null,
    approvedTenure: null,
    approvedDti: 33,
    approvedMonthlyRepayment: null,
    totalRepayment: null,
    repaymentApi: null,
    bank: null,
    accountNumber: null,
    decisionReason: null,
    approvedInterest: null,
  });

  const [repaymentError, setRepaymentError] = useState({
    approvedPayDay: null,
    repaymentStartDate: null,
    approvedLoanAmount: null,
    approvedTenure: null,
    approvedInterest: null,
    adminFee: null,
  });

  const [approvalError, setApprovalError] = useState({
    decision: null,
    decisionReason: null,
  });

  const [limitError, setLimitError] = useState(null);

  const { approvedLoanAmount, approvedTenure, approvedInterest, adminFee } = {
    ...setupData,
  };

  console.log(moment("16/03/2021", "DD/MM/YYYY").toDate(), loanData, userRole);

  useEffect(() => {
    const savedLoanData = JSON.parse(sessionStorage.getItem(`gypsy-${loanId}`));

    if (sessionStorage.getItem(`gypsy-${loanId}`)) {
      let repayDate;
      if (savedLoanData?.repaymentStartDate) {
        repayDate = moment(savedLoanData?.repaymentStartDate).toDate();
      } else {
        repayDate = null;
      }
      setSetupData({
        ...setupData,
        decision: savedLoanData?.decision || loanData[`${mappedRole}Decision`],
        approvedPayDay: savedLoanData?.approvedPayDay,
        repaymentStartDate: repayDate,
        approvedLoanAmount: savedLoanData?.approvedLoanAmount,
        approvedTenure: savedLoanData?.approvedTenure,
        approvedDti: savedLoanData?.approvedDti || 33,
        approvedMonthlyRepayment: savedLoanData?.approvedMonthlyRepayment,
        totalRepayment: savedLoanData?.totalRepayment,
        repaymentApi: savedLoanData?.repaymentApi,
        bank: savedLoanData?.bank,
        accountNumber: savedLoanData?.accountNumber,
        decisionReason: savedLoanData?.decisionReason,
        approvedInterest: savedLoanData?.approvedInterest,
      });
    } else {
      let repayDate;

      if (loanData?.determinedRepaymentDate) {
        console.log("works");
        repayDate = moment(
          loanData?.determinedRepaymentDate,
          "DD/MM/YYYY"
        ).toDate();
      } else {
        console.log("works 2");
        repayDate = null;
      }

      setSetupData({
        ...setupData,
        decision: loanData[`${mappedRole}Decision`],
        approvedPayDay:
          loanData.processorDecision || loanData.adminDecision
            ? loanData?.payDay
            : "",
        repaymentStartDate: repayDate,
        approvedLoanAmount:
          loanData.processorDecision || loanData.adminDecision
            ? numberWithCommas(loanData?.approvedAmount)
            : "",
        approvedTenure: loanData?.approvedTenure,
        approvedDti: loanData?.Dti || 33,
        approvedMonthlyRepayment: loanData?.rePaymentAPI
          ? numberWithCommas(loanData?.monthlyRepayment)
          : "",
        totalRepayment: numberWithCommas(loanData?.calculatedPayBack),
        repaymentApi: loanData?.rePaymentAPI,
        bank: "",
        accountNumber: "",
        decisionReason: loanData[`${mappedRole}DecisionReason`] || "",
        approvedInterest: loanData?.approvedInterest || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sessionStorage.setItem(`gypsy-${loanId}`, JSON.stringify(setupData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupData]);

  useEffect(() => {
    if (repaymentStatus) {
      toast.success("Repayment has been successfully setup for this loan!");
      resetRepaymentStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repaymentStatus]);

  useEffect(() => {
    if (approvedStatus) {
      toast.success(
        `The loan has been ${
          loanData[`${mappedRole}Decision`] === "approve"
            ? `approved`
            : `declined`
        } successfully!`
      );
      resetApprovalStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvedStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (approvalError) {
      toast.error(approvalError);
      clearApprovalError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalError]);

  useEffect(() => {
    if ((approvedInterest && approvedLoanAmount, approvedTenure, adminFee)) {
      const tenor = Number(approvedTenure);
      const initRate = stripCommasInNumber(approvedLoanAmount);
      const interestRate = Number(approvedInterest) / 100;
      const adminRate = Number(adminFee) / 100;

      let totalRepay = initRate + initRate * adminRate;
      totalRepay = totalRepay + totalRepay * interestRate * tenor;
      const monthlyRepay = Math.floor(totalRepay / tenor);

      const decimalDTI = (setupData.approvedDti / 100).toFixed(3);

      if (monthlyRepay > decimalDTI * Number(loanData?.monthlySalary)) {
        setLimitError(
          "The user is not eligible for this amount, increase DTI or enter a lower amount"
        );
      } else {
        setLimitError(null);
      }

      setSetupData({
        ...setupData,
        approvedMonthlyRepayment: numberWithCommas(monthlyRepay),
        totalRepayment: numberWithCommas(totalRepay),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    approvedInterest,
    approvedLoanAmount,
    approvedTenure,
    adminFee,
    setupData?.approvedDti,
  ]);

  const initiateRepayment = () => {
    const fieldsToSetup = (({
      approvedPayDay,
      repaymentStartDate,
      approvedLoanAmount,
      approvedTenure,
      approvedInterest,
      adminFee,
    }) => ({
      approvedPayDay,
      repaymentStartDate,
      approvedLoanAmount,
      approvedTenure,
      approvedInterest,
      adminFee,
    }))(setupData);

    const validated = validateInput(fieldsToSetup, setRepaymentError);
    if (validated) {
      if (setupData.repaymentApi) {
        const data = {
          approved_tenure: setupData.approvedTenure,
          determined_repayment_date: moment(
            setupData.repaymentStartDate
          ).format("DD/MM/YYYY"),
          rePaymentAPI: setupData.repaymentApi,
          total_pay: stripCommasInNumber(setupData.totalRepayment),
        };
        // console.log(data);
        setupRepayment(loanId, data, retrieveLoan);
      } else {
        toast.error("You need to choose a repayment API to setup repayment");
      }
    }
  };

  const mappedRole = userRole === "processor" ? `processor` : `admin`;

  const submitApproval = async () => {
    const fieldsforApproval = (({ decision, decisionReason }) => ({
      decision,
      decisionReason,
    }))(setupData);

    const validated = validateInput(fieldsforApproval, setApprovalError);
    console.log(validated);
    if (validated) {
      if (loanData?.rePaymentAPI || setupData?.decision === "decline") {
        if (!loanData[`${mappedRole}Decision`]) {
          //TODO - setup approval here
          let data;

          if (setupData?.decision === "approve") {
            console.log(setupData?.totalRepayment);
            data = {
              decision: setupData?.decision,
              approved_interest: setupData?.approvedInterest,
              approved_tenure: setupData?.approvedTenure,
              determined_repayment_date: moment(
                setupData?.repaymentStartDate
              ).format("DD/MM/YYYY"),
              decision_reason: setupData?.decisionReason,
              total_pay: stripCommasInNumber(setupData?.totalRepayment),
              approvedAmount: stripCommasInNumber(
                setupData?.approvedLoanAmount
              ),
            };
          } else if (setupData?.decision === "decline") {
            data = {
              decision: setupData?.decision,
              decision_reason: setupData?.decisionReason,
            };
          }

          await decideApproval(loanId, data, retrieveLoan);
          if (userRole === "authorizer") {
            setActiveTab("disburse");
          }
        } else {
          toast.error(
            "Decision and approval has already been done on this loan"
          );
          if (userRole === "authorizer") {
            setActiveTab("disburse");
          }
        }
      } else {
        toast.error(
          "You have to setup repayment for this loan before it can be approved"
        );
      }
    }
  };

  if (!setupData) {
    return null;
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <Row className="mb-4">
        <Col>
          <InputField
            type="select"
            nameAttr="decision"
            label="Decision"
            value={setupData?.decision}
            options={["Approve", "Decline"]}
            changed={(val) => {
              setApprovalError({ ...approvalError, decision: null });
              setSetupData({ ...setupData, decision: val });
            }}
            disable={
              (loanData &&
                loanData[`${mappedRole}Decision`] &&
                loanData?.rePaymentAPI) ||
              loanData[`${mappedRole}Decision`] === "decline"
            }
            error={approvalError?.decision}
          />
        </Col>
      </Row>
      {setupData?.decision !== "decline" && (
        <Row className="mb-4">
          <Col md={6}>
            <InputField
              type="number"
              nameAttr="payDay"
              label="Approved Payday"
              value={setupData?.approvedPayDay}
              changed={(val) => {
                setRepaymentError({ ...repaymentError, approvedPayDay: null });
                setSetupData({ ...setupData, approvedPayDay: val });
              }}
              error={
                repaymentError.approvedPayDay && repaymentError.approvedPayDay
              }
              disable={loanData?.rePaymentAPI}
            />
          </Col>
          <Col md={6}>
            <CustomDatePicker
              label="Repayment Start Date"
              value={setupData?.repaymentStartDate}
              changed={(val) => {
                setSetupData({ ...setupData, repaymentStartDate: val });
                setRepaymentError({
                  ...repaymentError,
                  repaymentStartDate: null,
                });
              }}
              error={
                repaymentError.repaymentStartDate &&
                repaymentError.repaymentStartDate
              }
              disable={loanData?.rePaymentAPI}
            />
          </Col>
        </Row>
      )}
      {setupData?.decision !== "decline" && (
        <Row className="mb-4">
          <Col>
            <InputField
              type="text"
              nameAttr="loanAmount"
              label="Approved Loan Amount"
              value={setupData?.approvedLoanAmount}
              changed={(val) => {
                const { includesAlphabet, convertedToNumber } = convertInput(
                  val
                );
                if (!includesAlphabet) {
                  setSetupData({
                    ...setupData,
                    approvedLoanAmount: convertedToNumber.toLocaleString(),
                  });
                  setRepaymentError({
                    ...repaymentError,
                    approvedLoanAmount: null,
                  });
                }
              }}
              error={
                repaymentError.approvedLoanAmount &&
                repaymentError.approvedLoanAmount
              }
              disable={loanData?.rePaymentAPI}
            />
          </Col>
          <Col>
            <InputField
              type="select"
              nameAttr="approvedTenure"
              label="Approved Tenure"
              value={setupData?.approvedTenure}
              options={[1, 2, 3, 4, 5, 6]}
              changed={(val) => {
                setRepaymentError({ ...repaymentError, approvedTenure: null });
                setSetupData({ ...setupData, approvedTenure: val });
              }}
              error={
                repaymentError.approvedTenure && repaymentError.approvedTenure
              }
              disable={loanData?.rePaymentAPI}
            />
          </Col>
        </Row>
      )}
      {setupData?.decision !== "decline" && (
        <Row className="mb-4">
          <Col>
            <InputField
              type="number"
              nameAttr="interestRate"
              label="Approved Interest Rate (%)"
              value={setupData?.approvedInterest}
              changed={(val) => {
                setRepaymentError({
                  ...repaymentError,
                  approvedInterest: null,
                });
                setSetupData({ ...setupData, approvedInterest: val });
              }}
              error={
                repaymentError.approvedInterest &&
                repaymentError.approvedInterest
              }
              disable={loanData?.rePaymentAPI}
            />
          </Col>
          <Col>
            <InputField
              type="number"
              nameAttr="adminFee"
              label="Admin Fee (%)"
              value={setupData?.adminFee}
              changed={(val) => {
                setRepaymentError({ ...repaymentError, adminFee });
                setSetupData({ ...setupData, adminFee: val });
              }}
              error={repaymentError.adminFee && repaymentError.adminFee}
              disable={loanData?.rePaymentAPI}
            />
          </Col>
        </Row>
      )}
      {setupData?.decision !== "decline" && (
        <Row className="mb-4">
          <Col>
            <DtiRangeSlider
              dtiVal={setupData?.approvedDti}
              setVal={(val) => setSetupData({ ...setupData, approvedDti: val })}
              label="Approved DTI"
            />
          </Col>
        </Row>
      )}
      {setupData?.decision !== "decline" && (
        <Row className="mb-4">
          <Col>
            <InputField
              type="text"
              nameAttr="monthlyRepayment"
              label="Approved Monthly Repayment"
              value={setupData?.approvedMonthlyRepayment}
              changed={(val) => {
                setRepaymentError({
                  ...repaymentError,
                  approvedMonthlyRepayment: null,
                });
                setSetupData({ ...setupData, approvedMonthlyRepayment: val });
              }}
              disable={true}
              error={
                repaymentError.approvedMonthlyRepayment &&
                repaymentError.approvedMonthlyRepayment
              }
            />
            {limitError ? (
              <p className={styles.limitError}>{limitError}</p>
            ) : null}
          </Col>
          <Col>
            <InputField
              type="text"
              nameAttr="totalRepay"
              label="Total Repayment"
              value={setupData?.totalRepayment}
              changed={(val) => {
                setRepaymentError({ ...repaymentError, totalRepayment: null });
                setSetupData({ ...setupData, totalRepayment: val });
              }}
              disable={true}
              error={repaymentError?.totalRepayment}
            />
          </Col>
        </Row>
      )}
      {setupData?.decision !== "decline" && (
        <Row className="mb-4 align-items-end no-gutters">
          <Col md={11}>
            <InputField
              type="select"
              nameAttr="repaymentApi"
              label="Repayment API"
              options={["Paystack", "Remita", "Flutterwave"]}
              value={setupData?.repaymentApi}
              changed={(val) => {
                setSetupData({ ...setupData, repaymentApi: val });
              }}
              disable={loanData?.rePaymentAPI}
            />
          </Col>
          <Col md={1}>
            <button
              disabled={loanData?.rePaymentAPI}
              onClick={initiateRepayment}
              className={styles.repaymentBtn}
            >
              {/* <RiSendPlaneFill size="1.2rem" /> */}
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-3" />
              ) : (
                <RiSendPlaneFill size="1.2rem" />
              )}
            </button>
          </Col>
        </Row>
      )}
      {setupData?.repaymentApi === "remita" && (
        <Row className="mb-4">
          <Col>
            <InputField
              type="text"
              nameAttr="bank"
              label="Bank"
              value={setupData?.bank}
            />
          </Col>
          <Col>
            <InputField
              type="text"
              nameAttr="accountNumber"
              label="Account Number"
              value={setupData?.accountNumber}
            />
          </Col>
        </Row>
      )}
      <Row className="mb-4">
        <Col>
          <InputField
            type="textarea"
            nameAttr="decisionReason"
            label="Decision Reason"
            value={setupData?.decisionReason}
            changed={(val) => {
              setApprovalError({ ...approvalError, decisionReason: null });
              setSetupData({ ...setupData, decisionReason: val });
            }}
            disable={
              (loanData &&
                loanData[
                  `${userRole === "authorizer" ? `admin` : `processor`}Decision`
                ] &&
                loanData?.rePaymentAPI) ||
              loanData[`${mappedRole}Decision`] === "decline"
            }
            error={approvalError?.decisionReason}
          />
        </Col>
      </Row>
      <Button
        className="mt-4"
        fullWidth
        clicked={submitApproval}
        bgColor="#741763"
        size="lg"
        color="#EBEBEB"
        disabled={approvalLoading}
        loading={approvalLoading}
      >
        {userRole === "processor" ? `Submit` : `Submit & Disburse`}
      </Button>
    </>
  );
};

const ProcessorLoanDetails = () => {
  const location = useLocation();
  const processorRoute = routes[2];
  const { loanId } = useParams();

  const [visibleSection, setVisibleSection] = useState("basic");

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
      title: "Repayment Schedule",
      shortlink: "repay",
    },
    {
      title: "Offer Letter",
      shortlink: "offer",
    },
    {
      title: "Mono",
      shortlink: "mono",
    },
  ];

  const setActiveTab = (link) => {
    setVisibleSection(link);
  };

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

  console.log(loanDetails);

  return (
    <Dashboard sidebarRoutes={processorRoute} location={location}>
      <NavTabs
        navs={navArray}
        setActive={setActiveTab}
        currentTab={visibleSection}
      />
      <div className={styles.detailFields}>
        {visibleSection === "basic" ? (
          <BasicInfo
            data={
              loanDetails
                ? {
                    client: { ...loanDetails?.client[0]?.bioData },
                    ...loanDetails?.loan,
                  }
                : null
            }
            userRole={user.role}
          />
        ) : null}
        {visibleSection === "decision" ? (
          <RepayPlusApprove
            loanId={loanId}
            loanData={loanDetails?.loan}
            userRole={user?.role}
          />
        ) : null}
        {visibleSection === "repay" ? (
          <RepaymentSchedule
            data={
              loanDetails
                ? {
                    ...loanDetails?.loan,
                    payments: loanDetails?.payments,
                  }
                : null
            }
            loanId={loanId}
            userRole={user?.role}
          />
        ) : null}
        {visibleSection === "offer" ? (
          <ProcessOffer
            data={
              loanDetails
                ? {
                    client: { ...loanDetails?.client[0]?.bioData },
                    ...loanDetails?.loan,
                    residence: { ...loanDetails?.residence[0] },
                    employment: { ...loanDetails?.employment[0] },
                  }
                : null
            }
          />
        ) : null}
        {visibleSection === "mono" ? (
          <MonoTab clientId={loanDetails?.client[0]?.clientId} />
        ) : null}
      </div>
    </Dashboard>
  );
};

export default ProcessorLoanDetails;

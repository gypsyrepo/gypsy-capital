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

export const DecisionApproval = ({
  loanId,
  loanData,
  userRole,
  disburseBank,
}) => {
  const {
    state: { loading, error, approvedStatus },
    decideApproval,
    disburseLoan,
    clearError,
    resetApprovalStatus,
  } = useContext(ApprovalContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);

  // useEffect(() => {
  //   if(approvedStatus) {
  //     resetApprovalStatus();
  //     setShowModal(true);
  //   }
  // }, [approvedStatus])

  const [approvalData, setApprovalData] = useState({
    decision: "",
    approvedRate: "",
    approvedTenure: "",
    repaymentDate: "",
    decisionReason: "",
    totalPay: "",
    approvedAmount: "",
  });

  const [approvalErrors, setApprovalErrors] = useState({
    decision: null,
    approvedRate: null,
    approvedTenure: null,
    repaymentDate: null,
    decisionReason: null,
    totalPay: null,
    approvedAmount: null,
  });

  const {
    state: { bankList },
    getBankList,
  } = useContext(BankContext);

  useEffect(() => {
    (async () => {
      await getBankList();
    })();
  }, []);

  useEffect(() => {
    if (loanData && loanData.processorDecision) {
      console.log(loanData);
      setApprovalData({
        ...approvalData,
        decision: loanData.processorDecision,
        approvedRate: loanData.approvedInterest,
        approvedTenure: loanData.approvedTenure,
        repaymentDate: loanData.determinedRepaymentDate,
        approvedAmount: loanData.amount,
        decisionReason: loanData.processorDecisionReason,
      });
    }
  }, [loanData]);

  const approveLoan = async () => {
    if (userRole === "processor") {
      const validated = validateInput(approvalData, setApprovalErrors);
      console.log(validated);
      if (validated) {
        const data = {
          decision: approvalData.decision,
          approved_interest: approvalData.approvedRate,
          approved_tenure: approvalData.approvedTenure,
          determined_repayment_date: approvalData.repaymentDate,
          decision_reason: approvalData.decisionReason,
          total_pay: approvalData.totalPay,
          approvedAmount: approvalData.approvedAmount,
        };
        decideApproval(loanId, data);
      }
    } else if (userRole === "authorizer") {
      if (loanData && loanData?.processorDecision) {
        await decideApproval(loanId, {
          decision: loanData?.processorDecision,
          approved_interest: loanData?.approvedInterest?.toString(),
          approved_tenure: loanData?.approvedTenure?.toString(),
          determined_repayment_date: loanData?.determinedRepaymentDate,
          total_pay: loanData?.calculatedPayBack?.toString(),
          decision_reason: loanData?.processorDecisionReason,
          approvedAmount: loanData?.amount?.toString(),
        });
        setShowModal(true);
      } else {
        const validated = validateInput(approvalData, setApprovalErrors);
        console.log(validated);
        if (validated) {
          const data = {
            decision: approvalData.decision,
            approved_interest: approvalData.approvedRate,
            approved_tenure: approvalData.approvedTenure,
            determined_repayment_date: approvalData.repaymentDate,
            decision_reason: approvalData.decisionReason,
            total_pay: approvalData.totalPay,
          };
          await decideApproval(loanId, data);
        }
      }
    }
  };

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

  const DisburseModal = () => {
    const handleClose = () => {
      setShowModal(false);
    };

    const [clientBank, setClientBank] = useState({
      bankName: "",
      accountNumber: "",
      amount: "",
    });

    useEffect(() => {
      if (disburseBank && disburseBank.isDisbursement) {
        setClientBank({
          ...clientBank,
          bankName: _.startCase(disburseBank.bank),
          accountNumber: disburseBank.accountNumber,
          amount: numberWithCommas(loanData.amount),
        });
      }
    }, [disburseBank]);

    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body className={styles.disburseModal}>
          <Row className="mb-4">
            <Col>
              <InputField
                type="text"
                label="Bank Name"
                nameAttr="bankName"
                value={clientBank.bankName}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField
                type="text"
                label="Account Number"
                nameAttr="accNumber"
                value={clientBank.accountNumber}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField
                type="text"
                label="Amount"
                nameAttr="amount"
                value={clientBank.amount}
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
            disabled={loading}
            loading={loading}
          >
            Disburse
          </Button>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Row className="mb-4">
        <Col>
          <InputField
            type="select"
            label="Decision"
            nameAttr="decision"
            options={["Approve", "Decline"]}
            value={approvalData.decision}
            changed={(val) => {
              setApprovalData({ ...approvalData, decision: val });
              setApprovalErrors({ ...approvalErrors, decision: null });
            }}
            error={approvalErrors.decision && approvalErrors.decision}
            disable={!!loanData?.processorDecision}
          />
        </Col>
        <Col>
          <InputField
            type="text"
            label="Approved Interest Rate"
            nameAttr="interestRate"
            value={approvalData.approvedRate}
            changed={(val) => {
              setApprovalData({ ...approvalData, approvedRate: val });
              setApprovalErrors({ ...approvalErrors, approvedRate: null });
            }}
            error={approvalErrors.approvedRate && approvalErrors.approvedRate}
            disable={!!loanData?.processorDecision}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            label="Approved Tenure"
            nameAttr="approvedTenure"
            value={approvalData.approvedTenure}
            changed={(val) => {
              setApprovalData({ ...approvalData, approvedTenure: val });
              setApprovalErrors({ ...approvalErrors, approvedTenure: null });
            }}
            error={
              approvalErrors.approvedTenure && approvalErrors.approvedTenure
            }
            disable={!!loanData?.processorDecision}
          />
        </Col>
        <Col>
          <InputField
            type="text"
            label="Determined Repayment Date"
            nameAttr="repaymentDate"
            value={approvalData.repaymentDate}
            changed={(val) => {
              setApprovalData({ ...approvalData, repaymentDate: val });
              setApprovalErrors({ ...approvalErrors, repaymentDate: null });
            }}
            error={approvalErrors.repaymentDate && approvalErrors.repaymentDate}
            disable={!!loanData?.processorDecision}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            label="Total Repayment"
            nameAttr="totalRepayment"
            value={approvalData.totalPay}
            changed={(val) => {
              setApprovalData({ ...approvalData, totalPay: val });
              setApprovalErrors({ ...approvalErrors, totalPay: null });
            }}
            error={approvalErrors.totalPay && approvalErrors.totalPay}
            disable={!!loanData?.processorDecision}
          />
        </Col>
        <Col>
          <InputField
            type="text"
            label="Approved Loan Amount"
            nameAttr="approvedAmount"
            value={approvalData.approvedAmount}
            changed={(val) => {
              setApprovalData({ ...approvalData, approvedAmount: val });
              setApprovalErrors({ ...approvalErrors, approvedAmount: null });
            }}
            error={
              approvalErrors.approvedAmount && approvalErrors.approvedAmount
            }
            disable={!!loanData?.processorDecision}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="textarea"
            label="Decision Reason"
            nameAttr="decisionReason"
            value={approvalData.decisionReason}
            changed={(val) => {
              setApprovalData({ ...approvalData, decisionReason: val });
              setApprovalErrors({ ...approvalErrors, decisionReason: null });
            }}
            error={
              approvalErrors.decisionReason && approvalErrors.decisionReason
            }
            disable={!!loanData?.processorDecision}
          />
        </Col>
      </Row>
      <Button
        className="mt-4"
        fullWidth
        clicked={approveLoan}
        bgColor="#741763"
        size="lg"
        color="#EBEBEB"
        disabled={loading}
        loading={loading}
      >
        {userRole === "processor" ? `Submit Decision` : `Submit & Disburse`}
      </Button>
      <DisburseModal />
    </>
  );
};

export const RepaySetup = ({ loanId, loanData }) => {
  const {
    state: { loading },
    setupRepayment,
  } = useContext(RepaymentContext);

  const [repayData, setRepayData] = useState({
    repaymentApi: "",
    totalRepay: "",
    tenure: "",
    payday: "",
    startDate: "",
    bankName: "",
    accountNumber: "",
  });

  const [repayError, setRepayError] = useState({
    repaymentApi: null,
    totalRepay: null,
    tenure: null,
    payday: null,
    startDate: null,
    bankName: null,
    accountNumber: null,
  });

  useEffect(() => {
    if (loanData && loanData.rePaymentAPIstatus) {
      setRepayData({
        ...repayData,
        repaymentApi: loanData.rePaymentAPIstatus,
        tenure: loanData.approvedTenure,
        payday: loanData.payDay,
        startDate: loanData.determinedRepaymentDate,
      });
    }
  }, [loanData]);

  const startRepaymentSetup = () => {
    const { repaymentApi, totalRepay, tenure, payday, startDate } = repayData;
    const forPaystack = { repaymentApi, totalRepay, tenure, payday, startDate };
    let validated;
    if (repayData.repaymentApi === "paystack") {
      validated = validateInput(forPaystack, setRepayError);
    } else {
      validated = validateInput(repayData, setRepayError);
    }
    console.log(validated);
    const data = {
      approved_tenure: repayData.tenure,
      determined_repayment_date: repayData.startDate,
      rePaymentAPI: "paystack",
      total_pay: repayData.totalRepay,
    };
    if (validated) {
      setupRepayment(loanId, data);
    }
  };

  return (
    <>
      <Row className="mb-4">
        <Col>
          <InputField
            type="select"
            label="Repayment API"
            nameAttr="repayApi"
            value={repayData.repaymentApi}
            options={["Paystack", "Remita"]}
            changed={(val) => {
              setRepayError({ ...repayError, repaymentApi: null });
              setRepayData({ ...repayData, repaymentApi: val });
            }}
            error={repayError.repaymentApi && repayError.repaymentApi}
            disable={!!loanData.rePaymentAPIstatus}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            label="Total Repayment"
            nameAttr="totalRepay"
            value={repayData.totalRepay}
            changed={(val) => {
              setRepayError({ ...repayError, totalRepay: null });
              setRepayData({ ...repayData, totalRepay: val });
            }}
            error={repayError.totalRepay && repayError.totalRepay}
            disable={!!loanData.rePaymentAPIstatus}
          />
        </Col>
        <Col>
          <InputField
            type="text"
            label="Tenure"
            nameAttr="tenure"
            value={repayData.tenure}
            changed={(val) => {
              setRepayError({ ...repayError, tenure: null });
              setRepayData({ ...repayData, tenure: val });
            }}
            error={repayError.tenure && repayError.tenure}
            disable={!!loanData.rePaymentAPIstatus}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            label="Pay day"
            nameAttr="payday"
            value={repayData.payday}
            changed={(val) => {
              setRepayError({ ...repayError, payday: null });
              setRepayData({ ...repayData, payday: val });
            }}
            error={repayError.payday && repayError.payday}
            disable={!!loanData.rePaymentAPIstatus}
          />
        </Col>
        <Col>
          <InputField
            type="text"
            label="Repayment Start Date"
            nameAttr="startDate"
            value={repayData.startDate}
            changed={(val) => {
              setRepayError({ ...repayError, startDate: null });
              setRepayData({ ...repayData, startDate: val });
            }}
            error={repayError.startDate && repayError.startDate}
            disable={!!loanData.rePaymentAPIstatus}
          />
        </Col>
      </Row>
      {repayData.repaymentApi !== "paystack" && (
        <Row className="mb-4">
          <Col>
            <InputField
              type="text"
              label="Bank Name"
              nameAttr="bankName"
              value={repayData.bankName}
              changed={(val) => {
                setRepayError({ ...repayError, bankName: null });
                setRepayData({ ...repayData, bankName: val });
              }}
              error={repayError.bankName && repayError.bankName}
            />
          </Col>
          <Col>
            <InputField
              type="text"
              label="Account Number"
              nameAttr="accountNumber"
              value={repayData.accountNumber}
              changed={(val) => {
                setRepayError({ ...repayError, accountNumber: null });
                setRepayData({ ...repayData, accountNumber: val });
              }}
              error={repayError.accountNumber && repayError.accountNumber}
            />
          </Col>
        </Row>
      )}
      <Button
        className="mt-4"
        fullWidth
        clicked={startRepaymentSetup}
        bgColor="#741763"
        size="lg"
        color="#EBEBEB"
        disabled={loanData?.rePaymentAPIstatus ? true : loading}
        loading={loading}
      >
        Continue
      </Button>
    </>
  );
};

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

  const [setupData, setSetupData] = useState({
    decision: null,
    approvedPayDay: "",
    repaymentStartDate: "",
    approvedLoanAmount: "",
    approvedTenure: null,
    approvedDti: 33,
    approvedMonthlyRepayment: "",
    totalRepayment: "",
    repaymentApi: null,
    bank: "",
    accountNumber: "",
    decisionReason: "",
    approvedInterest: "",
    adminFee: "",
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

  const {
    approvedLoanAmount,
    approvedTenure,
    approvedInterest,
    adminFee,
  } = setupData;

  console.log(moment("16/03/2021", "DD/MM/YYYY").toDate(), loanData, userRole);

  useEffect(() => {
    if (repaymentStatus) {
      toast.success("Repayment has been successfully setup for this loan!");
      resetRepaymentStatus();
    }
  }, [repaymentStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);

  useEffect(() => {
    if (loanData?.rePaymentAPIstatus && userRole) {
      setSetupData({
        ...setupData,
        decision:
          userRole === "processor"
            ? loanData?.processorDecision
            : loanData?.adminDecision,
        approvedPayDay: loanData?.payDay,
        repaymentStartDate: moment(
          loanData?.determinedRepaymentDate,
          "DD/MM/YYYY"
        ).toDate(),
        approvedLoanAmount: numberWithCommas(loanData?.approvedAmount),
        approvedTenure: loanData?.approvedTenure,
        approvedInterest: loanData?.approvedInterest,
        approvedMonthlyRepayment: numberWithCommas(
          loanData?.calculatedPayBack / loanData?.approvedTenure
        ),
        totalRepayment: numberWithCommas(loanData?.calculatedPayBack),
        repaymentApi: loanData?.rePaymentAPI,
        decisionReason:
          userRole === "processor"
            ? loanData?.processorDecisionReason
            : loanData?.adminDecisionReason,
      });
    }
  }, [loanData, userRole]);

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
  }, [
    approvedInterest,
    approvedLoanAmount,
    approvedTenure,
    adminFee,
    setupData.approvedDti,
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
          total_pay: setupData.totalRepayment,
        };
        // console.log(data);
        setupRepayment(loanId, data);
      } else {
        toast.error("You need to choose a repayment API to setup repayment");
      }
    }
  };

  const submitApproval = async () => {
    const fieldsforApproval = (({ decision, decisionReason }) => ({
      decision,
      decisionReason,
    }))(setupData);

    const validated = validateInput(fieldsforApproval, setApprovalError);
    console.log(validated);
    if (validated) {
      if (loanData?.rePaymentAPI) {
        const mappedRole = userRole === "processor" ? `processor` : `admin`;
        if (!loanData[`${mappedRole}Decision`]) {
          //TODO - setup approval here
          const data = {
            decision: setupData.decision,
            approved_interest: setupData.approvedInterest,
            approved_tenure: setupData.approvedTenure,
            determined_repayment_date: moment(
              setupData.repaymentStartDate
            ).format("DD/MM/YYYY"),
            decision_reason: setupData.decisionReason,
            total_pay: setupData.totalRepayment,
          };
          await decideApproval(loanId, data);
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

  return (
    <>
      <ToastContainer position="top-center" />
      <Row className="mb-4">
        <Col md={4}>
          <InputField
            type="select"
            nameAttr="decision"
            label="Decision"
            value={setupData.decision}
            options={["Approve", "Decline"]}
            changed={(val) => {
              setApprovalError({ ...approvalError, decision: null });
              setSetupData({ ...setupData, decision: val });
            }}
            disable={
              loanData &&
              loanData[
                `${userRole === "authorizer" ? `admin` : `processor`}Decision`
              ] &&
              loanData?.rePaymentAPIstatus
            }
            error={approvalError?.decision}
          />
        </Col>
        <Col md={4}>
          <InputField
            type="number"
            nameAttr="payDay"
            label="Approved Payday"
            value={setupData.approvedPayDay}
            changed={(val) => {
              setRepaymentError({ ...repaymentError, approvedPayDay: null });
              setSetupData({ ...setupData, approvedPayDay: val });
            }}
            error={
              repaymentError.approvedPayDay && repaymentError.approvedPayDay
            }
            disable={loanData?.rePaymentAPIstatus}
          />
        </Col>
        <Col md={4}>
          <CustomDatePicker
            label="Repayment Start Date"
            value={setupData.repaymentStartDate}
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
            disable={loanData?.rePaymentAPIstatus}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            nameAttr="loanAmount"
            label="Approved Loan Amount"
            value={setupData.approvedLoanAmount}
            changed={(val) => {
              const { includesAlphabet, convertedToNumber } = convertInput(val);
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
            disable={loanData?.rePaymentAPIstatus}
          />
        </Col>
        <Col>
          <InputField
            type="select"
            nameAttr="approvedTenure"
            label="Approved Tenure"
            value={setupData.approvedTenure}
            options={[1, 2, 3, 4, 5, 6]}
            changed={(val) => {
              setRepaymentError({ ...repaymentError, approvedTenure: null });
              setSetupData({ ...setupData, approvedTenure: val });
            }}
            error={
              repaymentError.approvedTenure && repaymentError.approvedTenure
            }
            disable={loanData?.rePaymentAPIstatus}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="number"
            nameAttr="interestRate"
            label="Approved Interest Rate (%)"
            value={setupData.approvedInterest}
            changed={(val) => {
              setRepaymentError({ ...repaymentError, approvedInterest: null });
              setSetupData({ ...setupData, approvedInterest: val });
            }}
            error={
              repaymentError.approvedInterest && repaymentError.approvedInterest
            }
            disable={loanData?.rePaymentAPIstatus}
          />
        </Col>
        <Col>
          <InputField
            type="number"
            nameAttr="adminFee"
            label="Admin Fee (%)"
            value={setupData.adminFee}
            changed={(val) => {
              setRepaymentError({ ...repaymentError, adminFee });
              setSetupData({ ...setupData, adminFee: val });
            }}
            error={repaymentError.adminFee && repaymentError.adminFee}
            disable={loanData?.rePaymentAPIstatus}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <DtiRangeSlider
            dtiVal={setupData.approvedDti}
            setVal={(val) => setSetupData({ ...setupData, approvedDti: val })}
            label="Approved DTI"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            nameAttr="monthlyRepayment"
            label="Approved Monthly Repayment"
            value={setupData.approvedMonthlyRepayment}
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
            value={setupData.totalRepayment}
            changed={(val) => {
              setRepaymentError({ ...repaymentError, totalRepayment: null });
              setSetupData({ ...setupData, totalRepayment: val });
            }}
            disable={true}
            error={repaymentError?.totalRepayment}
          />
        </Col>
      </Row>
      <Row className="mb-4 align-items-end no-gutters">
        <Col md={11}>
          <InputField
            type="select"
            nameAttr="repaymentApi"
            label="Repayment API"
            options={["Paystack", "Remita", "Flutterwave"]}
            value={setupData.repaymentApi}
            changed={(val) => {
              setSetupData({ ...setupData, repaymentApi: val });
            }}
            disable={loanData?.rePaymentAPIstatus}
          />
        </Col>
        <Col md={1}>
          <button
            disabled={loanData?.rePaymentAPIstatus}
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
      {setupData?.repaymentApi === "remita" && (
        <Row className="mb-4">
          <Col>
            <InputField
              type="text"
              nameAttr="bank"
              label="Bank"
              value={setupData.bank}
            />
          </Col>
          <Col>
            <InputField
              type="text"
              nameAttr="accountNumber"
              label="Account Number"
              value={setupData.accountNumber}
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
            value={setupData.decisionReason}
            changed={(val) => {
              setApprovalError({ ...approvalError, decisionReason: null });
              setSetupData({ ...setupData, decisionReason: val });
            }}
            disable={
              loanData &&
              loanData[
                `${userRole === "authorizer" ? `admin` : `processor`}Decision`
              ] &&
              loanData?.rePaymentAPIstatus
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
        // disabled={loanData?.rePaymentAPIstatus ? true : loading}
        // loading={loading}
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
    // {
    //   title: "Repayment Setup",
    //   shortlink: "setup",
    // },
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
        {/* {visibleSection === "setup" ? (
          <RepaySetup loanId={loanId} loanData={loanDetails.loan} />
        ) : null} */}
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

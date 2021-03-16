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

const RepayPlusApprove = () => {

  const [setupData, setSetupData] = useState({
    decision: "",
    approvedPayDay: "",
    repaymentStartDate: "",
    approvedLoanAmount: "",
    approvedTenure: "",
    approvedDti: "",
    approvedMonthlyRepayment: "",
    totalRepayment: "",
    repaymentApi: "",
    bank: "",
    accountNumber: "",
    decisionReason: "",
    approvedInterest: "",
    adminFee: ""
  })

  return (
    <>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="select"
            nameAttr="decision"
            label="Decision"
            options={["Approve", "Decline"]}
          />
        </Col>
        <Col>
          <InputField 
            type="number"
            nameAttr="payDay"
            label="Approved Payday"
            value={setupData.approvedPayDay}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            nameAttr="repaymentDate"
            label="Repayment Start Date"
            value={setupData.repaymentStartDate}
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
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            nameAttr="approvedTenure"
            label="Approved Tenure"
            value={setupData.approvedTenure}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <DtiRangeSlider 
            dtiVal={setupData.approvedDti} 
            setVal={(val) => setSetupData({...setupData, approvedDti: val })} 
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
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            nameAttr="totalRepay"
            label="Total Repayment"
            value={setupData.totalRepayment}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="select"
            nameAttr="repaymentApi"
            label="Repayment API"
            options={["Paystack", "Remita", "Flutterwave"]}
          />
        </Col>
      </Row>
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
      <Row className="mb-4">
        <Col>
          <InputField 
            type="textarea"
            nameAttr="decisionReason"
            label="Decision Reason"
            value={setupData.decisionReason}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            nameAttr="interestRate"
            label="Approved Interest Rate"
            value={setupData.approvedInterest}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            nameAttr="adminFee"
            label="Admin Fee"
            value={setupData.adminFee}
          />
        </Col>
      </Row>
      <Button
        className="mt-4"
        fullWidth
        // clicked={startRepaymentSetup}
        bgColor="#741763"
        size="lg"
        color="#EBEBEB"
        // disabled={loanData?.rePaymentAPIstatus ? true : loading}
        // loading={loading}
      >
        Submit
      </Button>
    </>
  )
}

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
            loanData={loanDetails.loan}
            userRole={user.role}
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
            userRole={user.role}
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

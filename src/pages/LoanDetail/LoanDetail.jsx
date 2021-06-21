import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import styles from "./LoanDetail.module.scss";
import { useLocation, useParams, Link } from "react-router-dom";
import { routes } from "../../routes/sidebarRoutes";
import Dashboard from "../../components/Dashboard/Dashboard";
import NavTabs from "../../components/NavTabs/NavTabs";
import { Row, Col, Table } from "react-bootstrap";
import { Context as LoanContext } from "../../context/LoanContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as RepaymentContext } from "../../context/RepaymentContext";
import Loader from "../../components/Loader/Loader";
import { numberWithCommas } from "../../utils/nigeriaStates";
import moment from "moment";
import _ from "lodash";
import InputField from "../../components/InputField/InputField";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import FileUploadButton from "../../components/FileUploadButton/FileUploadButton";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { validateInput } from "../../utils/validateInput";
// import {
//   convertInput,
//   stripCommasInNumber,
// } from "../../utils/convertInputType";
import { toast, ToastContainer } from "react-toastify";
import { convertUnixDatetoReadable } from "../../utils/convertInputType";

export const BasicInfo = ({ data, userRole }) => {
  const [basicInfo, setBasicInfo] = useState({
    fullName: "",
    clientID: "",
    loanAmount: "",
    loanID: "",
    loanTenure: "",
    monthlyRepayment: "",
    applicationDate: "",
    monthlySalary: "",
    dti: "",
    loanPurpose: "",
  });

  useEffect(() => {
    if (data) {
      setBasicInfo({
        ...basicInfo,
        fullName: `${_.capitalize(data.client.firstName)} ${_.capitalize(
          data.client.lastName
        )}`,
        clientID: data.userId,
        loanAmount: `N${numberWithCommas(
          data?.approvedAmount || data?.amount
        )}`,
        loanID: `#${data._id}`,
        loanTenure: data.paymentPeriod,
        monthlyRepayment: `N${numberWithCommas(data.monthlyRepayment)}`,
        applicationDate: moment(data.createdAt).format("lll"),
        monthlySalary: `N${numberWithCommas(data.monthlySalary)}`,
        dti: `${data?.DTI || "33"}%`,
        loanPurpose: _.startCase(data.loanPurpose),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const detailRoutePrefix = useMemo(() => {
    if (userRole === "sales") {
      return "sales-agent";
    } else {
      return userRole;
    }
  }, [userRole]);

  if (!data) {
    return <Loader />;
  }

  return (
    <div className={styles.basicInfo}>
      <Row className="mb-5">
        <Col>
          <h6>Client Name</h6>
          <h4>{basicInfo.fullName}</h4>
        </Col>
        <Col>
          <h6>Client ID</h6>
          <h4>
            <Link to={`/${detailRoutePrefix}/client/${basicInfo.clientID}`}>
              {basicInfo.clientID.slice(0, 6)}
            </Link>
          </h4>
        </Col>
        <Col>
          <h6>Loan Amount</h6>
          <h4>{basicInfo.loanAmount}</h4>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h6>Loan ID</h6>
          <h4>{basicInfo.loanID.slice(0, 6)}</h4>
        </Col>
        <Col>
          <h6>Tenure</h6>
          <h4>{basicInfo.loanTenure}</h4>
        </Col>
        <Col>
          <h6>Monthly Repayment</h6>
          <h4>{basicInfo.monthlyRepayment}</h4>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h6>Application Date</h6>
          <h4>{basicInfo.applicationDate}</h4>
        </Col>
        <Col>
          <h6>Repayment Source</h6>
          <h4>Salary</h4>
        </Col>
        <Col>
          <h6>Monthly Salary</h6>
          <h4>{basicInfo.monthlySalary}</h4>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={4}>
          <h6>DTI</h6>
          <h4>{basicInfo.dti}</h4>
        </Col>
        <Col md={4}>
          <h6>Loan Purpose</h6>
          <h4>{basicInfo.loanPurpose}</h4>
        </Col>
      </Row>
    </div>
  );
};

export const LoanStatus = ({ data }) => {
  const [loanStatus, setLoanStatus] = useState({
    status: "",
    processorDecision: "",
    processorDecReason: "",
    processorInCharge: "",
    processorDecTime: "",
    adminDecision: "",
    adminDecReason: "",
    adminInCharge: "",
    adminDecTime: "",
  });

  useEffect(() => {
    if (data) {
      setLoanStatus({
        status: _.capitalize(data.status),
        processorDecision: _.startCase(data.processorDecision) || "Pending",
        processorDecReason: data.processorDecisionReason || "_____",
        processorInCharge: data.processorOfficerInCharge || "None",
        processorDecTime: convertUnixDatetoReadable(
          data?.processorDecisionTime
        ),
        adminDecision: _.startCase(data?.adminDecision) || "Pending",
        adminDecReason: data.adminDecisionReason || "_____",
        adminInCharge: data.adminOfficerInCharge || "None",
        adminDecTime: convertUnixDatetoReadable(data?.adminDecisionTime),
      });
    }
  }, [data]);

  return (
    <div className={styles.status}>
      <p>Status: {loanStatus.status}</p>
      <div className={styles.approvalCard}>
        <h4>Level 1 Approval</h4>
        <Table>
          <thead>
            <tr>
              <th>Decision</th>
              <th>Decision Reason</th>
              <th>Officer Incharge</th>
              <th>Decision Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{loanStatus.processorDecision}</td>
              <td>{loanStatus.processorDecReason}</td>
              <td>{loanStatus.processorInCharge}</td>
              <td>{loanStatus.processorDecTime}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className={styles.approvalCard}>
        <h4>Level 2 Approval</h4>
        <Table>
          <thead>
            <tr>
              <th>Decision</th>
              <th>Decision Reason</th>
              <th>Officer Incharge</th>
              <th>Decision Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{loanStatus.adminDecision}</td>
              <td>{loanStatus.adminDecReason}</td>
              <td>{loanStatus.adminInCharge}</td>
              <td>{loanStatus.adminDecTime}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export const RepaymentSchedule = ({ data, userRole, loanId, reloadLoan }) => {
  const [repaymentArr, setRepaymentArr] = useState(null);

  const {
    state: { loading, paymentLoading, paymentError, message },
    verifyRepaymentStatus,
    manualPayment,
    clearPaymentError,
    clearError,
    clearMessage,
  } = useContext(RepaymentContext);

  useEffect(() => {
    verifyRepaymentStatus(loanId);

    return () => {
      clearError();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (paymentError) {
      toast.error(paymentError);
      clearPaymentError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentError]);

  const [manualPayStatus, setManualPayStatus] = useState(false);
  const [repayScheduleId, setRepayScheduleId] = useState("");
  const [manualRepayData, setManualRepayData] = useState({
    monthlyRepay: "",
    dateofPayment: null,
  });
  const [repayDataError, setRepayDataError] = useState({
    monthlyRepay: null,
    dateofPayment: null,
  });

  const paymentProof = useRef();

  useEffect(() => {
    if (message) {
      toast.success(message);
      clearMessage();
      setManualRepayData({
        ...manualRepayData,
        monthlyRepay: "",
        dateofPayment: null,
      });
      (async () => {
        await reloadLoan();
      })();
      setManualPayStatus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (data) {
      const paymentPeriod = Number(data.paymentPeriod.split(" ")[0]);
      let repaymentTrack = [];
      let instance = {
        month: 1,
        dueDate: "undecided",
        status: "pending",
        amount: "____",
        overPayment: "____",
        dateofPayment: "____",
        loanBalance: "____",
      };
      for (let i = 0; i < paymentPeriod; i++) {
        repaymentTrack.push(instance);
        instance = {
          month: instance.month + 1,
          dueDate: "undecided",
          status: "pending",
          amount: "____",
          overPayment: "____",
          dateofPayment: "____",
          loanBalance: "____",
        };
      }
      if (data.payments.length === 0) {
        setRepaymentArr(repaymentTrack);
      } else {
        setRepaymentArr(data?.payments);
      }
    }
  }, [data]);


  const goToManualRepaymentForm = (repayId) => {
    setManualPayStatus(true);
    setRepayScheduleId(repayId);
  };

  const initiateManualRepayment = () => {
    const validated = validateInput(manualRepayData, setRepayDataError);
    if (validated) {
      if (paymentProof.current.files.length > 0) {
        const proof = paymentProof.current.files[0];
        const data = new FormData();
        data.append("amount", manualRepayData.monthlyRepay);
        data.append(
          "datePayed",
          moment(manualRepayData.dateofPayment).format("DD/MM/YYYY")
        );
        data.append("image", proof);
        manualPayment(repayScheduleId, data);
      } else {
        toast.error(
          "You need to upload payment proof to initiate manual repayment"
        );
      }
    }
  };

  const scheduleTemplate = () => (
    <>
      {userRole === "processor" || "authorizer" || "super" ? (
        <div className={[styles.repayment, "mb-5"].join(" ")}>
          <Table>
            <thead>
              <th>Repayment API</th>
              <th>Monthly Repayment</th>
              <th>Start Date</th>
              <th>Status</th>
            </thead>
            <tbody>
              <tr>
                <td>{_.capitalize(data?.rePaymentAPI) || "none"}</td>
                <td>{`N ${numberWithCommas(data?.monthlyRepayment)}`}</td>
                <td>{data?.determinedRepaymentDate || "____"}</td>
                <td>{data?.rePaymentAPIstatus ? "Active" : "Inactive"}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : null}
      <div className={styles.repayment}>
        <Table className={styles.repaymentTable} striped>
          <thead>
            <tr>
              <th>Months</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Overpayment</th>
              <th>Date of Payment</th>
              <th>Loan Balance</th>
              {userRole === "authorizer" || "super" ? <th>Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {repaymentArr &&
              repaymentArr.map((track, idx) => {
                let repaidDate, loanBalance;
                if (track.repaidDateStamp) {
                  repaidDate = moment
                    .unix(track?.repaidDateStamp / 1000)
                    .format("llll");
                } else {
                  repaidDate = "____";
                }
                if (track.status) {
                  loanBalance =
                    data.calculatedPayBack - (idx + 1) * track.scheduledAmount;
                  loanBalance = `N ${numberWithCommas(loanBalance)}`;
                } else {
                  loanBalance = "____";
                }
                return (
                  <tr key={idx}>
                    <td>{`Month ${track?.month || idx + 1}`}</td>
                    <td>
                      {track?.dueDate ||
                        moment(track?.scheduledDate).format("lll")}
                    </td>
                    <td>{track.status ? "true" : "false"}</td>
                    <td>
                      {track?.amount ||
                        `N${numberWithCommas(track?.scheduledAmount)}`}
                    </td>
                    <td>
                      {track?.overPayment ||
                        `N${numberWithCommas(track?.penaltyFee)}`}
                    </td>
                    <td>{track?.dateofPayment || repaidDate}</td>
                    <td>{track?.loanBalance || loanBalance}</td>
                    {userRole === "authorizer" || "super" ? (
                      <td>
                        <button
                          disabled={track.status}
                          onClick={() => goToManualRepaymentForm(track._id)}
                        >
                          Manual Repayment
                        </button>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </>
  );

  const manualRepaymentForm = () => (
    <div className={styles.repaymentForm}>
      <Row className="mb-4">
        <Col>
          <InputField
            type="number"
            nameAttr="monthlyRepay"
            label="Monthly Repayment"
            value={manualRepayData.monthlyRepay}
            changed={(val) => {
              setManualRepayData({
                ...manualRepayData,
                monthlyRepay: val,
              });
              setRepayDataError({ ...repayDataError, monthlyRepay: null });
            }}
            error={repayDataError?.monthlyRepay}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomDatePicker
            label="Date of Payment"
            value={manualRepayData.dateofPayment}
            changed={(val) => {
              setManualRepayData({ ...manualRepayData, dateofPayment: val });
              setRepayDataError({ ...repayDataError, dateofPayment: null });
            }}
            error={repayDataError?.dateofPayment}
          />
        </Col>
      </Row>
      <div className={styles.proofUpload}>
        <h2>Upload Proof of Payment</h2>
        <p>Please upload a clear proof of payment document</p>
        <FileUploadButton
          label="Choose File"
          className={styles.uploadBtn}
          icon={<FaCloudUploadAlt className="ml-3" size="1.2em" />}
          id="paymentProof"
          fileRef={paymentProof}
          width="200px"
        />
      </div>
      <Button
        bgColor="#741763"
        className="mt-5"
        color="#fff"
        fullWidth
        size="lg"
        clicked={initiateManualRepayment}
        loading={paymentLoading}
        disabled={paymentLoading}
      >
        Submit
      </Button>
    </div>
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!manualPayStatus ? scheduleTemplate() : manualRepaymentForm()}
      <ToastContainer position="top-center" />
    </>
  );
};

const LoanDetail = () => {
  const [visibleSection, setVisibleSection] = useState("basic");

  const salesRoute = routes[1];
  const location = useLocation();
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

  const reloadLoan = () => {
    retrieveLoan(loanId);
  };

  const navArray = [
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

  const setActiveTab = (link) => {
    setVisibleSection(link);
  };

  return (
    <Dashboard sidebarRoutes={salesRoute} location={location}>
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

export default LoanDetail;

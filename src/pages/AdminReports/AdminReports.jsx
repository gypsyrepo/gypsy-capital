import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./AdminReports.module.scss";
import { routes } from "../../routes/sidebarRoutes";
import {
  useLocation,
  useRouteMatch,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import Button from "../../components/Button/Button";
import { Row, Col } from "react-bootstrap";
import { AiOutlineCalendar } from "react-icons/ai";
import moment from "moment";
import InputField from "../../components/InputField/InputField";
import ReportsTable from "../../components/ReportsTable/ReportsTable";
import Loader from "../../components/Loader/Loader";
import { Context as LoanContext } from "../../context/LoanContext";
import { numberWithCommas } from "../../utils/nigeriaStates";
import _ from "lodash";
import { convertUnixDatetoReadable } from "../../utils/convertInputType";
import {
  convertArrayToTable,
  createFileUrl,
  createXMLTable,
  downloadFile,
  filterStaff,
} from "../../utils/data";
import useUserList from "../../hooks/useUserList";

const LoanReportTable = ({ loanList, tableHeaders, loading }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ReportsTable tableHeader={tableHeaders} list={loanList} />
      )}
    </>
  );
};

const AdhocReportTable = ({ loanList, loading, tableHeaders }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ReportsTable list={loanList} tableHeader={tableHeaders} />
      )}
    </>
  );
};

const AdminReports = () => {
  const adminRoutes = routes[4];
  const location = useLocation();
  const { path } = useRouteMatch();
  const history = useHistory();
  const [staffList] = useUserList(true);
  const [clientList] = useUserList(false);

  const {
    state: { loading, loans },
    retrieveClientLoans,
  } = useContext(LoanContext);

  useEffect(() => {
    retrieveClientLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [loanFilterInput, setLoanFilterInput] = useState(null);

  const filteredList = useMemo(() => {
    if (loanFilterInput === "active loans") {
      return loans.filter((loanInstance) => loanInstance.status === "approved");
    } else if (loanFilterInput === "pending loans") {
      return loans.filter((loanInstance) => loanInstance.status === "pending");
    } else if (loanFilterInput === "declined loans") {
      return loans.filter((loanInstance) => loanInstance.status === "declined");
    } else if (loanFilterInput === "expired loans") {
      return loans.filter((loanInstance) => loanInstance.status === "expired");
    } else {
      return loans;
    }
  }, [loans, loanFilterInput]);

  const processedLoanList = useMemo(() => {
    return filteredList.map((loan) => {
      const container = {};
      const processor = filterStaff(staffList, loan?.processorOfficerInCharge);
      const authorizer = filterStaff(staffList, loan?.adminOfficerInCharge);
      const salesAgent = filterStaff(staffList, loan?.addedBy);

      const client = filterStaff(clientList, loan.userId);
      const { city, street, state } = client?.more_info[0]?.residence;

      container.loanId = loan._id.slice(0, 7);
      container.clientName = `${loan.clientInfo[0].firstName} ${loan.clientInfo[0].lastName}`;
      container.phoneNumber = loan?.clientInfo[0].phoneNumber.replace("234", 0);
      container.emailAddress = loan?.clientInfo[0].email;
      container.address = `${street}, ${city}, ${_.startCase(state)}`;
      container.bvn = `${client?.more_info[0]?.bioData?.BVN}`;
      container.loanAmount =
        loan.approvedAmount > 0
          ? `N ${numberWithCommas(loan.approvedAmount)}`
          : `N ${numberWithCommas(loan.amount)}`;
      container.monthlyRepayment = `N ${numberWithCommas(
        loan?.monthlyRepayment
      )}`;
      container.totalRepayment = loan.calculatedPayBack
        ? `N ${numberWithCommas(loan?.calculatedPayBack)}`
        : `N ${numberWithCommas(
            Number(loan?.paymentPeriod.split(" ")[0]) * loan.monthlyRepayment
          )}`;
      container.tenure =
        loan.approvedTenure || loan?.paymentPeriod.split(" ")[0];
      container.status = _.startCase(loan?.status);
      container.decisionReason =
        loan?.adminDecisionReason || loan?.processorDecisionReason;
      container.decisionDate =
        convertUnixDatetoReadable(loan?.adminDecisionTime) ||
        convertUnixDatetoReadable(loan?.processorDecisionTime);
      container.overpayment = `N ${numberWithCommas(loan?.overdue)}`;
      container.processorInCharge = processor
        ? `${processor.firstName} ${processor.lastName}`
        : "_____";
      container.authorizerInCharge = authorizer
        ? `${authorizer.firstName} ${authorizer.lastName}`
        : "_____";
      container.onboardedBy = salesAgent
        ? `${salesAgent.firstName} ${salesAgent.lastName}`
        : "_____";

      return location.pathname.includes("loan")
        ? _.omit(container, [
            "phoneNumber",
            "emailAddress",
            "address",
            "bvn",
            "overpayment",
          ])
        : _.omit(container, [
            "monthlyRepayment",
            "status",
            "loanAmount",
            "decisionDate",
            "decisionReason",
          ]);
    });
  }, [filteredList, staffList, clientList, location.pathname]);

  console.log(processedLoanList);

  const reportTableHeaders = [
    "Loan ID",
    "Client Name",
    location.pathname.includes("loan") ? "Loan Amount" : "Phone Number",
    location.pathname.includes("loan") ? "Monthly Repayment" : "Email Address",
    location.pathname.includes("loan") ? "Total Repayment" : "Address",
    location.pathname.includes("loan") ? "Tenure" : "BVN",
    location.pathname.includes("loan") ? "Status" : "Total Repayment",
    location.pathname.includes("loan") ? "Decision Reason" : "Tenure",
    location.pathname.includes("loan") ? "Decision Date" : "Overpayment",
    "Processor in Charge",
    "Authorizer in Charge",
    "Onboarded by",
  ];

  const initiateExcelDownload = () => {
    const table = convertArrayToTable(reportTableHeaders, processedLoanList);
    const nowTimestamp = new Date().getTime();
    const fileName = location.pathname.includes("loan")
      ? `Loan Report - ${nowTimestamp}`
      : `Adhoc Report - ${nowTimestamp}`;
    const xmlTable = createXMLTable(table, fileName);
    const downloadUrl = createFileUrl(xmlTable);
    downloadFile(downloadUrl, fileName);
  };

  return (
    <Dashboard sidebarRoutes={adminRoutes} location={location}>
      <div className={styles.welcomeGroup}>
        <div>
          <h2>Reports</h2>
          <p className={styles.currentDate}>
            Today is {moment().format("dddd Do[,] MMMM")}.
          </p>
        </div>
        <Button
          clicked={initiateExcelDownload}
          bgColor="#741763"
          color="#fff"
          size="lg"
        >
          Download
        </Button>
      </div>
      <div className={styles.loanReportNavGroup}>
        <Row className="mt-5 align-items-center">
          <Col
            style={
              location.pathname.includes("/super-admin/reports/loan")
                ? { backgroundColor: "#E9E9E9" }
                : { backgroundColor: "#C4C4C4" }
            }
            className={styles.navItem}
            onClick={() => history.push("/super-admin/reports/loan")}
          >
            Loan Report
          </Col>
          <Col
            style={
              location.pathname.includes("/super-admin/reports/adhoc")
                ? { backgroundColor: "#E9E9E9" }
                : { backgroundColor: "#C4C4C4" }
            }
            className={styles.navItem}
            onClick={() => history.push("/super-admin/reports/adhoc")}
          >
            Adhoc Report
          </Col>
        </Row>
      </div>
      <div className={styles.filterSection}>
        <button>
          <AiOutlineCalendar className={styles.icon} />
          Last 7 days
        </button>
        <div className={styles.inputWrapper}>
          <InputField
            type="select"
            nameAttr="loanStatus"
            customDefault="Loan Status"
            options={[
              "Active Loans",
              "Pending Loans",
              "Declined Loans",
              "Expired Loans",
              "All",
            ]}
            value={loanFilterInput}
            changed={(val) => setLoanFilterInput(val)}
          />
        </div>
      </div>
      <Switch>
        <Route path={`${path}/loan`}>
          <LoanReportTable
            tableHeaders={reportTableHeaders}
            loanList={processedLoanList}
            loading={loading}
          />
        </Route>
        <Route path={`${path}/adhoc`}>
          <AdhocReportTable
            tableHeaders={reportTableHeaders}
            loanList={processedLoanList}
            loading={loading}
          />
        </Route>
      </Switch>
    </Dashboard>
  );
};

export default AdminReports;

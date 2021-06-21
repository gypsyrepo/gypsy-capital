import React, { useContext, useMemo, useEffect } from "react";
import styles from "./AuthorizerOverview.module.scss";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation, useHistory, Link } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import moment from "moment";
import { AiOutlineCalendar } from "react-icons/ai";
import { TiCancelOutline } from "react-icons/ti";
import StatBox from "../../components/StatBox/StatBox";
import ClientStat from "../../assets/salesDashboard/clientstat.png";
import DisburseStat from "../../assets/salesDashboard/loanstat.png";
import LoanStat from "../../assets/salesDashboard/loanchange.png";
import PendingStat from "../../assets/salesDashboard/pending.png";
import RepaymentStat from "../../assets/salesDashboard/repayment.png";
import TotalStat from "../../assets/salesDashboard/total.png";
import { Row, Col, Table } from "react-bootstrap";
import Button from "../../components/Button/Button";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import { Context as LoanContext } from "../../context/LoanContext";
import Loader from "../../components/Loader/Loader";
import { numberWithCommas } from "../../utils/nigeriaStates";
import _ from "lodash";

const AuthorizerOverview = () => {
  const authorizerRoutes = routes[3];
  const location = useLocation();
  const history = useHistory();

  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { clientsForRole, loading },
    getClientListForRole,
  } = useContext(UserContext);
  const {
    state: { loans, loading: listLoading },
    retrieveClientLoans,
  } = useContext(LoanContext);

  useEffect(() => {
    getClientListForRole();
    retrieveClientLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalDisbursedLoans = useMemo(() => {
    return loans
      .filter((loan) => loan.status.toLowerCase() === "approved")
      .reduce((acc, loan) => loan.amount + acc, 0);
  }, [loans]);

  const noOfActiveLoans = useMemo(() => {
    return loans.filter((loan) => loan.status.toLowerCase() === "approved")
      .length;
  }, [loans]);

  const noOfPendingLoans = useMemo(() => {
    return loans.filter((loan) => loan.status.toLowerCase() === "pending")
      .length;
  }, [loans]);

  const recentLoans = useMemo(() => {
    return loans.slice(0, 5);
  }, [loans]);

  const repaidAmount = useMemo(() => {
    let amount = loans
      .map((loanInstance) => loanInstance?.repayment)
      .map((instance) => {
        return instance.filter((arr) => arr.status === true);
      })
      .map((filteredArr) => {
        return filteredArr.reduce((acc, curr) => {
          return acc + curr.scheduledAmount;
        }, 0);
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    return amount;
  }, [loans]);

  return (
    <Dashboard sidebarRoutes={authorizerRoutes} location={location}>
      <div className={styles.welcomeGroup}>
        <div>
          <h2>Hey, {user.firstName}</h2>
          <p className={styles.currentDate}>
            Today is {moment().format("dddd Do[,] MMMM")}.
          </p>
        </div>
        <button>
          <AiOutlineCalendar className={styles.icon} />
          Last 7 days
        </button>
      </div>
      {!listLoading && !loading ? (
        <>
          <div className={styles.stats}>
            <Row>
              <Col>
                <StatBox
                  icon={ClientStat}
                  title="Total Clients"
                  statData={clientsForRole.length}
                />
              </Col>
              <Col>
                <StatBox
                  icon={DisburseStat}
                  title="Total Disbursed Loans"
                  statData={numberWithCommas(totalDisbursedLoans).split(".")[0]}
                />
              </Col>
              <Col>
                <StatBox
                  icon={LoanStat}
                  title="Total Active Loans"
                  statData={noOfActiveLoans}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <StatBox
                  icon={RepaymentStat}
                  title="Total Repayment Received"
                  statData={
                    numberWithCommas(Math.ceil(repaidAmount)).split(".")[0]
                  }
                />
              </Col>
              <Col>
                <StatBox
                  icon={TotalStat}
                  title="Total Loans"
                  statData={loans.length}
                />
              </Col>
              <Col>
                <StatBox
                  icon={PendingStat}
                  title="Total Pending Loans"
                  statData={noOfPendingLoans}
                />
              </Col>
            </Row>
          </div>
          <div className={styles.recentLoans}>
            <div className={styles.header}>
              <h3>Recent Loans</h3>
              <Button
                size="sm"
                bgColor="#741763"
                color="#fff"
                clicked={() => history.push("/authorizer/loans")}
              >
                View All
              </Button>
            </div>
            <div className={styles.recentCard}>
              <Table className={styles.table} striped>
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Loan ID</th>
                    <th>Loan Amount</th>
                    <th>Status</th>
                    <th>Tenure</th>
                    <th>Monthly Repayment</th>
                  </tr>
                </thead>
                {recentLoans && recentLoans.length > 0 ? (
                  <tbody>
                    {recentLoans.map((loan, idx) => (
                      <tr key={idx}>
                        <td>
                          {`${_.capitalize(
                            loan.clientInfo[0]?.firstName
                          )} ${_.capitalize(loan.clientInfo[0]?.lastName)}`}
                        </td>
                        <td className={styles.loanId}>
                          <Link to={`/authorizer/loan/${loan._id}`}>
                            {loan._id.slice(0, 6)}
                          </Link>
                        </td>
                        <td>{`N${numberWithCommas(loan.amount)}`}</td>
                        <td>{_.capitalize(loan.status)}</td>
                        <td>{loan.paymentPeriod}</td>
                        <td>{`N${numberWithCommas(loan.monthlyRepayment)}`}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : null}
              </Table>
              {recentLoans && recentLoans.length === 0 ? (
                <div className={styles.nullList}>
                  <TiCancelOutline size="6em" color="rgba(116, 23, 99, 0.6)" />
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </Dashboard>
  );
};

export default AuthorizerOverview;

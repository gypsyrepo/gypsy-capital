import React, { useContext, useEffect, useMemo } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import { routes } from "../../routes/sidebarRoutes";
import styles from "./AgentOverview.module.scss";
import moment from "moment";
import { AiOutlineCalendar } from "react-icons/ai";
import { TiCancelOutline } from "react-icons/ti";
import ClientStat from "../../assets/salesDashboard/clientstat.png";
import DisburseStat from "../../assets/salesDashboard/loanstat.png";
import LoanStat from "../../assets/salesDashboard/loanchange.png";
import { Row, Col, Table } from "react-bootstrap";
import Button from "../../components/Button/Button";
import { numberWithCommas } from "../../utils/nigeriaStates";
import StatBox from "../../components/StatBox/StatBox";
import Loader from "../../components/Loader/Loader";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as LoanContext } from "../../context/LoanContext";
import { Context as UserContext } from "../../context/UserContext";
import _ from "lodash";

const AgentOverview = () => {
  const location = useLocation();
  const history = useHistory();
  const salesRoute = routes[1];

  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { loans, loading: listLoading },
    retrieveClientLoans,
  } = useContext(LoanContext);
  const {
    state: { clientsForRole, loading },
    getClientListForRole,
  } = useContext(UserContext);

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

  const recentLoans = useMemo(() => {
    return loans.slice(0, 5);
  }, [loans]);

  // console.log(recentLoans, 'totalDisbursed');

  return (
    <Dashboard sidebarRoutes={salesRoute} location={location}>
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
      {!loading && !listLoading ? (
        <>
          <div className={styles.stats}>
            <Row>
              <Col className="mb-4 mb-md-0" sm={12} md={3} lg={4}>
                <StatBox
                  icon={ClientStat}
                  title="Total Clients"
                  statData={clientsForRole.length}
                />
              </Col>
              <Col className="mb-4 mb-md-0" sm={12} md={6} lg={4}>
                <StatBox
                  icon={DisburseStat}
                  title="Total Disbursed Loans"
                  statData={numberWithCommas(totalDisbursedLoans).split(".")[0]}
                />
              </Col>
              <Col className="mb-4 mb-md-0" sm={12} md={3} lg={4}>
                <StatBox
                  icon={LoanStat}
                  title="Total Active Loans"
                  statData={noOfActiveLoans}
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
                clicked={() => history.push("/sales-agent/loans")}
              >
                View All
              </Button>
            </div>
            <div className={styles.recentCard}>
              <Table striped className={styles.table}>
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
                          <Link to={`/sales-agent/loan/${loan._id}`}>
                            {loan._id.slice(0, 6)}
                          </Link>
                        </td>
                        <td>{`N ${numberWithCommas(loan.amount)}`}</td>
                        <td>{_.capitalize(loan.status)}</td>
                        <td>{loan.paymentPeriod}</td>
                        <td>{`N ${numberWithCommas(
                          loan.monthlyRepayment
                        )}`}</td>
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

export default AgentOverview;

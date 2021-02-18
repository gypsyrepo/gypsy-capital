import React from 'react';
import styles from './ProcessorDashboard.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import { routes } from '../../routes/sidebarRoutes';
import { useHistory, useLocation, Link } from 'react-router-dom';
import moment from 'moment';
import { AiOutlineCalendar } from 'react-icons/ai';
import ClientStat from '../../assets/salesDashboard/clientstat.png';
import DisburseStat from '../../assets/salesDashboard/loanstat.png';
import LoanStat from '../../assets/salesDashboard/loanchange.png';
import PendingStat from '../../assets/salesDashboard/pending.png';
import RepaymentStat from '../../assets/salesDashboard/repayment.png';
import TotalStat from '../../assets/salesDashboard/total.png';
import { Row, Col, Table } from 'react-bootstrap';
import StatBox from '../../components/StatBox/StatBox';
import Button from '../../components/Button/Button';
import { recentLoans } from '../../utils/dummyData';


const ProcessorDashboard = () => {

  const location = useLocation();
  const processorRoute = routes[2];
  const history = useHistory();

  return (
    <Dashboard sidebarRoutes={processorRoute} location={location}>
      <div className={styles.welcomeGroup}>
        <div>
          <h2>Hey, Moses</h2>
          <p className={styles.currentDate}>Today is {moment().format('dddd Do[,] MMMM')}.</p>
        </div>
        <button>
          <AiOutlineCalendar className={styles.icon} />
          Last 7 days
        </button>
      </div>
      <div className={styles.stats}>
        <Row>
          <Col>
            <StatBox icon={ClientStat} title="Total Clients" statData="25" />
          </Col>
          <Col>
            <StatBox icon={DisburseStat} title="Total Disbursed Loans" statData="5.2" />
          </Col>
          <Col>
            <StatBox icon={LoanStat} title="Total Active Loans" statData="200" />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <StatBox icon={RepaymentStat} title="Total Repayment Received" statData="3.75M" />
          </Col>
          <Col>
            <StatBox icon={TotalStat} title="Total Loans" statData="250" />
          </Col>
          <Col>
            <StatBox icon={PendingStat} title="Total Pending Loans" statData="25" />
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
            clicked={() => history.push('/processor/loans')}
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
            <tbody>
              { recentLoans.map((loan, idx) => (
                <tr key={idx}>
                  <td>{loan.clientName}</td>
                  <td className={styles.loanId}>
                    <Link to="/sales-agent/loan/general">
                      {loan.loanId}
                    </Link>
                  </td>
                  <td>{loan.loanAmt}</td>
                  <td>{loan.status}</td>
                  <td>{loan.tenure}</td>
                  <td>{loan.monthlyRepayment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Dashboard>
  )
}


export default ProcessorDashboard;
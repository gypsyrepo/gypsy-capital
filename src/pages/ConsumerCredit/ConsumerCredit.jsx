import React from 'react';
import pageUrl from '../../routes/pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import styles from './ConsumerCredit.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import Button from '../../components/Button/Button';
import { Table } from 'react-bootstrap';

const ConsumerCredit = ({ location }) => {

  const sidebarRoutes = [
    {
      label: "Dashboard",
      link: pageUrl.DASHBOARD_HOMEPAGE,
      icon: FiLayers
    },
    {
      label: "Consumer Credit",
      link: pageUrl.CONSUMER_CREDIT_PAGE,
      icon: GiTakeMyMoney
    },
    {
      label: "Credit Report",
      link: pageUrl.CREDIT_REPORT_PAGE,
      icon: BiCreditCard
    },
    {
      label: "Profile",
      link: pageUrl.PROFILE_PAGE,
      icon: AiOutlineUser
    },
  ]

  return (
    <Dashboard sidebarRoutes={sidebarRoutes} location={location}>
      <div className={styles.heading}>
        <div>
          <h2>Consumer Credit</h2>
          <p>Get a loan with ease</p>
        </div>
        <Button
            bgColor="#741763"
            size="sm"
            color="#fff"
            className="mt-4"
          >
            Apply for a loan
          </Button>
      </div>
      <div className={styles.creditTable}>
        <Table striped hover>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Monthly Repayment</th>
              <th>Tenor</th>
              <th>Status</th>
              <th>Repayment Source</th>
              <th>Loan Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </Table>
      </div>
    </Dashboard>
  )
}


export default ConsumerCredit;
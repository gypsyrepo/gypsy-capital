import React, { useState } from 'react';
import styles from './LoanDetail.module.scss';
import { useLocation } from 'react-router-dom';
import { routes } from '../../routes/sidebarRoutes';
import Dashboard from '../../components/Dashboard/Dashboard';
import NavTabs from '../../components/NavTabs/NavTabs';
import { Row, Col, Table } from 'react-bootstrap';


const BasicInfo = () => {
  return (
    <div className={styles.basicInfo}>
      <Row className="mb-5">
        <Col>
          <h6>Client Name</h6>
          <h4>Anthony John</h4>
        </Col>
        <Col>
          <h6>Client ID</h6>
          <h4>478901</h4>
        </Col>
        <Col>
          <h6>Loan Amount</h6>
          <h4>N145,000</h4>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h6>Loan ID</h6>
          <h4>#558612</h4>
        </Col>
        <Col>
          <h6>Tenure</h6>
          <h4>3 Months</h4>
        </Col>
        <Col>
          <h6>Monthly Repayment</h6>
          <h4>N35,600</h4>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h6>Application Date</h6>
          <h4>12/21/2020 - 11:59am</h4>
        </Col>
        <Col>
          <h6>Repayment Source</h6>
          <h4>Salary</h4>
        </Col>
        <Col>
          <h6>Monthly Salary</h6>
          <h4>N350,000</h4>
        </Col>
      </Row>
    </div>
  )
}


const LoanStatus = () => {
  return (
    <div className={styles.status}>
      <p>Status: Active</p>
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
              <td>Approved</td>
              <td>No pending loan, great credit history</td>
              <td>Mrs Babatunde <span>babatundeola@gypsycapital.com</span></td>
              <td>12/22/2020 - 10.50am</td>
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
              <td>Approved & Disbursed</td>
              <td>No pending loan, great credit history</td>
              <td>Mr Moses <span>mosesemma@gypsycapital.com</span></td>
              <td>12/23/2020 - 9.00am</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const RepaymentSchedule = () => {

  const repaymentTrack = [
    {
      month: "Month 1",
      dueDate: "May 27, 2020",
      status: "Paid",
      overdueAmount: "Not applicable"
    },
    {
      month: "Month 2",
      dueDate: "June 27, 2020",
      status: "Waiting",
      overdueAmount: null
    },
    {
      month: "Month 3",
      dueDate: "July 27, 2020",
      status: "Waiting",
      overdueAmount: null
    }
  ]

  return (
    <div className={styles.repayment}>
      <Table>
        <thead> 
          <tr>
            <th>Months</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Overdue Amount</th>
          </tr>
        </thead>
        <tbody>
          { repaymentTrack.map((track, idx) => (
            <tr key={idx}>
              <td>{track?.month}</td>
              <td>{track?.dueDate}</td>
              <td>{track?.status}</td>
              <td>{track?.overdueAmount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

const LoanDetail = () => {

  const [visibleSection, setVisibleSection] = useState('basic');

  const salesRoute = routes[1];
  const location = useLocation();

  const navArray = [
    {
      title: "Basic Info",
      shortlink: "basic"
    },
    {
      title: "Status and Underwriting",
      shortlink: "status"
    },
    {
      title: "Repayment Schedule",
      shortlink: "repayment"
    }
  ]

  const setActiveTab = (link) => {
    setVisibleSection(link);
  }

  return (
    <Dashboard sidebarRoutes={salesRoute} location={location}>
      <NavTabs navs={navArray} setActive={setActiveTab} currentTab={visibleSection} />
      <div className={styles.detailFields}>
        { visibleSection === "basic" && <BasicInfo /> }
        { visibleSection === "status" && <LoanStatus /> }
        { visibleSection === "repayment" && <RepaymentSchedule /> }
      </div>  
    </Dashboard>
  )
}


export default LoanDetail;
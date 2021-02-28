import React, { useContext, useEffect, useState } from 'react';
import styles from './LoanDetail.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { routes } from '../../routes/sidebarRoutes';
import Dashboard from '../../components/Dashboard/Dashboard';
import NavTabs from '../../components/NavTabs/NavTabs';
import { Row, Col, Table } from 'react-bootstrap';
import { Context as LoanContext } from '../../context/LoanContext';
import Loader from '../../components/Loader/Loader';
import { numberWithCommas } from '../../utils/nigeriaStates';
import moment from 'moment';
import _ from 'lodash';


const BasicInfo = ({ data }) => {

  const [basicInfo, setBasicInfo] = useState({
    fullName: '',
    clientID: '',
    loanAmount: '',
    loanID: '',
    loanTenure: '',
    monthlyRepayment: '',
    applicationDate: '',
    monthlySalary: ''
  });

  useEffect(() => {
    if(data) {
      setBasicInfo({
        ...basicInfo,
        fullName: `${_.capitalize(data.client.firstName)} ${_.capitalize(data.client.lastName)}`,
        clientID: data.userId,
        loanAmount: `N${numberWithCommas(data.amount)}`,
        loanID: `#${data._id}`,
        loanTenure: data.paymentPeriod,
        monthlyRepayment: `N${numberWithCommas(data.monthlyRepayment)}`,
        applicationDate: moment(data.createdAt).format('lll'),
        monthlySalary: `N${numberWithCommas(data.monthlySalary)}`
      })
    }
  }, [data])

  if(!data) {
    return <Loader />
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
          <h4>{basicInfo.clientID.slice(0,6)}</h4>
        </Col>
        <Col>
          <h6>Loan Amount</h6>
          <h4>{basicInfo.loanAmount}</h4>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h6>Loan ID</h6>
          <h4>{basicInfo.loanID.slice(0,6)}</h4>
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
  const { loanId } = useParams();

  const { state: { loanDetails }, retrieveLoan } = useContext(LoanContext);

  useEffect(() => {
    retrieveLoan(loanId);
  }, []);

  console.log(loanDetails, 'this is it');

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
      { loanDetails ? <div className={styles.detailFields}>
        { visibleSection === "basic" && 
          <BasicInfo 
            data={ loanDetails ? { 
              client: {...loanDetails.client[0].bioData},
              ...loanDetails.loan
            } : null } 
          /> 
        }
        { visibleSection === "status" && <LoanStatus /> }
        { visibleSection === "repayment" && <RepaymentSchedule /> }
      </div> : <Loader /> } 
    </Dashboard>
  )
}


export default LoanDetail;
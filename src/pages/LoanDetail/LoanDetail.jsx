import React, { useContext, useEffect, useState, useMemo } from 'react';
import styles from './LoanDetail.module.scss';
import { useLocation, useParams, Link } from 'react-router-dom';
import { routes } from '../../routes/sidebarRoutes';
import Dashboard from '../../components/Dashboard/Dashboard';
import NavTabs from '../../components/NavTabs/NavTabs';
import { Row, Col, Table } from 'react-bootstrap';
import { Context as LoanContext } from '../../context/LoanContext';
import { Context as AuthContext } from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';
import { numberWithCommas } from '../../utils/nigeriaStates';
import moment from 'moment';
import _ from 'lodash';


export const BasicInfo = ({ data, userRole }) => {

  const [basicInfo, setBasicInfo] = useState({
    fullName: '',
    clientID: '',
    loanAmount: '',
    loanID: '',
    loanTenure: '',
    monthlyRepayment: '',
    applicationDate: '',
    monthlySalary: '',
    dti: '',
  });

  useEffect(() => {
    if(data) {
      console.log(data)
      setBasicInfo({
        ...basicInfo,
        fullName: `${_.capitalize(data.client.firstName)} ${_.capitalize(data.client.lastName)}`,
        clientID: data.userId,
        loanAmount: `N${numberWithCommas(data.amount)}`,
        loanID: `#${data._id}`,
        loanTenure: data.paymentPeriod,
        monthlyRepayment: `N${numberWithCommas(data.monthlyRepayment)}`,
        applicationDate: moment(data.createdAt).format('lll'),
        monthlySalary: `N${numberWithCommas(data.monthlySalary)}`,
        dti: `${data?.DTI || '33'}%`
      })
    }
  }, [data])

  const detailRoutePrefix = useMemo(() => {
    if(userRole === "sales") {
      return "sales-agent"
    } else {
      return userRole
    }
  }, [userRole])

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
          <h4>
            <Link to={`/${detailRoutePrefix}/client/${basicInfo.clientID}`}>
              {basicInfo.clientID.slice(0,6)}
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
      <Row className="mb-5">
        <Col>
          <h6>DTI</h6>
          <h4>{basicInfo.dti}</h4>
        </Col>
      </Row>
    </div>
  )
}


const LoanStatus = ({ data }) => {

  const[loanStatus, setLoanStatus] = useState({
    status: '',
    processorDecision: '',
    processorDecReason: '',
    processorInCharge: '',
    processorDecTime: '',
    adminDecision: '',
    adminDecReason: '',
    adminInCharge: '',
    adminDecTime: ''
  })

  useEffect(() => {
    if(data) {
      setLoanStatus({
        status: _.capitalize(data.status),
        processorDecision: data.processorDecision || 'Pending',
        processorDecReason: data.processorDecisionReason || '_____',
        processorInCharge: data.processorOfficerInCharge || 'None',
        processorDecTime: data.processorDecisionTime || '_____',
        adminDecision: data.adminDecision || "Pending",
        adminDecReason: data.adminDecisionReason || '_____',
        adminInCharge: data.adminOfficerInCharge || 'None',
        adminDecTime: data.adminDecisionTime || "______"
      })
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
  )
}

export const RepaymentSchedule = ({ data }) => {

  const [repaymentArr, setRepaymentArr] = useState(null);

  useEffect(() => {
    if(data) {
      const paymentPeriod = Number(data.paymentPeriod.split(' ')[0]);
      // console.log(paymentPeriod);
      let repaymentTrack = [];
      let instance = {
        month: 1,
        dueDate: moment(data.createdAt).format('LL'),
        status: data.payments.length === 0 ? 'Waiting' : data.payments[0],
        overdueAmount: data.overdue
      }
      for(let i=0; i < paymentPeriod; i++) {
        repaymentTrack.push(instance);
        instance = {
          month: instance.month + 1,
          dueDate: moment(data.createdAt).add(i + 1, 'M').format('LL'),
          status: data.payments.length === 0 ? 'Waiting' : data.payments[i+1],
          overdueAmount: data.overdue
        }
      }
      console.log(repaymentTrack);
      setRepaymentArr(repaymentTrack);
    }
  }, [data]);

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
          { repaymentArr && repaymentArr.map((track, idx) => (
            <tr key={idx}>
              <td>{`Month ${track?.month}`}</td>
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
  const { state: { user } } = useContext(AuthContext);

  useEffect(() => {
    retrieveLoan(loanId);
  }, []);

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
              client: {...loanDetails.client[0]?.bioData},
              ...loanDetails.loan, dti: loanDetails[0]?.DTI
            } : null } 
            userRole={user.role}
          /> 
        }
        { visibleSection === "status" && 
          <LoanStatus 
            data={ loanDetails ? {
              ...loanDetails.loan
            } : null }
          /> 
        }
        { visibleSection === "repayment" && 
          <RepaymentSchedule 
            data={ loanDetails ? {
              ...loanDetails.loan,
              payments: loanDetails.payments
            } : null }
          /> 
        }
      </div> : <Loader /> } 
    </Dashboard>
  )
}


export default LoanDetail;
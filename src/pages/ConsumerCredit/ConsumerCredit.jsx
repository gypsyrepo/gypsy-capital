import React, { useRef, useState, useContext, useEffect } from 'react';
import pageUrl from '../../routes/pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import styles from './ConsumerCredit.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import Button from '../../components/Button/Button';
import { Table } from 'react-bootstrap';
import noLoan from '../../assets/no-loan.png';
import { Row, Col } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import LoanCalculatorForm from '../../components/LoanCalculatorForm/LoanCalculatorForm';
import LoanContactForm from '../../components/LoanContactForm/LoanContactForm';
import EmployerInfoForm from '../../components/EmployerInfoForm/EmployerInfoForm';
import BankInfoForm from '../../components/BankInfoForm/BankInfoForm';
import { Route, useRouteMatch, Switch, Link, useLocation } from 'react-router-dom';
import { Context as LoanContext } from '../../context/LoanContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';


const ConsumerCredit = () => {

  const { url, path } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    if(location.state) {
      setApplyState(location.state.applyState)
    }
  }, [location])

  const [applyState, setApplyState] = useState(false);
  const [applicationStage, setApplicationStage] = useState(2);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const { 
    state: { loading, loans, loanStart, addressStatus, workStatus, error }, 
    retrieveClientLoans,
    loanApply, 
    addAddressForLoan,
    addWorkInfoForLoan,
    clearError
  } = useContext(LoanContext);
  const { state: { user } } = useContext(AuthContext);

  useEffect(() => {
    retrieveClientLoans();
  }, [])

  useEffect(() => {
    if(loanStart) {
      setApplicationStage(1);
    }
  }, [loanStart])


  useEffect(() => {
    if(addressStatus) {
      setApplicationStage(2);
    }
  }, [addressStatus])

  useEffect(() => {
    if(workStatus) {
      setApplicationStage(3);
    }
  }, [workStatus])

  const loanHistory = [
    // {
    //   loanID: '#00032',
    //   monthlyRepayment: '19,500',
    //   tenor: 2,
    //   status: 'In Review',
    //   repaymentSource: 'Salary account',
    //   loanAmount: '200,500',
    //   balance: '75,000'
    // }
  ]

  useEffect(() => {
    if(error) {
      toast.error(error);
      clearError();
    }
  }, [error])


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

  const handleSubmit = () => {
    if(applicationStage === 3) {
      setApplicationSuccess(true)
    } else {
      setApplicationStage(applicationStage + 1)
    }
  }

  const goToProcess = () => {
    setApplyState(true);

  }

  const startApplication = (data) => {
    loanApply(data, user.user_id);
  }

  const addAddress = (data) => {
    addAddressForLoan(data, user.user_id);
  }

  const addWorkInfo = (data) => {
    addWorkInfoForLoan(data, user.user_id);
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <Dashboard sidebarRoutes={sidebarRoutes} location={url}>
      <ToastContainer position="top-center" />
      <div className={styles.heading}>
        <div>
          <h2>Consumer Credit</h2>
          <p>Get a loan with ease</p>
        </div>
        { !applyState && <Button
            bgColor="#741763"
            size="sm"
            color="#fff"
            className="mt-4"
            clicked={goToProcess}
          >
            Apply for a loan
          </Button>}
      </div>
      { !applyState && !applicationSuccess ? <div className={styles.creditTable}>
        <Table striped hover className={styles.tableStyles}>
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
            {loans.map((loanInstance, idx) => {
              return (
                <tr>
                  <td>{loanInstance._id.substring(0, 5)}</td>
                  <td>{`N ${numberWithCommas(loanInstance.monthlyRepayment)}`}</td>
                  <td>{!loanInstance.approvedTenure ? loanInstance.paymentPeriod : loanInstance.approvedTenure}</td>
                  <td>{loanInstance.status}</td>
                  <td>Salary</td>
                  <td>{`N ${numberWithCommas(loanInstance.amount)}`}</td>
                  <td>______</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        { (!loans || loans.length === 0) && <div className={styles.noLoanMessage}>
          <p>Sorry you currently have no loan</p>
          <img src={noLoan} alt="No loan history" height="250" />
        </div>}
      </div> : null}
      { applyState && <div className={styles.applyContainer}>
        <Row>
          <Col md={4}>
            <ul className={styles.joinedBullets}>
              <li className={styles.active}>
                Loan Calculator
              </li>
              <li className={applicationStage > 0 && styles.active}>Contact Address</li>
              <li className={applicationStage > 1 && styles.active}>Employment Information</li>
              <li className={applicationStage > 2 && styles.active}>Bank Details</li>
            </ul>
          </Col>
          <Col md={8}>
            <div className={styles.applyForm}>
                {/* <LoanCalculatorForm /> */}
              { applicationStage === 0 && <LoanCalculatorForm submit={startApplication}/>}
              { applicationStage === 1 && <LoanContactForm submit={addAddress} />}
                { applicationStage === 2 &&  <EmployerInfoForm submit={addWorkInfo} />}
                { applicationStage === 3 &&  <BankInfoForm /> }
            </div>
          </Col>
        </Row>
      </div> }
      { applicationSuccess && 
        <div className={styles.applicationComplete}>
          <FaCheckCircle size="4em" color="#741763" />
          <h2>Congratulations!</h2>
          <p>Your loan application has been submitted and is being processed</p>
          <p>Look out for an email from us within the next 24 hours</p>
        </div>
      }
    </Dashboard>
  )
}


export default ConsumerCredit;
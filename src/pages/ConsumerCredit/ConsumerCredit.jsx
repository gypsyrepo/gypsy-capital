import React, { useContext, useEffect } from "react";
import styles from "./ConsumerCredit.module.scss";
import Dashboard from "../../components/Dashboard/Dashboard";
import Button from "../../components/Button/Button";
import { Table } from "react-bootstrap";
import noLoan from "../../assets/no-loan.png";
import { Row, Col, Modal } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { TiCancelOutline } from "react-icons/ti";
import LoanCalculatorForm from "../../components/LoanCalculatorForm/LoanCalculatorForm";
import LoanContactForm from "../../components/LoanContactForm/LoanContactForm";
import EmployerInfoForm from "../../components/EmployerInfoForm/EmployerInfoForm";
import BankInfoForm from "../../components/BankInfoForm/BankInfoForm";
import {
  Route,
  useRouteMatch,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { Context as LoanContext } from "../../context/LoanContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { clientRoutes } from "../../routes/sidebarRoutes";
import _ from "lodash";

const ConsumerCredit = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const applyStageArray = {
    "/dashboard/consumer-credit/apply/calculator": 0,
    "/dashboard/consumer-credit/apply/contact-info": 1,
    "/dashboard/consumer-credit/apply/employer-info": 2,
    "/dashboard/consumer-credit/apply/bank-info": 3,
  };

  const {
    state: { loans, error, currentLoanId, incomplete, loanApplicationStage },
    retrieveClientLoans,
    clearError,
    loanApply,
    addAddressForLoan,
    addWorkInfoForLoan,
    addBankInfoForLoan,
    clearCompleteState,
  } = useContext(LoanContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    retrieveClientLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateLoan = (data) => {
    loanApply(data, user.user_id);
  };

  const updateAddress = (data) => {
    addAddressForLoan(data, currentLoanId);
  };

  const updateEmployerInfo = (data) => {
    addWorkInfoForLoan(data, currentLoanId);
  };

  const updateBankInfo = (data) => {
    addBankInfoForLoan(data, currentLoanId, retrieveClientLoans);
  };

  const resumeApplication = () => {
    clearCompleteState();
    if (loanApplicationStage === "calculated") {
      history.push("/dashboard/consumer-credit/apply/contact-info");
    }
    if (loanApplicationStage === "address_added") {
      history.push("/dashboard/consumer-credit/apply/employer-info");
    }
    if (loanApplicationStage === "employer_added") {
      history.push("/dashboard/consumer-credit/apply/bank-info");
    }
  };

  // console.log(loans);

  return (
    <>
      <Dashboard sidebarRoutes={clientRoutes} location={location}>
        <ToastContainer position="top-center" />
        <div className={styles.heading}>
          <div>
            <h2>Consumer Credit</h2>
            <p>Get a loan with ease</p>
          </div>
          {location.pathname === "/dashboard/consumer-credit/history" && (
            <Button
              bgColor="#741763"
              size="sm"
              color="#fff"
              className="mt-4"
              clicked={() =>
                history.push("/dashboard/consumer-credit/apply/calculator")
              }
            >
              Apply for a loan
            </Button>
          )}
        </div>
        <Switch>
          <Route path={`${path}/history`}>
            <div className={styles.creditTable}>
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
                    let loanBalance = loanInstance?.repayment
                      .filter((repaid) => {
                        return repaid.status === true;
                      })
                      .reduce((acc, curr) => {
                        return curr.scheduledAmount + acc;
                      }, 0);

                    loanBalance = loanInstance?.calculatedPayBack - loanBalance;

                    return (
                      <tr key={idx}>
                        <td>{loanInstance._id.substring(0, 5)}</td>
                        <td>{`N ${numberWithCommas(
                          loanInstance.monthlyRepayment
                        )}`}</td>
                        <td>
                          {!loanInstance.approvedTenure
                            ? loanInstance.paymentPeriod
                            : loanInstance.approvedTenure}
                        </td>
                        <td>{_.startCase(loanInstance.status)}</td>
                        <td>Salary</td>
                        <td>{`N ${numberWithCommas(loanInstance.amount)}`}</td>
                        <td>{`N ${numberWithCommas(loanBalance)}`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {(!loans || loans.length === 0) && (
                <div className={styles.noLoanMessage}>
                  <p>Sorry you currently have no loan</p>
                  <img src={noLoan} alt="No loan history" height="250" />
                  <TiCancelOutline
                    className={styles.mobileNoLoan}
                    size="6em"
                    color="rgba(116, 23, 99, 0.6)"
                  />
                </div>
              )}
            </div>
          </Route>
          <Route path={`${path}/apply`}>
            <div className={styles.applyContainer}>
              <Row>
                <Col md={4}>
                  <ul className={styles.joinedBullets}>
                    <li className={styles.active}>Loan Calculator</li>
                    <li
                      className={
                        applyStageArray[location.pathname] > 0 && styles.active
                      }
                    >
                      Contact Address
                    </li>
                    <li
                      className={
                        applyStageArray[location.pathname] > 1 && styles.active
                      }
                    >
                      Employment Information
                    </li>
                    <li
                      className={
                        applyStageArray[location.pathname] > 2 && styles.active
                      }
                    >
                      Bank Details
                    </li>
                  </ul>
                </Col>
                <Col md={8}>
                  <div className={styles.applyForm}>
                    <Switch>
                      <Route path={`${path}/apply/calculator`}>
                        <LoanCalculatorForm delegateApply={calculateLoan} />
                      </Route>
                      <Route path={`${path}/apply/contact-info`}>
                        <LoanContactForm submitContact={updateAddress} />
                      </Route>
                      <Route path={`${path}/apply/employer-info`}>
                        <EmployerInfoForm
                          submitEmployerInfo={updateEmployerInfo}
                        />
                      </Route>
                      <Route path={`${path}/apply/bank-info`}>
                        <BankInfoForm submitBankInfo={updateBankInfo} />
                      </Route>
                    </Switch>
                  </div>
                </Col>
              </Row>
            </div>
          </Route>
          <Route path={`${path}/success`}>
            <div className={styles.applicationComplete}>
              <FaCheckCircle size="4em" color="#741763" />
              <h2>Congratulations!</h2>
              <p>
                Your loan application has been submitted and is being processed
              </p>
              <p>Look out for an email from us within the next 24 hours</p>
            </div>
          </Route>
        </Switch>
      </Dashboard>
      <Modal
        className={styles.continueModal}
        size="sm"
        show={incomplete}
        onHide={() => {
          clearCompleteState();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Continue Application</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You have an incomplete loan request, please continue where you left
            off
          </p>
          <Button
            clicked={resumeApplication}
            fullWidth
            className="mt-4"
            bgColor="#741763"
            size="sm"
            color="#EBEBEB"
          >
            Continue
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConsumerCredit;

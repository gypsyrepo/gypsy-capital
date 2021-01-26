import React, { useEffect, useState } from 'react';
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
import InputField from '../../components/InputField/InputField';

const ConsumerCredit = ({ location }) => {

  const [applyState, setApplyState] = useState(true);
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [applicationStage, setApplicationStage] =useState(1);

  useEffect(() => {
    setDaysOfMonth(fillUpDaysArray);
  }, [])

  const fillUpDaysArray = () => {
    let daysArray = [];
    for(let i=0; i < 31; i++) {
      daysArray.push(i+1)
    }
    return daysArray;
  }

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

  }

  if(daysOfMonth.length === 0) {
    return null;
  }

  return (
    <Dashboard sidebarRoutes={sidebarRoutes} location={location}>
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
          >
            Apply for a loan
          </Button>}
      </div>
      { !applyState ? <div className={styles.creditTable}>
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
        <div className={styles.noLoanMessage}>
          <p>Sorry you currently have no loan</p>
          <img src={noLoan} alt="No loan history" height="250" />
        </div>
      </div> : null }
      <div className={styles.applyContainer}>
        <Row>
          <Col md={4}>
            <ul className={styles.joinedBullets}>
              <li className={styles.active}>
                Loan Calculator
              </li>
              <li className={applicationStage > 0 && styles.active}>Contact Address</li>
              <li>Employment Information</li>
              <li>Bank Details</li>
            </ul>
          </Col>
          <Col md={8}>
            <div className={styles.applyForm}>
            { applicationStage === 0 &&
              <div>
                <Row className="mb-4">
                  <Col>
                    <InputField 
                      label="Monthly Salary" 
                      type="text" 
                      nameAttr="salary"
                    />
                  </Col>
                  <Col>
                    <InputField 
                      label="Pay Day"
                      type="select"
                      options={daysOfMonth}
                      nameAttr="payday"
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <InputField 
                      label="Loan Amount" 
                      type="text" 
                      nameAttr="loanAmt"
                    />
                    <p className={styles.inputHint}>
                      <span>min amt:</span> #50,000; <span>max amt:</span> #500,000
                    </p>
                  </Col>
                  <Col>
                    <InputField 
                      label="Installment Period"
                      type="select"
                      options={['1 Month', '2 Months', '3 Months']}
                      nameAttr="installmentCycle"
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <InputField 
                      label="Loan Purpose"
                      type="select"
                      options={[
                        'Debt Consolidation',
                        'Home Remodelling',
                        'Moving Costs',
                        'Emergency Expenses',
                        'Medical Bills',
                        'Education',
                        'Appliance Purchase',
                        'Vehicle Financing',
                        'Vacation Costs',
                        'Wedding Expenses',
                        'Others'
                      ]}
                      nameAttr="loanPurpose"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputField 
                      type="text"
                      label="Estimated Monthly Payment"
                      nameAttr="monthlyPayment"
                    />
                    <p className={styles.inputHint}>
                      <span>Eventual repayment amount may differ after risk assessment.</span>
                    </p>
                  </Col>
                </Row>
                <Button 
                  className="mt-5" 
                  fullWidth 
                  clicked={handleSubmit} 
                  bgColor="#741763" 
                  size="lg" 
                  color="#EBEBEB"
                >
                  Continue
                </Button>
              </div> }
              { applicationStage === 1 &&
                <div>
                  <Row className="mb-4">
                    <Col>
                      <InputField 
                        label="Address"
                        nameAttr="address"
                        type="text"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputField 
                        type="text"
                        nameAttr="city"
                        label="City"
                      />
                    </Col>
                    <Col>
                      <InputField 
                        type="select"
                        nameAttr="state"
                        label="State"
                        options={['Oyo', 'Lagos', 'Osun']}
                      />
                    </Col>
                    <Col>
                      <InputField 
                        type="select"
                        nameAttr="localGovt"
                        label="Local Govt. Area"
                        options={['Eti-Osa', 'Alimosho', 'Ajah']}
                      />
                    </Col>
                  </Row>
                </div>}
            </div>
          </Col>
        </Row>
      </div>
    </Dashboard>
  )
}


export default ConsumerCredit;
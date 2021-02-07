import React, { useState } from 'react';
import styles from './LoanCalculator.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import InputField from '../../components/InputField/InputField';
import { Row, Col } from 'react-bootstrap';
import Button from '../../components/Button/Button';


const LoanCalculator = ({ location, history }) => {

  const [loanData, setLoanData] = useState({
    proposedAmount: '',
    proposedDuration: '',
    monthlyIncome: '',
    employmentStatus: '',
    proposedMonthyRepayment: '',
  })

  return (
    <>
    <NavBar location={location} history={history} />
    <div className={styles.mainSection}>
      <div className={styles.container}>
        <h3>Access Quick Loans of Up to ₦500,000</h3>
        <p>Use our loan calculator to get started</p>
        <div className={styles.calculatorBox}>
          <Row className="mb-4">
            <Col>
              <InputField 
                type="text"
                label="How much do you need?"
                nameAttr="loanAmt"
                value={loanData.proposedAmount}
                changed={(val) => setLoanData({ ...loanData, proposedAmount: val})}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField 
                type="select"
                label="How long before you pay back? (Months)"
                nameAttr="proposedDuration"
                options={[1, 2, 3]}
                value={loanData.proposedDuration}
                changed={(val) => setLoanData({ ...loanData, proposedDuration: val})}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField 
                type="text"
                label="What is your monthly income?"
                nameAttr="monthlyIncome"
                value={loanData.monthlyIncome}
                changed={(val) => setLoanData({ ...loanData, monthlyIncome: val})}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField 
                type="select"
                label="Employment status"
                options={['Self-Employed', 'Unemployed', 'Employed']}
                nameAttr="employStatus"
                value={loanData.employmentStatus}
                changed={(val) => setLoanData({ ...loanData, employmentStatus: val})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField 
                type="text"
                label="Estimated monthly repayment"
                nameAttr="proposedRepayment"
                value={loanData.proposedMonthyRepayment}
                changed={(val) => setLoanData({ ...loanData, proposedMonthyRepayment: val})}
              />
            </Col>
          </Row>
          <Button
            className={ "mt-5" } 
            fullWidth 
            // clicked={handleSubmit} 
            bgColor="#741763" 
            size="lg" 
            color="#EBEBEB"
            // disabled={loading}
            // loading={loading}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}


export default LoanCalculator;
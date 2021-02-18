import React, { useState, useEffect, useContext } from 'react';
import styles from './LoanCalculatorForm.module.scss';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { Row, Col } from 'react-bootstrap';
import { validateInput } from '../../utils/validateInput';
import { ToastContainer, toast } from 'react-toastify';
import { Context as LoanContext } from '../../context/LoanContext';
import { Context as AuthContext } from '../../context/AuthContext';


const LoanCalculatorForm = ({ delegateApply }) => {

  const { state: { loading }, loanApply } = useContext(LoanContext);

  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [limitError, setLimitError] = useState(null);
  const [loanCalcData, setLoanCalcData] = useState({
    monthlySalary: "",
    payDay: "",
    loanAmount: "",
    installmentPeriod: "",
    loanPurpose: "",
    estimatedMonthlyPayment: ""
  });

  const [loanCalcDataErrors, setLoanCalcDataErrors] = useState({
    monthlySalary: null,
    payDay: null,
    loanAmount: null,
    installmentPeriod: null,
    loanPurpose: null
  });

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

  const { monthlySalary, loanAmount, installmentPeriod, payDay, loanPurpose } = loanCalcData;

  useEffect(() => {
    if(monthlySalary && loanAmount && installmentPeriod) {
      // console.log(typeof monthlySalary, typeof loanAmount, installmentPeriod);
      const tenor = Number(installmentPeriod.split(' ')[0]);
      let initRate = Number(loanAmount);
      let toRepay = initRate + (initRate * 0.04);
      toRepay = toRepay + (toRepay * 0.04 * tenor)
      // for(let i=0; i < tenor; i++) {
      //   toRepay = initRate + (initRate * 0.04);
      //   initRate = toRepay;
      // }
      const monthlyRepay = toRepay / tenor;
      console.log(monthlyRepay)
      if(monthlyRepay > (0.333 * Number(monthlySalary))) {
        setLimitError('You are not eligible for this amount, kindly enter a lower loan amount');
      } else {
        setLimitError(null)
      }
      setLoanCalcData({ ...loanCalcData, estimatedMonthlyPayment: Math.floor(monthlyRepay) })
    }
  }, [monthlySalary, loanAmount, installmentPeriod])

  const submitLoanCalcData = () => {
    console.log('works');
    const fieldsTovalidate = { monthlySalary, payDay, loanAmount, installmentPeriod, loanPurpose }
    const validated = validateInput(fieldsTovalidate, setLoanCalcDataErrors);
    if(validated) {
      const applyData = {
        monthlySalary,
        payDay,
        amount: loanAmount,
        paymentPeriod: installmentPeriod,
        loanPurpose,
        monthlyRepayment: loanCalcData.estimatedMonthlyPayment
      }
      console.log(applyData);
      limitError ? toast.error(limitError) : delegateApply(applyData);
    }
  }

  if(daysOfMonth.length === 0) {
    return null;
  }

  return (
    <div className={styles.calculatorForm}>
      <ToastContainer position="top-center" />
      <Row className="mb-4">
        <Col>
          <InputField 
            label="Monthly Salary" 
            type="number" 
            nameAttr="salary"
            value={loanCalcData.monthlySalary}
            changed={(val) => {
              setLoanCalcDataErrors({ ...loanCalcDataErrors, monthlySalary: null })
              setLoanCalcData({ ...loanCalcData, monthlySalary: val })
            }}
            error={loanCalcDataErrors.monthlySalary && loanCalcDataErrors.monthlySalary}
          />
        </Col>
        <Col>
          <InputField 
            label="Pay Day"
            type="select"
            options={daysOfMonth}
            nameAttr="payday"
            value={loanCalcData.payDay}
            changed={(val) => {
              setLoanCalcDataErrors({ ...loanCalcDataErrors, payDay: null })
              setLoanCalcData({ ...loanCalcData, payDay: val })
            }}
            error={loanCalcDataErrors.payDay && loanCalcDataErrors.payDay}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            label="Loan Amount" 
            type="number" 
            nameAttr="loanAmt"
            value={loanCalcData.loanAmount}
            changed={(val) => {
              setLoanCalcDataErrors({ ...loanCalcDataErrors, loanAmount: null })
              setLoanCalcData({ ...loanCalcData, loanAmount: val })
            }}
            error={loanCalcDataErrors.loanAmount && loanCalcDataErrors.loanAmount}
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
            value={loanCalcData.installmentPeriod}
            changed={(val) => {
              setLoanCalcDataErrors({ ...loanCalcDataErrors, installmentPeriod: null })
              setLoanCalcData({ ...loanCalcData, installmentPeriod: val })
            }}
            error={loanCalcDataErrors.installmentPeriod && loanCalcDataErrors.installmentPeriod}
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
            value={loanCalcData.loanPurpose}
            changed={(val) => {
              setLoanCalcDataErrors({ ...loanCalcDataErrors, loanPurpose: null })
              setLoanCalcData({ ...loanCalcData, loanPurpose: val })
            }}
            error={loanCalcDataErrors.loanPurpose && loanCalcDataErrors.loanPurpose}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField 
            type="text"
            label="Estimated Monthly Payment"
            nameAttr="monthlyPayment"
            value={loanCalcData.estimatedMonthlyPayment}
            disable={true}
            changed={(val) => {
              setLoanCalcDataErrors({ ...loanCalcDataErrors, estimatedMonthlyPayment: null })
              setLoanCalcData({ ...loanCalcData, estimatedMonthlyPayment: val })
            }}
            error={loanCalcDataErrors.estimatedMonthlyPayment && loanCalcDataErrors.estimatedMonthlyPayment}
          />
          <p className={styles.inputHint}>
            <span>Eventual repayment amount may differ after risk assessment.</span>
          </p>
          { limitError && <p className={styles.limitError}>{limitError}</p> }
        </Col>
      </Row>
      <Button 
        className="mt-5" 
        fullWidth 
        clicked={submitLoanCalcData} 
        bgColor="#741763" 
        size="lg" 
        color="#EBEBEB"
        disabled={loading}
        loading={loading}
      >
        Continue
      </Button>
    </div>
  )
}


export default LoanCalculatorForm;
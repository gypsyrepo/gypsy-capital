import React, { useContext, useEffect, useState } from 'react';
import styles from './LoanModal.module.scss';
import { Modal } from 'react-bootstrap';
import LoanCalculatorForm from '../LoanCalculatorForm/LoanCalculatorForm';
import LoanContactForm from '../LoanContactForm/LoanContactForm';
import { Context as LoanContext } from '../../context/LoanContext';
import { Context as AuthContext } from '../../context/AuthContext';
import EmployerInfoForm from '../EmployerInfoForm/EmployerInfoForm';
import BankInfoForm from '../BankInfoForm/BankInfoForm';


const Calculator = ({ clientId }) => {

  const { loanApply } = useContext(LoanContext);
  // const { state: { user } } = useContext(AuthContext);

  const calculateLoan = (data) => {
    loanApply(data, clientId, true);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Loan Calculator</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <LoanCalculatorForm delegateApply={calculateLoan} />
        </div>
      </Modal.Body>
    </>
  )
}


const ContactAddr = () => {

  const { state: { currentLoanId }, addAddressForLoan } = useContext(LoanContext);
  const { state: { user } } = useContext(AuthContext);

  const updateAddress = (data) => {
    addAddressForLoan(data, currentLoanId, true);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Contact Address</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <LoanContactForm submitContact={updateAddress} />
        </div>
      </Modal.Body>
    </>
  )
}


const EmployerInfo = () => {

  const { state: { currentLoanId }, addWorkInfoForLoan } = useContext(LoanContext);
  const { state: { user } } = useContext(AuthContext);

  const updateEmployerInfo = (data) => {
    addWorkInfoForLoan(data, currentLoanId, true);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Employer Info</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <EmployerInfoForm submitEmployerInfo={updateEmployerInfo} />
        </div>
      </Modal.Body>
    </>
  )
}


const BankInfo = () => {

  const { state: { currentLoanId }, addBankInfoForLoan } = useContext(LoanContext);
  const { state: { user } } = useContext(AuthContext);

  const updateBankInfo = (data) => {
    addBankInfoForLoan(data, currentLoanId, true);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Bank Info</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <BankInfoForm submitBankInfo={updateBankInfo} />
        </div>
      </Modal.Body>
    </>
  )
}


const LoanModal = ({ openState, closeHandler, userId }) => {

  const { state: { loanApplicationStage } } = useContext(LoanContext); 
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if(loanApplicationStage === "calculated") {
      setStage(1);
    }
    if(loanApplicationStage === "address_added") {
      setStage(2);
    }
    if(loanApplicationStage === "employer_added") {
      setStage(3);
    }
    if(loanApplicationStage === "bank_added") {
      setStage(4);
    }
  }, [loanApplicationStage])

  return (
    <Modal
      show={openState}
      size="lg"
      onHide={() => {
        closeHandler();
      }}
    >
      { stage === 0 && <Calculator clientId={userId} /> }
      { stage === 1 && <ContactAddr /> }
      { stage === 2 && <EmployerInfo /> }
      { stage === 3 && <BankInfo /> }
    </Modal>
  )
}

export default LoanModal;
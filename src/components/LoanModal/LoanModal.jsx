import React, { useContext, useEffect, useState } from 'react';
import styles from './LoanModal.module.scss';
import { Modal } from 'react-bootstrap';
import LoanCalculatorForm from '../LoanCalculatorForm/LoanCalculatorForm';
import LoanContactForm from '../LoanContactForm/LoanContactForm';
import { Context as LoanContext } from '../../context/LoanContext';
import { Context as AuthContext } from '../../context/AuthContext';
import EmployerInfoForm from '../EmployerInfoForm/EmployerInfoForm';
import BankInfoForm from '../BankInfoForm/BankInfoForm';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../Button/Button';


const Calculator = ({ clientId }) => {

  const { loanApply } = useContext(LoanContext);

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

const ApplySuccess = ({ close }) => {

  useEffect(() => {
    setTimeout(() => {
      close();
    }, 3000);
  }, []);

  return (
    <>
      <Modal.Body>
        <div className={styles.success}>
          <FaCheckCircle size="4em" color="#741763" />
          <h4>User successfully onboarded.</h4>
          <Button
            className="mt-4" 
            clicked={close} 
            bgColor="#741763" 
            size="sm" 
            color="#EBEBEB"
          >
            Continue
          </Button>
        </div>
      </Modal.Body>
    </>
  )
}


const LoanModal = ({ openState, closeHandler, userId }) => {

  const { state: { loanApplicationStage } } = useContext(LoanContext); 
  const [stage, setStage] = useState(4);

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
      size={ stage === 4 ? "sm" : "lg" }
      onHide={() => {
        closeHandler();
      }}
    >
      { stage === 0 && <Calculator clientId={userId} /> }
      { stage === 1 && <ContactAddr /> }
      { stage === 2 && <EmployerInfo /> }
      { stage === 3 && <BankInfo /> }
      { stage === 4 && <ApplySuccess close={closeHandler} /> }
    </Modal>
  )
}

export default LoanModal;
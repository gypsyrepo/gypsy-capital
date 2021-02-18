import React, { useState } from 'react';
import styles from './LoanModal.module.scss';
import { Modal } from 'react-bootstrap';
import LoanCalculatorForm from '../LoanCalculatorForm/LoanCalculatorForm';


const Calculator = () => {

  return (
    <>
      <Modal.Header>
        <Modal.Title>
          <h2>Loan Calculator</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoanCalculatorForm />
      </Modal.Body>
    </>
  )
}


const LoanModal = ({ openState, closeHandler }) => {
  return (
    <Modal
      show={openState}
      size="lg"
      onHide={() => {
        closeHandler();
      }}
    >
      <Calculator />
    </Modal>
  )
}

export default LoanModal;
import React from 'react';
import styles from './LoanModal.module.scss';
import { Modal } from 'react-bootstrap';


const LoanModal = ({ openState, closeHandler }) => {
  return (
    <Modal
      show={openState}
      size="lg"
      onHide={() => {
        closeHandler();
      }}
    >
      
    </Modal>
  )
}

export default LoanModal;
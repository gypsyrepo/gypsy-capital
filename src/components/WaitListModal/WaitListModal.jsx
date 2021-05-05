import React, { useState } from "react";
import styles from "./WaitListModal.module.scss";
import { Modal } from "react-bootstrap";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

const WaitListModal = ({ open, toggleModal }) => {
  const [email, setEmail] = useState("");

  return (
    <Modal centered show={open} onHide={toggleModal}>
      <div className={styles.modalContainer}>
        <h2>Enter your email to get notified:</h2>
        <InputField
          nameAttr="notifyEmail"
          type="email"
          value={email}
          changed={(val) => setEmail(val)}
          placeholder="Your email"
        />
        <Button
          bgColor="#741763"
          size="lg"
          color="#fff"
          className="mt-4"
          fullWidth
          // clicked={() => console.log(email)}
        >
          Get Notified
        </Button>
      </div>
    </Modal>
  );
};

export default WaitListModal;

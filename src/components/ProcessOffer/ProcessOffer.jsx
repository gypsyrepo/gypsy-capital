import React, { useState, useEffect, useContext } from "react";
import { Context as LoanContext } from "../../context/LoanContext";
import OfferLetterForm from "../OfferLetter/OfferLetterForm";
import styles from "./ProcessOffer.module.scss";
import { Row, Col } from "react-bootstrap";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { GrAttachment } from "react-icons/gr";
import { validateInput } from "../../utils/validateInput";
import { toast, ToastContainer } from "react-toastify";

const SendOfferForm = ({ offerLetter, clientData, loanId }) => {
  const {
    state: { loading, error, message },
    sendOfferLetter,
    clearMessage,
    clearError,
  } = useContext(LoanContext);

  const [sendFormInput, setSendFormInput] = useState({
    email: "",
    message: "",
  });

  const [sendFormErrors, setSendFormErrors] = useState({
    email: null,
    message: null,
  });

  useEffect(() => {
    if (clientData) {
      setSendFormInput({ ...sendFormInput, email: clientData?.email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData]);

  const sendOfferToClient = () => {
    const validated = validateInput(sendFormInput, setSendFormErrors);

    if (validated) {
      const data = new FormData();
      data.append("image", offerLetter);
      data.append("subject", "Loan Approval Offer Letter From Gypsy Capital");
      data.append("message", sendFormInput.message);

      sendOfferLetter(loanId, data);
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      clearMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      <ToastContainer position="top-center" />
      <div className={styles.send}>
        <div className={styles.header}>
          <h2>Send Offer Letter</h2>
        </div>
        <div className={styles.body}>
          <Row className="align-items-center mb-5">
            <Col md={2}>
              <p>To:</p>
            </Col>
            <Col md={10}>
              <InputField
                type="email"
                placeholder="Client's email"
                nameAttr="clientEmail"
                value={sendFormInput.email}
                changed={(val) => {
                  setSendFormInput({ ...sendFormInput, email: val });
                  setSendFormErrors({ ...sendFormErrors, email: null });
                }}
                error={sendFormErrors?.email}
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-5">
            <Col md={2}>
              <p>Subject:</p>
            </Col>
            <Col md={10}>
              <p style={{ fontWeight: "400" }}>
                Loan Approval Offer Letter From Gypsy Capital
              </p>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={2}>
              <p>Message:</p>
            </Col>
            <Col md={10}>
              <InputField
                type="textarea"
                nameAttr="message"
                value={sendFormInput.message}
                changed={(val) => {
                  setSendFormInput({ ...sendFormInput, message: val });
                  setSendFormErrors({ ...sendFormErrors, message: null });
                }}
                error={sendFormErrors?.message}
              />
            </Col>
          </Row>
        </div>
        <div className={styles.footer}>
          <div>
            <p>
              <GrAttachment size="1.3em" color="#706767" className="mr-4" />
              Offer Letter Attached
            </p>
            <Button
              clicked={sendOfferToClient}
              bgColor="#741763"
              size="sm"
              color="#EBEBEB"
              disabled={loading}
              loading={loading}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const ProcessOffer = ({ data }) => {
  const [sendState, setSendState] = useState(false);
  const [offerLetterBlob, setOfferLetterBlob] = useState(null);

  return (
    <>
      {sendState ? (
        <SendOfferForm
          clientData={data?.client}
          offerLetter={offerLetterBlob}
          loanId={data?._id}
        />
      ) : (
        <OfferLetterForm
          saveBlob={setOfferLetterBlob}
          loanData={data}
          setState={setSendState}
        />
      )}
    </>
  );
};

export default ProcessOffer;

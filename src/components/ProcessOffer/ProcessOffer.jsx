import React, { useState } from 'react';
import OfferLetterForm from '../OfferLetter/OfferLetterForm';
import styles from './ProcessOffer.module.scss';
import { Row, Col } from 'react-bootstrap';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import { GrAttachment } from 'react-icons/gr';


const SendOfferForm = () => {
  return (
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
            />
          </Col>
        </Row>
        <Row className="align-items-center mb-5"> 
          <Col md={2}>
            <p>Subject:</p>
          </Col>
          <Col md={10}>
            <p style={{fontWeight: '400'}}>Loan Approval Offer Letter From Gypsy Capital</p>
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
            />
          </Col>
        </Row>
      </div>
      <div className={styles.footer}>
        <div>
          <p><GrAttachment size="1.3em" color="#706767" className="mr-4" />Offer Letter Attached</p>
          <Button
            // clicked={updateContactInfo} 
            bgColor="#741763" 
            size="sm" 
            color="#EBEBEB"
            // disabled={loading}
            // loading={loading}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}


const ProcessOffer = () => {

  const [sendState, setSendState] = useState(false);

  return (
    <>
      {sendState ? <SendOfferForm /> : <OfferLetterForm setState={setSendState} /> }
    </>
  )
}


export default ProcessOffer;
import React, { useState, useRef } from 'react';
import styles from './BankInfoForm.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../InputField/InputField';
import FileUploadButton from '../FileUploadButton/FileUploadButton';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Button from '../Button/Button';


const BankInfoForm = () => {

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    accountName: "",
    acctStatement: ""
  })

  const acctStatementRef = useRef();

  return (
    <div className={styles.bankInfo}>
      <p className={styles.importantInfo}>Bank account provided must be your salary account</p>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="select"
            nameAttr="bankName"
            label="Bank Name"
            options={['GTB', 'UBA']}
            value={bankInfo.bankName}
            changed={(val) => setBankInfo({ ...bankInfo, bankName: val })}
          />
        </Col>
        <Col>
          <InputField 
            type="select"
            nameAttr="accountType"
            label="Bank Account Type"
            options={['Savings', 'Current']}
            value={bankInfo.accountType}
            changed={(val) => setBankInfo({ ...bankInfo, accountType: val })}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            nameAttr="acctNumber"
            label="Account Number"
            value={bankInfo.accountNumber}
            changed={(val) => setBankInfo({ ...bankInfo, accountNumber: val })}
          />
        </Col>
        <Col>
          <InputField 
            type="type"
            nameAttr="acctName"
            label="Account Name"
            value={bankInfo.accountName}
            changed={(val) => setBankInfo({ ...bankInfo, accountName: val })}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FileUploadButton 
            label="Choose file"
            icon={<FaCloudUploadAlt className="ml-3" size="1.2em" />}
            id="acct-statement-upload" 
            fileRef={acctStatementRef}
            visibleLabel="Statement of Account"
            fullwidth
          />
          <p className={styles.inputHint}>Please provide your 6 months bank statement to us.</p>
        </Col>
      </Row>
      <Button 
        className="mt-5" 
        fullWidth 
        // clicked={handleSubmit} 
        bgColor="#741763" 
        size="lg" 
        color="#EBEBEB"
      >
        Submit
      </Button>
    </div>
  )
}

export default BankInfoForm;
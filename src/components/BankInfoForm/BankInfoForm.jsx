import React, { useState, useRef, useMemo, useContext, useEffect } from 'react';
import styles from './BankInfoForm.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../InputField/InputField';
import FileUploadButton from '../FileUploadButton/FileUploadButton';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Button from '../Button/Button';
import { Context as BankContext } from '../../context/BankCotext';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as LoanContext } from '../../context/LoanContext';
import { validateInput } from '../../utils/validateInput';
import { ToastContainer, toast } from 'react-toastify';


const BankInfoForm = () => {

  const { state: { user } } = useContext(AuthContext);
  const { state: { loading }, addBankInfoForLoan } = useContext(LoanContext);

  const { 
    state: { bankList, userBankDetails }, 
    getBankList, 
    verifyBankInfo,
  } = useContext(BankContext);

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    accountName: "",
  })

  const [bankErrors, setBankErrors] = useState({
    bankName: null,
    accountType: null,
    accountNumber: null,
  })

  useEffect(() => {
    (async() => {
      await getBankList();
    })()
  }, [])
 
  const bankNames = useMemo(() => {
    return bankList ? 
      bankList.map((bank) => bank.name) :
      []
  }, [bankList])

  const acctStatementRef = useRef();

  const uploadBankInfo = () => {
    if(acctStatementRef.current.files.length > 0) {
      const acctStatement = acctStatementRef.current.files[0];
      const validated = validateInput(bankInfo, setBankErrors);
      if(validated) {
        // console.log('validated')
        const data = new FormData();
        data.append('bank_name', bankInfo.bankName);
        data.append('bank_account_type', bankInfo.accountType);
        data.append('bank_account_number', bankInfo.accountNumber);
        data.append('bank_account_name', bankInfo.accountName);
        data.append('image', acctStatement);

        addBankInfoForLoan(data, user.user_id);
      }
    } else {
      toast.error("You need to upload your account statement to be able to proceed")
    }
  }

  useEffect(() => {
    if(bankInfo.accountNumber.length === 10 && bankInfo.bankName) {
      const bank = bankList.find(bank => bank.name.toLowerCase() === bankInfo.bankName);
      const bankCode = bank.code;
      console.log(bankCode)
      verifyBankInfo(bankInfo.accountNumber, bankCode)
    }
  }, [bankInfo.accountNumber, bankInfo.bankName])

  useEffect(() => {
    console.log(userBankDetails);
    if(userBankDetails) {
      setBankInfo({ ...bankInfo, accountName: userBankDetails.account_name })
    }
  }, [userBankDetails]);

  return (
    <div className={styles.bankInfo}>
      <ToastContainer position="top-center" />
      <p className={styles.importantInfo}>Bank account provided must be your salary account</p>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="select"
            nameAttr="bankName"
            label="Bank Name"
            options={bankNames}
            value={bankInfo.bankName}
            changed={(val) => {
              setBankErrors({ ...bankErrors, bankName: null })
              setBankInfo({ ...bankInfo, bankName: val })
            }}
            error={bankErrors.bankName && bankErrors.bankName}
          />
        </Col>
        <Col>
          <InputField 
            type="select"
            nameAttr="accountType"
            label="Bank Account Type"
            options={['Savings', 'Current']}
            value={bankInfo.accountType}
            changed={(val) => {
              setBankErrors({ ...bankErrors, accountType: null })
              setBankInfo({ ...bankInfo, accountType: val })
            }}
            error={bankErrors.accountType && bankErrors.accountType}
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
            changed={(val) => {
              setBankErrors({ ...bankErrors, accountNumber: null })
              setBankInfo({ ...bankInfo, accountNumber: val })
            }}
            error={bankErrors.accountNumber && bankErrors.accountNumber}
          />
        </Col>
        <Col>
          <InputField 
            type="type"
            nameAttr="acctName"
            label="Account Name"
            value={bankInfo.accountName}
            disable={true}
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
        clicked={uploadBankInfo} 
        bgColor="#741763" 
        size="lg" 
        color="#EBEBEB"
        disabled={loading}
        loading={loading}
      >
        Submit
      </Button>
    </div>
  )
}

export default BankInfoForm;
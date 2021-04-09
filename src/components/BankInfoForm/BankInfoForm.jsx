import React, { useState, useRef, useMemo, useContext, useEffect } from "react";
import styles from "./BankInfoForm.module.scss";
import { Row, Col } from "react-bootstrap";
import InputField from "../InputField/InputField";
import FileUploadButton from "../FileUploadButton/FileUploadButton";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "../Button/Button";
import { Context as BankContext } from "../../context/BankCotext";
import { Context as LoanContext } from "../../context/LoanContext";
import { validateInput } from "../../utils/validateInput";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

const BankInfoForm = ({ submitBankInfo }) => {
  const {
    state: { loading },
  } = useContext(LoanContext);

  const {
    state: { bankList, userBankDetails, bankLoading },
    getBankList,
    verifyBankInfo,
  } = useContext(BankContext);

  const [bankInfo, setBankInfo] = useState({
    bankName: null,
    accountType: null,
    accountNumber: "",
    accountName: "",
  });

  const [bankErrors, setBankErrors] = useState({
    bankName: null,
    accountType: null,
    accountNumber: null,
  });

  useEffect(() => {
    (async () => {
      await getBankList();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bankNames = useMemo(() => {
    return bankList ? bankList.map((bank) => bank.name) : [];
  }, [bankList]);

  const acctStatementRef = useRef();

  const uploadBankInfo = () => {
    if (acctStatementRef.current.files.length > 0) {
      const acctStatement = acctStatementRef.current.files[0];
      const validated = validateInput(bankInfo, setBankErrors);
      if (validated) {
        // console.log('validated')
        const data = new FormData();
        data.append("bank_name", bankInfo.bankName);
        data.append("bank_account_type", bankInfo.accountType);
        data.append("bank_account_number", bankInfo.accountNumber);
        data.append("bank_account_name", bankInfo.accountName);
        data.append("image", acctStatement);

        // addBankInfoForLoan(data, user.user_id);
        submitBankInfo(data);
      }
    } else {
      toast.error(
        "You need to upload your account statement to be able to proceed"
      );
    }
  };

  useEffect(() => {
    if (bankInfo.accountNumber.length === 10 && bankInfo.bankName) {
      const bank = bankList.find(
        (bank) => bank.name.toLowerCase() === bankInfo.bankName
      );
      const bankCode = bank.code;
      console.log(bankCode);
      verifyBankInfo(bankInfo.accountNumber, bankCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankInfo.accountNumber, bankInfo.bankName]);

  useEffect(() => {
    console.log(userBankDetails);
    if (userBankDetails) {
      setBankInfo({ ...bankInfo, accountName: userBankDetails.account_name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userBankDetails]);

  return (
    <div className={styles.bankInfo}>
      <ToastContainer position="top-center" />
      <p className={styles.importantInfo}>
        Bank account provided must be your salary account
      </p>
      <Row className="mb-4">
        <Col className="mb-4 mb-md-0" sm={12} md={6}>
          <InputField
            type="select"
            nameAttr="bankName"
            label="Bank Name"
            options={bankNames}
            value={bankInfo.bankName}
            changed={(val) => {
              setBankErrors({ ...bankErrors, bankName: null });
              setBankInfo({ ...bankInfo, bankName: val });
            }}
            error={bankErrors.bankName && bankErrors.bankName}
          />
        </Col>
        <Col sm={12} md={6}>
          <InputField
            type="select"
            nameAttr="accountType"
            label="Bank Account Type"
            options={["Savings", "Current"]}
            value={bankInfo.accountType}
            changed={(val) => {
              setBankErrors({ ...bankErrors, accountType: null });
              setBankInfo({ ...bankInfo, accountType: val });
            }}
            error={bankErrors.accountType && bankErrors.accountType}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="mb-4 mb-md-0" sm={12} md={6}>
          <InputField
            type="text"
            nameAttr="acctNumber"
            label="Account Number"
            value={bankInfo.accountNumber}
            changed={(val) => {
              setBankErrors({ ...bankErrors, accountNumber: null });
              setBankInfo({ ...bankInfo, accountNumber: val });
            }}
            error={bankErrors.accountNumber && bankErrors.accountNumber}
          />
        </Col>
        <Col sm={12} md={6}>
          {!bankLoading ? (
            <InputField
              type="type"
              nameAttr="acctName"
              label="Account Name"
              value={bankInfo.accountName}
              disable={true}
              changed={(val) => setBankInfo({ ...bankInfo, accountName: val })}
            />
          ) : (
            <div className={styles.loaderWrapper}>
              <BeatLoader color="#741763" size={10} />
            </div>
          )}
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
          <p className={styles.inputHint}>
            Please provide your 6 months bank statement to us.
          </p>
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
  );
};

export default BankInfoForm;

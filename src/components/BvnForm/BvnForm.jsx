import React, { useState, useContext, useEffect, useMemo } from "react";
import InputField from "../InputField/InputField";
import { Row, Col } from "react-bootstrap";
import styles from "./BvnForm.module.scss";
import { Context as UserContext } from "../../context/UserContext";
import { Context as BankContext } from "../../context/BankCotext";
import Button from "../Button/Button";
import { validateInput } from "../../utils/validateInput";

const BvnForm = ({ submit }) => {
  const [verificationData, setVerificationData] = useState({
    userBvn: "",
    bankName: null,
    accountNumber: "",
  });
  const [verificationError, setVerificationError] = useState({
    userBvn: null,
    bankName: null,
    accountNumber: null,
  });
  const {
    state: { loading },
  } = useContext(UserContext);

  const {
    state: { paystackBanks },
    getPaystackBankList,
  } = useContext(BankContext);

  const bankNames = useMemo(() => {
    return paystackBanks.map((bank) => bank.name);
  }, [paystackBanks]);

  useEffect(() => {
    getPaystackBankList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyCustomer = () => {
    const validated = validateInput(verificationData, setVerificationError);

    let bankCode = paystackBanks.filter(
      (bank) =>
        bank.name.toLowerCase() === verificationData.bankName.toLowerCase()
    )[0].code;

    if (validated) {
      const data = {
        bvn: verificationData.userBvn,
        account_number: verificationData.accountNumber,
        bank_code: bankCode,
      };
      submit(data);
    }
  };

  const handleSubmitWithKeyPress = (e) => {
    if (e.key.toLowerCase() === "enter" || e.code.toLowerCase() === "enter") {
      verifyCustomer();
    }
  };

  return (
    <div className={styles.bvnFormBox}>
      <p>
        Your BVN helps us verify your identity in line with CBN’s
        Know-Your-Customer (KYC) requirements.
      </p>
      <Row className="mb-4">
        <Col>
          <InputField
            label="What's your BVN?"
            nameAttr="bvn"
            type="text"
            value={verificationData.userBvn}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setVerificationError({ ...verificationError, userBvn: null });
              setVerificationData({ ...verificationData, userBvn: val });
            }}
            error={verificationError?.userBvn}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            label="Bank Name"
            nameAttr="bankName"
            type="select"
            options={bankNames}
            value={verificationData.bankName}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setVerificationError({ ...verificationError, bankName: null });
              setVerificationData({ ...verificationData, bankName: val });
            }}
            error={verificationError?.bankName}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            label="Account Number"
            nameAttr="accountNumber"
            type="numbet"
            value={verificationData.accountNumber}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setVerificationError({
                ...verificationError,
                accountNumber: null,
              });
              setVerificationData({ ...verificationData, accountNumber: val });
            }}
            error={verificationError?.accountNumber}
          />
        </Col>
      </Row>
      <Button
        className="mt-4"
        fullWidth
        clicked={verifyCustomer}
        bgColor="#741763"
        size="lg"
        color="#EBEBEB"
        loading={loading}
        disabled={loading}
      >
        Verify
      </Button>
      <p className={styles.extraTip}>
        To get your BVN, <span>Dial *565*0#</span>
      </p>
    </div>
  );
};

export default BvnForm;

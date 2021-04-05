import React, { useEffect, useState } from "react";
import styles from "./LoanCalculator.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import InputField from "../../components/InputField/InputField";
import { Row, Col } from "react-bootstrap";
import Button from "../../components/Button/Button";
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { validateInput } from "../../utils/validateInput";
import { numberWithCommas } from "../../utils/nigeriaStates";
import {
  convertInput,
  stripCommasInNumber,
} from "../../utils/convertInputType";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount/ScrollToTopOnMount";
import { toast, ToastContainer } from "react-toastify";
import pageUrl from "../../routes/pageUrl";

const LoanCalculator = () => {
  const [loanData, setLoanData] = useState({
    proposedAmount: "",
    proposedDuration: null,
    monthlyIncome: "",
    employmentStatus: null,
    proposedMonthyRepayment: "",
  });

  const [inputErrors, setInputError] = useState({
    proposedAmount: null,
    proposedDuration: null,
    monthlyIncome: null,
    employmentStatus: null,
    proposedMonthyRepayment: null,
  });

  const [limitError, setLimitError] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (location.state) {
      setLoanData({ ...loanData, proposedAmount: location.state.loanAmount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const { proposedAmount, proposedDuration, monthlyIncome } = loanData;

  useEffect(() => {
    if ((proposedAmount, proposedDuration, monthlyIncome)) {
      const tenor = Number(proposedDuration);
      let initAmount = stripCommasInNumber(proposedAmount);
      let toRepay;
      for (let i = 0; i < tenor; i++) {
        toRepay = initAmount + initAmount * 0.04;
        initAmount = toRepay;
      }
      const monthlyRepay = toRepay / tenor;
      if (monthlyRepay > 0.33 * Number(stripCommasInNumber(monthlyIncome))) {
        setLimitError(
          "You are not eligible for this amount, kindly enter a lower loan amount"
        );
      } else {
        setLimitError(null);
      }
      setLoanData({
        ...loanData,
        proposedMonthyRepayment: numberWithCommas(Math.floor(monthlyRepay)),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposedAmount, proposedDuration, monthlyIncome]);

  const handleSubmit = () => {
    const validated = validateInput(loanData, setInputError);
    if (validated) {
      if (100000 > stripCommasInNumber(loanData.proposedAmount)) {
        toast.error(
          "The minimum amount of loan that we offer starts at N100,000"
        );
      } else if (loanData.employmentStatus === "unemployed") {
        toast.error(
          "At the moment, our loan facilities are only available for employed individuals"
        );
      } else if (limitError) {
        toast.error(
          "You are not eligible for this amount, kindly enter a lower loan amount"
        );
      } else {
        history.push(pageUrl.SIGNIN_PAGE);
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <ScrollToTopOnMount />
      <NavBar location={url} history={history} />
      <div className={styles.mainSection}>
        <div className={styles.container}>
          <h3>Access Quick Loans of Up to ₦2,000,000</h3>
          <p>Use our loan calculator to get started</p>
          <div className={styles.calculatorBox}>
            <Row className="mb-4">
              <Col>
                <InputField
                  type="text"
                  label="How much do you need?"
                  nameAttr="loanAmt"
                  value={loanData.proposedAmount}
                  changed={(val) => {
                    const {
                      includesAlphabet,
                      convertedToNumber,
                    } = convertInput(val);
                    if (!includesAlphabet) {
                      console.log(val);
                      setLoanData({
                        ...loanData,
                        proposedAmount: convertedToNumber.toLocaleString(),
                      });
                      setInputError({ ...inputErrors, proposedAmount: null });
                    }
                  }}
                  error={
                    inputErrors.proposedAmount && inputErrors.proposedAmount
                  }
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <InputField
                  type="select"
                  label="How long before you pay back? (Months)"
                  nameAttr="proposedDuration"
                  options={[1, 2, 3, 4, 5, 6]}
                  value={loanData.proposedDuration}
                  changed={(val) => {
                    setLoanData({ ...loanData, proposedDuration: val });
                    setInputError({ ...inputErrors, proposedDuration: null });
                  }}
                  error={
                    inputErrors.proposedDuration && inputErrors.proposedDuration
                  }
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <InputField
                  type="text"
                  label="What is your monthly income?"
                  nameAttr="monthlyIncome"
                  value={loanData.monthlyIncome}
                  changed={(val) => {
                    const {
                      includesAlphabet,
                      convertedToNumber,
                    } = convertInput(val);
                    if (!includesAlphabet) {
                      setLoanData({
                        ...loanData,
                        monthlyIncome: convertedToNumber.toLocaleString(),
                      });
                      setInputError({ ...inputErrors, monthlyIncome: null });
                    }
                  }}
                  error={inputErrors.monthlyIncome && inputErrors.monthlyIncome}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <InputField
                  type="select"
                  label="Employment status"
                  options={["Self-Employed", "Unemployed", "Employed"]}
                  nameAttr="employStatus"
                  value={loanData.employmentStatus}
                  changed={(val) => {
                    setLoanData({ ...loanData, employmentStatus: val });
                    setInputError({ ...inputErrors, employmentStatus: null });
                  }}
                  error={
                    inputErrors.employmentStatus && inputErrors.employmentStatus
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  type="text"
                  label="Estimated monthly repayment"
                  nameAttr="proposedRepayment"
                  value={loanData.proposedMonthyRepayment}
                  changed={(val) => {
                    const {
                      includesAlphabet,
                      convertedToNumber,
                    } = convertInput(val);
                    if (!includesAlphabet) {
                      setLoanData({
                        ...loanData,
                        proposedMonthyRepayment: convertedToNumber.toLocaleString(),
                      });
                      setInputError({
                        ...inputErrors,
                        proposedMonthyRepayment: null,
                      });
                    }
                  }}
                  error={
                    inputErrors.proposedMonthyRepayment &&
                    inputErrors.proposedMonthyRepayment
                  }
                />
              </Col>
              {limitError && <p className={styles.limitError}>{limitError}</p>}
            </Row>
            <Button
              className={"mt-5"}
              fullWidth
              clicked={handleSubmit}
              bgColor="#741763"
              size="lg"
              color="#EBEBEB"
              // disabled={loading}
              // loading={loading}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanCalculator;

import React, { useEffect, useState } from "react";
import styles from "./OfferLetterForm.module.scss";
import WhiteLogo from "../../assets/logo-white.png";
import OfferLetterPdf from "./OfferLetter";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Row, Col } from "react-bootstrap";
import Button from "../Button/Button";
import moment from "moment";
import _ from "lodash";
import { numberWithCommas } from "../../utils/nigeriaStates";
import { convertInput } from "../../utils/convertInputType";
import { toast, ToastContainer } from "react-toastify";
import { toWords } from "number-to-words";
import CreditRisk from "../../assets/signatures/credit-risk.jpg";
import Credit from "../../assets/signatures/risk.jpg";

const OfferLetterForm = ({ setState, loanData, saveBlob }) => {
  const [offerFormData, setOfferFormData] = useState({
    date: "",
    fullName: "",
    clientAddress: "",
    loanAmount: null,
    borrowerName: "",
    natureofBusiness: "",
    loanFacility: "",
    loanPurpose: "",
    monthlyRepayment: "",
    repaymentSource: "",
    memoFullName: "",
    memoAddress: "",
    memoName: "",
    memoSign: "",
    totalRepayment: "",
    loanTenure: "",
    repaymentStartDate: "",
  });

  const [formErr, setFormErr] = useState({
    date: true,
    fullName: true,
    clientAddress: true,
    loanAmount: true,
    borrowerName: true,
    natureofBusiness: true,
    loanFacility: true,
    loanPurpose: true,
    monthlyRepayment: true,
    repaymentSource: true,
    memoFullName: true,
    memoAddress: true,
    memoName: true,
    memoSign: true,
    totalRepayment: true,
    loanTenure: true,
    repaymentStartDate: true,
  });

  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    setOfferFormData({
      ...offerFormData,
      date: moment().format("DD-MM-YYYY"),
      fullName: `${_.capitalize(loanData?.client?.firstName)}`,
      clientAddress: loanData?.residence?.street,
      loanAmount: `N${numberWithCommas(
        loanData?.approvedAmount
      )} (${_.startCase(toWords(loanData?.approvedAmount))} Naira Only)`,
      borrowerName: `${_.capitalize(
        loanData?.client?.firstName
      )} ${_.capitalize(loanData?.client?.lastName)}`,
      natureofBusiness: _.startCase(loanData?.employment?.sector),
      loanFacility: numberWithCommas(loanData?.approvedAmount),
      loanPurpose: _.startCase(loanData?.loanPurpose),
      monthlyRepayment: numberWithCommas(loanData?.monthlyRepayment),
      repaymentSource: "Salary",
      loanTenure: loanData.approvedTenure
        ? `${loanData.approvedTenure} month(s)`
        : loanData.paymentPeriod,
      totalRepayment:
        loanData?.calculatedPayBack &&
        numberWithCommas(loanData?.calculatedPayBack),
      repaymentStartDate: loanData?.determinedRepaymentDate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendOffer = () => {
    if (btnState) {
      setState(true);
    } else {
      toast.error("You need to create the Offer PDF letter before sending!");
    }
  };

  const createPdf = () => {
    const toValidateFields = (({
      date,
      fullName,
      clientAddress,
      loanAmount,
      borrowerName,
      natureofBusiness,
      loanFacility,
      loanPurpose,
      monthlyRepayment,
      repaymentSource,
      totalRepayment,
      loanTenure,
      repaymentStartDate,
    }) => ({
      date,
      fullName,
      clientAddress,
      loanAmount,
      borrowerName,
      natureofBusiness,
      loanFacility,
      loanPurpose,
      monthlyRepayment,
      repaymentSource,
      totalRepayment,
      loanTenure,
      repaymentStartDate,
    }))(offerFormData);

    let fieldValidator = {};

    for (const key in toValidateFields) {
      if (!toValidateFields[key] || Number(toValidateFields[key]) === 0) {
        fieldValidator[key] = false;
      } else {
        fieldValidator[key] = true;
      }
    }

    setFormErr(fieldValidator);
    const validatorValues = Object.values(fieldValidator);
    if (!validatorValues.includes(false)) {
      setBtnState(true);
    } else {
      toast.error("You need to fill in all necessary fields");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <img src={WhiteLogo} alt="logo" />
          <hr />
          <div className={styles.approvedDate}>
            <p>Loan Approved</p>
            <div className={styles.dateGroup}>
              <p>Date: </p>
              <input
                className={!formErr?.date ? styles.error : null}
                type="text"
                placeholder="DD/MM/YYYY"
                name="date"
                value={offerFormData.date}
                onChange={(e) => {
                  setFormErr({ ...formErr, date: true });
                  setOfferFormData({
                    ...offerFormData,
                    date: e.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.formBody}>
          <div className={styles.addressGroup}>
            <div className={styles.greet}>
              <p>Dear,</p>
              <input
                type="text"
                name="clientName"
                placeholder="Full Name"
                value={offerFormData.fullName}
                onChange={(e) => {
                  setFormErr({ ...formErr, fullName: true });
                  setOfferFormData({
                    ...offerFormData,
                    fullName: e.currentTarget.value,
                  });
                }}
                className={!formErr?.fullName ? styles.error : null}
              />
            </div>
            <input
              type="text"
              name="clientAddress"
              placeholder="Client Address"
              className={
                !formErr?.clientAddress
                  ? [styles.address, styles.error].join(" ")
                  : styles.address
              }
              value={offerFormData.clientAddress}
              onChange={(e) => {
                setFormErr({ ...formErr, clientAddress: true });
                setOfferFormData({
                  ...offerFormData,
                  clientAddress: e.currentTarget.value,
                });
              }}
            />
          </div>
          <div className={styles.mainContent}>
            <p className={styles.letterHead}>
              OFFER FOR PERSONAL LOAN FACILITY
            </p>
            <p>
              We are pleased to advise that the Management of Gypsy Capital
              Limited has approved the loan facility requested, hence, this
              offer made to you. This letter outlines the major terms and
              conditions under which we are willing to make available to you,
              the sum of
              <span>
                <input
                  type="text"
                  name="additional"
                  style={{ width: "200px", margin: "0 10px" }}
                  placeholder="₦xxx,xxx (Loans amount in words)"
                  value={offerFormData.loanAmount}
                  onChange={(e) => {
                    setFormErr({ ...formErr, loanAmount: true });
                    setOfferFormData({
                      ...offerFormData,
                      loanAmount: e.currentTarget.value,
                    });
                  }}
                  className={!formErr?.loanAmount ? styles.error : null}
                />
              </span>
            </p>
            <div className={styles.loanData}>
              <Row className="mb-4">
                <Col md={4}>
                  <p>Lender:</p>
                </Col>
                <Col md={8}>
                  <p style={{ color: "gray" }}>Gypsy Capital</p>
                </Col>
              </Row>
              <Row className="mb-4 align-items-center">
                <Col md={4}>
                  <p>Borrower:</p>
                </Col>
                <Col md={8}>
                  <input
                    type="text"
                    name="clientname"
                    placeholder="Client Name"
                    value={offerFormData.borrowerName}
                    onChange={(e) => {
                      setFormErr({ ...formErr, borrowerName: true });
                      setOfferFormData({
                        ...offerFormData,
                        borrowerName: e.currentTarget.value,
                      });
                    }}
                    className={!formErr?.borrowerName ? styles.error : null}
                  />
                </Col>
              </Row>
              <Row className="mb-4 align-items-center">
                <Col md={4}>
                  <p>Nature of Business:</p>
                </Col>
                <Col md={8}>
                  <input
                    type="text"
                    name="business"
                    value={offerFormData.natureofBusiness}
                    onChange={(e) => {
                      setFormErr({ ...formErr, natureofBusiness: true });
                      setOfferFormData({
                        ...offerFormData,
                        natureofBusiness: e.currentTarget.value,
                      });
                    }}
                    className={!formErr?.natureofBusiness ? styles.error : null}
                  />
                </Col>
              </Row>
              <Row className="mb-4 align-items-center">
                <Col md={4}>
                  <p>Amount of Loan Facility:</p>
                </Col>
                <Col md={8}>
                  <input
                    type="text"
                    name="loanAmount"
                    value={offerFormData.loanFacility}
                    onChange={(e) => {
                      setFormErr({ ...formErr, loanFacility: true });
                      const {
                        includesAlphabet,
                        convertedToNumber,
                      } = convertInput(e.currentTarget.value);
                      if (!includesAlphabet) {
                        setOfferFormData({
                          ...offerFormData,
                          loanFacility: convertedToNumber.toLocaleString(),
                        });
                      }
                    }}
                    className={!formErr?.loanFacility ? styles.error : null}
                  />
                </Col>
              </Row>
              <Row className="mb-4 align-items-center">
                <Col md={4}>
                  <p>Purpose:</p>
                </Col>
                <Col md={8}>
                  <input
                    type="text"
                    name="purpose"
                    value={offerFormData.loanPurpose}
                    onChange={(e) => {
                      setFormErr({ ...formErr, loanPurpose: true });
                      setOfferFormData({
                        ...offerFormData,
                        loanPurpose: e.currentTarget.value,
                      });
                    }}
                    className={!formErr?.loanPurpose ? styles.error : null}
                  />
                </Col>
              </Row>
              <Row className="mb-4 align-items-center">
                <Col md={4}>
                  <p>Monthly Repayment:</p>
                </Col>
                <Col md={8}>
                  <input
                    type="text"
                    name="monthlyRepay"
                    value={offerFormData.monthlyRepayment}
                    onChange={(e) => {
                      setFormErr({ ...formErr, monthlyRepayment: true });
                      const {
                        includesAlphabet,
                        convertedToNumber,
                      } = convertInput(e.currentTarget.value);
                      if (!includesAlphabet) {
                        setOfferFormData({
                          ...offerFormData,
                          monthlyRepayment: convertedToNumber.toLocaleString(),
                        });
                      }
                    }}
                    className={!formErr?.monthlyRepayment ? styles.error : null}
                  />
                </Col>
              </Row>
              <Row className="mb-4 align-items-center">
                <Col md={4}>
                  <p>Repayment Source/Method:</p>
                </Col>
                <Col md={8}>
                  <input
                    type="text"
                    name="source"
                    value={offerFormData.repaymentSource}
                    onChange={(e) => {
                      setFormErr({ ...formErr, repaymentSource: true });
                      setOfferFormData({
                        ...offerFormData,
                        repaymentSource: e.currentTarget.value,
                      });
                    }}
                    className={!formErr?.repaymentSource ? styles.error : null}
                  />
                </Col>
              </Row>
              <Row className="mb-4 align-items-center">
                <Col md={4}>
                  <p>Total Repayment:</p>
                </Col>
                <Col md={8}>
                  <input
                    type="text"
                    name="totalRepayment"
                    value={offerFormData.totalRepayment}
                    onChange={(e) => {
                      setFormErr({ ...formErr, totalRepayment: true });
                      setOfferFormData({
                        ...offerFormData,
                        totalRepayment: e.currentTarget.value,
                      });
                    }}
                    className={!formErr?.totalRepayment ? styles.error : null}
                  />
                </Col>
              </Row>
              <Row className="mb-4 align-items-center">
                <Col md={4}>
                  <p>Repayment Start Date:</p>
                </Col>
                <Col md={8}>
                  <input
                    type="text"
                    name="repaymentStartDate"
                    value={offerFormData.repaymentStartDate}
                    onChange={(e) => {
                      setFormErr({ ...formErr, repaymentStartDate: true });
                      setOfferFormData({
                        ...offerFormData,
                        repaymentStartDate: e.currentTarget.value,
                      });
                    }}
                    className={
                      !formErr?.repaymentStartDate ? styles.error : null
                    }
                  />
                </Col>
              </Row>
              <Row className="mb-4 align-items-center">
                <Col md={4}>
                  <p>Loan Tenure:</p>
                </Col>
                <Col md={8}>
                  <input
                    type="text"
                    name="loanTenure"
                    value={offerFormData.loanTenure}
                    onChange={(e) => {
                      setFormErr({ ...formErr, loanTenure: true });
                      setOfferFormData({
                        ...offerFormData,
                        loanTenure: e.currentTarget.value,
                      });
                    }}
                    className={!formErr?.loanTenure ? styles.error : null}
                  />
                </Col>
              </Row>
            </div>
            <div className={styles.terms}>
              <p className={styles.title}>TERMS OF THE OFFER:</p>
              <ol>
                <li>
                  Disbursement is subject to the availability of funds and
                  statutory regulations.
                </li>
                <li>
                  The Borrower will reimburse Gypsy Capital Limited on-demand,
                  all expenses (including but not limited to legal and insurance
                  expenses and all taxes Where-so applicable) thereon incurred
                  by Gypsy Capital Limited in Processing this facility and in
                  suing for or recovering any sum due hereunder or otherwise in
                  enforcing or protecting its rights and interests hereunder.
                </li>
                <li>
                  Gypsy Capital reserves the right to refuse and/or withhold
                  disbursement without notice.
                </li>
                <li>
                  The facility is expected to run its full course and there
                  non-cancellable Otherwise a non-cancellable fee shall apply.
                  This fee shall be equivalent to the interest for the month of
                  Cancellation/Pre liquidation and an additional one month.
                </li>
                <li>
                  This Offer is subject to external confirmation and
                  authenticity of all documents submitted for the loan
                  application.
                </li>
                <li>
                  Where any document submitted by the Borrower is found to be
                  ingenuine or unreliable this offer will automatically
                  terminate.
                </li>
              </ol>
            </div>
            <div className={styles.terms}>
              <p className={styles.title}>EVENTS OF DEFAULT:</p>
              <p>
                The occurrence of any of the following shall cause all
                outstanding sums under this facility to become immediately
                repayable:
              </p>
              <ol>
                <li>
                  If the Borrower fails to settle when due, any outstanding
                  amount owed to and advised by Gypsy Capital Limited;
                </li>
                <li>
                  If the Borrower defaults in the performance or the observance
                  of any terms or/and conditions here-above stated;
                </li>
                <li>
                  Where Gypsy Capital Limited gives notice of said
                  breach/default to the borrower and said Breach/default
                  continues and remains unalleviated after (7) days' notice had
                  been given to it; or
                </li>
                <li>
                  Where the repayment of the facility is not discharged as at
                  when due (with reference to the monthly installment payment
                  and other outstanding amounts applicable to the facility),
                  Gypsy Capital Limited has the right to upload customer's data
                  as delinquent on the Credit bureau.
                </li>
                <li>
                  Should any of the rentals remain un-paid, for any reason
                  whatsoever, a penalty equal to 1.67% of the amount of the
                  rental shall be payable for each day of the period that the
                  rental remained unpaid.
                </li>
              </ol>
            </div>
            <div className={styles.terms}>
              <p className={styles.title}>General</p>
              <ol>
                <li>
                  All cheques must be made in the name of Gypsy Capital Limited
                  to the express exclusion of any known staff of the company.
                </li>
                <li>
                  The Borrower hereby irrevocably and unconditionally consents
                  to Gypsy Capital Limited providing any and all information on
                  the Borrower's dealings with it to the credit
                  Bureaus/Registries as it may deem necessary.
                </li>
                <li>
                  Gypsy Capital reserves the right to refuse and/or withhold
                  disbursement without notice.
                </li>
              </ol>
            </div>
            <hr />
            <div className={styles.terms}>
              <p className={styles.title}>Important Notice</p>
              <p>
                Please note that where this offer is not accepted within 7
                (Seven) days, it shall be subjected to review against the
                prevailing market values.
              </p>
              <p>
                We hope that our offer meets your needs. if so, kindly indicate
                your acceptance of the conditions outlined above by executing
                the Memorandum of acceptance attached to this letter.
              </p>
              <p>
                Upon acceptance of this offer, kindly find the Personal Loan
                Agreement attached, for your execution.
              </p>
              <p>We thank you for this opportunity to be of service to you.</p>
            </div>
            <div className={styles.importantNotice}>
              <p>
                **The parties acknowledge and agree that this agreement (offer
                letter) may execute by electronic signature, which shall be
                considered as an original signature for all purposes and shall
                include faxed versions of the parties original signature, copied
                and pasted image of the parties handwritten signature on the
                agreement, parties written name or signature using a stylus,
                keypad or keyboard or electronically scanned and transmitted
                versions (e.g., via pdf) of an original signature.**
              </p>
              <p>For Gypsy Capital</p>
            </div>
            <div className={styles.signatureGroup}>
              <div>
                <p>HEAD, CREDIT</p>
                <div className={styles.signatureWrapper}>
                  <img src={Credit} alt="head of credit signature" />
                </div>
              </div>
              <div>
                <p>HEAD, CREDIT & RISK MANAGEMENT</p>
                <div className={styles.signatureWrapper2}>
                  <img src={CreditRisk} alt="head of credit signature" />
                </div>
              </div>
            </div>
            <div className={styles.memorandum}>
              <p className={styles.title}>Memorandum of Acceptance</p>
              <p style={{ lineHeight: "1.8rem" }}>
                I{" "}
                <span style={{ marginLeft: "10px" }}>
                  <input
                    style={{ width: "250px" }}
                    type="text"
                    name="client"
                    placeholder="Full Name"
                    value={offerFormData.memoFullName}
                    onChange={(e) =>
                      setOfferFormData({
                        ...offerFormData,
                        memoFullName: e.currentTarget.value,
                      })
                    }
                  />
                </span>
                , OF{" "}
                <span style={{ marginLeft: "10px" }}>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address goes here"
                    value={offerFormData.memoAddress}
                    onChange={(e) =>
                      setOfferFormData({
                        ...offerFormData,
                        memoAddress: e.currentTarget.value,
                      })
                    }
                  />
                </span>{" "}
                have read and have fully understood the terms and conditions of
                the offer. Therefore I agree to the terms and conditions of the
                offer and have accordingly affirmed same;
              </p>
              <div className={styles.clientSign}>
                <Row>
                  <Col sm={6}>
                    Name:{" "}
                    <input
                      type="text"
                      name="name"
                      value={offerFormData.memoName}
                      onChange={(e) =>
                        setOfferFormData({
                          ...offerFormData,
                          memoName: e.currentTarget.value,
                        })
                      }
                    />
                  </Col>
                  <Col sm={6}>
                    Signature:{" "}
                    <input
                      type="text"
                      name="name"
                      value={offerFormData.memoSign}
                      onChange={(e) =>
                        setOfferFormData({
                          ...offerFormData,
                          memoSign: e.currentTarget.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.offerBtn}>
        <>
          {btnState ? (
            <PDFDownloadLink
              className={styles.downloadBtn}
              document={<OfferLetterPdf dynamicData={{ ...offerFormData }} />}
              fileName="offerLetter.pdf"
            >
              {({ blob, url, loading, error }) => {
                saveBlob(blob);
                return loading
                  ? "Loading document..."
                  : "Download Offer Letter";
              }}
            </PDFDownloadLink>
          ) : (
            <Button
              clicked={createPdf}
              bgColor="#741763"
              size="lg"
              color="#EBEBEB"
              // disabled={loading}
              // loading={loading}
            >
              Create Offer PDF
            </Button>
          )}
        </>
        <Button
          clicked={sendOffer}
          bgColor="#741763"
          size="lg"
          color="#EBEBEB"
          // disabled={loading}
          // loading={loading}
        >
          Send Offer Letter
        </Button>
      </div>
    </>
  );
};

export default OfferLetterForm;

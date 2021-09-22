import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import styles from "./Registration.module.scss";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import pageUrl from "../../routes/pageUrl";
import { Context as AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount/ScrollToTopOnMount";
import { nigeriaStates } from "../../utils/nigeriaStates";
import axios from "axios";
import queryString from 'query-string';

const Registration = () => {
  const {
    state: { loading, error },
    clearErrors,
  } = useContext(AuthContext);
  const [subResponse, setSubResponse] = useState(null);
  const [loader, setLoader] = useState(false);

  const [signUpValues, setSignUpvalues] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    email: "",
    state: null,
    address: "",
    facilityType: null,
    workPlace: "",
    monthlySalary: "",
    loanAmount: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    state: null,
    address: null,
    facilityType: null,
    workPlace: null,
    monthlySalary: null,
    loanAmount: null,
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const validateInput = () => {
    const validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let validPhoneNumber = /^[0]\d{10}$/;

    const errorsInit = {};
    let fields = { ...signUpValues };

    for (const key in fields) {
      if (!fields[key] && key != "middleName") {
        errorsInit[key] = "This field is required";
      }
      if (fields.email && !fields.email.match(validMail)) {
        errorsInit.email = "Please enter a valid email address";
      }
      if (fields.phoneNumber && !fields.phoneNumber.match(validPhoneNumber)) {
        errorsInit.phoneNumber = "Please enter a valid phone number";
      }
      if (fields.state != "lagos") {
        errorsInit.state = "KINDLY NOTE THAT WE PROCESS LOANS FOR LAGOS ONLY.";
      }
      if (fields.monthlySalary*1 < 70000) {
        errorsInit.monthlySalary = "You do not qualify for our loan facility";
      }
      if (fields.loanAmount*1 < 100000) {
        errorsInit.loanAmount = "Minimum loan facility we offer is #100,000";
      }
    }

    setValidationErrors(errorsInit);

    if (Object.entries(errorsInit).length === 0) {
      return true;
    } else {
      return false;
    }
  };


  async function handleSubmit(e){
    const validated = validateInput();
    const formData = new FormData();
    const config = {
      cors: 'https://cors-anywhere.herokuapp.com/', // <optional> doesn't display the cors error
      formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdLy8ljwQm72Us9fTxS0hBd4pDkxowZ2wtCrRm1nTXV7avtTA/formResponse' 
    };
    formData.append(`entry.238633926`, signUpValues.firstName.trim());
    formData.append(`entry.2068799774`, signUpValues.lastName.trim());
    formData.append(`entry.1111797926`, signUpValues.middleName.trim());
    formData.append(`entry.1978105126`, signUpValues.phoneNumber);
    formData.append(`entry.2037428167`, signUpValues.email);
    formData.append(`entry.1530014370`, signUpValues.state);
    formData.append(`entry.1798565489`, signUpValues.address);
    formData.append(`entry.621766940`, signUpValues.facilityType);
    formData.append(`entry.125048266`, signUpValues.workPlace);
    formData.append(`entry.1753875192`, signUpValues.monthlySalary);
    formData.append(`entry.1278519816`, signUpValues.loanAmount);
    if (validated) {
      e.preventDefault()
      let response;
      setLoader(true);
      await axios({
        url: `${config.cors}${config.formUrl}`,
        method: 'post',
        data: formData,
        crossDomain: true,
        responseType: 'json',
        // dataType: 'jsonp',
      })
      .then(() => {
        setSubResponse("You have successfully indicated your interest in a facility with Gypsy Capital. We will contact you as soon as possible if you are eligible.\n\nYou can reach on using the following:\nEmail: hello@gypsycapital.com\nPhone: tel:+2348099907888\nWhatsApp: wa.me/+2349041444888\n\nThank you.");
        setLoader(false);
        // console.log('response', response);
      })
      .catch(err => {
        // console.log('err', err);
        setSubResponse("You have successfully indicated your interest in a facility with Gypsy Capital. We will contact you as soon as possible if you are eligible.\n\nYou can reach on using the following:\nEmail: hello@gypsycapital.com\nPhone: tel:+2348099907888\nWhatsApp: wa.me/+2349041444888\n\nThank you.");
        setLoader(false);
      })
    }
  };

  const handleSubmitWithKeyPress = (e) => {
    if (e.key.toLowerCase() === "enter" || e.code.toLowerCase() === "enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <ScrollToTopOnMount />
      <div className={styles.container}>
        <Link to={pageUrl.HOMEPAGE}>
          <img src={Logo} alt="Gypsy Logo" />
        </Link>
        <h1>LOAN APPLICATION FORM</h1>
        <p className={styles.subtitle}>
        Kindly use this form to indicate your interest in our loan facility. We will contact you immediate after your application.
        </p>
        <div className={styles.registerBox}>
          <ToastContainer position="top-center" />
          <Row>
            <Col sm={12} lg={4} md={6} className="mb-4 mb-md-0">
              <InputField
                type="text"
                nameAttr="firstName"
                label="First Name"
                value={signUpValues.firstName}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setValidationErrors({ ...validationErrors, firstName: null });
                  setSignUpvalues({ ...signUpValues, firstName: val });
                }}
                error={validationErrors.firstName && validationErrors.firstName}
              />
            </Col>
            <Col sm={12} lg={4} md={6} className="mb-4 mb-md-0">
              <InputField
                type="text"
                nameAttr="lastName"
                label="Last Name"
                value={signUpValues.lastName}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setValidationErrors({ ...validationErrors, lastName: null });
                  setSignUpvalues({ ...signUpValues, lastName: val });
                }}
                error={validationErrors.lastName && validationErrors.lastName}
              />
            </Col>
            <Col sm={12} lg={4} md={6} className="mb-4 mb-md-0">
              <InputField
                type="text"
                nameAttr="middleName"
                label="Middle Name"
                value={signUpValues.middleName}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setSignUpvalues({ ...signUpValues, middleName: val });
                }}
              />
            </Col>
          </Row>
          <Row className="mt-0 mt-md-4">
            <Col sm={12} md={6} className="mb-4 mb-md-0">
              <InputField
                type="email"
                nameAttr="email"
                label="Email"
                value={signUpValues.email}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setValidationErrors({ ...validationErrors, email: null });
                  setSignUpvalues({ ...signUpValues, email: val });
                }}
                error={validationErrors.email && validationErrors.email}
              />
            </Col>
            <Col sm={12} md={6} className="mb-4 mb-md-0">
              <InputField
                type="phone"
                nameAttr="phoneNumber"
                label="Phone Number"
                value={signUpValues.phoneNumber}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setValidationErrors({
                    ...validationErrors,
                    phoneNumber: null,
                  });
                  setSignUpvalues({ ...signUpValues, phoneNumber: val });
                }}
                error={
                  validationErrors.phoneNumber && validationErrors.phoneNumber
                }
              />
            </Col>
          </Row>
          <Row className="mt-0 mt-md-4">
            <Col sm={12} lg={6} md={6} className="mb-4 mb-md-0">
              <InputField
                type="select"
                label="State of residence?"
                options={nigeriaStates}
                nameAttr="state"
                value={signUpValues.state}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setValidationErrors({
                    ...validationErrors,
                    state: null,
                  });
                  setSignUpvalues({ ...signUpValues, state: val });
                }}
                error={
                  validationErrors.state &&
                  validationErrors.state
                }
              />
            </Col>
            <Col sm={12} lg={6} md={6} className="mb-4 mb-md-0">
              <InputField
                type="text"
                nameAttr="address"
                label="Contact Address"
                value={signUpValues.address}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setValidationErrors({ ...validationErrors, address: null });
                  setSignUpvalues({ ...signUpValues, address: val });
                }}
                error={validationErrors.address && validationErrors.address}
              />
            </Col>
          </Row>
          <Row className="mt-0 mt-md-4">
            <Col sm={12} lg={6} md={6} className="mb-4 mb-md-0">
              <InputField
                type="select"
                label="Facility Type"
                options={["Consumer Credit"]}
                nameAttr="facilityType"
                value={signUpValues.facilityType}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setValidationErrors({
                    ...validationErrors,
                    facilityType: null,
                  });
                  setSignUpvalues({ ...signUpValues, facilityType: val });
                }}
                error={
                  validationErrors.facilityType &&
                  validationErrors.facilityType
                }
              />
            </Col>
            <Col sm={12} lg={6} md={6} className="mb-4 mb-md-0">
              <InputField
                type="text"
                nameAttr="workPlace"
                label="Place of Work (Name of Company where you work) "
                value={signUpValues.workPlace}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setValidationErrors({ ...validationErrors, workPlace: null });
                  setSignUpvalues({ ...signUpValues, workPlace: val });
                }}
                error={validationErrors.workPlace && validationErrors.workPlace}
              />
            </Col>
          </Row>
          <Row className="mt-0 mt-md-4">
            <Col sm={12} lg={6} md={6} className="mb-4 mb-md-0">
              <InputField
                type="number"
                nameAttr="monthlySalary"
                label="Monthly Salary"
                value={signUpValues.monthlySalary}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setValidationErrors({ ...validationErrors, monthlySalary: null });
                  setSignUpvalues({ ...signUpValues, monthlySalary: val });
                }}
                error={validationErrors.monthlySalary && validationErrors.monthlySalary}
              />
            </Col>
            <Col sm={12} lg={6} md={6} className="mb-4 mb-md-0">
              <InputField
                type="number"
                nameAttr="loanAmount"
                label="Loan Amount"
                value={signUpValues.loanAmount}
                handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
                changed={(val) => {
                  setValidationErrors({ ...validationErrors, loanAmount: null });
                  setSignUpvalues({ ...signUpValues, loanAmount: val });
                }}
                error={validationErrors.loanAmount && validationErrors.loanAmount}
              />
            </Col>
          </Row>
          <Button
            className={loader ? [styles.loadingBtn, "mt-5"].join(" ") : "mt-5"}
            fullWidth
            clicked={handleSubmit}
            bgColor="#741763"
            size="lg"
            color="#EBEBEB"
            disabled={loader}
            loading={loader}>
            Apply Now
          </Button>
          {subResponse && <div className="text-success">{subResponse}</div>}
          <p className={styles.legalLink}>
            By continuing, you agree to our{" "}
            <Link to={pageUrl.TERMS_CONDITIONS_PAGE}>Terms and Conditions</Link>{" "}
            of service and{" "}
            <Link to={pageUrl.PRIVACY_POLICY_PAGE}>Privacy Policy.</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;

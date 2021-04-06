import React, { useContext, useEffect, useState } from "react";
import styles from "./OtpVerify.module.scss";
import Logo from "../../assets/logo.png";
import { Row, Col } from "react-bootstrap";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useLocation } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [validationErr, setValidationErr] = useState(null);

  const location = useLocation();

  const {
    state: { error, loading, message, user },
    verifyOtp,
    getActiveUser,
    resendOtp,
    clearErrors,
    resetInactiveUserStatus,
    clearMessage,
  } = useContext(AuthContext);

  useEffect(() => {
    resetInactiveUserStatus();
    if (location?.state?.userEmail) {
      sessionStorage.setItem(
        "gypsy-inactive-userEmail",
        JSON.stringify({
          email: location?.state?.userEmail,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      clearMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const handleSubmit = () => {
    if (!otp) {
      setValidationErr("You need to enter your otp to verify your account");
    } else {
      if (location?.state?.userEmail) {
        verifyOtp(otp, location.state.userEmail, getActiveUser);
      } else {
        verifyOtp(otp, user.email, getActiveUser);
      }
    }
  };

  const resendCode = () => {
    if (user) {
      resendOtp(user.email);
    } else if (location?.state?.userEmail) {
      resendOtp(location.state.userEmail);
    } else {
      const inactiveUser = JSON.parse(
        sessionStorage.getItem("gypsy-inactive-userEmail")
      );
      resendOtp(inactiveUser.email);
    }
  };

  return (
    <div className={styles.container}>
      <img src={Logo} alt="Gypsy Logo" />
      <h1>Verify Your Details</h1>
      <p>Please enter the OTP sent to your email to continue</p>
      <div className={styles.verifyBox}>
        <ToastContainer position="top-center" />
        <Row>
          <Col>
            <InputField
              type="text"
              label="One Time Password"
              nameAttr="otp"
              value={otp}
              changed={(val) => {
                setValidationErr(null);
                setOtp(val);
              }}
              error={validationErr && validationErr}
            />
          </Col>
        </Row>
        <Button
          clicked={handleSubmit}
          fullWidth
          className="mt-4"
          bgColor="#741763"
          size="lg"
          color="#EBEBEB"
          disabled={loading}
          loading={loading}
        >
          Verify Code
        </Button>
        <p className={[styles.authLink, "mt-3"].join(" ")}>
          Didn’t receive code? <Link onClick={resendCode}>Resend OTP</Link>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;

import React, { useState } from 'react';
import styles from './OtpVerify.module.scss';
import Logo from '../../assets/logo.png';
import { Row, Col } from 'react-bootstrap';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import pageUrl from '../../routes/pageUrl';
import { Link } from 'react-router-dom';


const OtpVerify = () => {

  const [otp, setOtp] = useState('');

  const handleSubmit = () => {

  }

  return(
    <div className={styles.container}>
      <img src={Logo} alt="Gypsy Logo" />
      <h1>Verify Your Details</h1>
      <p>Please enter the OTP sent to your mobile number to continue</p>
      <div className={styles.verifyBox}>
        <Row>
          <Col>
            <InputField 
              type="text"
              label="One Time Password"
              nameAttr="otp"
              value={otp}
              changed={(val) => setOtp(val)}
            />
          </Col>
        </Row>
        <Button clicked={handleSubmit} fullWidth className="mt-4" bgColor="#741763" size="lg" color="#EBEBEB">
          Verify Code
        </Button>
        <p className={[styles.authLink, 'mt-3'].join(' ')}>
          Didn’t receive code? <Link to={pageUrl.SIGNUP_PAGE}>Resend OTP</Link>
        </p>
      </div>
    </div>
  )
}


export default OtpVerify;
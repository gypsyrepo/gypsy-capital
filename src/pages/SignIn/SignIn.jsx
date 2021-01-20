import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import styles from './SignIn.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import pageUrl from '../../routes/pageUrl';
import { Link } from 'react-router-dom';


const SignIn = () => {

  const [signinValues, setSigninValues] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = () => {
    console.log(signinValues);
  }

  return (
    <div className={styles.container}>
      <img src={Logo} alt="Gypsy Logo" />
      <h1>Login to your account</h1>
      <div className={styles.loginBox}>
        <Row>
          <Col>
            <InputField 
              type="email"
              label="Email"
              nameAttr="email"
              value={signinValues.email}
              changed={(val) => setSigninValues({ ...signinValues, email: val })}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <InputField 
              type="password"
              label="Password"
              nameAttr="password"
              value={signinValues.password}
              changed={(val) => setSigninValues({ ...signinValues, password: val })}
            />
          </Col>
        </Row>
        <p className={styles.resetPassword}>Forgot password?</p>
        <Button clicked={handleSubmit} fullWidth className="mt-4" bgColor="#741763" size="lg" color="#EBEBEB">
          Log In
        </Button>
        <p className={[styles.authLink, 'mt-3'].join(' ')}>
          Don’t have an account? <Link to={pageUrl.SIGNUP_PAGE}>Register</Link>
        </p>
      </div>
    </div>
  );
}


export default SignIn;
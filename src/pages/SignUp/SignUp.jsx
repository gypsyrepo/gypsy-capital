import React from 'react';
import Logo from '../../assets/logo.png';
import InputField from '../../components/InputField/InputField';
import styles from './SignUp.module.scss';
import { Row, Col } from 'react-bootstrap';


const SignUp = () => {
  return (
    <div className={styles.container}>
      <img src={Logo} alt="Gypsy Logo" />
      <h1>Create your account</h1>
      <p className={styles.subtitle}>Hey there, let's setup your Gypsy Capital account</p>
      <div className={styles.registerBox}>
        <Row>
          <Col>
            <InputField type="text" nameAttr="firstName" label="First Name" />
          </Col>
          <Col>
            <InputField type="text" nameAttr="lastName" label="Last Name" />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <InputField type="email" nameAttr="email" label="Email" />
          </Col>
          <Col>
            <InputField type="phone" nameAttr="mobileNo" label="Mobile Number" />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <InputField type="password" nameAttr="password" label="Password" />
          </Col>
          <Col>
            <InputField type="password" nameAttr="confirmPassword" label="Confirm Password" />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <InputField type="select" label="How did you hear about us?" />
          </Col>
        </Row>
      </div>
    </div>
  )
}


export default SignUp;
import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import styles from './SignUp.module.scss';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import pageUrl from '../../routes/pageUrl';


const SignUp = () => {

  const [signUpValues, setSignUpvalues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    referralChoice: ''
  });

  const referralOptions = [
    'Search Engine', 
    'Google Ads', 
    'Email', 
    'Radio', 
    'TV', 
    'Newspaper', 
    'Word of mouth',
    'Facebook',
    'Instagram',
    'Other'
  ]

  const handleSubmit = () => {
    console.log(signUpValues);
  }

  return (
    <div className={styles.container}>
      <img src={Logo} alt="Gypsy Logo" />
      <h1>Create your account</h1>
      <p className={styles.subtitle}>Hey there, let's setup your Gypsy Capital account</p>
      <div className={styles.registerBox}>
        <Row>
          <Col>
            <InputField type="text" 
              nameAttr="firstName" 
              label="First Name" 
              value={signUpValues.firstName} 
              changed={(val) => setSignUpvalues({...signUpValues, firstName: val})}
            />
          </Col>
          <Col>
            <InputField type="text" 
              nameAttr="lastName" 
              label="Last Name" 
              value={signUpValues.lastName}
              changed={(val) => setSignUpvalues({...signUpValues, lastName: val})}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <InputField type="email" 
              nameAttr="email" 
              label="Email" 
              value={signUpValues.email}
              changed={(val) => setSignUpvalues({...signUpValues, email: val})}
            />
          </Col>
          <Col>
            <InputField type="phone" 
              nameAttr="mobileNo" 
              label="Mobile Number" 
              value={signUpValues.mobileNumber}
              changed={(val) => setSignUpvalues({...signUpValues, mobileNumber: val})}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <InputField type="password" 
              nameAttr="password" 
              label="Password" 
              value={signUpValues.password}
              changed={(val) => setSignUpvalues({...signUpValues, password: val})}
            />
          </Col>
          <Col>
            <InputField type="password" 
              nameAttr="confirmPassword" 
              label="Confirm Password" 
              value={signUpValues.confirmPassword}
              changed={(val) => setSignUpvalues({...signUpValues, confirmPassword: val})}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <InputField type="select" 
              label="How did you hear about us?" 
              options={referralOptions} 
              nameAttr="publicity"
              changed={(val) => setSignUpvalues({...signUpValues, referralChoice: val})}
            />
          </Col>
        </Row>
        <Button className="mt-5" fullWidth clicked={handleSubmit} bgColor="#741763" size="lg" color="#EBEBEB">
          Sign Up
        </Button>
        <p className={[styles.authLink, 'mt-3'].join(' ')}>
          Already have an account? <Link to={pageUrl.SIGNIN_PAGE}>Log in</Link>
        </p>
        <p className={styles.legalLink}>
          By continuing, you agree to our <Link to={pageUrl.TERMS_CONDITIONS_PAGE}>Terms and Conditions</Link> of service and <Link to={pageUrl.PRIVACY_POLICY_PAGE}>Privacy Policy.</Link>
        </p>
      </div>
    </div>
  )
}


export default SignUp;
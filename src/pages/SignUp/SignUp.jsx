import React, { useContext, useState } from 'react';
import Logo from '../../assets/logo.png';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import styles from './SignUp.module.scss';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import pageUrl from '../../routes/pageUrl';
import { Context as AuthContext } from '../../context/AuthContext';


const SignUp = () => {

  const { state: { loading, error }, registerUser, getActiveUser } = useContext(AuthContext);

  const [signUpValues, setSignUpvalues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    referralChoice: ''
  });

  const [requestError, setRequestError]

  const [validationErrors, setValidationErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    mobileNumber: null,
    password: null,
    confirmPassword: null,
    referralChoice: null
  })

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

  const validateInput = ({ history }) => {

    const validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let validPhoneNumber = /^[0]\d{10}$/;

    const errorsInit = {};
    let fields = { ...signUpValues }

    for(const key in fields) {
      if(!fields[key]) {
        errorsInit[key] = "This field is required";
      } 
      if(fields.email && !fields.email.match(validMail)) {
        errorsInit.email = "Please enter a valid email address"
      } 
      if(fields.mobileNumber && !fields.mobileNumber.match(validPhoneNumber)) {
        errorsInit.mobileNumber = "Please enter a valid phone number"
      } 
      if(fields.password && fields.password.length < 8) {
        errorsInit.password = "Password must be at least 8 characters";
      }
      if(fields.confirmPassword && fields.confirmPassword !== fields.password) {
        errorsInit.confirmPassword = "Your password does not match"
      }
    }

    setValidationErrors(errorsInit);

    if(Object.entries(errorsInit).length === 0) {
      return true;
    } else {
      return false;
    }

  }

  const handleSubmit = () => {
    console.log(signUpValues);
    const validated = validateInput();
    const signUpData = {
      email: signUpValues.email,
      firstName: signUpValues.firstName,
      lastName: signUpValues.lastName,
      phoneNumber: signUpValues.mobileNumber,
      password: signUpValues.password,
      hearAboutUs: signUpValues.referralChoice,
      city: "Lagos"
    }
    if(validated) {
      // await registerUser(signUpData, getActiveUser);
      history.push(pageUrl.VERIFY_OTP_PAGE);
    }
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
              changed={(val) => {
                setValidationErrors({ ...validationErrors, firstName: null })
                setSignUpvalues({...signUpValues, firstName: val})
              }}
              error={validationErrors.firstName && validationErrors.firstName}
            />
          </Col>
          <Col>
            <InputField type="text" 
              nameAttr="lastName" 
              label="Last Name" 
              value={signUpValues.lastName}
              changed={(val) => {
                setValidationErrors({ ...validationErrors, lastName: null })
                setSignUpvalues({...signUpValues, lastName: val})
              }}
              error={validationErrors.lastName && validationErrors.lastName}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <InputField type="email" 
              nameAttr="email" 
              label="Email" 
              value={signUpValues.email}
              changed={(val) => {
                setValidationErrors({ ...validationErrors, email: null })
                setSignUpvalues({...signUpValues, email: val})
              }}
              error={validationErrors.email && validationErrors.email}
            />
          </Col>
          <Col>
            <InputField type="phone" 
              nameAttr="mobileNo" 
              label="Mobile Number" 
              value={signUpValues.mobileNumber}
              changed={(val) => {
                setValidationErrors({...validationErrors, mobileNumber: null})
                setSignUpvalues({...signUpValues, mobileNumber: val})
              }}
              error={validationErrors.mobileNumber && validationErrors.mobileNumber}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <InputField type="password" 
              nameAttr="password" 
              label="Password" 
              value={signUpValues.password}
              changed={(val) => {
                setValidationErrors({...validationErrors, password: null})
                setSignUpvalues({...signUpValues, password: val})
              }}
              error={validationErrors.password && validationErrors.password}
            />
          </Col>
          <Col>
            <InputField type="password" 
              nameAttr="confirmPassword" 
              label="Confirm Password" 
              value={signUpValues.confirmPassword}
              changed={(val) => {
                setValidationErrors({...validationErrors, confirmPassword: null})
                setSignUpvalues({...signUpValues, confirmPassword: val})
              }}
              error={validationErrors.confirmPassword && validationErrors.confirmPassword}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <InputField type="select" 
              label="How did you hear about us?" 
              options={referralOptions} 
              nameAttr="publicity"
              changed={(val) => {
                setValidationErrors({...validationErrors, referralChoice: null})
                setSignUpvalues({...signUpValues, referralChoice: val})
              }}
              error={validationErrors.referralChoice && validationErrors.referralChoice}
            />
          </Col>
        </Row>
        <Button className="mt-5" fullWidth clicked={handleSubmit} bgColor="#741763" size="lg" color="#EBEBEB">
          { loading ? 'Loading...' : 'Sign Up' }
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
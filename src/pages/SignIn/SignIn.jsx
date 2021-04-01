import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../assets/logo.png';
import styles from './SignIn.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import pageUrl from '../../routes/pageUrl';
import { Link, useHistory } from 'react-router-dom';
import { Context as AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { validateInput } from '../../utils/validateInput';
import useNavigateAfterAuth from '../../hooks/useNavigateAfterAuth';


const SignIn = () => {

  const history = useHistory();

  const { 
      state: { loading, error, redirectInactiveUser }, 
      loginUser, 
      clearErrors 
  } = useContext(AuthContext);

  useEffect(() => {
    if(error) {
      toast.error(error);
      clearErrors();
    }
  }, [error])

  const [signinValues, setSigninValues] = useState({
    email: '',
    password: ''
  });

  const [signinErrors, setSigninErrors] = useState({
    email: null,
    password: null
  });

  const [ signinAndNavigate ] = useNavigateAfterAuth(signinValues.email, signinValues.password);

  const handleSubmit = () => {
    // console.log(signinValues);
    const validated = validateInput(signinValues, setSigninErrors);
    // console.log(validated);
    if(validated) {
      signinAndNavigate(loginUser);
    }
  }

  useEffect(() => {
    if(redirectInactiveUser) {
      history.push('/verify-otp')
    }
  }, [redirectInactiveUser])

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" />
      <Link to={pageUrl.HOMEPAGE}><img src={Logo} alt="Gypsy Logo" /></Link>
      <h1>Login to your account</h1>
      <div className={styles.loginBox}>
        <Row>
          <Col>
            <InputField 
              type="email"
              label="Email"
              nameAttr="email"
              value={signinValues.email}
              changed={(val) => {
                setSigninErrors({ ...signinErrors, email: null })
                setSigninValues({ ...signinValues, email: val })
              }}
              error={signinErrors.email && signinErrors.email}
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
              changed={(val) => {
                setSigninErrors({ ...signinErrors, password: null })
                setSigninValues({ ...signinValues, password: val })
              }}
              error={signinErrors.password && signinErrors.password}
            />
          </Col>
        </Row>
        <p className={styles.resetPassword}>
          <Link to="/password/email">Forgot password?</Link>
        </p>
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
          Login
        </Button>
        <p className={[styles.authLink, 'mt-3'].join(' ')}>
          Don’t have an account? <Link to={pageUrl.SIGNUP_PAGE}>Register</Link>
        </p>
      </div>
    </div>
  );
}


export default SignIn;
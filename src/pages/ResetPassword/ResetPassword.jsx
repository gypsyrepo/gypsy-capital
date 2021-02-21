import React, { useContext, useEffect, useState } from 'react';
import styles from './ResetPassword.module.scss';
import Logo from '../../assets/logo.png';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { Row, Col } from 'react-bootstrap';
import { Context as UserContext } from '../../context/UserContext';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { validateInput } from '../../utils/validateInput';


const ResetPassword = () => {

  const { state: { loading, error }, createNewPassword, clearErrors } = useContext(UserContext);
  const location = useLocation();

  const [resetData, setResetData] = useState({
    otp: '',
    password: '',
    confirmPassword: ''
  });

  const [fieldErrors, setFieldErrors] = useState({
    otp: null,
    password: null,
    confirmPassword: null
  });

  useEffect(() => {
    if(error) {
      toast.error(error);
      clearErrors();
    }
  }, [error])

  const setNewPassword = () => {
    const validated = validateInput(resetData, setFieldErrors);
    console.log(validated);
    if(validated) {
      const data = {
        email: location.state.email,
        code: resetData.otp,
        password: resetData.password
      }

      createNewPassword(data);
    }
  }

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" />
      <img src={Logo} alt="Gypsy Logo" />
      <h1>Reset Password</h1>
      <div className={styles.formBox}>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="text"
              label="Enter OTP"
              nameAttr="email"
              value={resetData.otp}
              changed={(val) => {
                setFieldErrors({ ...fieldErrors, otp: null })
                setResetData({ ...resetData, otp: val })
              }}
              error={fieldErrors.otp && fieldErrors.otp}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="password"
              label="New Password"
              nameAttr="newPassword"
              value={resetData.password}
              changed={(val) => {
                setFieldErrors({ ...fieldErrors, password: null })
                setResetData({ ...resetData, password: val })
              }}
              error={fieldErrors.password && fieldErrors.password}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="password"
              label="Confirm Password"
              nameAttr="confirmPassword"
              value={resetData.confirmPassword}
              changed={(val) => {
                setFieldErrors({ ...fieldErrors, confirmPassword: null })
                setResetData({ ...resetData, confirmPassword: val })
              }}
              error={fieldErrors.confirmPassword && fieldErrors.confirmPassword}
            />
          </Col>
        </Row>
        <Button
          fullWidth 
          className="mt-4" 
          bgColor="#741763" 
          size="lg" 
          color="#EBEBEB"
          clicked={setNewPassword}
          loading={loading}
          disabled={loading}
        >
          Reset Password
        </Button>
      </div>
    </div>
  )
}


export default ResetPassword;
import React, { useContext, useEffect, useState } from 'react';
import styles from './ForgotPassword.module.scss';
import Logo from '../../assets/logo.png';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { Context as UserContext } from '../../context/UserContext';
import { ToastContainer, toast  } from 'react-toastify';


const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const { state: { loading, error }, resetPassword, clearErrors } = useContext(UserContext);

  useEffect(() => {
    if(error) {
      toast.error(error);
      clearErrors();
    }
  }, [error])

  const initiatePasswordReset = () => {
    resetPassword(email);
  }

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" />
      <img src={Logo} alt="Gypsy Logo" />
      <h1>Forgot Password?</h1>
      <p>Enter the email address associated with your account</p>
      <div className={styles.formBox}>
        <InputField 
          type="email"
          label="Email"
          nameAttr="email"
          value={email}
          changed={(val) => setEmail(val)}
        />
        <Button
          fullWidth 
          clicked={initiatePasswordReset}
          className="mt-4" 
          bgColor="#741763" 
          size="lg" 
          color="#EBEBEB"
          loading={loading}
          disabled={loading}
        >
          Reset Password
        </Button>
      </div>
    </div>
  )
}


export default ForgotPassword;
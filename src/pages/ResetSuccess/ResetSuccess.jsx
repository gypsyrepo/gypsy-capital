import React from 'react';
import styles from './ResetSuccess.module.scss';
import Logo from '../../assets/logo.png';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ResetSuccess = () => {
  return (
    <div className={styles.container}>
      <img src={Logo} alt="Gypsy Logo" />
      <div className={styles.formBox}>
        <FaCheckCircle size="4em" color="#741763" />
        <h2>Congratulations!</h2>
        <p>Your password reset was successful</p>
        <Link to="/signin">Login</Link>
      </div>
    </div>
  )
}


export default ResetSuccess;
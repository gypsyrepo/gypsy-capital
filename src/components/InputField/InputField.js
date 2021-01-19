import React, { useRef, useState } from 'react';
import styles from './InputField.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



const InputField = ({ type, label, nameAttr, value, changed }) => {

  const [ passwordVisible, setPasswordVisible ] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <label id={nameAttr} className={styles.label}>{label}</label>
      <div className={styles.inputGroup}>
        { type !== "password" && type !== "select" ?
          <input 
            type={type} 
            name={nameAttr} 
            value={value}
          /> :
          null
        }
        { type === "password" && 
          <input 
            type={ passwordVisible ? "text" : "password"} 
            name={nameAttr}
            value={value}
          />
        }
        {
          type === "select" &&
          <select name="publicity">
            <option value="first">First</option>
            <option value="second">Second</option>
          </select>
        }
        { type === "password" && <FontAwesomeIcon 
          className={styles.passwordToggle} 
          icon={ !passwordVisible ? faEye : faEyeSlash } 
          onClick={togglePasswordVisibility}
        /> }
      </div>
    </>
  );
}


export default InputField;
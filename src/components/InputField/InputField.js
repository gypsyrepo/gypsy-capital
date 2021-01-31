import React, { useState } from 'react';
import styles from './InputField.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



const InputField = ({ type, label, nameAttr, value, changed, options, placeholder, error }) => {

  const [ passwordVisible, setPasswordVisible ] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <label id={nameAttr} className={styles.label}>{label}</label>
      <div className={styles.inputGroup}>
        { type !== "password" && type !== "select" && type !== "textarea" ?
          <input 
            type={type} 
            name={nameAttr} 
            value={value}
            placeholder={placeholder}
            onChange={(e) => changed(e.currentTarget.value)}
          /> :
          null
        }
        { type === "password" && 
          <input 
            type={ passwordVisible ? "text" : "password"} 
            name={nameAttr}
            value={value}
            onChange={(e) => changed(e.currentTarget.value)}
          />
        }
        {
          type === "select" &&
          <select name={nameAttr} onChange={(e) => changed(e.currentTarget.value)}>
            <option value="none" selected disabled hidden>  
              Select... 
            </option>
            { options.map(option => {
              return <option 
                key={typeof option === 'string' ? option.toLowerCase() : option} 
                value={typeof option === 'string' ? option.toLowerCase() : option}
              >
                {option}
              </option>
            })}
          </select>
        }
        {
          type === "textarea" &&
          <textarea 
            value={value}
            onChange={(e) => changed(e.currentTarget.value)}
            name={nameAttr}
            placeholder={placeholder}
          />
        }
        { type === "password" && <FontAwesomeIcon 
          className={styles.passwordToggle} 
          color="#606060"
          icon={ !passwordVisible ? faEye : faEyeSlash } 
          onClick={togglePasswordVisibility}
        /> }
      </div>
      { error && <p className={styles.errorStyle}>{error}</p> }
    </>
  );
}


export default InputField;
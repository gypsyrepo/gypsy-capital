import React, { useState, useContext } from 'react';
import InputField from '../InputField/InputField';
import styles from './BvnForm.module.scss';
import { Context as UserContext } from '../../context/UserContext';
import Button from '../Button/Button';


const BvnForm = ({ submit }) => {
  const [userBvn, setUserBvn] = useState(''); 
  const [inputError, setInputError] = useState(null);
  const { state: { loading } } = useContext(UserContext);

  return (
    <div className={styles.bvnFormBox}>
      <p>Your BVN helps us verify your identity in line with CBN’s Know-Your-Customer (KYC) requirements.</p>
      <InputField 
        label="What's your BVN?" 
        nameAttr="bvn"
        type="text"
        value={userBvn}
        changed={(val) => {
          setInputError(null)
          setUserBvn(val)
        }}  
        error={inputError && inputError}
      />
      <Button 
        className="mt-4" 
        fullWidth 
        clicked={() => userBvn ? submit(userBvn) : setInputError('Your BVN is required to proceed')} 
        bgColor="#741763" 
        size="lg" 
        color="#EBEBEB"
        loading={loading}
        disabled={loading}
      >
        Verify
      </Button>
      <p className={styles.extraTip}>To get your BVN, <span>Dial *565*0#</span></p>
    </div>
  )
}


export default BvnForm;
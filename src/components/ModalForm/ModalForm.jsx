import React, { useContext, useEffect, useState } from 'react';
import styles from './ModalForm.module.scss';
import InputField from '../../components/InputField/InputField';
import { Row, Col, Modal } from 'react-bootstrap';
import Button from '../../components/Button/Button';
import { validateInput } from '../../utils/validateInput';
import { 
  VerifyBvn, 
  PersonalInfo, 
  Residence,
  NextOfKin,
  BankInfo,
  IdentityForm
} from '../../components/AccountSetupModal/AccountSetupModal';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserContext } from '../../context/UserContext';
import { toast, ToastContainer } from 'react-toastify';

const VerifyOtp = ({ submit }) => {

  const { state: { loading } } = useContext(AuthContext);
  const [otp, setOtp] = useState('');

  const submitOtp = () => {
    if(otp) {
      submit(otp);
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Verify OTP</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.otpBody}>
          <Row>
            <Col>
              <InputField 
                type="text"
                nameAttr="otp"
                label="One Time Password"
                value={otp}
                changed={(val) => {
                  setOtp(val)
                }}
              />
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.otpBody}>
        <Button
          fullWidth
          bgColor="#741763" 
          size="lg" 
          clicked={submitOtp}
          color="#EBEBEB"
        >
          Verify
        </Button>
      </Modal.Footer>
    </>
  )
}


const RegisterForm = ({ submit }) => {

  const { state: { loading } } = useContext(AuthContext);

  const emptyState = {
    firstName: null,
    lastName: null,
    email: null,
    phoneNo: null,
    password: null,
    confirmPassword: null,
    referralChoice: null
  };

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    password: '',
    confirmPassword: '',
    referralChoice: ''
  });

  const [registerError, setRegisterError] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phoneNo: null,
    password: null,
    confirmPassword: null,
    referralChoice: null
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

  const { firstName, lastName, email, phoneNo, password, confirmPassword, referralChoice } = registerData;

  const register = () => {
    const validated = validateInput(registerData, setRegisterError);
    console.log(validated);
    if(validated) {
      submit({
        firstName,
        lastName,
        email,
        phoneNumber: phoneNo.replace('0', '234'),
        password,
        hearAboutUs: referralChoice
      });
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Create Account</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalBody}>
          <Row className="mb-4">
            <Col>
              <InputField 
                type="text"
                nameAttr="firstName"
                label="First Name"
                value={firstName}
                changed={(val) => {
                  setRegisterError({ ...registerError, firstName: null })
                  setRegisterData({...registerData, firstName: val})
                }}
                error={registerError.firstName && registerError.firstName}
              />
            </Col>
            <Col>
              <InputField 
                type="text"
                nameAttr="lastName"
                label="Last Name"
                value={lastName}
                changed={(val) => {
                  setRegisterError({ ...registerError, lastName: null })
                  setRegisterData({...registerData, lastName: val})
                }}
                error={registerError.lastName && registerError.lastName}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField 
                type="email"
                nameAttr="email"
                label="Email"
                value={email}
                changed={(val) => {
                  setRegisterError({ ...registerError, email: null })
                  setRegisterData({...registerData, email: val})
                }}
                error={registerError.email && registerError.email}
              />
            </Col>
            <Col>
              <InputField 
                type="text"
                nameAttr="phoneNo"
                label="Mobile Number"
                value={phoneNo}
                changed={(val) => {
                  setRegisterError({ ...registerError, phoneNo: null })
                  setRegisterData({...registerData, phoneNo: val})
                }}
                error={registerError.phoneNo && registerError.phoneNo}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField 
                type="password"
                nameAttr="password"
                label="Password"
                value={password}
                changed={(val) => {
                  setRegisterError({ ...registerError, password: null })
                  setRegisterData({...registerData, password: val})
                }}
                error={registerError.password && registerError.password}
              />
            </Col>
            <Col>
              <InputField 
                type="password"
                nameAttr="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                changed={(val) => {
                  setRegisterError({ ...registerError, confirmPassword: null })
                  setRegisterData({...registerData, confirmPassword: val})
                }}
                error={registerError.confirmPassword && registerError.confirmPassword}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField 
                type="select"
                label="How did you hear about us?"
                options={referralOptions}
                nameAttr="referral"
                value={referralChoice}
                changed={(val) => {
                  setRegisterError({ ...registerError, referralChoice: null })
                  setRegisterData({...registerData, referralChoice: val})
                }}
                error={registerError.referralChoice && registerError.referralChoice}
              />
            </Col>
          </Row>
          <Modal.Footer>
            <Button
              fullWidth
              bgColor="#741763" 
              size="lg" 
              clicked={register}
              color="#EBEBEB"
              loading={loading}
              disabled={loading}
            >
              Sign Up
            </Button>
          </Modal.Footer>
        </div>
      </Modal.Body>
    </>
  )
}


const ModalForm = ({ openState, closeHandler }) => {

  const [stage, setStage] = useState(0);
  const { 
    state: { registerStatus, currentAddedUser, error }, 
    addUserByAgent, 
    verifyOtp,
    getCurrentlyAddedUser,
    clearErrors 
  } = useContext(AuthContext);
  const { state: { setupStage }, verifyBvn } = useContext(UserContext);

  const startUserRegistration = (data) => {
    console.log('works');
    addUserByAgent(data, getCurrentlyAddedUser);
  }

  const verifyUserNo = (otp) => {
    const { email } = currentAddedUser;
    verifyOtp(otp, email, null, true);
  }

  const addBvn = (bvn) => {
    const { user_id } = currentAddedUser;
    verifyBvn(user_id, bvn, null, true);
  }

  useEffect(() => {
    console.log(currentAddedUser)
  }, [currentAddedUser]);

  useEffect(() => {
    if(error) {
      toast.error(error);
      clearErrors();
    }
  }, [error])

  useEffect(() => {
    if(registerStatus === "unverified") {
      setStage(1);
    }
    if(registerStatus === "verified") {
      setStage(2);
    }
  }, [registerStatus])

  useEffect(() => {
    if(setupStage === "bvn_verified") {
      setStage(3);
    }
  }, [setupStage])

  return (
    <>
      <ToastContainer position="top-center" />
      <Modal 
        show={openState}
        size="lg"
        onHide={() => {
          // setRegisterData(emptyState);
          closeHandler();
        }}
      > 
        { stage === 7 && <IdentityForm submit={verifyUserNo} /> }
        { stage === 6 && <BankInfo submit={verifyUserNo} /> }
        { stage === 5 && <NextOfKin submit={verifyUserNo} /> }
        { stage === 4 && <Residence submit={verifyUserNo} /> }
        { stage === 3 && <PersonalInfo submit={verifyUserNo} /> }
        { stage === 2 && <VerifyBvn submit={addBvn} /> }
        { stage === 1 && <VerifyOtp submit={verifyUserNo} /> }
        { stage === 0 && <RegisterForm  submit={startUserRegistration} /> }
      </Modal>
    </>
  )
}


export default ModalForm;
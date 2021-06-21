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
  IdentityForm,
  OnboardSuccess
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
          loading={loading}
          disabled={loading}
        >
          Verify
        </Button>
      </Modal.Footer>
    </>
  )
}


const RegisterForm = ({ submit }) => {

  const { state: { loading } } = useContext(AuthContext);

  // const emptyState = {
  //   firstName: null,
  //   lastName: null,
  //   email: null,
  //   phoneNo: null,
  //   password: null,
  //   confirmPassword: null,
  //   referralChoice: null
  // };

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
  const [infoData, setInfoData] = useState({
    personalInfo: null,
    residenceInfo: null,
    kinInfo: null,
    bankInfo: null
  });
  const { 
    state: { registerStatus, currentAddedUser, error }, 
    addUserByAgent, 
    verifyOtp,
    getCurrentlyAddedUser,
    clearErrors 
  } = useContext(AuthContext);
  const { 
    state: { setupStage, error: userError }, 
    verifyBvn, 
    updatePersonalInfo,
    updateIdentityInfo,
    clearErrors: clearErr
  } = useContext(UserContext);

  const startUserRegistration = (data) => {
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

  const goToResidence = (data) => {
    setInfoData({
      ...infoData,
      personalInfo: data
    });
    setStage(4)
  }

  const goToNextOfKin = (data) => {
    setInfoData({
      ...infoData,
      residenceInfo: data
    });
    setStage(5)
  }

  const goToBankInfo = (data) => {
    setInfoData({
      ...infoData,
      kinInfo: data
    });
    setStage(6)
  }

  const addPersonalInfo = (data) => {
    const { user_id } = currentAddedUser;
    const { personalInfo, residenceInfo, kinInfo } = infoData;
    const reqData = {
      alternativePhoneNumber: personalInfo.altPhone,
      gender: personalInfo.gender,
      residence_street: residenceInfo.street,
      residence_city: residenceInfo.city,
      residence_state: residenceInfo.state,
      nextOfKin_fullName: kinInfo.fullName,
      nextOfKin_relationship: kinInfo.relationship,
      nextOfKin_email: kinInfo.email,
      nextOfKin_phoneNumber: kinInfo.phoneNo,
      nextOfKin_residentialAddress: kinInfo.address,
      bank_name: data.bankName,
      bank_accountType: data.accountType,
      bank_accountNumber: data.accountNumber,
      bank_accountName: data.accountName,
      identity_type: null,
      identity_imageUrl: null,
      identity_profilePhoto: null
    }
    updatePersonalInfo(user_id, reqData, true);
  }

  const addIdentityInfo = (id, passport, type) => {
    const { user_id } = currentAddedUser;
    const data = new FormData();
    data.append('identification', id);
    data.append('passport', passport);
    data.append('identity_type', type)
    updateIdentityInfo(user_id, data, true);
  }


  useEffect(() => {
    if(error) {
      toast.error(error);
      clearErrors();
    }

    return () => {
      clearErrors();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  useEffect(() => {
    if(userError) {
      toast.error(userError);
      clearErr();
    }

    return () => {
      clearErr();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userError])

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
    if(setupStage === "personal_info_added") {
      setStage(7);
    }
    if(setupStage === "identity_added") {
      setStage(8);
    }
  }, [setupStage])

  return (
    <>
      <ToastContainer position="top-center" />
      <Modal 
        show={openState}
        size={ stage === 8 ? "sm" : "lg" }
        onHide={() => {
          // setRegisterData(emptyState);
          setStage(0);
          closeHandler();
        }}
      > 
        { stage === 8 && <OnboardSuccess close={closeHandler} /> }
        { stage === 7 && <IdentityForm submit={addIdentityInfo} /> }
        { stage === 6 && <BankInfo submit={addPersonalInfo} /> }
        { stage === 5 && <NextOfKin submit={goToBankInfo} /> }
        { stage === 4 && <Residence submit={goToNextOfKin} /> }
        { stage === 3 && <PersonalInfo submit={goToResidence} /> }
        { stage === 2 && <VerifyBvn submit={addBvn} /> }
        { stage === 1 && <VerifyOtp submit={verifyUserNo} /> }
        { stage === 0 && <RegisterForm  submit={startUserRegistration} /> }
      </Modal>
    </>
  )
}


export default ModalForm;
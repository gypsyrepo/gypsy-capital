import React, { useState } from 'react';
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

const VerifyOtp = ({ submit }) => {

  const [otp, setOtp] = useState('');

  const submitOtp = () => {
    if(otp) {
      submit();
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
      submit();
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

  const goToNextStage = () => {
    console.log('works');
    setStage(stage + 1);
  }

  return (
    <Modal 
      show={openState}
      size="lg"
      onHide={() => {
        // setRegisterData(emptyState);
        closeHandler();
      }}
    > 
      { stage === 7 && <IdentityForm submit={goToNextStage} /> }
      { stage === 6 && <BankInfo submit={goToNextStage} /> }
      { stage === 5 && <NextOfKin submit={goToNextStage} /> }
      { stage === 4 && <Residence submit={goToNextStage} /> }
      { stage === 3 && <PersonalInfo submit={goToNextStage} /> }
      { stage === 2 && <VerifyBvn submit={goToNextStage} /> }
      { stage === 1 && <VerifyOtp submit={goToNextStage} /> }
      { stage === 0 && <RegisterForm  submit={goToNextStage} /> }
    </Modal>
  )
}


export default ModalForm;
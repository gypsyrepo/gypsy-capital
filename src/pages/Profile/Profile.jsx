import React, { useMemo, useRef, useState } from 'react';
import styles from './Profile.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import pageUrl from '../../routes/pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import { FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { Row, Col } from 'react-bootstrap';
import FileUploadButton from '../../components/FileUploadButton/FileUploadButton';


const Profile = ({ location }) => {

  const stages = {
    0: "bvnVerification",
    1: "personalInformation",
    2: "identity",
    3: "complete"
  }
  const [setupStage, setSetupStage] = useState(0);

  const sidebarRoutes = [
    {
      label: "Dashboard",
      link: pageUrl.DASHBOARD_HOMEPAGE,
      icon: FiLayers
    },
    {
      label: "Consumer Credit",
      link: pageUrl.CONSUMER_CREDIT_PAGE,
      icon: GiTakeMyMoney
    },
    {
      label: "Credit Report",
      link: pageUrl.CREDIT_REPORT_PAGE,
      icon: BiCreditCard
    },
    {
      label: "Profile",
      link: pageUrl.PROFILE_PAGE,
      icon: AiOutlineUser
    },
  ]



  const handleSubmit = () => {
    setSetupStage(setupStage + 1);
  }

  const BvnForm = () => {
    const [userBvn, setUserBvn] = useState(''); 

    return (
      <div className={styles.bvnFormBox}>
        <p>Your BVN helps us verify your identity in line with CBN’s Know-Your-Customer (KYC) requirements.</p>
        <InputField 
          label="What's your BVN?" 
          nameAttr="bvn"
          type="text"
          value={userBvn}
          changed={(val) => setUserBvn(val)}  
        />
        <Button className="mt-4" fullWidth clicked={handleSubmit} bgColor="#741763" size="lg" color="#EBEBEB">
          Verify
        </Button>
        <p className={styles.extraTip}>To get your BVN, <span>Dial *565*0#</span></p>
      </div>
    )
  }

  const PersonalInfoForm = () => {

    const [biodata, setBiodata] = useState({
      fullName: '',
      dateOfBirth: '',
      bvnPhoneNo: '',
      email: '',
      phoneNo: '',
      altPhone: '',
      gender: ''
    });
    const [residentialInfo, setResidentialInfo] = useState({
      street: '',
      city: '',
      state: ''
    });
    const [kinInfo, setKinInfo] = useState({
      fullName: '',
      relationship: '',
      emailAddress: '',
      phoneNo: '',
      address: ''
    });
    const [bankInfo, setBankInfo] = useState({
      bankName: '',
      accountType: '',
      accountNumber: '',
      accountName: ''
    });

    return (
      <div className={styles.personalInfo}>
        <div className={styles.biodata}>
          <h3>Biodata Information</h3>
          <Row className="mb-4">
            <Col>
              <InputField 
                label="Full name"
                type="text"
                nameAttr="fullname"
                value={biodata.fullName}
                changed={(val) => setBiodata({...biodata, fullName: val})}
              />
            </Col>
            <Col>
              <InputField 
                label="Date of Birth"
                type="text"
                nameAttr="dob"
                value={biodata.dateOfBirth}
                changed={(val) => setBiodata({...biodata, dateOfBirth: val})}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField 
                label="BVN-linked Phone Number"
                type="text"
                nameAttr="bvnPhoneNo"
                value={biodata.bvnPhoneNo}
                changed={(val) => setBiodata({...biodata, bvnPhoneNo: val})}
              />
            </Col>
            <Col>
              <InputField 
                label="Email"
                type="email"
                nameAttr="email"
                value={biodata.email}
                changed={(val) => setBiodata({...biodata, email: val})}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField 
                label="Phone Number"
                type="text"
                nameAttr="PhoneNo"
                value={biodata.phoneNo}
                changed={(val) => setBiodata({...biodata, phoneNo: val})}
              />
            </Col>
            <Col>
              <InputField 
                label="Alternative Phone Number"
                type="text"
                nameAttr="altPhoneNo"
                value={biodata.altPhone}
                changed={(val) => setBiodata({ ...biodata, altPhone: val})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField 
                label="Gender"
                type="select"
                options={['Female', 'Male', 'Other']}
                nameAttr="gender"
                value={biodata.gender}
                changed={(val) => setBiodata({...biodata, gender: val})}
              />
            </Col>
          </Row>
        </div>
        <div className={styles.residentialInfo}>
          <h3>Residential Address</h3>
          <Row className="mb-4">
            <Col>
              <InputField 
                label="Street"
                type="text"
                nameAttr="residentStreet"
                value={residentialInfo.street}
                changed={(val) => setResidentialInfo({...residentialInfo, street: val})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField 
                label="City"
                type="text"
                nameAttr="city"
                value={residentialInfo.city}
                changed={(val) => setResidentialInfo({...residentialInfo, city: val})}
              />
            </Col>
            <Col>
              <InputField 
                label="State"
                type="select"
                options={['Oyo', 'Lagos']}
                nameAttr="state"
                value={residentialInfo.state}
                changed={(val) => setResidentialInfo({...residentialInfo, state: val})}
              />
            </Col>
          </Row>
        </div>
        <div className={styles.kinInfo}>
          <h3>Next of Kin Information</h3>
          <Row className="mb-4">
            <Col>
              <InputField 
                label="Full name"
                type="text"
                nameAttr="kinFullname"
                value={kinInfo.fullName}
                changed={(val) => setKinInfo({...kinInfo, fullName: val})}
              />
            </Col>
            <Col>
              <InputField 
                label="Relationship"
                type="text"
                nameAttr="kinRelationship"
                value={kinInfo.relationship}
                changed={(val) => setKinInfo({...kinInfo, relationship: val})}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField 
                label="Email Address"
                type="email"
                nameAttr="kinEmail"
                value={kinInfo.emailAddress}
                changed={(val) => setKinInfo({...kinInfo, emailAddress: val})}
              />
            </Col>
            <Col>
              <InputField 
                label="Phone Number"
                type="text"
                nameAttr="kinPhone"
                value={kinInfo.phoneNo}
                changed={(val) => setKinInfo({...kinInfo, phoneNo: val})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField 
                label="Residential Address"
                type="text"
                nameAttr="kinAddress"
                placeholder="Street address to the nearest bus stop"
                value={kinInfo.address}
                changed={(val) => setKinInfo({...kinInfo, address: val})}
              />
            </Col>
          </Row>
        </div>
        <div className={styles.bankInfo}>
          <h3>Bank Information</h3>
          <p>Please provide a bank account where we can send your investment proceeds or loan requests to.</p>
          <Row className="mb-4">
            <Col>
              <InputField 
                type="text"
                label="Bank"
                nameAttr="bank"
                value={bankInfo.bankName}
                changed={(val) => setBankInfo({...bankInfo, bankName: val})}
              />
            </Col>
            <Col>
              <InputField 
                label="Account Type"
                type="select"
                options={["Savings", "Current"]}
                nameAttr="acountType"
                value={bankInfo.accountType}
                changed={(val) => setBankInfo({...bankInfo, accountType: val})}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField 
                type="text"
                label="Account Number"
                nameAttr="accountNo"
                value={bankInfo.accountNumber}
                changed={(val) => setBankInfo({...bankInfo, accountNumber: val})}
              />
            </Col>
            <Col>
              <InputField 
                label="Account Name"
                type="text"
                nameAttr="accountName"
                value={bankInfo.accountName}
                changed={(val) => setBankInfo({ ...bankInfo, accountName: val })}
              />
            </Col>
          </Row>
        </div>
        <Button className="mt-4" fullWidth clicked={handleSubmit} bgColor="#741763" size="lg" color="#EBEBEB">
          Save & Continue
        </Button>
      </div>
    )
  }

  const IdentityForm = () => {

    const idFileRef = useRef();
    const passportFileRef= useRef();

    const [idType, setIdType] = useState('');

    return (
      <div className={styles.identityForm}>
        <div className={styles.identification}>
          <h3>Identification</h3>
          <p className={styles.validID}>Upload a valid government issued Identification</p>
          <InputField 
            type="select"
            options={['International Passport', "Driver's License", 'Voters Card', 'National Identity Card']}
            nameAttr="identityType"
            value={idType}
            changed={(val) => setIdType(val)}
          />
          <FileUploadButton 
            label="Choose File" 
            icon={<FaCloudUploadAlt className="ml-3" size="1.1em" />}
            id="id-upload" 
            className="mt-3"
            fileRef={idFileRef}
          />
        </div>
        <div className={styles.passportVerify}>
          <h3>Upload passport photograph</h3>
          <p className={styles.passportImg}>Please upload a clear and resent passport photograph.</p>
          <FileUploadButton 
            label="Choose File" 
            icon={<FaCloudUploadAlt className="ml-3" size="1.1em" />}
            id="passport-upload"  
            fileRef={passportFileRef}
          />
        </div>
        <Button className="mt-4" fullWidth clicked={handleSubmit} bgColor="#741763" size="lg" color="#EBEBEB">
          Save & Continue
        </Button>
        <p className={styles.extraTip}>Maximum file size accepted: <span>2mb</span></p>
        <p className={styles.extraTip}>Accepted formats: <span>JPG & PNG</span></p>
      </div>
    )
  }

  const CompleteStage = () => {
    return (
      <div className={styles.stageComplete}>
        <FaCheckCircle size="4em" color="#741763" />
        <h2>Congratulations!</h2>
        <p>Account setup completed.</p>
        <p>Enjoy our amazing loan offer</p>
      </div>
    )
  }

  const resolveStageView = useMemo(() => {
    if(setupStage === 0) {
      return <BvnForm />
    } else if (setupStage === 1) {
      return <PersonalInfoForm />
    } else if(setupStage === 2) {
      return <IdentityForm />
    } else if(setupStage === 3) {
      return <CompleteStage />
    }
  }, [setupStage])

  return(
    <Dashboard sidebarRoutes={sidebarRoutes} location={location}>
      <div className={styles.container}>
        <h1>Account Setup</h1>
        <p className={styles.leadText}>Fill the field to complete your profile</p>
        <ProgressBar stage={setupStage} className={styles.profileProgress} />
        {resolveStageView}
      </div>
    </Dashboard>
  );
}


export default Profile;
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { Context as UserContext } from '../../context/UserContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';


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


const PersonalInfoForm = () => {

  const { state: { user } } = useContext(AuthContext);

  const [biodata, setBiodata] = useState({
    fullName: '',
    dateOfBirth: '',
    bvnPhoneNo: '',
    email: '',
    phoneNo: '',
    altPhone: '',
    gender: ''
  });
  const [biodataErrors, setBiodataErrors] = useState({
    fullName: null,
    dateOfBirth: null,
    bvnPhoneNo: null,
    email: null,
    phoneNo: null,
    altPhone: null,
    gender: null
  });
  const [residentialInfo, setResidentialInfo] = useState({
    street: '',
    city: '',
    state: ''
  });
  const [residentialErrors, setResidentialErrors] = useState({
    street: null,
    city: null,
    state: null
  })
  const [kinInfo, setKinInfo] = useState({
    fullName: '',
    relationship: '',
    emailAddress: '',
    phoneNo: '',
    address: ''
  });
  const [kinErrors, setKinErrors] = useState({
    fullName: null,
    relationship: null,
    emailAddress: null,
    phoneNo: null,
    address: null
  });
  const [bankInfo, setBankInfo] = useState({
    bankName: '',
    accountType: '',
    accountNumber: '',
    accountName: ''
  });
  const [bankInfoErrors, setBankInfoErrors] = useState({
    bankName: null,
    accountType: null,
    accountNumber: null,
    accountName: null
  })


  useEffect(() => {
    if(user) {
      setBiodata({ ...biodata, 
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phoneNo: user.phoneNumber
      })
    }
  }, [user])

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
      <Button className="mt-4" fullWidth bgColor="#741763" size="lg" color="#EBEBEB">
        Save & Continue
      </Button>
    </div>
  )
}


const Profile = ({ location }) => {

  const stages = {
    0: "bvnVerification",
    1: "personalInformation",
    2: "identity",
    3: "complete"
  }
  const [setupStage, setSetupStage] = useState(0);
  const [setupComplete, setSetupComplete] = useState(false);

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

  const { 
    state: { loading, error, bvnVerified }, 
    verifyBvn, 
    clearErrors 
  } = useContext(UserContext);
  const { state: { user }, getActiveUser } = useContext(AuthContext);

  useEffect(() => {
    if(error) {
      toast.error(error);
      clearErrors();
    }
  }, [error])

  useEffect(() => {
    if(bvnVerified) {
      setSetupStage(1);
    }
  }, [bvnVerified])

  const submitBvn = async(bvn) => {
    await verifyBvn(user._id, bvn, getActiveUser);
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
        <Button className="mt-4" fullWidth  bgColor="#741763" size="lg" color="#EBEBEB">
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

  const ProfileView = () => {

    const [visibleSection, setVisibleSection] = useState('personalInfo');

    const goToProfileSection = (section) => {
      console.log('works');
      setVisibleSection(section);
    }

    return (
      <div className={styles.profileBox}>
        <div className={styles.header}>
          <Row>
            <Col 
              onClick={() => goToProfileSection('personalInfo')} 
              className={[styles.borderStyle, styles.tabCol].join(' ')}
            >
              <p 
                className={[styles.tabMenu, visibleSection === "personalInfo" && styles.activeTab1].join(' ')}
              >
                Personal Information
              </p>
            </Col>
            <Col 
              onClick={() => goToProfileSection('security')} 
              className={[styles.borderStyle, styles.tabCol].join(' ')}
            >
              <p
                className={[styles.tabMenu, visibleSection === "security" && styles.activeTab2].join(' ')}
              >
                Security
              </p>
            </Col>
            <Col>
              <p>Payment</p>
            </Col>
          </Row>
        </div>
        <div className={styles.body}>
          {visibleSection === "personalInfo" && <div>
            <Row className="mb-4">
            <Col>
              <InputField 
                label="First Name"
                type="text"
                nameAttr="firstName"
              />
            </Col> 
            <Col>
              <InputField 
                label="Last Name"
                type="text"
                nameAttr="lastName"
              />
            </Col> 
            </Row> 
            <Row className="mb-4">
            <Col>
              <InputField 
                label="Email"
                type="email"
                nameAttr="email"
              />
            </Col> 
            <Col>
              <InputField 
                label="Phone Number"
                type="text"
                nameAttr="phoneNumber"
              />
            </Col> 
            </Row> 
            <Row>
            <Col>
              <InputField 
                label="BVN"
                type="text"
                nameAttr="bvn"
              />
            </Col> 
            <Col>
              <InputField 
                label="Residential Address"
                type="text"
                nameAttr="address"
              />
            </Col> 
            </Row> 
            <Button className="mt-5" fullWidth  bgColor="#741763" size="lg" color="#EBEBEB">
              Edit Info
            </Button>
          </div>}
          { visibleSection === "security" &&
            <div className={styles.security}>
              <h2>CHANGE PASSWORD</h2>
              <Row className="mb-4">
                <Col>
                  <InputField 
                    type="password"
                    label="Current Password"
                    nameAttr="currPassword"
                  />
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <InputField 
                    type="password"
                    label="Current Password"
                    nameAttr="currPassword"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField 
                    type="password"
                    label="Current Password"
                    nameAttr="currPassword"
                  />
                </Col>
              </Row>
            </div>
          }
          { visibleSection === "payment" && 
            <div>

            </div>
          }
        </div>
      </div>
    )
  }

  const resolveStageView = useMemo(() => {
    if(setupStage === 0) {
      return <BvnForm submit={submitBvn} />
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
        <ToastContainer position="top-center" />
        { !setupComplete && <div>
          <h1>Account Setup</h1>
          <p className={styles.leadText}>Fill the field to complete your profile</p>
          <ProgressBar stage={setupStage} className={styles.profileProgress} />
          {resolveStageView}
        </div>}
        { setupComplete &&
          <div>
            <h2>Profile</h2>
            <ProfileView />
          </div> 
        }
      </div>
    </Dashboard>
  );
}


export default Profile;
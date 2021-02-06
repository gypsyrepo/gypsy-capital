import React, { useContext, useEffect, useMemo, useState } from 'react';
import styles from './Profile.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import pageUrl from '../../routes/pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import { FaCheckCircle } from 'react-icons/fa';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { Row, Col } from 'react-bootstrap';
import { Context as UserContext } from '../../context/UserContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import PersonalForm from '../../components/PersonalForm/PersonalForm';
import BvnForm from '../../components/BvnForm/BvnForm';
import IdentityForm from '../../components/IdentityForm/IdentityForm';
import { Context as ProfileStageContext } from '../../context/ProfileStageContext';
import useCloudinary from '../../hooks/useCloudinary';



const Profile = ({ location }) => {

  const { 
    state: { profileStage, userVerifyData }, 
    incrementStage,
    setVerifyData 
  } = useContext(ProfileStageContext);
  const [setupStage, setSetupStage] = useState();
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    setSetupStage(profileStage);
  }, [profileStage])

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
    state: { loading, error, bvnVerified, userDetails }, 
    verifyBvn, 
    clearErrors,
    getClientDetails,
    completeSetup
  } = useContext(UserContext);
  const { state: { user }, getActiveUser } = useContext(AuthContext);

  const [verificationData, setVerificationData] = useState(null);
  
  useEffect(() => {
    // console.log(userVerifyData);
    setVerificationData(userVerifyData);
  }, [userVerifyData]);

  useEffect(() => {
    getClientDetails(user.user_id);
  }, [])

  useEffect(() => {
    if(userDetails) {
      const { bioData, identity } = userDetails;
      if(bioData.BVN && (profileStage < 2 || !profileStage )) {
        incrementStage(1)
      } else if(identity.identityType) {
        incrementStage(3)
      }
    }
  }, [userDetails])

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


  const [ handleUpload ] = useCloudinary();

  const submitBvn = async(bvn) => {
    await verifyBvn(user.user_id, bvn, getActiveUser);
  }


  const submitPersonalInfo = (biodata, residence, kin, bank) => {
    setVerifyData({biodata, residence, kin, bank});
    incrementStage(2)
  }

  
  const submitIdentityInfo = async(idRef, passportRef, idType) => {
    // console.log(idRef, idType, passportRef);
    const { secure_url: idUrl } = await handleUpload(idRef);
    const { secure_url: passportUrl } = await handleUpload(passportRef);
    // console.log(idUrl, passportCloudRef);
    // console.log(userVerifyData);
    const { 
      biodata: { altPhone, gender }, 
      bank: { accountName, accountNumber, accountType, bankName }, 
      kin: { address, email, fullName, phoneNo, relationship }, 
      residence: { city, state, street } 
    } = userVerifyData;
    const data = {
      alternativePhoneNumber: altPhone,
      gender,
      residence_street: street,
      residence_city: city,
      residence_state: state,
      nextOfKin_fullName: fullName,
      nextOfKin_relationship: relationship,
      nextOfKin_email: email,
      nextOfKin_phoneNumber: phoneNo,
      nextOfKin_residentialAddress: address,
      bank_name: bankName,
      bank_accountType: accountType,
      bank_accountNumber: accountNumber,
      bank_accountName: accountName,
      identity_type: idType,
      identity_imageUrl: idUrl,
      identity_profilePhoto: passportUrl
    }

    // console.log(data);
    await completeSetup(user.user_id, data, getClientDetails(user.user_id));
  }


  useEffect(() => {
    console.log(verificationData);
  }, [verificationData])
  

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
      return <PersonalForm submit={submitPersonalInfo} />
    } else if(setupStage === 2) {
      return <IdentityForm submit={submitIdentityInfo} />
    } else if(setupStage === 3) {
      return <CompleteStage />
    }
  }, [setupStage])

  // if(!userDetails && setupStage === 1) {
  //   return null;
  // }

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
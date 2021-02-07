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



const Profile = ({ location }) => {


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
    state: { error, bvnVerified, userDetails, completeState, personalInfoStatus }, 
    verifyBvn, 
    clearErrors,
    getClientDetails,
    updatePersonalInfo,
    updateIdentityInfo
  } = useContext(UserContext);
  const { state: { user }, getActiveUser } = useContext(AuthContext);

  useEffect(() => {
    getClientDetails(user.user_id);
  }, [])

  useEffect(() => {
    if(userDetails) {
      const { bioData, identity, bank } = userDetails;
      if(identity.identityType) {
        setSetupComplete(true);
      } else if(bank.accountName) {
        setSetupStage(2)
      } else if(bioData.BVN) {
        setSetupStage(1)
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


  useEffect(() => {
    if(personalInfoStatus) {
      setSetupStage(2)
    }
  }, [personalInfoStatus])

  useEffect(() => {
    if(completeState) {
      setSetupStage(3)
    }
  }, [completeState])


  const submitBvn = async(bvn) => {
    await verifyBvn(user.user_id, bvn, getActiveUser);
  }


  const submitPersonalInfo = async(biodata, residence, kin, bank) => {
    console.log(biodata, residence, bank, kin);
    const { altPhone, gender } = biodata;
    const { city, state, street } = residence;
    const { accountName, accountNumber, accountType, bankName } = bank;
    const { address, email, fullName, phoneNo, relationship } = kin;

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
      identity_type: null,
      identity_imageUrl: null,
      identity_profilePhoto: null
    }

    await updatePersonalInfo(user.user_id, data)
  }

  
  const submitIdentityInfo = async(idRef, passportRef, idType) => {
    
    console.log(idRef, passportRef, idType);
    const data = new FormData();
    data.append('identification', idRef);
    data.append('passport', passportRef);
    data.append('identity_type', idType)
    await updateIdentityInfo(user.user_id, data);
  }



  const goToProfileView = () => {
    setSetupComplete(true);
  }
  

  const CompleteStage = ({ redirect }) => {

    useEffect(() => {
      setTimeout(() => {
        redirect();
      }, 3000)
    }, [])

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
      return <CompleteStage redirect={goToProfileView} />
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
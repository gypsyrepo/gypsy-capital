import React, { useContext, useEffect, useMemo, useState } from 'react';
import styles from './Profile.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import { clientRoutes } from '../../routes/sidebarRoutes';
import { FaCheckCircle } from 'react-icons/fa';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { Context as UserContext } from '../../context/UserContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import PersonalForm from '../../components/PersonalForm/PersonalForm';
import BvnForm from '../../components/BvnForm/BvnForm';
import IdentityForm from '../../components/IdentityForm/IdentityForm';
import ProfileView from '../../components/ProfileView/ProfileView';
import { useRouteMatch, Link, useLocation } from 'react-router-dom';


const Profile = () => {

  const { url } = useRouteMatch();
  const location = useLocation();
  const [setupStage, setSetupStage] = useState(0);
  const [setupComplete, setSetupComplete] = useState(false);

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
    <Dashboard sidebarRoutes={clientRoutes} location={location}>
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
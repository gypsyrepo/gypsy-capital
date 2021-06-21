import React, { useContext, useEffect } from "react";
import styles from "./Profile.module.scss";
import Dashboard from "../../components/Dashboard/Dashboard";
import { clientRoutes } from "../../routes/sidebarRoutes";
import { FaCheckCircle } from "react-icons/fa";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import PersonalForm from "../../components/PersonalForm/PersonalForm";
import BvnForm from "../../components/BvnForm/BvnForm";
import IdentityForm from "../../components/IdentityForm/IdentityForm";
import ProfileView from "../../components/ProfileView/ProfileView";
import {
  useRouteMatch,
  useLocation,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className={styles.loadingStyle}>
      <Spinner animation="grow" />
    </div>
  );
};

const Profile = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const setupStage = {
    "/dashboard/profile/setup/bvn": 0,
    "/dashboard/profile/setup/info": 1,
    "/dashboard/profile/setup/identity": 2,
    "/dashboard/profile/setup/success": 3,
  };

  const {
    state: { error, userDetails },
    // verifyBvn,
    verifyBvnAlt,
    clearErrors,
    getClientDetails,
    updatePersonalInfo,
    updateIdentityInfo,
  } = useContext(UserContext);

  const {
    state: { user },
    getActiveUser,
  } = useContext(AuthContext);

  useEffect(() => {
    getClientDetails(user.user_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userDetails) {
      const { bioData, identity, bank } = userDetails;
      if (identity.identityType) {
        history.replace("/dashboard/profile/user");
      } else if (bank.accountName) {
        history.replace("/dashboard/profile/setup/identity");
      } else if (bioData.BVN) {
        history.replace("/dashboard/profile/setup/info");
      }
    } else if (!userDetails) {
      history.replace("/dashboard/profile/setup/bvn");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  useEffect(() => {
    if (error) {
      toast.warning(error);
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const submitBvn = async (verifyData) => {
    await verifyBvnAlt(user.user_id, verifyData, getActiveUser);
  };

  const submitPersonalInfo = async (biodata, residence, kin, bank) => {
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
      identity_profilePhoto: null,
    };

    await updatePersonalInfo(user.user_id, data);
  };

  const submitIdentityInfo = async (idRef, passportRef, idType) => {
    const data = new FormData();
    data.append("identification", idRef);
    data.append("passport", passportRef);
    data.append("identity_type", idType);
    await updateIdentityInfo(user.user_id, data);
  };

  const CompleteStage = () => {
    useEffect(() => {
      setTimeout(() => {
        history.push("/dashboard/profile/user");
      }, 3000);
    }, []);

    return (
      <div className={styles.stageComplete}>
        <FaCheckCircle size="3.5em" color="#741763" />
        <h2>Congratulations!</h2>
        <p>Account setup completed.</p>
        <p>Enjoy our amazing loan offer</p>
      </div>
    );
  };

  return (
    <Dashboard sidebarRoutes={clientRoutes} location={location}>
      <div className={styles.container}>
        <ToastContainer position="top-center" />
        {
          <Switch>
            <Route path={`${path}/setup`}>
              <h1>Account Setup</h1>
              <p className={styles.leadText}>
                Fill the field to complete your profile
              </p>
              <ProgressBar
                stage={setupStage[location.pathname]}
                className={styles.profileProgress}
              />
              <Switch>
                <Route path={`${path}/setup/bvn`}>
                  <BvnForm submit={submitBvn} />
                </Route>
                <Route path={`${path}/setup/identity`}>
                  <IdentityForm submit={submitIdentityInfo} />
                </Route>
                <Route path={`${path}/setup/info`}>
                  <PersonalForm submit={submitPersonalInfo} />
                </Route>
                <Route path={`${path}/setup/success`}>
                  <CompleteStage />
                </Route>
              </Switch>
            </Route>
            <Route path={`${path}/user`}>
              {userDetails ? (
                <div>
                  <h2>Profile</h2>
                  <ProfileView />
                </div>
              ) : (
                <Loader />
              )}
            </Route>
          </Switch>
        }
      </div>
    </Dashboard>
  );
};

export default Profile;

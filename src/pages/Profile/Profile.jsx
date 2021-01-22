import React from 'react';
import styles from './Profile.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import pageUrl from '../../routes/pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';


const Profile = ({ location }) => {


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

  }

  return(
    <Dashboard sidebarRoutes={sidebarRoutes} location={location}>
      <div className={styles.container}>
        <h1>Account Setup</h1>
        <p className={styles.leadText}>Fill the field to complete your profile</p>
        <ProgressBar className={styles.profileProgress} />
        <div className={styles.formBox}>
          <p>Your BVN helps us verify your identity in line with CBN’s Know-Your-Customer (KYC) requirements.</p>
          <InputField label="What's your BVN?" />
          <Button className="mt-4" fullWidth clicked={handleSubmit} bgColor="#741763" size="lg" color="#EBEBEB">
          Verify
        </Button>
        </div>
      </div>
    </Dashboard>
  );
}


export default Profile;
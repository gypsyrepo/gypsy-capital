import React, { useContext, useEffect, useState } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './AuthorizerLoanDetails.module.scss';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation, useParams } from 'react-router-dom';
import NavTabs from '../../components/NavTabs/NavTabs';
import { BasicInfo } from '../LoanDetail/LoanDetail';
import { Context as LoanContext } from '../../context/LoanContext';
import { Context as AuthContext } from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';


const AuthorizerLoanDetails = () => {

  const [visibleSection, setVisibleSection] = useState('basic');

  const location = useLocation();
  const authorizerRoutes = routes[3];
  const { loanId } = useParams();

  const { state: { loanDetails }, retrieveLoan } = useContext(LoanContext);
  const { state: { user } } = useContext(AuthContext);

  useEffect(() => {
    retrieveLoan(loanId);
  }, [])

  const navArray = [
    {
      title: "Basic Info",
      shortlink: "basic"
    },
    {
      title: "Decision and Approval",
      shortlink: "decision"
    },
    {
      title: "Repayment Schedule",
      shortlink: "repayment"
    },
    {
      title: "Offer Letter",
      shortlink: "offer"
    }
  ]

  const setActiveTab = (link) => {
    setVisibleSection(link);
  }

  return (
    <Dashboard sidebarRoutes={authorizerRoutes} location={location}>
      <NavTabs navs={navArray} setActive={setActiveTab} currentTab={visibleSection} />
      { loanDetails ? <div className={styles.detailFields}>
        { visibleSection === "basic" && <BasicInfo data={loanDetails ? { 
          client: {...loanDetails.client[0]?.bioData},
          ...loanDetails.loan, dti: loanDetails[0]?.DTI
        } : null } userRole={user.role} /> }
      </div> : <Loader />}
    </Dashboard>
  )
}


export default AuthorizerLoanDetails;
import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './AuthorizerLoanDetails.module.scss';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation } from 'react-router-dom';


const AuthorizerLoanDetails = () => {

  const location = useLocation();
  const authorizerRoutes = routes[3];

  return (
    <Dashboard sidebarRoutes={authorizerRoutes} location={location}>

    </Dashboard>
  )
}


export default AuthorizerLoanDetails;
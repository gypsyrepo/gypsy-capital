import React from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import { routes } from '../../routes/sidebarRoutes';
import styles from './AuthorizerLoans.module.scss';


const AuthorizerLoans = () => {

  const authorizerRoutes = routes[3];
  const location = useLocation();

  return (
    <Dashboard sidebarRoutes={authorizerRoutes} location={location}>

    </Dashboard>
  )
}


export default AuthorizerLoans;
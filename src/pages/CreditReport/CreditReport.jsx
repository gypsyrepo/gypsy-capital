import React from 'react';
import styles from './CreditReport.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import { clientRoutes } from '../../routes/sidebarRoutes';
import { useRouteMatch, Link, useLocation } from 'react-router-dom';


const CreditReport = () => {

  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <Dashboard sidebarRoutes={clientRoutes} location={location}>

    </Dashboard>
  )
}


export default CreditReport;
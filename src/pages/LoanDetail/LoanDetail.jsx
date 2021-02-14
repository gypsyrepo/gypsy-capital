import React from 'react';
import styles from './LoanDetail.module.scss';
import { useLocation } from 'react-router-dom';
import { routes } from '../../routes/sidebarRoutes';
import Dashboard from '../../components/Dashboard/Dashboard';


const LoanDetail = () => {

  const salesRoute = routes[1];
  const location = useLocation();

  return (
    <Dashboard sidebarRoutes={salesRoute} location={location}>
      
    </Dashboard>
  )
}


export default LoanDetail;
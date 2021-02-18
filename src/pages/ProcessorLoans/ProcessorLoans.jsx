import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './ProcessorLoans.module.scss';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation } from 'react-router';


const ProcessorLoans = () => {

  const location = useLocation();
  const processorRoutes = routes[2];

  return (
    <Dashboard sidebarRoutes={processorRoutes} location={location}>

    </Dashboard>
  )
}


export default ProcessorLoans;
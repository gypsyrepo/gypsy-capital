import React from 'react';
import styles from './AuthorizerOverview.module.scss';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';


const AuthorizerOverview = () => {

  

  return (
    <Dashboard sidebarRoutes={} location={}>

    </Dashboard>
	)
}

export default AuthorizerOverview;
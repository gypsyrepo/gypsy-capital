import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import LoanList from '../../components/LoanList/LoanList';
import { routes } from '../../routes/sidebarRoutes';
import styles from './AuthorizerLoans.module.scss';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as LoanContext } from '../../context/LoanContext';
import Loader from '../../components/Loader/Loader';


const AuthorizerLoans = () => {

  const authorizerRoutes = routes[3];
  const location = useLocation();

  const { state: { user } } = useContext(AuthContext);
  const { state: { loading, loans }, retrieveClientLoans } = useContext(LoanContext);

  useEffect(() => {
    retrieveClientLoans();
  }, [])

  return (
    <Dashboard sidebarRoutes={authorizerRoutes} location={location}>
      { !loading ? <LoanList loanList={loans} userRole={user.role} /> : <Loader /> }
    </Dashboard>
  )
}


export default AuthorizerLoans;
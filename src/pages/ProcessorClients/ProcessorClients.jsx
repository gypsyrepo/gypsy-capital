import React, { useEffect, useState, useContext } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './ProcessorClients.module.scss';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation } from 'react-router-dom';
import { Context as UserContext } from '../../context/UserContext';
import ClientList from '../../components/ClientList/ClientList';
import Loader from '../../components/Loader/Loader';

const ProcessorClients = () => {

  const processorRoute = routes[2];
  const location = useLocation();

  const { state: { clientsForRole, loading }, getClientListForRole } = useContext(UserContext);

  useEffect(() => {
    getClientListForRole()
  }, []);

  return (
    <Dashboard sidebarRoutes={processorRoute} location={location}>
      { !loading ? <ClientList clientList={clientsForRole} /> : <Loader /> }
    </Dashboard>
  )
}


export default ProcessorClients;
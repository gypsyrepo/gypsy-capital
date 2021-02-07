import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import { FiLayers } from 'react-icons/fi';
import pageUrl from '../../routes/pageUrl';
import styles from './AgentOverview.module.scss';


const AgentOverview = () => {

  const sidebarRoutes = [
    {
      label: "Dashboard",
      link: pageUrl.SALES_AGENT_OVERVIEW,
      icon: FiLayers
    }
  ]

  return (
    <Dashboard>

    </Dashboard>
  )
}


export default AgentOverview;
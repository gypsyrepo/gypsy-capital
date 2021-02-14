import pageUrl from './pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney, GiMoneyStack } from 'react-icons/gi';
import { FaUser } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { RiUser3Fill } from 'react-icons/ri';


export const clientRoutes = [
  {
      label: "Dashboard",
      link: pageUrl.DASHBOARD_HOMEPAGE,
      rootLink: pageUrl.DASHBOARD_HOMEPAGE,
      icon: FiLayers
    },
    {
      label: "Consumer Credit",
      link: '/dashboard/consumer-credit/history',
      rootLink: pageUrl.CONSUMER_CREDIT_PAGE,
      icon: GiTakeMyMoney
    },
    {
      label: "Credit Report",
      link: pageUrl.CREDIT_REPORT_PAGE,
      rootLink: pageUrl.CREDIT_REPORT_PAGE,
      icon: BiCreditCard
    },
    {
      label: "Profile",
      link: pageUrl.PROFILE_PAGE,
      rootLink: pageUrl.PROFILE_PAGE,
      icon: AiOutlineUser
    },
]


const salesRoutes = [
  {
    label: "Dashboard",
    link: pageUrl.SALES_AGENT_OVERVIEW,
    rootLink: pageUrl.SALES_AGENT_OVERVIEW,
    icon: FiLayers
  },
  {
    label: "Clients",
    link: pageUrl.CLIENT_LIST_PAGE,
    rootLink: '/sales-agent/client',
    icon: FaUser
  },
  {
    label: "Loans",
    link: pageUrl.LOAN_LIST_PAGE,
    rootLink: '/sales-agent/loan',
    icon: GiMoneyStack
  }, 
  {
    label: "Support",
    link: pageUrl.SUPPORT_PAGE,
    rootLink: pageUrl.SUPPORT_PAGE,
    icon: BiSupport
  }
]


export const routes = [
  clientRoutes,
  salesRoutes
]
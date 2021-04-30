import pageUrl from './pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney, GiMoneyStack } from 'react-icons/gi';
import { FaUser, FaUserTie, FaFileAlt } from 'react-icons/fa';
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


const processorRoutes = [
  {
    label: "Dashboard",
    link: pageUrl.PROCESSORS_DASHBOARD,
    rootLink: pageUrl.PROCESSORS_DASHBOARD,
    icon: FiLayers
  },
  {
    label: "Clients",
    link: pageUrl.PROCESSORS_CLIENTS_PAGE,
    rootLink: '/processor/client',
    icon: FaUser
  },
  {
    label: "Loans",
    link: pageUrl.PROCESSORS_LOANS_PAGE,
    rootLink: '/processor/loan',
    icon: GiMoneyStack
  }, 
  {
    label: "Support",
    link: pageUrl.SUPPORT_PAGE,
    rootLink: pageUrl.SUPPORT_PAGE,
    icon: BiSupport
  }
]

const authorizerRoutes = [
  {
    label: "Dashboard",
    link: pageUrl.AUTHORIZER_OVERVIEW,
    rootLink: pageUrl.AUTHORIZER_OVERVIEW,
    icon: FiLayers
  },
  {
    label: "Clients",
    link: pageUrl.AUTHORIZER_CLIENTS,
    rootLink: '/authorizer/client',
    icon: FaUser
  },
  {
    label: "Loans",
    link: pageUrl.AUTHORIZER_LOANS,
    rootLink: '/authorizer/loan',
    icon: GiMoneyStack
  }, 
  {
    label: "Support",
    link: pageUrl.SUPPORT_PAGE,
    rootLink: pageUrl.SUPPORT_PAGE,
    icon: BiSupport
  }
]

const adminRoutes = [
  {
    label: "Dashboard",
    link: pageUrl.ADMIN_OVERVIEW,
    rootLink: pageUrl.ADMIN_OVERVIEW,
    icon: FiLayers
  },
  {
    label: "Clients",
    link: pageUrl.ADMIN_CLIENTS,
    rootLink: '/super-admin/client',
    icon: FaUser
  },
  {
    label: "Loans",
    link: pageUrl.ADMIN_LOANS,
    rootLink: '/super-admin/loan',
    icon: GiMoneyStack
  }, 
  {
    label: "Staff",
    link: `/super-admin/staffs/list`,
    rootLink: pageUrl.ADMIN_STAFF,
    icon: FaUserTie
  },
  {
    label: "Reports",
    link: `/super-admin/reports/loan`,
    rootLink: pageUrl.ADMIN_REPORTS,
    icon: FaFileAlt
  }
]


export const routes = [
  clientRoutes,
  salesRoutes,
  processorRoutes,
  authorizerRoutes,
  adminRoutes
]
import pageUrl from './pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';


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
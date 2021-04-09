import { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import history from '../utils/history';
import pageUrl from '../routes/pageUrl';


// eslint-disable-next-line import/no-anonymous-default-export
export default (email, password) => {
  const { state: { user }, getActiveUser } = useContext(AuthContext);

  useEffect(() => {
    if(user?.role && user.role === "client") {
      history.push(pageUrl.DASHBOARD_HOMEPAGE)
    } else if(user?.role && user.role === "admin") {
      history.push(pageUrl.PROCESSORS_DASHBOARD)
    } else if(user?.role && user.role === "sales") {
      history.push(pageUrl.SALES_AGENT_OVERVIEW)
    } else if(user?.role && user.role === "processor") {
      history.push(pageUrl.PROCESSORS_DASHBOARD)
    } else if(user?.role && user.role === "authorizer") {
      history.push(pageUrl.AUTHORIZER_OVERVIEW) 
    }
  }, [user])

  const signinAndNavigate = (signinFunc) => {
    signinFunc({ email, password }, getActiveUser)
  }

  return [ signinAndNavigate ];
}
import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { Context as AuthContext } from '../../context/AuthContext';
import pageUrl from '../pageUrl';


const AdminRoute = ({component: Component, ...rest}) => {

  const { state: { loggedIn, user } } = useContext(AuthContext);
  const location = useLocation()

  return (
    <Route {...rest}>
      { loggedIn && user.role === "super" ? 
          <Component /> :
          <Redirect to={{ pathname: pageUrl.SIGNIN_PAGE, state: { from: location } }} />
      }
    </Route>
  )
}


export default AdminRoute;
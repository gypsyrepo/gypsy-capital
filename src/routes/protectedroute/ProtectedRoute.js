import React, { useContext } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { Context as AuthContext } from '../../context/AuthContext';
import pageUrl from '../pageUrl';

const renderPage = (Component, props) => {
  return <Route render={() => <Component {...props}/>} />
}


const ProtectedRoute = ({component: Component, history, ...rest}) => {

  const { state: { loggedIn, user } } = useContext(AuthContext);

  console.log(loggedIn);

  return (
    <Route 
      {...rest}
      render={(props) => {
        return loggedIn ? 
          renderPage(Component, props) :
          <Redirect 
            to={{
              pathname: pageUrl.SIGNIN_PAGE,
              state: { from: props.location }
            }}
          />
      }}
    />
  )
}


export default withRouter(ProtectedRoute);
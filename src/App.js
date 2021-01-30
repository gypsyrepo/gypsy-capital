import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import pageUrl from './routes/pageUrl';
import { SignUp, SignIn, Profile, CreditReport, Overview, ConsumerCredit, OtpVerify, HomePage } from './pages/pages';
import { Provider as AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/protectedroute/ProtectedRoute';
import history from './utils/history';



const RouteManager = () =>  {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path={pageUrl.HOMEPAGE} component={HomePage} />
        <Route path={pageUrl.SIGNUP_PAGE} component={SignUp} />
        <Route path={pageUrl.SIGNIN_PAGE} component={SignIn} />
        <Route path={pageUrl.VERIFY_OTP_PAGE} component={OtpVerify} />
        <ProtectedRoute path={pageUrl.PROFILE_PAGE} component={Profile} />
        <ProtectedRoute path={pageUrl.CREDIT_REPORT_PAGE} component={CreditReport} />
        <ProtectedRoute path={pageUrl.DASHBOARD_HOMEPAGE} component={Overview} />
        <ProtectedRoute path={pageUrl.CONSUMER_CREDIT_PAGE} component={ConsumerCredit} />
      </Router>
    </div>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <RouteManager />
    </AuthProvider>
  )
}

export default App;

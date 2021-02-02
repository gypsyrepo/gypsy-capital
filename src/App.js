import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import pageUrl from './routes/pageUrl';
import { SignUp, SignIn, Profile, CreditReport, Overview, ConsumerCredit, OtpVerify, HomePage, Products, AboutUs } from './pages/pages';
import { Provider as AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/protectedroute/ProtectedRoute';
import history from './utils/history';



const RouteManager = () =>  {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path={pageUrl.HOMEPAGE} component={HomePage} />
        <Route exact path={pageUrl.PRODUCTS_PAGE} component={Products} />
        <Route exact path={pageUrl.SIGNUP_PAGE} component={SignUp} />
        <Route exact path={pageUrl.SIGNIN_PAGE} component={SignIn} />
        <Route exact path={pageUrl.VERIFY_OTP_PAGE} component={OtpVerify} />
        <Route exact path={pageUrl.ABOUT_US_PAGE} component={AboutUs} />
        <ProtectedRoute exact path={pageUrl.PROFILE_PAGE} component={Profile} />
        <ProtectedRoute exact path={pageUrl.CREDIT_REPORT_PAGE} component={CreditReport} />
        <ProtectedRoute exact path={pageUrl.DASHBOARD_HOMEPAGE} component={Overview} />
        <ProtectedRoute exact path={pageUrl.CONSUMER_CREDIT_PAGE} component={ConsumerCredit} />
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

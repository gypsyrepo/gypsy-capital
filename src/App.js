import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import pageUrl from './routes/pageUrl';
import { 
  SignUp, 
  SignIn, 
  Profile, 
  CreditReport, 
  Overview, 
  ConsumerCredit, 
  OtpVerify, 
  HomePage, 
  Products, 
  AboutUs, 
  ContactPage,
  LoanCalculator,
  MonoWidget 
} from './pages/pages';
import { Provider as AuthProvider } from './context/AuthContext';
import { Provider as UserProvider } from './context/UserContext';
import { Provider as BankProvider } from './context/BankCotext';
import ProtectedRoute from './routes/protectedroute/ProtectedRoute';
import history from './utils/history';



const RouteManager = () =>  {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path={pageUrl.HOMEPAGE}><HomePage /></Route>
          <Route exact path={pageUrl.PRODUCTS_PAGE}><Products /></Route>
          <Route exact path={pageUrl.SIGNUP_PAGE}><SignUp /></Route>
          <Route exact path={pageUrl.SIGNIN_PAGE}><SignIn /></Route>
          <Route exact path={pageUrl.VERIFY_OTP_PAGE}><OtpVerify /></Route>
          <Route exact path={pageUrl.ABOUT_US_PAGE}><AboutUs /></Route>
          <Route exact path={pageUrl.CONTACT_PAGE}><ContactPage /></Route>
          <Route exact path={pageUrl.MONO_WIDGET_PAGE}><MonoWidget /></Route>
          <Route exact path={pageUrl.LOAN_CALCULATOR_PAGE}><LoanCalculator /></Route>
          <ProtectedRoute exact path={pageUrl.PROFILE_PAGE}><Profile /></ProtectedRoute>
          <ProtectedRoute exact path={pageUrl.CREDIT_REPORT_PAGE}>
            <CreditReport />
          </ProtectedRoute>
          <ProtectedRoute exact path={pageUrl.DASHBOARD_HOMEPAGE}>
            <Overview />
          </ProtectedRoute>
          <ProtectedRoute exact path={pageUrl.CONSUMER_CREDIT_PAGE}>
            <ConsumerCredit />
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <BankProvider>
          <RouteManager />
        </BankProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App;

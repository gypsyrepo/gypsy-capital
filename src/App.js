import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import pageUrl from './routes/pageUrl';
import { SignUp, SignIn, Profile, CreditReport } from './pages/pages';
import { Provider as AuthProvider } from './context/AuthContext';



const RouteManager = () =>  {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={pageUrl.SIGNUP_PAGE} component={SignUp} />
        <Route path={pageUrl.SIGNIN_PAGE} component={SignIn} />
        <Route path={pageUrl.PROFILE_PAGE} component={Profile} />
        <Route path={pageUrl.CREDIT_REPORT_PAGE} component={CreditReport} />
      </BrowserRouter>
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

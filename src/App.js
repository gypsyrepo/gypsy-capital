import "./App.scss";
import { Router, Switch, Route } from "react-router-dom";
import pageUrl from "./routes/pageUrl";
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
  Faqs,
  AgentOverview,
  ClientListPage,
  LoanList,
  Support,
  ClientDetails,
  LoanDetail,
  ProcessorDashboard,
  ProcessorClients,
  ProcessorLoans,
  ForgotPassword,
  ResetPassword,
  ResetSuccess,
  ProcessorClientDetails,
  ProcessorLoanDetails,
  AuthorizerOverview,
  AuthorizerLoans,
  AuthorizerClients,
  AuthorizerClientDetails,
  AuthorizerLoanDetails,
} from "./pages/pages";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as UserProvider } from "./context/UserContext";
import { Provider as BankProvider } from "./context/BankCotext";
import { Provider as LoanProvider } from "./context/LoanContext";
import { Provider as MonoProvider } from "./context/MonoContext";
import { Provider as ApprovalProvider } from "./context/ApprovalContext";
import { Provider as RepaymentProvider } from "./context/RepaymentContext";
import ProtectedRoute from "./routes/protectedroute/ProtectedRoute";
import history from "./utils/history";
import { useEffect } from "react";

const RouteManager = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path={pageUrl.HOMEPAGE}>
            <HomePage />
          </Route>
          <Route path={pageUrl.PRODUCTS_PAGE}>
            <Products />
          </Route>
          <Route exact path={pageUrl.SIGNUP_PAGE}>
            <SignUp />
          </Route>
          <Route exact path={pageUrl.SIGNIN_PAGE}>
            <SignIn />
          </Route>
          <Route exact path={pageUrl.VERIFY_OTP_PAGE}>
            <OtpVerify />
          </Route>
          <Route exact path={pageUrl.ABOUT_US_PAGE}>
            <AboutUs />
          </Route>
          <Route exact path={pageUrl.CONTACT_PAGE}>
            <ContactPage />
          </Route>
          <Route exact path={pageUrl.LOAN_CALCULATOR_PAGE}>
            <LoanCalculator />
          </Route>
          <Route exact path={pageUrl.FAQ_PAGE}>
            <Faqs />
          </Route>
          <Route exact path={pageUrl.FORGOT_PASSWORD_PAGE}>
            <ForgotPassword />
          </Route>
          <Route exact path={pageUrl.RESET_PASSWORD_PAGE}>
            <ResetPassword />
          </Route>
          <Route exact path={pageUrl.RESET_SUCCESS_PAGE}>
            <ResetSuccess />
          </Route>
          <ProtectedRoute path={pageUrl.PROFILE_PAGE} component={Profile} />
          <ProtectedRoute
            exact
            path={pageUrl.CREDIT_REPORT_PAGE}
            component={CreditReport}
          />
          <ProtectedRoute
            exact
            path={pageUrl.DASHBOARD_HOMEPAGE}
            component={Overview}
          />
          <ProtectedRoute
            path={pageUrl.CONSUMER_CREDIT_PAGE}
            component={ConsumerCredit}
          />
          <ProtectedRoute
            path={pageUrl.SALES_AGENT_OVERVIEW}
            component={AgentOverview}
          />
          <ProtectedRoute
            path={pageUrl.CLIENT_LIST_PAGE}
            component={ClientListPage}
          />
          <ProtectedRoute
            path={pageUrl.CLIENT_DETAILS_PAGE}
            component={ClientDetails}
          />
          <ProtectedRoute path={pageUrl.LOAN_LIST_PAGE} component={LoanList} />
          <ProtectedRoute
            path={pageUrl.LOAN_DETAIL_PAGE}
            component={LoanDetail}
          />
          <ProtectedRoute path={pageUrl.SUPPORT_PAGE} component={Support} />
          <ProtectedRoute
            path={pageUrl.PROCESSORS_DASHBOARD}
            component={ProcessorDashboard}
          />
          <ProtectedRoute
            path={pageUrl.PROCESSORS_CLIENTS_PAGE}
            component={ProcessorClients}
          />
          <ProtectedRoute
            path={pageUrl.PROCESSORS_CLIENT_DETAILS}
            component={ProcessorClientDetails}
          />
          <ProtectedRoute
            path={pageUrl.PROCESSORS_LOANS_PAGE}
            component={ProcessorLoans}
          />
          <ProtectedRoute
            path={pageUrl.PROCESSORS_LOAN_DETAILS}
            component={ProcessorLoanDetails}
          />
          <ProtectedRoute
            path={pageUrl.AUTHORIZER_OVERVIEW}
            component={AuthorizerOverview}
          />
          <ProtectedRoute
            path={pageUrl.AUTHORIZER_LOANS}
            component={AuthorizerLoans}
          />
          <ProtectedRoute
            path={pageUrl.AUTHORIZER_CLIENTS}
            component={AuthorizerClients}
          />
          <ProtectedRoute
            path={pageUrl.AUTHORIZER_CLIENT_DETAILS}
            component={AuthorizerClientDetails}
          />
          <ProtectedRoute
            path={pageUrl.AUTHORIZER_LOAN_DETAILS}
            component={AuthorizerLoanDetails}
          />
        </Switch>
      </Router>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apps.elfsight.com/p/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // <script src="https://apps.elfsight.com/p/platform.js" defer></script>
  // <div class="elfsight-app-aed9691f-b1ec-46ce-afe1-7fb09964d129"></div>

  return (
    <>
      <div class="elfsight-app-aed9691f-b1ec-46ce-afe1-7fb09964d129"></div>
      <AuthProvider>
        <UserProvider>
          <BankProvider>
            <LoanProvider>
              <ApprovalProvider>
                <MonoProvider>
                  <RepaymentProvider>
                    <RouteManager />
                  </RepaymentProvider>
                </MonoProvider>
              </ApprovalProvider>
            </LoanProvider>
          </BankProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
};

export default App;

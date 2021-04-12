import React, { useState, useContext, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import styles from "./AuthorizerClientDetails.module.scss";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation, useParams } from "react-router-dom";
import NavTabs from "../../components/NavTabs/NavTabs";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import {
  Biodata,
  NextOfKin,
  Bank,
  Employer,
  ClientLoan,
} from "../ClientDetails/ClientDetails";
import { DocTab } from "../ProcessorClientDetails/ProcessorClientDetails";
import Loader from "../../components/Loader/Loader";

const AuthorizerClientDetails = () => {
  const location = useLocation();
  const authorizerRoutes = routes[3];
  const { clientId } = useParams();

  const [visibleSection, setVisibleSection] = useState("biodata");

  const {
    state: { userDetails },
    getClientDetails,
  } = useContext(UserContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    getClientDetails(clientId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navArray = [
    {
      title: "Biodata",
      shortlink: "biodata",
    },
    {
      title: "Next of Kin Info",
      shortlink: "kin",
    },
    {
      title: "Bank Info",
      shortlink: "bank",
    },
    {
      title: "Employment Info",
      shortlink: "employ",
    },
    {
      title: "Document",
      shortlink: "doc",
    },
    {
      title: "Loans",
      shortlink: "loans",
    },
  ];

  const setActiveTab = (link) => {
    setVisibleSection(link);
  };

  return (
    <Dashboard sidebarRoutes={authorizerRoutes} location={location}>
      <NavTabs
        navs={navArray}
        setActive={setActiveTab}
        currentTab={visibleSection}
      />
      {userDetails ? (
        <div className={visibleSection !== "loans" && styles.detailFields}>
          {visibleSection === "biodata" && (
            <Biodata
              data={
                userDetails && {
                  ...userDetails.bioData,
                  ...userDetails.residence,
                  ...userDetails.identity,
                }
              }
              userRole={user.role}
            />
          )}
          {visibleSection === "kin" && (
            <NextOfKin data={userDetails && { ...userDetails.nextOfKin }} />
          )}
          {visibleSection === "bank" && (
            <Bank data={userDetails && { ...userDetails.bank }} />
          )}
          {visibleSection === "employ" && (
            <Employer
              data={userDetails.employer && { ...userDetails.employer }}
            />
          )}
          {visibleSection === "doc" && <DocTab />}
          {visibleSection === "loans" && (
            <ClientLoan
              userId={userDetails && userDetails.clientId}
              userRole={user.role}
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </Dashboard>
  );
};

export default AuthorizerClientDetails;

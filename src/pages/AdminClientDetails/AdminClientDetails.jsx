import React, { useContext, useEffect, useState } from "react";
import styles from "./AdminClientDetails.module.scss";
import { routes } from "../../routes/sidebarRoutes";
import { useLocation, useParams } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import Loader from "../../components/Loader/Loader";
import NavTabs from "../../components/NavTabs/NavTabs";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import {
  Biodata,
  Bank,
  ClientLoan,
  Employer,
  NextOfKin,
} from "../ClientDetails/ClientDetails";
import { DocTab } from "../ProcessorClientDetails/ProcessorClientDetails";

const AdminClientDetails = () => {
  const adminRoutes = routes[4];
  const location = useLocation();
  const { clientId } = useParams();

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

  const [visibleSection, setVisibleSection] = useState("biodata");

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
    <Dashboard sidebarRoutes={adminRoutes} location={location}>
      <NavTabs
        currentTab={visibleSection}
        navs={navArray}
        setActive={setActiveTab}
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
            <Bank
              data={userDetails && { ...userDetails.bank }}
              userId={clientId}
            />
          )}
          {visibleSection === "employ" && (
            <Employer
              data={userDetails?.employer && { ...userDetails.employer }}
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

export default AdminClientDetails;

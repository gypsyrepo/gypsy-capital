import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { routes } from "../../routes/sidebarRoutes";
import Dashboard from "../../components/Dashboard/Dashboard";
import styles from "./ProcessorClientDetails.module.scss";
import NavTabs from "../../components/NavTabs/NavTabs";
import {
  Biodata,
  NextOfKin,
  Bank,
  Employer,
  ClientLoan,
} from "../ClientDetails/ClientDetails";
import { Row, Col } from "react-bootstrap";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";
import useLoanDetails from "../../hooks/useLoanDetails";
import DocumentModal from "../../components/DocumentModal/DocumentModal";

const DocCard = ({ docTitle, docLink, type }) => {
  const [show, setShow] = useState(false);

  const openDoc = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className={styles.documentCard}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <IoDocumentTextOutline color="#741763" size="5em" />
          <div className={styles.ctrlBtn}>
            <RiDeleteBin5Line size="1.3em" color="#741763" />
            <FiEye size="1.3em" color="#741763" onClick={openDoc} />
          </div>
        </div>
      </div>
      <h4 className={styles.docTitle}>{docTitle}</h4>
      {show && type === "image" && (
        <DocumentModal
          fileTitle={docTitle}
          childComponent={
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img style={{ maxWidth: "100%" }} src={docLink} alt="documents" />
            </div>
          }
          closeModal={handleClose}
        />
      )}
      {show && type === "pdf" && (
        <DocumentModal
          fileTitle={docTitle}
          fileUrl={docLink}
          closeModal={handleClose}
        />
      )}
    </>
  );
};

export const DocTab = ({ userId }) => {
  const [loanDeets] = useLoanDetails(userId);

  console.log(loanDeets);

  return (
    <>
      <Row>
        <Col>
          <DocCard
            docTitle="Identification"
            docLink={loanDeets?.client[0]?.identity?.identityImageUrl}
            type="image"
          />
        </Col>
        <Col>
          <DocCard
            docTitle="Proof of Address"
            docLink={loanDeets?.residence[0]?.residenceProof}
            type="image"
          />
        </Col>
        <Col>
          <DocCard
            docTitle="Official Document"
            docLink={loanDeets?.employment[0]?.officialDocumentUrl}
            type="image"
          />
        </Col>
        <Col>
          <DocCard
            docTitle="Statement of Account"
            docLink={loanDeets?.bank[0]?.accountStatementUrl}
            type="pdf"
          />
        </Col>
      </Row>
    </>
  );
};

const ProcessorClientDetails = () => {
  const location = useLocation();
  const processorRoute = routes[2];
  const { clientId } = useParams();
  console.log(clientId);

  const {
    state: { userDetails, loading },
    getClientDetails,
  } = useContext(UserContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    getClientDetails(clientId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userDetails);

  const [detailSection, setDetailSection] = useState("biodata");

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
    setDetailSection(link);
  };

  return (
    <>
      <Dashboard sidebarRoutes={processorRoute} location={location}>
        <NavTabs
          navs={navArray}
          setActive={setActiveTab}
          currentTab={detailSection}
        />
        {!loading ? (
          <div className={detailSection !== "loans" && styles.detailFields}>
            {detailSection === "biodata" && (
              <Biodata
                data={
                  userDetails && {
                    ...userDetails.bioData,
                    ...userDetails.residence,
                    ...userDetails.identity,
                    nextOfKin: { ...userDetails.nextOfKin },
                    bank: { ...userDetails.bank },
                  }
                }
                userId={userDetails?.clientId}
                reloadClients={getClientDetails}
                userRole={user.role}
              />
            )}
            {detailSection === "kin" && (
              <NextOfKin data={userDetails && { ...userDetails.nextOfKin }} />
            )}
            {detailSection === "bank" && (
              <Bank
                data={userDetails && { ...userDetails.bank }}
                userId={clientId}
              />
            )}
            {detailSection === "employ" && (
              <Employer
                data={userDetails?.employer && { ...userDetails.employer }}
              />
            )}
            {detailSection === "doc" && (
              <DocTab userId={userDetails?.clientId} />
            )}
            {detailSection === "loans" && (
              <ClientLoan
                userRole={user.role}
                userId={userDetails && userDetails.clientId}
              />
            )}
          </div>
        ) : (
          <Loader />
        )}
      </Dashboard>
    </>
  );
};

export default ProcessorClientDetails;

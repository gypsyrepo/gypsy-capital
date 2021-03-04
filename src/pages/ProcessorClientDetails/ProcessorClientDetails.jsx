import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { routes } from '../../routes/sidebarRoutes';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './ProcessorClientDetails.module.scss';
import NavTabs from '../../components/NavTabs/NavTabs';
import { Biodata, NextOfKin, Bank, Employer, ClientLoan } from '../ClientDetails/ClientDetails';
import { Row, Col } from 'react-bootstrap';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FiEye } from 'react-icons/fi';
import { Context as UserContext } from '../../context/UserContext';
import Loader from '../../components/Loader/Loader';


const DocCard = ({ docTitle }) => {
  return (
    <>
      <div className={styles.documentCard}>
        <div style={{ width: "100%", textAlign: "center"}}>
          <IoDocumentTextOutline color="#741763" size="5em" />
          <div className={styles.ctrlBtn}>
            <RiDeleteBin5Line size="1.3em" color="#741763" />
            <FiEye size="1.3em" color="#741763" />
          </div>
        </div>
      </div>
      <h4 className={styles.docTitle}>{docTitle}</h4>
    </>
  )
}

export const DocTab = () => {
  return (
    <>
      <Row>
        <Col>
          <DocCard docTitle="Identification" />
        </Col>
        <Col>
          <DocCard docTitle="Proof of Address" />
        </Col>
        <Col>
          <DocCard docTitle="Official Document" />
        </Col>
        <Col>
          <DocCard docTitle="Statement of Account" />
        </Col>
      </Row>
    </>
  )
}

const ProcessorClientDetails = () => {

  const location = useLocation();
  const processorRoute = routes[2];
  const { clientId } = useParams();
  console.log(clientId);

  const { state: { userDetails, loading }, getClientDetails } = useContext(UserContext);

  useEffect(() => {
    getClientDetails(clientId);
  }, []);

  console.log(userDetails);

  const [detailSection, setDetailSection] = useState('biodata');

  const navArray = [
    {
      title: "Biodata",
      shortlink: "biodata"
    },
    {
      title: "Next of Kin Info",
      shortlink: "kin"
    },
    {
      title: "Bank Info",
      shortlink: "bank"
    },
    {
      title: "Employment Info",
      shortlink: "employ"
    },
    {
      title: "Document",
      shortlink: "doc"
    },
    {
      title: "Loans",
      shortlink: "loans"
    },
  ]

  const setActiveTab = (link) => {
    setDetailSection(link);
  }


  return (
    <>
      <Dashboard sidebarRoutes={processorRoute} location={location}>
        <NavTabs navs={navArray} setActive={setActiveTab} currentTab={detailSection } />
        { !loading ? <div className={detailSection !== "loans" && styles.detailFields}>
          { detailSection === "biodata" && 
            <Biodata 
              data={userDetails && {...userDetails.bioData, ...userDetails.residence}}
            /> 
          }
          { detailSection === "kin" && 
            <NextOfKin 
              data={userDetails && { ...userDetails.nextOfKin }}
            /> 
          }
          { detailSection === "bank" && 
            <Bank 
              data={userDetails && { ...userDetails.bank }}
            /> 
          }
          { detailSection === "employ" && 
            <Employer 
              data={userDetails.employer && { ...userDetails.employer }}
            /> 
          }
          { detailSection === "doc" && <DocTab /> }
          { detailSection === "loans" && 
            <ClientLoan 
              userId={userDetails && userDetails.clientId}
            /> 
          }
        </div> : <Loader />}
      </Dashboard>
    </>
  )
}


export default ProcessorClientDetails;
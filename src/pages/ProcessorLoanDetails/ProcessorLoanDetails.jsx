import React, { useState, useContext, useEffect } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './ProcessorLoanDetails.module.scss';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation, useParams } from 'react-router-dom';
import NavTabs from '../../components/NavTabs/NavTabs';
import { BasicInfo } from '../LoanDetail/LoanDetail';
import { Context as LoanContext } from '../../context/LoanContext';
import { Context as AuthContext } from '../../context/AuthContext';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { Row, Col } from 'react-bootstrap';


const DecisionApproval = () => {
  return (
    <>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="select"
            label="Decision"
            nameAttr="decision"
            options={['Approve', 'Decline']}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Approved Interest Rate"
            nameAttr="interestRate"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Approved Tenure"
            nameAttr="approvedTenure"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Determined Repayment Date"
            nameAttr="repaymentDate"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="textarea"
            label="Decision Reason"
            nameAttr="decisionReason"
          />
        </Col>
      </Row>
      <Button
        className="mt-4" 
        fullWidth 
        // clicked={updateContactInfo} 
        bgColor="#741763" 
        size="lg" 
        color="#EBEBEB"
        // disabled={loading}
        // loading={loading}
      >
        Submit Decision
      </Button>
    </>
  )
}


const ProcessorLoanDetails = () => {

  const location = useLocation();
  const processorRoute = routes[2];
  const { loanId } = useParams();

  const [visibleSection, setVisibleSection] = useState('basic');

  const navArray = [
    {
      title: "Basic Info",
      shortlink: "basic"
    },
    {
      title: "Decision & Approval",
      shortlink: "decision"
    },
    {
      title: "API Services",
      shortlink: "api"
    },
    {
      title: "Repayment Schedule",
      shortlink: "repay"
    },
    {
      title: "Offer Letter",
      shortlink: "offer"
    }
  ]

  const setActiveTab = (link) => {
    setVisibleSection(link);
  }

  const { state: { loanDetails }, retrieveLoan } = useContext(LoanContext);
  const { state: { user } } = useContext(AuthContext);

  useEffect(() => {
    retrieveLoan(loanId)
  }, [])
  
  return(
    <Dashboard sidebarRoutes={processorRoute} location={location}>
      <NavTabs navs={navArray} setActive={setActiveTab} currentTab={visibleSection} />
      <div className={styles.detailFields}>
        { visibleSection === "basic" ? 
          <BasicInfo 
            data={loanDetails ? { 
              client: {...loanDetails.client[0].bioData},
              ...loanDetails.loan
            } : null }
            userRole={user.role}
          /> : null 
        }
        { visibleSection === "decision" ?
          <DecisionApproval /> :
          null
        }
      </div>
    </Dashboard>
  )
}


export default ProcessorLoanDetails;
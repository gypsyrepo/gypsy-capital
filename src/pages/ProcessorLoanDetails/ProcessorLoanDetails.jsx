import React, { useState, useContext, useEffect } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './ProcessorLoanDetails.module.scss';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation, useParams } from 'react-router-dom';
import NavTabs from '../../components/NavTabs/NavTabs';
import { BasicInfo, RepaymentSchedule } from '../LoanDetail/LoanDetail';
import { Context as LoanContext } from '../../context/LoanContext';
import { Context as AuthContext } from '../../context/AuthContext';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { Row, Col, Table } from 'react-bootstrap';


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


const ApiServices = () => {

  const [visible, setVisible] = useState('flutter');

  return (
    <div className={styles.apiBox}>
      <div className={styles.header}>
        <div 
          className={[styles.menuWrapper, visible === 'flutter' && styles.activeLeftMenu].join(' ')}
          onClick={() => setVisible('flutter')}
        >
          <h5>Flutterwave</h5>
        </div>
        <div 
          className={[styles.menuWrapper, visible === 'mono' && styles.activeMidMenu].join(' ')} 
          style={{borderLeft: '1px solid #741763', borderRight: '1px solid #741763'}}
          onClick={() => setVisible('mono')}
        >
          <h5>Mono</h5>
        </div>
        <div 
          className={[styles.menuWrapper, visible === 'remita' && styles.activeRightMenu].join(' ')}
          onClick={() => setVisible('remita')}
        >
          <h5>Remita</h5>
        </div>
      </div>
      <div className={styles.body}>
        { visible === "flutter" && 
          <Button
            className="mt-4" 
            // clicked={updateContactInfo} 
            bgColor="#741763" 
            size="lg" 
            color="#EBEBEB"
            // disabled={loading}
            // loading={loading}
          >
            Create payment plan
          </Button>
        }
        { visible === "mono" && 
          <Row>
            <Col>
              <Button
                className="mt-4" 
                fullWidth 
                // clicked={updateContactInfo} 
                bgColor="#741763" 
                size="sm" 
                color="#EBEBEB"
                // disabled={loading}
                // loading={loading}
              >
                Get Account Statement
              </Button>
            </Col>
            <Col>
              <Button
                className="mt-4" 
                fullWidth 
                // clicked={updateContactInfo} 
                bgColor="#741763" 
                size="sm" 
                color="#EBEBEB"
                // disabled={loading}
                // loading={loading}
              >
                Get Transaction History
              </Button>
            </Col>
            <Col>
              <Button
                className="mt-4" 
                fullWidth 
                // clicked={updateContactInfo} 
                bgColor="#741763" 
                size="sm" 
                color="#EBEBEB"
                // disabled={loading}
                // loading={loading}
              >
                Get Account<br/> Info
              </Button>
            </Col>
          </Row>
        }
        { visible === "remita" && 
          <div className={styles.tableCard}>
            <h3>Mandate Status</h3>
            <Table striped>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Activation Date</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Inactive</td>
                  <td>Null</td>
                  <td>27/04/2021</td>
                  <td>27/08/2021</td>
                </tr>
              </tbody>
            </Table>
            <Button
              className="mt-4" 
              // clicked={updateContactInfo} 
              bgColor="#741763" 
              size="lg" 
              color="#EBEBEB"
            >
              Setup Mandate
            </Button>
          </div>
        }
      </div>
    </div>
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
        { visibleSection === "api" ? 
          <ApiServices /> :
          null
        }
        { visibleSection === "repay" ? 
          <RepaymentSchedule 
            data={ loanDetails ? {
              ...loanDetails.loan,
              payments: loanDetails.payments
            } : null }
          /> : 
          null
        }
      </div>
    </Dashboard>
  )
}


export default ProcessorLoanDetails;
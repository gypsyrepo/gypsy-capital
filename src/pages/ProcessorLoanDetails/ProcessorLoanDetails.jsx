import React, { useState, useContext, useEffect } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './ProcessorLoanDetails.module.scss';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation, useParams } from 'react-router-dom';
import NavTabs from '../../components/NavTabs/NavTabs';
import { BasicInfo, RepaymentSchedule } from '../LoanDetail/LoanDetail';
import { Context as LoanContext } from '../../context/LoanContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as ApprovalContext } from '../../context/ApprovalContext';
import { Context as RepaymentContext } from '../../context/RepaymentContext';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { Row, Col, Table } from 'react-bootstrap';
import OfferLetterPdf from '../../components/OfferLetter/OfferLetter';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import OfferLetterForm from '../../components/OfferLetter/OfferLetterForm';
import ProcessOffer from '../../components/ProcessOffer/ProcessOffer';
import { validateInput } from '../../utils/validateInput';


const DecisionApproval = () => {

  const [approvalData, setApprovalData] = useState({
    decision: '',
    approvedRate: '',
    approvedTenure: '',
    repaymentDate: '',
    decisionReason: ''
  });

  const [approvalErrors, setApprovalErrors] = useState({
    decision: null,
    approvedRate: null,
    approvedTenure: null,
    repaymentDate: null,
    decisionReason: null
  })

  const decideApproval = () => {
    const validated = validateInput(approvalData, setApprovalErrors);
    console.log(validated);
  }

  return (
    <>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="select"
            label="Decision"
            nameAttr="decision"
            options={['Approve', 'Decline']}
            changed={(val) => {
              setApprovalData({...approvalData, decision: val });
              setApprovalErrors({ ...approvalErrors, decision: null })
            }}
            error={approvalErrors.decision && approvalErrors.decision}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Approved Interest Rate"
            nameAttr="interestRate"
            value={approvalData.approvedRate}
            changed={(val) => {
              setApprovalData({...approvalData, approvedRate: val });
              setApprovalErrors({ ...approvalErrors, approvedRate: null })
            }}
            error={approvalErrors.approvedRate && approvalErrors.approvedRate}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Approved Tenure"
            nameAttr="approvedTenure"
            value={approvalData.approvedTenure}
            changed={(val) => {
              setApprovalData({...approvalData, approvedTenure: val });
              setApprovalErrors({ ...approvalErrors, approvedTenure: null })
            }}
            error={approvalErrors.approvedTenure && approvalErrors.approvedTenure}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Determined Repayment Date"
            nameAttr="repaymentDate"
            value={approvalData.repaymentDate}
            changed={(val) => {
              setApprovalData({...approvalData, repaymentDate: val });
              setApprovalErrors({ ...approvalErrors, repaymentDate: null })
            }}
            error={approvalErrors.repaymentDate && approvalErrors.repaymentDate}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="textarea"
            label="Decision Reason"
            nameAttr="decisionReason"
            value={approvalData.decisionReason}
            changed={(val) => {
              setApprovalData({...approvalData, decisionReason: val });
              setApprovalErrors({ ...approvalErrors, decisionReason: null })
            }}
            error={approvalErrors.decisionReason && approvalErrors.decisionReason}
          />
        </Col>
      </Row>
      <Button
        className="mt-4" 
        fullWidth 
        clicked={decideApproval} 
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


const RepaySetup = ({ loanId }) => {

  const { state: { loading }, setupRepayment } = useContext(RepaymentContext);

  const [repayData, setRepayData] = useState({
    repaymentApi: '',
    totalRepay: '',
    tenure: '',
    payday: '',
    startDate: '',
    bankName: '',
    accountNumber: ''
  });

  const [repayError, setRepayError] = useState({
    repaymentApi: null,
    totalRepay: null,
    tenure: null,
    payday: null,
    startDate: null,
    bankName: null,
    accountNumber: null
  });


  const startRepaymentSetup = () => {
    const validated = validateInput(repayData, setRepayError);
    console.log(validated)
    const data = {
      decision: "-",
      approved_interest: "33",
      approved_tenure: repayData.tenure,
      determined_repayment_date: repayData.startDate,
      decision_reason: "-",
      rePaymentAPI: "paystack",
      total_pay: repayData.totalRepay
    }
    if(validated) {
      setupRepayment(loanId, data);
    }
  }

  return (
    <>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="select"
            label="Repayment API"
            nameAttr="repayApi"
            options={["Paystack", "Remita"]}
            changed={(val) => {
              setRepayError({ ...repayError, repaymentApi: null });
              setRepayData({ ...repayData, repaymentApi: val });
            }}
            error={repayError.repaymentApi && repayError.repaymentApi}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Total Repayment"
            nameAttr="totalRepay"
            value={repayData.totalRepay}
            changed={(val) => {
              setRepayError({ ...repayError, totalRepay: null });
              setRepayData({ ...repayData, totalRepay: val });
            }}
            error={repayError.totalRepay && repayError.totalRepay}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Tenure"
            nameAttr="tenure"
            value={repayData.tenure}
            changed={(val) => {
              setRepayError({ ...repayError, tenure: null });
              setRepayData({ ...repayData, tenure: val });
            }}
            error={repayError.tenure && repayError.tenure}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Pay day"
            nameAttr="payday"
            value={repayData.payday}
            changed={(val) => {
              setRepayError({ ...repayError, payday: null });
              setRepayData({ ...repayData, payday: val });
            }}
            error={repayError.payday && repayError.payday}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Repayment Start Date"
            nameAttr="startDate"
            value={repayData.startDate}
            changed={(val) => {
              setRepayError({ ...repayError, startDate: null });
              setRepayData({ ...repayData, startDate: val });
            }}
            error={repayError.startDate && repayError.startDate}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Bank Name"
            nameAttr="bankName"
            value={repayData.bankName}
            changed={(val) => {
              setRepayError({ ...repayError, bankName: null });
              setRepayData({ ...repayData, bankName: val });
            }}
            error={repayError.bankName && repayError.bankName}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Account Number"
            nameAttr="accountNumber"
            value={repayData.accountNumber}
            changed={(val) => {
              setRepayError({ ...repayError, accountNumber: null });
              setRepayData({ ...repayData, accountNumber: val });
            }}
            error={repayError.accountNumber && repayError.accountNumber}
          />
        </Col>
      </Row>
      <Button
        className="mt-4" 
        fullWidth 
        clicked={startRepaymentSetup} 
        bgColor="#741763" 
        size="lg" 
        color="#EBEBEB"
        disabled={loading}
        loading={loading}
      >
        Continue
      </Button>
    </>
  )
}


const MonoTab = () => {
  return (
    <>
      <div className={styles.status}>
        <p>Status: Inactive</p>
      </div>
      <div className={styles.monoContainer}>
        <Row>
          <Col>
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
              Get Account Statement
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
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
              Get Transaction History
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
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
              Get Account Info
            </Button>
          </Col>
        </Row>
      </div>
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
      title: "Repayment Setup",
      shortlink: "setup"
    },
    {
      title: "Repayment Schedule",
      shortlink: "repay"
    },
    {
      title: "Offer Letter",
      shortlink: "offer"
    },
    { 
      title: "Mono",
      shortlink: "mono"
    }
  ]

  const setActiveTab = (link) => {
    setVisibleSection(link);
  }

  const { state: { loanDetails }, retrieveLoan } = useContext(LoanContext);
  const { state: { user } } = useContext(AuthContext);

  useEffect(() => {
    retrieveLoan(loanId);
    // ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
  }, [])
  
  return(
    <Dashboard sidebarRoutes={processorRoute} location={location}>
      <NavTabs navs={navArray} setActive={setActiveTab} currentTab={visibleSection} />
      <div className={styles.detailFields}>
        { visibleSection === "basic" ? 
          <BasicInfo 
            data={loanDetails ? { 
              client: {...loanDetails?.client[0]?.bioData},
              ...loanDetails?.loan
            } : null }
            userRole={user.role}
          /> : null 
        }
        { visibleSection === "decision" ?
          <DecisionApproval /> :
          null
        }
        { visibleSection === "setup" ? 
          <RepaySetup loanId={loanId} /> :
          null
        }
        { visibleSection === "repay" ? 
          <RepaymentSchedule 
            data={ loanDetails ? {
              ...loanDetails?.loan,
              payments: loanDetails?.payments
            } : null }
            userRole={user.role}
          /> : 
          null
        }
        { visibleSection === "offer" ? 
          // <PDFViewer width="100%" height={500}><OfferLetterPdf /></PDFViewer> 
          <ProcessOffer /> :
          null
        }
        { visibleSection === "mono" ? 
          <MonoTab /> :
          null
        }
      </div>
    </Dashboard>
  )
}


export default ProcessorLoanDetails;
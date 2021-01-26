import React, { useEffect, useRef, useState } from 'react';
import pageUrl from '../../routes/pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import styles from './ConsumerCredit.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import Button from '../../components/Button/Button';
import { Table } from 'react-bootstrap';
import noLoan from '../../assets/no-loan.png';
import { Row, Col } from 'react-bootstrap';
import InputField from '../../components/InputField/InputField';
import FileUploadButton from '../../components/FileUploadButton/FileUploadButton';
import { FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';

const ConsumerCredit = ({ location }) => {

  const [applyState, setApplyState] = useState(false);
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [applicationStage, setApplicationStage] = useState(0);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const proofofAddressRef = useRef();
  const officialFileRef = useRef();
  const acctStatementRef = useRef();

  useEffect(() => {
    setDaysOfMonth(fillUpDaysArray);
  }, [])

  const fillUpDaysArray = () => {
    let daysArray = [];
    for(let i=0; i < 31; i++) {
      daysArray.push(i+1)
    }
    return daysArray;
  }

  const sidebarRoutes = [
    {
      label: "Dashboard",
      link: pageUrl.DASHBOARD_HOMEPAGE,
      icon: FiLayers
    },
    {
      label: "Consumer Credit",
      link: pageUrl.CONSUMER_CREDIT_PAGE,
      icon: GiTakeMyMoney
    },
    {
      label: "Credit Report",
      link: pageUrl.CREDIT_REPORT_PAGE,
      icon: BiCreditCard
    },
    {
      label: "Profile",
      link: pageUrl.PROFILE_PAGE,
      icon: AiOutlineUser
    },
  ]

  const handleSubmit = () => {

  }

  if(daysOfMonth.length === 0) {
    return null;
  }

  return (
    <Dashboard sidebarRoutes={sidebarRoutes} location={location}>
      <div className={styles.heading}>
        <div>
          <h2>Consumer Credit</h2>
          <p>Get a loan with ease</p>
        </div>
        { !applyState && <Button
            bgColor="#741763"
            size="sm"
            color="#fff"
            className="mt-4"
          >
            Apply for a loan
          </Button>}
      </div>
      { !applyState ? <div className={styles.creditTable}>
        <Table striped hover>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Monthly Repayment</th>
              <th>Tenor</th>
              <th>Status</th>
              <th>Repayment Source</th>
              <th>Loan Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
        <div className={styles.noLoanMessage}>
          <p>Sorry you currently have no loan</p>
          <img src={noLoan} alt="No loan history" height="250" />
        </div>
      </div> : null }
      { (applyState && !applicationSuccess) && <div className={styles.applyContainer}>
        <Row>
          <Col md={4}>
            <ul className={styles.joinedBullets}>
              <li className={styles.active}>
                Loan Calculator
              </li>
              <li className={applicationStage > 0 && styles.active}>Contact Address</li>
              <li className={applicationStage > 1 && styles.active}>Employment Information</li>
              <li className={applicationStage > 2 && styles.active}>Bank Details</li>
            </ul>
          </Col>
          <Col md={8}>
            <div className={styles.applyForm}>
            { applicationStage === 0 &&
              <div>
                <Row className="mb-4">
                  <Col>
                    <InputField 
                      label="Monthly Salary" 
                      type="text" 
                      nameAttr="salary"
                    />
                  </Col>
                  <Col>
                    <InputField 
                      label="Pay Day"
                      type="select"
                      options={daysOfMonth}
                      nameAttr="payday"
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <InputField 
                      label="Loan Amount" 
                      type="text" 
                      nameAttr="loanAmt"
                    />
                    <p className={styles.inputHint}>
                      <span>min amt:</span> #50,000; <span>max amt:</span> #500,000
                    </p>
                  </Col>
                  <Col>
                    <InputField 
                      label="Installment Period"
                      type="select"
                      options={['1 Month', '2 Months', '3 Months']}
                      nameAttr="installmentCycle"
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <InputField 
                      label="Loan Purpose"
                      type="select"
                      options={[
                        'Debt Consolidation',
                        'Home Remodelling',
                        'Moving Costs',
                        'Emergency Expenses',
                        'Medical Bills',
                        'Education',
                        'Appliance Purchase',
                        'Vehicle Financing',
                        'Vacation Costs',
                        'Wedding Expenses',
                        'Others'
                      ]}
                      nameAttr="loanPurpose"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputField 
                      type="text"
                      label="Estimated Monthly Payment"
                      nameAttr="monthlyPayment"
                    />
                    <p className={styles.inputHint}>
                      <span>Eventual repayment amount may differ after risk assessment.</span>
                    </p>
                  </Col>
                </Row>
                <Button 
                  className="mt-5" 
                  fullWidth 
                  clicked={handleSubmit} 
                  bgColor="#741763" 
                  size="lg" 
                  color="#EBEBEB"
                >
                  Continue
                </Button>
              </div> }
              { applicationStage === 1 &&
                <div className={styles.contactForm}>
                  <Row className="mb-4">
                    <Col>
                      <InputField 
                        label="Address"
                        nameAttr="address"
                        type="text"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <InputField 
                        type="text"
                        nameAttr="city"
                        label="City"
                      />
                    </Col>
                    <Col>
                      <InputField 
                        type="select"
                        nameAttr="state"
                        label="State"
                        options={['Oyo', 'Lagos', 'Osun']}
                      />
                    </Col>
                    <Col>
                      <InputField 
                        type="select"
                        nameAttr="localGovt"
                        label="Local Govt. Area"
                        options={['Eti-Osa', 'Alimosho', 'Ajah']}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputField 
                        type="select"
                        label="Residential Status"
                        nameAttr="residentialStatus"
                        options={['First', 'Second']}
                      />
                    </Col>
                    <Col>
                      <FileUploadButton 
                        label="Choose File" 
                        icon={<FaCloudUploadAlt className="ml-3" size="1.2em" />}
                        id="address-upload" 
                        fileRef={proofofAddressRef}
                        visibleLabel="Proof of Address"
                        fullwidth
                      />
                      <p className={styles.inputHint}>Note: Proof of address could be your recent utility bill or any other valid document containing your residential address.</p>
                    </Col>
                  </Row>
                  <Button 
                    className="mt-4" 
                    fullWidth 
                    clicked={handleSubmit} 
                    bgColor="#741763" 
                    size="lg" 
                    color="#EBEBEB"
                  >
                    Continue
                  </Button>
                </div>}
                { applicationStage === 2 &&
                  <div className={styles.employerInfo}>
                    <Row className="mb-4">
                      <Col>
                        <InputField 
                          type="text"
                          nameAttr="employerName"
                          label="Employer Name"
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="text"
                          nameAttr="startDate"
                          label="When did you start this job?"
                          placeholder="MM/YYYY"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <InputField 
                          type="select"
                          nameAttr="employerSector"
                          label="Employer Sector"
                          options={['Banking', 'Finance']}
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="select"
                          nameAttr="employerIndustry"
                          label="Employer Industry"
                          options={['Banking', 'Finance']}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <InputField 
                          type="select"
                          nameAttr="employType"
                          label="Employment Type"
                          options={['Fulltime', 'Contract', 'Part-Time']}
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="email"
                          nameAttr="officeEmail"
                          label="Office Email Address"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <FileUploadButton 
                          label="Choose file"
                          icon={<FaCloudUploadAlt className="ml-3" size="1.2em" />}
                          id="office-doc-upload" 
                          fileRef={officialFileRef}
                          visibleLabel="Official Document"
                          fullwidth
                        />
                        <p className={styles.inputHint}>Official document could be your employment letter, promotion letter, Staff ID Card or any document to validate that you are currently working with the above employer.</p>
                      </Col>
                    </Row>
                    <h3>Office Address</h3>
                    <Row className="mb-4 mt-3">
                      <Col>
                        <InputField 
                          type="text"
                          label="Street"
                          nameAttr="officeStreet"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <InputField 
                          type="text"
                          label="City"
                          nameAttr="officeCity"
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="select"
                          label="State"
                          nameAttr="officeState"
                          options={['Oyo', 'Lagos', 'Osun']}
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="select"
                          label="Local Govt Area"
                          nameAttr="officeLga"
                          options={['Oyo', 'Lagos', 'Osun']}
                        />
                      </Col>
                    </Row>
                    <Button 
                      className="mt-5" 
                      fullWidth 
                      clicked={handleSubmit} 
                      bgColor="#741763" 
                      size="lg" 
                      color="#EBEBEB"
                    >
                      Continue
                    </Button>
                  </div>
                }
                { applicationStage === 3 && 
                  <div className={styles.bankInfo}>
                    <p className={styles.importantInfo}>Bank account provided must be your salary account</p>
                    <Row className="mb-4">
                      <Col>
                        <InputField 
                          type="select"
                          nameAttr="bankName"
                          label="Bank Name"
                          options={['GTB', 'UBA']}
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="select"
                          nameAttr="accountType"
                          label="Bank Account Type"
                          options={['Savings', 'Current']}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <InputField 
                          type="text"
                          nameAttr="acctNumber"
                          label="Account Number"
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="type"
                          nameAttr="acctName"
                          label="Account Name"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FileUploadButton 
                          label="Choose file"
                          icon={<FaCloudUploadAlt className="ml-3" size="1.2em" />}
                          id="acct-statement-upload" 
                          fileRef={acctStatementRef}
                          visibleLabel="Statement of Account"
                          fullwidth
                        />
                        <p className={styles.inputHint}>Please provide your 6 months bank statement to us.</p>
                      </Col>
                    </Row>
                    <Button 
                      className="mt-5" 
                      fullWidth 
                      clicked={handleSubmit} 
                      bgColor="#741763" 
                      size="lg" 
                      color="#EBEBEB"
                    >
                      Submit
                    </Button>
                  </div>
                }
            </div>
          </Col>
        </Row>
      </div>}
      { applicationSuccess && 
        <div className={styles.applicationComplete}>
          <FaCheckCircle size="4em" color="#741763" />
          <h2>Congratulations!</h2>
          <p>Your loan application has been submitted and is being processed</p>
          <p>Look out for an email from us within the next 24 hours</p>
        </div>
      }
    </Dashboard>
  )
}


export default ConsumerCredit;
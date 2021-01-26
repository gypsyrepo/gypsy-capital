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

  const [applyState, setApplyState] = useState(true);
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [applicationStage, setApplicationStage] = useState(3);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const [loanCalcData, setLoanCalcData] = useState({
    monthlySalary: "",
    payDay: "",
    loanAmount: "",
    installmentPeriod: "",
    loanPurpose: "",
    estimatedMonthlyPayment: ""
  });

  const [contactAddress, setContactAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    lga: "",
    residentialStatus: "",
    proofOfAddress:""
  });

  const [employmentInfo, setEmploymentInfo] = useState({
    employerName: "",
    startedDate: "",
    employerSector: "",
    employmentType: "",
    emailAddress: "",
    officialDoc: ""
  });

  const [officeAddress, setOfficeAddress] = useState({
    street: "",
    city: "",
    state: "",
    lga: ""
  });

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    accountName: "",
    acctStatement: ""
  })

  const proofofAddressRef = useRef();
  const officialFileRef = useRef();
  const acctStatementRef = useRef();

  const loanHistory = [
    // {
    //   loanID: '#00032',
    //   monthlyRepayment: '19,500',
    //   tenor: 2,
    //   status: 'In Review',
    //   repaymentSource: 'Salary account',
    //   loanAmount: '200,500',
    //   balance: '75,000'
    // }
  ]

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
        <Table striped hover className={styles.tableStyles}>
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
            {loanHistory.map((loanInstance, idx) => {
              return (
                <tr>
                  <td>{loanInstance.loanID}</td>
                  <td>{loanInstance.monthlyRepayment}</td>
                  <td>{loanInstance.tenor}</td>
                  <td>{loanInstance.status}</td>
                  <td>{loanInstance.repaymentSource}</td>
                  <td>{loanInstance.loanAmount}</td>
                  <td>{loanInstance.balance}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        { (!loanHistory || loanHistory.length === 0) && <div className={styles.noLoanMessage}>
          <p>Sorry you currently have no loan</p>
          <img src={noLoan} alt="No loan history" height="250" />
        </div>}
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
                      value={loanCalcData.monthlySalary}
                      changed={(val) => setLoanCalcData({ ...loanCalcData, monthlySalary: val })}
                    />
                  </Col>
                  <Col>
                    <InputField 
                      label="Pay Day"
                      type="select"
                      options={daysOfMonth}
                      nameAttr="payday"
                      value={loanCalcData.payDay}
                      changed={(val) => setLoanCalcData({ ...loanCalcData, payDay: val })}
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <InputField 
                      label="Loan Amount" 
                      type="text" 
                      nameAttr="loanAmt"
                      value={loanCalcData.loanAmount}
                      changed={(val) => setLoanCalcData({ ...loanCalcData, loanAmount: val })}
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
                      value={loanCalcData.installmentPeriod}
                      changed={(val) => setLoanCalcData({ ...loanCalcData, installmentPeriod: val })}
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
                      value={loanCalcData.loanPurpose}
                      changed={(val) => setLoanCalcData({ ...loanCalcData, loanPurpose: val })}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputField 
                      type="text"
                      label="Estimated Monthly Payment"
                      nameAttr="monthlyPayment"
                      value={loanCalcData.estimatedMonthlyPayment}
                      changed={(val) => setLoanCalcData({ ...loanCalcData, estimatedMonthlyPayment: val })}
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
                        value={contactAddress.streetAddress}
                        changed={(val) => setContactAddress({ ...contactAddress, streetAddress: val })}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <InputField 
                        type="text"
                        nameAttr="city"
                        label="City"
                        value={contactAddress.city}
                        changed={(val) => setContactAddress({ ...contactAddress, city: val })}
                      />
                    </Col>
                    <Col>
                      <InputField 
                        type="select"
                        nameAttr="state"
                        label="State"
                        options={['Oyo', 'Lagos', 'Osun']}
                        value={contactAddress.state}
                        changed={(val) => setContactAddress({ ...contactAddress, state: val })}
                      />
                    </Col>
                    <Col>
                      <InputField 
                        type="select"
                        nameAttr="localGovt"
                        label="Local Govt. Area"
                        options={['Eti-Osa', 'Alimosho', 'Ajah']}
                        value={contactAddress.lga}
                        changed={(val) => setContactAddress({ ...contactAddress, lga: val })}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputField 
                        type="select"
                        label="Residential Status"
                        nameAttr="residentialStatus"
                        options={['Renting', 'Owned']}
                        value={contactAddress.residentialStatus}
                        changed={(val) => setContactAddress({ ...contactAddress, residentialStatus: val })}
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
                          value={employmentInfo.employerName}
                          changed={(val) => setEmploymentInfo({ ...employmentInfo, employerName: val })}
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="text"
                          nameAttr="startDate"
                          label="When did you start this job?"
                          placeholder="MM/YYYY"
                          value={employmentInfo.startedDate}
                          changed={(val) => setEmploymentInfo({ ...employmentInfo, startedDate: val })}
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
                          value={employmentInfo.employerSector}
                          changed={(val) => setEmploymentInfo({ ...employmentInfo, employerSector: val })}
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="select"
                          nameAttr="employType"
                          label="Employment Type"
                          options={['Fulltime', 'Contract', 'Part-Time']}
                          value={employmentInfo.employmentType}
                          changed={(val) => setEmploymentInfo({ ...employmentInfo, employmentType: val })}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <InputField 
                          type="email"
                          nameAttr="officeEmail"
                          label="Office Email Address"
                          value={employmentInfo.emailAddress}
                          changed={(val) => setEmploymentInfo({ ...employmentInfo, emailAddress: val })}
                        />
                      </Col>
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
                          value={officeAddress.street}
                          changed={(val) => setOfficeAddress({ ...officeAddress, street: val })}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <InputField 
                          type="text"
                          label="City"
                          nameAttr="officeCity"
                          value={officeAddress.city}
                          changed={(val) => setOfficeAddress({ ...officeAddress, city: val })}
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="select"
                          label="State"
                          nameAttr="officeState"
                          options={['Oyo', 'Lagos', 'Osun']}
                          value={officeAddress.state}
                          changed={(val) => setOfficeAddress({ ...officeAddress, state: val })}
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="select"
                          label="Local Govt Area"
                          nameAttr="officeLga"
                          options={['Oyo', 'Lagos', 'Osun']}
                          value={officeAddress.lga}
                          changed={(val) => setOfficeAddress({ ...officeAddress, lga: val })}
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
                          value={bankInfo.bankName}
                          changed={(val) => setBankInfo({ ...bankInfo, bankName: val })}
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="select"
                          nameAttr="accountType"
                          label="Bank Account Type"
                          options={['Savings', 'Current']}
                          value={bankInfo.accountType}
                          changed={(val) => setBankInfo({ ...bankInfo, accountType: val })}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <InputField 
                          type="text"
                          nameAttr="acctNumber"
                          label="Account Number"
                          value={bankInfo.accountNumber}
                          changed={(val) => setBankInfo({ ...bankInfo, accountNumber: val })}
                        />
                      </Col>
                      <Col>
                        <InputField 
                          type="type"
                          nameAttr="acctName"
                          label="Account Name"
                          value={bankInfo.accountName}
                          changed={(val) => setBankInfo({ ...bankInfo, accountName: val })}
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
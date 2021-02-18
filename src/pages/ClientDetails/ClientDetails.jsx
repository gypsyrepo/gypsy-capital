import React, { useState } from 'react';
import styles from './ClientDetails.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import { Row, Col, Table } from 'react-bootstrap';
import NavTabs from '../../components/NavTabs/NavTabs';
import Button from '../../components/Button/Button';
import LoanModal from '../../components/LoanModal/LoanModal';


const Biodata = () => {

  const [biodata, setBiodata] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    emailAddress: "",
    phoneNumber: "",
    residentialStatus: "",
    altPhoneNumber: "",
    residentialAddress: ""
  });

  return (
    <>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="First Name"
            nameAttr="firstName"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Last Name"
            nameAttr="lastName"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Gender"
            nameAttr="gender"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Date of Birth"
            nameAttr="dob"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="email"
            label="Email Address"
            nameAttr="emailAddress"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Phone Number"
            nameAttr="phoneNo"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Residential Status"
            nameAttr="residentStatus"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Alternative Phone Number"
            nameAttr="altPhoneNo"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Residential Address"
            nameAttr="homeAddress"
          />
        </Col>
      </Row>
    </>
  )
}


const NextOfKin = () => {

  const [nextOfKin, setNextOfKin] = useState({
    firstName: "",
    lastName: "",
    relationship: "" ,
    phoneNumber: "",
    residentialAddress: ""
  });

  return (
    <>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="First Name"
            nameAttr="firstName"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Last Name"
            nameAttr="lastName"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Relationship"
            nameAttr="relationship"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Phone Number"
            nameAttr="phoneNo"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Residential Address"
            nameAttr="kinAddress"
          />
        </Col>
      </Row>
    </>
  )
}


const Bank = () => {

  const [disburseBank, setDisburseBank] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    accountName: ""
  });

  const [salaryBank, setSalaryBank] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    accountName: ""
  });

  return (
    <>
      <div className={styles.disburse}>
        <h3>Disbursement Account</h3>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="text"
              label="Bank Name"
              nameAttr="bankName"
            />
          </Col>
          <Col>
            <InputField 
              type="text"
              label="Account Type"
              nameAttr="accountType"
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="text"
              label="Account Number"
              nameAttr="accountNumber"
            />
          </Col>
          <Col>
            <InputField 
              type="text"
              label="Account Name"
              nameAttr="accountName"
            />
          </Col>
        </Row>
      </div>
      <div className={styles.salary}>
        <h3>Salary Account</h3>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="text"
              label="Bank Name"
              nameAttr="salaryBank"
            />
          </Col>
          <Col>
            <InputField 
              type="text"
              label="Account Type"
              nameAttr="salaryAcctType"
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="text"
              label="Account Number"
              nameAttr="salaryAcctNum"
            />
          </Col>
          <Col>
            <InputField 
              type="text"
              label="Account Name"
              nameAttr="salaryAcctName"
            />
          </Col>
        </Row>
      </div>
    </>
  )
}


const Employer = () => {
  return (
    <>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Employer Name"
            nameAttr="employerName"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Employment Date"
            nameAttr="employmentDate"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Employment Sector"
            nameAttr="employmentSector"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Employment Type"
            nameAttr="employmentType"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Office Email Address"
            nameAttr="officeEmail"
          />
        </Col>
      </Row>
      <div className={styles.officeAddress}>
        <h3>Office Address</h3>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="text"
              label="Street Address"
              nameAttr="streetAddress"
            />
          </Col>
        </Row>
        <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="City"
            nameAttr="city"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="State"
            nameAttr="state"
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Local Government Area"
            nameAttr="lga"
          />
        </Col>
      </Row>
      </div>
    </>
  )
}


const ClientLoan = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const closeModal = () => {
    setModalOpen(false);
  }

  const startApply = () => {
    setModalOpen(true);
  }

  return (
    <div className={styles.loanTable}>
      <Button
        size="sm" 
        clicked={startApply}
        bgColor="#741763" 
        color="#fff"
        className={styles.btn}
      >
        Apply for a Loan
      </Button>
      <div className={styles.tableCard}>
        <Table className={styles.table}>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Monthly Repayment</th>
              <th>Tenure</th>
              <th>Status</th>
              <th>Repayment Source</th>
              <th>Loan Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>654780</td>
              <td>N35,600</td>
              <td>3 Months</td>
              <td>Active</td>
              <td>Salary</td>
              <td>N145,000</td>
              <td>N125,000</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <LoanModal openState={modalOpen} closeHandler={closeModal} />
    </div>
  )
}


const ClientDetails = () => {

  const salesRoute = routes[1];
  const location = useLocation();

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
      title: "Loans",
      shortlink: "loans"
    },
  ]

  const setActiveTab = (link) => {
    setDetailSection(link);
  }

  return (
    <Dashboard sidebarRoutes={salesRoute} location={location}>
      <NavTabs navs={navArray} setActive={setActiveTab} currentTab={detailSection} />
      <div className={detailSection !== "loans" && styles.detailFields}>
        { detailSection === "biodata" && <Biodata /> }
        { detailSection === "kin" && <NextOfKin /> }
        { detailSection === "bank" && <Bank /> }
        { detailSection === "employ" && <Employer /> }
        { detailSection === "loans" && <ClientLoan /> }
      </div>
    </Dashboard>
  )
}


export default ClientDetails;
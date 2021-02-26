import React, { useContext, useEffect, useState } from 'react';
import styles from './ClientDetails.module.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation, useParams } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import { Row, Col, Table } from 'react-bootstrap';
import NavTabs from '../../components/NavTabs/NavTabs';
import Button from '../../components/Button/Button';
import LoanModal from '../../components/LoanModal/LoanModal';
import { Context as UserContext } from '../../context/UserContext';
import Loader from '../../components/Loader/Loader';
import _ from 'lodash';


const Biodata = ({ data }) => {

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

  useEffect(() => {
    console.log(data);
    setBiodata({
      ...biodata,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: _.capitalize(data.gender),
      dateOfBirth: data.DOB,
      emailAddress: data.email,
      phoneNumber: data.phoneNumber.replace('234', '0'),
      altPhoneNumber: data.alternativePhoneNumber,
      residentialAddress: `${data.street}, ${_.capitalize(data.state)}`
    })
  }, []);

  return (
    <>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="First Name"
            nameAttr="firstName"
            value={biodata.firstName}
            disable={true}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Last Name"
            nameAttr="lastName"
            value={biodata.lastName}
            disable={true}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Gender"
            nameAttr="gender"
            value={biodata.gender}
            disable={true}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Date of Birth"
            nameAttr="dob"
            value={biodata.dateOfBirth}
            disable={true}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="email"
            label="Email Address"
            nameAttr="emailAddress"
            value={biodata.emailAddress}
            disable={true}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Phone Number"
            nameAttr="phoneNo"
            value={biodata.phoneNumber}
            disable={true}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Residential Status"
            nameAttr="residentStatus"
            value={biodata.residentialStatus}
            disable={true}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Alternative Phone Number"
            nameAttr="altPhoneNo"
            value={biodata.altPhoneNumber}
            disable={true}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Residential Address"
            nameAttr="homeAddress"
            value={biodata.residentialAddress}
            disable={true}
          />
        </Col>
      </Row>
    </>
  )
}


const NextOfKin = ({ data }) => {

  const [nextOfKin, setNextOfKin] = useState({
    firstName: "",
    lastName: "",
    relationship: "" ,
    phoneNumber: "",
    residentialAddress: ""
  });

  useEffect(() => {

    const names = data.fullName.split(' ');

    setNextOfKin({
      ...nextOfKin,
      firstName: names[0],
      lastName: names[names.length - 1],
      relationship: data.relationship,
      phoneNumber: data.phoneNumber,
      residentialAddress: data.residentialAddress
    })
  }, [])

  return (
    <>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="First Name"
            nameAttr="firstName"
            value={nextOfKin.firstName}
            disable={true}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Last Name"
            nameAttr="lastName"
            value={nextOfKin.lastName}
            disable={true}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Relationship"
            nameAttr="relationship"
            value={nextOfKin.relationship}
            disable={true}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            label="Phone Number"
            nameAttr="phoneNo"
            value={nextOfKin.phoneNumber}
            disable={true}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            label="Residential Address"
            nameAttr="kinAddress"
            value={nextOfKin.residentialAddress}
            disable={true}
          />
        </Col>
      </Row>
    </>
  )
}


const Bank = ({ data }) => {

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

  useEffect(() => {
    console.log(data);
    setDisburseBank({
      ...disburseBank,
      bankName: _.startCase(data.bankName),
      accountType: _.capitalize(data.accountType),
      accountNumber: data.accountNumber,
      accountName: data.accountName
    })
  }, [])

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
              value={disburseBank.bankName}
            />
          </Col>
          <Col>
            <InputField 
              type="text"
              label="Account Type"
              nameAttr="accountType"
              value={disburseBank.accountType}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="text"
              label="Account Number"
              nameAttr="accountNumber"
              value={disburseBank.accountNumber}
            />
          </Col>
          <Col>
            <InputField 
              type="text"
              label="Account Name"
              nameAttr="accountName"
              value={disburseBank.accountName}
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


const ClientLoan = ({ userId }) => {

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
      <LoanModal userId={userId} openState={modalOpen} closeHandler={closeModal} />
    </div>
  )
}


const ClientDetails = () => {

  const salesRoute = routes[1];
  const location = useLocation();
  const { clientId } = useParams();

  const { state: { userDetails }, getClientDetails } = useContext(UserContext);

  useEffect(() => {
    getClientDetails(clientId);
  }, [])

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

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
      { userDetails ? 
        <div className={detailSection !== "loans" && styles.detailFields}>
          { detailSection === "biodata" && <Biodata data={{...userDetails.bioData, ...userDetails.residence}} /> }
          { detailSection === "kin" && <NextOfKin data={{ ...userDetails.nextOfKin }} /> }
          { detailSection === "bank" && <Bank data={{ ...userDetails.bank }} /> }
          { detailSection === "employ" && <Employer data={userDetails.employer && { ...userDetails.employer }} /> }
          { detailSection === "loans" && <ClientLoan userId={userDetails.clientId} /> }
        </div> :
        <Loader />
      }
    </Dashboard>
  )
}


export default ClientDetails;
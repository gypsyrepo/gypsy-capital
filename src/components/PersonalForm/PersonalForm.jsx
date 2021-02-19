import React, { useState, useContext, useEffect, useMemo } from 'react';
import styles from './PersonalForm.module.scss';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Context as AuthContext } from '../../context/AuthContext';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { Context as UserContext } from '../../context/UserContext';
import { nigeriaStates } from '../../utils/nigeriaStates';
import { Context as BankContext } from '../../context/BankCotext';
import { validateInput } from '../../utils/validateInput';


const PersonalForm = ({ submit }) => {

  const { 
    state: { bankList, userBankDetails }, 
    getBankList, 
    verifyBankInfo,
  } = useContext(BankContext);
  const { state: { user } } = useContext(AuthContext);
  const {
    state: { userDetails, loading },
    getClientDetails
  } = useContext(UserContext);

  useEffect(() => {
    (async() => {
      await getClientDetails(user.user_id);
      await getBankList();
    })()
  }, [])
 
  const bankNames = useMemo(() => {
    return bankList ? 
      bankList.map((bank) => bank.name) :
      []
  }, [bankList])


  const [biodata, setBiodata] = useState({
    fullName: '',
    dateOfBirth: '',
    bvnPhoneNo: '',
    email: '',
    phoneNo: '',
    altPhone: '',
    gender: ''
  });
  const [biodataErrors, setBiodataErrors] = useState({
    fullName: null,
    dateOfBirth: null,
    bvnPhoneNo: null,
    email: null,
    phoneNo: null,
    altPhone: null,
    gender: null
  });
  const [residentialInfo, setResidentialInfo] = useState({
    street: '',
    city: '',
    state: ''
  });
  const [residentialErrors, setResidentialErrors] = useState({
    street: null,
    city: null,
    state: null
  })
  const [kinInfo, setKinInfo] = useState({
    fullName: '',
    relationship: '',
    email: '',
    phoneNo: '',
    address: ''
  });
  const [kinErrors, setKinErrors] = useState({
    fullName: null,
    relationship: null,
    email: null,
    phoneNo: null,
    address: null
  });
  const [bankInfo, setBankInfo] = useState({
    bankName: '',
    accountType: '',
    accountNumber: '',
    accountName: ''
  });
  const [bankInfoErrors, setBankInfoErrors] = useState({
    bankName: null,
    accountType: null,
    accountNumber: null,
    accountName: null
  })

  useEffect(() => {
    if(bankInfo.accountNumber.length === 10 && bankInfo.bankName) {
      const bank = bankList.find(bank => bank.name.toLowerCase() === bankInfo.bankName);
      const bankCode = bank.code;
      console.log(bankCode)
      verifyBankInfo(bankInfo.accountNumber, bankCode)
    }
  }, [bankInfo.accountNumber, bankInfo.bankName])


  useEffect(() => {
    console.log(userBankDetails);
    if(userBankDetails) {
      setBankInfo({ ...bankInfo, accountName: userBankDetails.account_name })
    }
  }, [userBankDetails]);


  const handleSubmit = () => {
    const validatedBiodata = validateInput(biodata, setBiodataErrors);
    const validatedResidence = validateInput(residentialInfo, setResidentialErrors);
    const validatedKinInfo = validateInput(kinInfo, setKinErrors)
    const validatedBankInfo = validateInput(bankInfo, setBankInfoErrors)
    if(validatedBiodata && validatedResidence && validatedKinInfo && validatedBankInfo) {
      submit(biodata, residentialInfo, kinInfo, bankInfo)
    }
  }


  useEffect(() => {
    if(user && userDetails) {
      const { bioData } = userDetails;
      setBiodata({ ...biodata, 
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phoneNo: user.phoneNumber.replace('234', '0'),
        dateOfBirth: bioData.DOB,
        bvnPhoneNo: bioData.bvnPhoneNumber
      })
    }
  }, [user, userDetails])

  if(!userDetails) {
    return <div className={styles.loadingStyle}><Spinner animation="grow" /></div>
  }

  return (
    <div className={styles.personalInfo}>
      <div className={styles.biodata}>
        <h3>Biodata Information</h3>
        <Row className="mb-4">
          <Col>
            <InputField 
              label="Full name"
              type="text"
              nameAttr="fullname"
              value={biodata.fullName}
              changed={(val) => {
                setBiodataErrors({ ...biodataErrors, fullName: null })
                setBiodata({ ...biodata, fullName: val})
              }}
              error={biodataErrors.fullName && biodataErrors.fullName}
            />
          </Col>
          <Col>
            <InputField 
              label="Date of Birth"
              type="text"
              nameAttr="dob"
              value={biodata.dateOfBirth}
              changed={(val) => {
                setBiodataErrors({ ...biodataErrors, dateOfBirth: null })
                setBiodata({ ...biodata, dateOfBirth: val})
              }}
              error={biodataErrors.dateOfBirth && biodataErrors.dateOfBirth}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField 
              label="BVN-linked Phone Number"
              type="text"
              nameAttr="bvnPhoneNo"
              value={biodata.bvnPhoneNo}
              changed={(val) => {
                setBiodataErrors({ ...biodataErrors, bvnPhoneNo: null })
                setBiodata({ ...biodata, bvnPhoneNo: val})
              }}
              error={biodataErrors.bvnPhoneNo && biodataErrors.bvnPhoneNo}
            />
          </Col>
          <Col>
            <InputField 
              label="Email"
              type="email"
              nameAttr="email"
              value={biodata.email}
              changed={(val) => {
                setBiodataErrors({ ...biodataErrors, email: null })
                setBiodata({ ...biodata, email: val})
              }}
              error={biodataErrors.email && biodataErrors.email}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField 
              label="Phone Number"
              type="text"
              nameAttr="PhoneNo"
              value={biodata.phoneNo}
              changed={(val) => {
                setBiodataErrors({ ...biodataErrors, phoneNo: null })
                setBiodata({ ...biodata, phoneNo: val})
              }}
              error={biodataErrors.phoneNo && biodataErrors.phoneNo}
            />
          </Col>
          <Col>
            <InputField 
              label="Alternative Phone Number"
              type="text"
              nameAttr="altPhoneNo"
              value={biodata.altPhone}
              changed={(val) => {
                setBiodataErrors({ ...biodataErrors, altPhone: null })
                setBiodata({ ...biodata, altPhone: val})
              }}
              error={biodataErrors.altPhone && biodataErrors.altPhone}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField 
              label="Gender"
              type="select"
              options={['Female', 'Male', 'Other']}
              nameAttr="gender"
              value={biodata.gender}
              changed={(val) => {
                setBiodataErrors({ ...biodataErrors, gender: null })
                setBiodata({ ...biodata, gender: val})
              }}
              error={biodataErrors.gender && biodataErrors.gender}
            />
          </Col>
        </Row>
      </div>
      <div className={styles.residentialInfo}>
        <h3>Residential Address</h3>
        <Row className="mb-4">
          <Col>
            <InputField 
              label="Street"
              type="text"
              nameAttr="residentStreet"
              value={residentialInfo.street}
              changed={(val) => {
                setResidentialErrors({ ...residentialErrors, street: null })
                setResidentialInfo({ ...residentialInfo, street: val})
              }}
              error={residentialErrors.street && residentialErrors.street}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField 
              label="City"
              type="text"
              nameAttr="city"
              value={residentialInfo.city}
              changed={(val) => {
                setResidentialErrors({ ...residentialErrors, city: null })
                setResidentialInfo({ ...residentialInfo, city: val})
              }}
              error={residentialErrors.city && residentialErrors.city}
            />
          </Col>
          <Col>
            <InputField 
              label="State"
              type="select"
              options={nigeriaStates}
              nameAttr="state"
              value={residentialInfo.state}
              changed={(val) => {
                setResidentialErrors({ ...residentialErrors, state: null })
                setResidentialInfo({ ...residentialInfo, state: val})
              }}
              error={residentialErrors.state && residentialErrors.state}
            />
          </Col>
        </Row>
      </div>
      <div className={styles.kinInfo}>
        <h3>Next of Kin Information</h3>
        <Row className="mb-4">
          <Col>
            <InputField 
              label="Full name"
              type="text"
              nameAttr="kinFullname"
              value={kinInfo.fullName}
              changed={(val) => {
                setKinErrors({ ...kinErrors, fullName: null })
                setKinInfo({ ...kinInfo, fullName: val})
              }}
              error={kinErrors.fullName && kinErrors.fullName}
            />
          </Col>
          <Col>
            <InputField 
              label="Relationship"
              type="text"
              nameAttr="kinRelationship"
              value={kinInfo.relationship}
              changed={(val) => {
                setKinErrors({ ...kinErrors, relationship: null })
                setKinInfo({ ...kinInfo, relationship: val})
              }}
              error={kinErrors.relationship && kinErrors.relationship}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField 
              label="Email Address"
              type="email"
              nameAttr="kinEmail"
              value={kinInfo.email}
              changed={(val) => {
                setKinErrors({ ...kinErrors, email: null })
                setKinInfo({ ...kinInfo, email: val})
              }}
              error={kinErrors.email && kinErrors.email}
            />
          </Col>
          <Col>
            <InputField 
              label="Phone Number"
              type="text"
              nameAttr="kinPhone"
              value={kinInfo.phoneNo}
              changed={(val) => {
                setKinErrors({ ...kinErrors, phoneNo: null })
                setKinInfo({ ...kinInfo, phoneNo: val})
              }}
              error={kinErrors.phoneNo && kinErrors.phoneNo}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField 
              label="Residential Address"
              type="text"
              nameAttr="kinAddress"
              placeholder="Street address to the nearest bus stop"
              value={kinInfo.address}
              changed={(val) => {
                setKinErrors({ ...kinErrors, address: null })
                setKinInfo({ ...kinInfo, address: val})
              }}
              error={kinErrors.address && kinErrors.address}
            />
          </Col>
        </Row>
      </div>
      <div className={styles.bankInfo}>
        <h3>Bank Information</h3>
        <p>Please provide a bank account where we can send your investment proceeds or loan requests to.</p>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="select"
              label="Bank"
              options={bankNames}
              nameAttr="bank"
              value={bankInfo.bankName}
              changed={(val) => {
                setBankInfoErrors({ ...bankInfoErrors, bankName: null })
                setBankInfo({ ...bankInfo, bankName: val})
              }}
              error={bankInfoErrors.bankName && bankInfoErrors.bankName}
            />
          </Col>
          <Col>
            <InputField 
              label="Account Type"
              type="select"
              options={["Savings", "Current"]}
              nameAttr="acountType"
              value={bankInfo.accountType}
              changed={(val) => {
                setBankInfoErrors({ ...bankInfoErrors, accountType: null })
                setBankInfo({ ...bankInfo, accountType: val})
              }}
              error={bankInfoErrors.accountType && bankInfoErrors.accountType}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField 
              type="text"
              label="Account Number"
              nameAttr="accountNo"
              value={bankInfo.accountNumber}
              changed={(val) => {
                setBankInfoErrors({ ...bankInfoErrors, accountNumber: null })
                setBankInfo({ ...bankInfo, accountNumber: val})
              }}
              error={bankInfoErrors.accountNumber && bankInfoErrors.accountNumber}
            />
          </Col>
          <Col>
            <InputField 
              label="Account Name"
              type="text"
              nameAttr="accountName"
              value={bankInfo.accountName}
              changed={(val) => {
                setBankInfoErrors({ ...bankInfoErrors, accountName: null })
                setBankInfo({ ...bankInfo, accountName: val})
              }}
              error={bankInfoErrors.accountName && bankInfoErrors.accountName}
            />
          </Col>
        </Row>
      </div>
      <Button 
        className="mt-4" 
        clicked={handleSubmit} 
        loading={loading}
        disabled={loading}
        fullWidth 
        bgColor="#741763" 
        size="lg" 
        color="#EBEBEB"
      >
        Save & Continue
      </Button>
    </div>
  )
}

export default PersonalForm;
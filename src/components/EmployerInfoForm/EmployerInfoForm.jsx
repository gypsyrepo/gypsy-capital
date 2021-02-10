import React, { useState, useRef } from 'react';
import styles from './EmployerInfoForm.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../InputField/InputField';
import FileUploadButton from '../FileUploadButton/FileUploadButton';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Button from '../Button/Button';
import { validateInput } from '../../utils/validateInput';


const EmployerInfoForm = ({ submit }) => {

  const [employmentInfo, setEmploymentInfo] = useState({
    employerName: "",
    startedDate: "",
    employerSector: "",
    employmentType: "",
    email: "",
    // officialDoc: ""
  });

  const [employmentErrors, setEmploymentErrors] = useState({
    employerName: null,
    startedDate: null,
    employerSector: null,
    employmentType: null,
    email: null
    // officialDoc: ""
  });


  const [officeAddress, setOfficeAddress] = useState({
    street: "",
    city: "",
    state: "",
    lga: ""
  });

  const [officeAddressErrors, setOfficeAddressErrors] = useState({
    street: null,
    city: null,
    state: null,
    lga: null
  });

  const officialFileRef = useRef();

  const updateLoanWorkData = () => {
    const validatedWorkInfo = validateInput(employmentInfo, setEmploymentErrors);
    const validatedWorkAddress = validateInput(officeAddress, setOfficeAddressErrors);
    console.log(validatedWorkInfo, validatedWorkAddress);
  }

  return (
    <div className={styles.employerInfo}>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="text"
            nameAttr="employerName"
            label="Employer Name"
            value={employmentInfo.employerName}
            changed={(val) => {
              setEmploymentErrors({ ...employmentErrors, employerName: null })
              setEmploymentInfo({ ...employmentInfo, employerName: val })
            }}
            error={employmentErrors.employerName && employmentErrors.employerName}
          />
        </Col>
        <Col>
          <InputField 
            type="text"
            nameAttr="startDate"
            label="When did you start this job?"
            placeholder="MM/YYYY"
            value={employmentInfo.startedDate}
            changed={(val) => {
              setEmploymentErrors({ ...employmentErrors, startedDate: null })
              setEmploymentInfo({ ...employmentInfo, startedDate: val })
            }}
            error={employmentErrors.startedDate && employmentErrors.startedDate}
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
            changed={(val) => {
              setEmploymentErrors({ ...employmentErrors, employerSector: null })
              setEmploymentInfo({ ...employmentInfo, employerSector: val })
            }}
            error={employmentErrors.employerSector && employmentErrors.employerSector}
          />
        </Col>
        <Col>
          <InputField 
            type="select"
            nameAttr="employType"
            label="Employment Type"
            options={['Fulltime', 'Contract', 'Part-Time']}
            value={employmentInfo.employmentType}
            changed={(val) => {
              setEmploymentErrors({ ...employmentErrors, employmentType: null })
              setEmploymentInfo({ ...employmentInfo, employmentType: val })
            }}
            error={employmentErrors.employmentType && employmentErrors.employmentType}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField 
            type="email"
            nameAttr="officeEmail"
            label="Office Email Address"
            value={employmentInfo.email}
            changed={(val) => {
              setEmploymentErrors({ ...employmentErrors, email: null })
              setEmploymentInfo({ ...employmentInfo, email: val })
            }}
            error={employmentErrors.email && employmentErrors.email}
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
            changed={(val) => {
              setOfficeAddressErrors({ ...officeAddressErrors, street: null })
              setOfficeAddress({ ...officeAddress, street: val })
            }}
            error={officeAddressErrors.street && officeAddressErrors.street}
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
            changed={(val) => {
              setOfficeAddressErrors({ ...officeAddressErrors, city: null })
              setOfficeAddress({ ...officeAddress, city: val })
            }}
            error={officeAddressErrors.city && officeAddressErrors.city}
          />
        </Col>
        <Col>
          <InputField 
            type="select"
            label="State"
            nameAttr="officeState"
            options={['Oyo', 'Lagos', 'Osun']}
            value={officeAddress.state}
            changed={(val) => {
              setOfficeAddressErrors({ ...officeAddressErrors, state: null })
              setOfficeAddress({ ...officeAddress, state: val })
            }}
            error={officeAddressErrors.state && officeAddressErrors.state}
          />
        </Col>
        <Col>
          <InputField 
            type="select"
            label="Local Govt Area"
            nameAttr="officeLga"
            options={['Oyo', 'Lagos', 'Osun']}
            value={officeAddress.lga}
            changed={(val) => {
              setOfficeAddressErrors({ ...officeAddressErrors, lga: null })
              setOfficeAddress({ ...officeAddress, lga: val })
            }}
            error={officeAddressErrors.lga && officeAddressErrors.lga}
          />
        </Col>
      </Row>
      <Button 
        className="mt-5" 
        fullWidth 
        clicked={updateLoanWorkData} 
        bgColor="#741763" 
        size="lg" 
        color="#EBEBEB"
      >
        Continue
      </Button>
    </div>
  )
}


export default EmployerInfoForm;
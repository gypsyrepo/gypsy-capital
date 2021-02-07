import React, { useState, useRef } from 'react';
import styles from './EmployerInfoForm.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../InputField/InputField';
import FileUploadButton from '../FileUploadButton/FileUploadButton';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Button from '../Button/Button';


const EmployerInfoForm = () => {

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

  const officialFileRef = useRef();

  return (
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
        // clicked={handleSubmit} 
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
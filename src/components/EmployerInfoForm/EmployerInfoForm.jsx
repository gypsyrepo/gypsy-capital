import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './EmployerInfoForm.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../InputField/InputField';
import FileUploadButton from '../FileUploadButton/FileUploadButton';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Button from '../Button/Button';
import { validateInput } from '../../utils/validateInput';
import { workSector, nigeriaStates, workIndustries } from '../../utils/nigeriaStates';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Context as LoanContext } from '../../context/LoanContext';


const EmployerInfoForm = ({ submitEmployerInfo }) => {

  const { state: { loading } } = useContext(LoanContext);

  const [employmentInfo, setEmploymentInfo] = useState({
    employerName: "",
    startedDate: "",
    employerSector: "",
    employerIndustry: "",
    employmentType: "",
    email: "",
    // officialDoc: ""
  });

  const [employmentErrors, setEmploymentErrors] = useState({
    employerName: null,
    startedDate: null,
    employerSector: null,
    employerIndustry: null,
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

  const [lgaOptions, setLgaOptions] = useState([]);

  useEffect(() => {
    if(officeAddress.state.length > 0) {
      const getLga = async() => {
        const response = await axios.get(`https://locationsng-api.herokuapp.com/api/v1/states/${officeAddress.state}/lgas`)
        setLgaOptions(response.data);
      };
  
      getLga();
    }
  }, [officeAddress.state])

  const officialFileRef = useRef();

  const updateLoanWorkData = () => {
    if(officialFileRef.current.files.length > 0) {
      const validatedWorkInfo = validateInput(employmentInfo, setEmploymentErrors);
      const validatedWorkAddress = validateInput(officeAddress, setOfficeAddressErrors);
      const officialDoc = officialFileRef.current.files[0];
      console.log(validatedWorkInfo, validatedWorkAddress);
      if(validatedWorkAddress && validatedWorkInfo) {
        const data = new FormData();
        data.append('employer_name', employmentInfo.employerName);
        data.append('resumption_date', employmentInfo.startedDate);
        data.append('sector', employmentInfo.employerSector);
        data.append('industry', employmentInfo.employerIndustry);
        data.append('employment_type', employmentInfo.employmentType);
        data.append('official_email', employmentInfo.email);
        data.append('state', officeAddress.state);
        data.append('city', officeAddress.city);
        data.append('street', officeAddress.street);
        data.append('local_government', officeAddress.lga);
        data.append('image', officialDoc);

        // addWorkInfoForLoan(data, user.user_id);
        submitEmployerInfo(data);
        // console.log(true);
      }
    } else {
      toast.error('You need to upload an official document to prove your employment data to proceed')
    }
  }

  return (
    <div className={styles.employerInfo}>
      <ToastContainer position="top-center" />
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
            options={workSector}
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
            nameAttr="employerIndustry"
            label="Employer Industry"
            options={workIndustries}
            value={employmentInfo.employerIndustry}
            changed={(val) => {
              setEmploymentErrors({ ...employmentErrors, employerIndustry: null })
              setEmploymentInfo({ ...employmentInfo, employerIndustry: val })
            }}
            error={employmentErrors.employerIndustry && employmentErrors.employerIndustry}
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
            value={employmentInfo.employmentType}
            changed={(val) => {
              setEmploymentErrors({ ...employmentErrors, employmentType: null })
              setEmploymentInfo({ ...employmentInfo, employmentType: val })
            }}
            error={employmentErrors.employmentType && employmentErrors.employmentType}
          />
        </Col>
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
            options={nigeriaStates}
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
            options={lgaOptions}
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
        disabled={loading}
        loading={loading}
      >
        Continue
      </Button>
    </div>
  )
}


export default EmployerInfoForm;
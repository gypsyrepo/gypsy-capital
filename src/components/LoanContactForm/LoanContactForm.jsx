import React, { useState, useRef, useEffect } from 'react';
import styles from './LoanContactForm.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../InputField/InputField';
import FileUploadButton from '../FileUploadButton/FileUploadButton';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Button from '../Button/Button';
import { validateInput } from '../../utils/validateInput';
import axios from 'axios';
import nigeriaStates from '../../utils/nigeriaStates';
import { ToastContainer, toast } from 'react-toastify';



const LoanContactForm = ({ submit }) => {

  const [contactAddress, setContactAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    lga: "",
    residentialStatus: ""
  });

  const [contactErrors, setContactErrors] = useState({
    streetAddress: null,
    city: null,
    state: null,
    lga: null,
    residentialStatus: null
  })

  const [lgaOptions, setLgaOptions] = useState([]);
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    if(contactAddress.state.length > 0) {
      const getLga = async() => {
        const response = await axios.get(`http://locationsng-api.herokuapp.com/api/v1/states/${contactAddress.state}/lgas`)
        setLgaOptions(response.data);
      };
  
      getLga();
    }
  }, [contactAddress.state])


  const proofofAddressRef = useRef(null);

  const updateContactInfo = () => {
    setFileError(null);
    if(proofofAddressRef.current.files.length > 0) {
      console.log(proofofAddressRef);
      const proofofAddress = proofofAddressRef.current.files[0];
      console.log(proofofAddress);
      const validated = validateInput(contactAddress, setContactErrors)
      console.log(validated);
      if(validated) {
        const data = new FormData();
        data.append("city", contactAddress.city);
        data.append("street", contactAddress.streetAddress);
        data.append("state", contactAddress.state);
        data.append("local_government", contactAddress.lga);
        data.append("residential_status", contactAddress.residentialStatus);
        data.append("image", proofofAddress);
        submit(data);
      }
    } else {
      setFileError("You need to upload a proof of address document to proceed");
    }
  }


  useEffect(() =>{
    if(fileError) {
      toast.error(fileError);
    }
  }, [fileError]);

  return (
    <div className={styles.contactForm}>
      <ToastContainer position="top-center" />
      <Row className="mb-4">
        <Col>
          <InputField 
            label="Address"
            nameAttr="address"
            type="text"
            value={contactAddress.streetAddress}
            changed={(val) => {
              setContactErrors({ ...contactErrors, streetAddress: null })
              setContactAddress({ ...contactAddress, streetAddress: val })
            }}
            error={contactErrors.streetAddress && contactErrors.streetAddress}
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
            changed={(val) => {
              setContactErrors({ ...contactErrors, city: null })
              setContactAddress({ ...contactAddress, city: val })
            }}
            error={contactErrors.city && contactErrors.city}
          />
        </Col>
        <Col>
          <InputField 
            type="select"
            nameAttr="state"
            label="State"
            options={nigeriaStates}
            value={contactAddress.state}
            changed={(val) => {
              setContactErrors({ ...contactErrors, state: null })
              setContactAddress({ ...contactAddress, state: val })
            }}
            error={contactErrors.state && contactErrors.state}
          />
        </Col>
        <Col>
          <InputField 
            type="select"
            nameAttr="localGovt"
            label="Local Govt. Area"
            options={lgaOptions}
            value={contactAddress.lga}
            changed={(val) => {
              setContactErrors({ ...contactErrors, lga: null })
              setContactAddress({ ...contactAddress, lga: val })
            }}
            error={contactErrors.lga && contactErrors.lga}
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
            changed={(val) => {
              setContactErrors({ ...contactErrors, residentialStatus: null })
              setContactAddress({ ...contactAddress, residentialStatus: val })
            }}
            error={contactErrors.residentialStatus && contactErrors.residentialStatus}
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
        clicked={updateContactInfo} 
        bgColor="#741763" 
        size="lg" 
        color="#EBEBEB"
      >
        Continue
      </Button>
    </div>
  )
}


export default LoanContactForm;
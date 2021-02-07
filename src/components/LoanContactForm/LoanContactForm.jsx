import React, { useState, useRef } from 'react';
import styles from './LoanContactForm.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../InputField/InputField';
import FileUploadButton from '../FileUploadButton/FileUploadButton';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Button from '../Button/Button';



const LoanContactForm = () => {

  const [contactAddress, setContactAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    lga: "",
    residentialStatus: "",
    proofOfAddress:""
  });

  const proofofAddressRef = useRef();

  return (
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


export default LoanContactForm;
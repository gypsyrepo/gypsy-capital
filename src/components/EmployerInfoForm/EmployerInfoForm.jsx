import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./EmployerInfoForm.module.scss";
import { Row, Col } from "react-bootstrap";
import InputField from "../InputField/InputField";
import FileUploadButton from "../FileUploadButton/FileUploadButton";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "../Button/Button";
import { validateInput } from "../../utils/validateInput";
import {
  workSector,
  nigeriaStates,
  workIndustries,
} from "../../utils/nigeriaStates";
import { ToastContainer, toast } from "react-toastify";
import { Context as LoanContext } from "../../context/LoanContext";
import { lgaList } from "../../utils/mappedLgas";
import _ from "lodash";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import moment from "moment";

const EmployerInfoForm = ({ submitEmployerInfo }) => {
  const {
    state: { loading },
  } = useContext(LoanContext);

  const [employmentInfo, setEmploymentInfo] = useState({
    employerName: "",
    startedDate: "",
    employerSector: null,
    employerIndustry: null,
    employmentType: null,
    email: "",
    // officialDoc: ""
  });

  const [employmentErrors, setEmploymentErrors] = useState({
    employerName: null,
    startedDate: null,
    employerSector: null,
    employerIndustry: null,
    employmentType: null,
    email: null,
    // officialDoc: ""
  });

  const [officeAddress, setOfficeAddress] = useState({
    street: "",
    city: "",
    state: null,
    lga: null,
  });

  const [officeAddressErrors, setOfficeAddressErrors] = useState({
    street: null,
    city: null,
    state: null,
    lga: null,
  });

  const [lgaOptions, setLgaOptions] = useState([]);

  useEffect(() => {
    if (officeAddress?.state?.length > 0) {
      setLgaOptions(lgaList[_.capitalize(officeAddress.state)]);
    }
  }, [officeAddress.state]);

  const officialFileRef = useRef();

  const updateLoanWorkData = () => {
    if (officialFileRef.current.files.length > 0) {
      const validatedWorkInfo = validateInput(
        employmentInfo,
        setEmploymentErrors
      );
      const validatedWorkAddress = validateInput(
        officeAddress,
        setOfficeAddressErrors
      );
      const officialDoc = officialFileRef.current.files[0];

      if (validatedWorkAddress && validatedWorkInfo) {
        const data = new FormData();
        data.append("employer_name", employmentInfo.employerName);
        data.append(
          "resumption_date",
          moment(employmentInfo.startedDate).format("DD/MM/YYYY")
        );
        data.append("sector", employmentInfo.employerSector);
        data.append("industry", employmentInfo.employerIndustry);
        data.append("employment_type", employmentInfo.employmentType);
        data.append("official_email", employmentInfo.email);
        data.append("state", officeAddress.state);
        data.append("city", officeAddress.city);
        data.append("street", officeAddress.street);
        data.append("local_government", officeAddress.lga);
        data.append("image", officialDoc);

        // addWorkInfoForLoan(data, user.user_id);
        submitEmployerInfo(data);
      }
    } else {
      toast.error(
        "You need to upload an official document to prove your employment data to proceed"
      );
    }
  };

  const handleSubmitWithKeyPress = (e) => {
    if (e.key.toLowerCase() === "enter" || e.code.toLowerCase() === "enter") {
      updateLoanWorkData();
    }
  };

  return (
    <div className={styles.employerInfo}>
      <ToastContainer position="top-center" />
      <Row className="mb-4">
        <Col className="mb-4 mb-md-0" sm={12} md={6}>
          <InputField
            type="text"
            nameAttr="employerName"
            label="Employer Name"
            value={employmentInfo.employerName}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setEmploymentErrors({ ...employmentErrors, employerName: null });
              setEmploymentInfo({ ...employmentInfo, employerName: val });
            }}
            error={
              employmentErrors.employerName && employmentErrors.employerName
            }
          />
        </Col>
        <Col sm={12} md={6}>
          <CustomDatePicker
            label="When did you start this job?"
            value={employmentInfo.startedDate}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setEmploymentErrors({ ...employmentErrors, startedDate: null });
              setEmploymentInfo({ ...employmentInfo, startedDate: val });
            }}
            error={employmentErrors?.startedDate}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="mb-4 mb-md-0" sm={12} md={6}>
          <InputField
            type="select"
            nameAttr="employerSector"
            label="Employer Sector"
            options={workSector}
            value={employmentInfo.employerSector}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setEmploymentErrors({
                ...employmentErrors,
                employerSector: null,
              });
              setEmploymentInfo({ ...employmentInfo, employerSector: val });
            }}
            error={
              employmentErrors.employerSector && employmentErrors.employerSector
            }
          />
        </Col>
        <Col sm={12} md={6}>
          <InputField
            type="select"
            nameAttr="employerIndustry"
            label="Employer Industry"
            options={workIndustries}
            value={employmentInfo.employerIndustry}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setEmploymentErrors({
                ...employmentErrors,
                employerIndustry: null,
              });
              setEmploymentInfo({ ...employmentInfo, employerIndustry: val });
            }}
            error={
              employmentErrors.employerIndustry &&
              employmentErrors.employerIndustry
            }
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="mb-4 mb-md-0" sm={12} md={6}>
          <InputField
            type="select"
            nameAttr="employType"
            label="Employment Type"
            options={["Fulltime", "Contract", "Part-Time"]}
            value={employmentInfo.employmentType}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setEmploymentErrors({
                ...employmentErrors,
                employmentType: null,
              });
              setEmploymentInfo({ ...employmentInfo, employmentType: val });
            }}
            error={
              employmentErrors.employmentType && employmentErrors.employmentType
            }
          />
        </Col>
        <Col sm={12} md={6}>
          <InputField
            type="email"
            nameAttr="officeEmail"
            label="Office Email Address"
            value={employmentInfo.email}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setEmploymentErrors({ ...employmentErrors, email: null });
              setEmploymentInfo({ ...employmentInfo, email: val });
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
          <p className={styles.inputHint}>
            Official document could be your employment letter, promotion letter,
            Staff ID Card or any document to validate that you are currently
            working with the above employer.
          </p>
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
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setOfficeAddressErrors({ ...officeAddressErrors, street: null });
              setOfficeAddress({ ...officeAddress, street: val });
            }}
            error={officeAddressErrors.street && officeAddressErrors.street}
          />
        </Col>
      </Row>
      <Row>
        <Col className="mb-4 mb-md-0" sm={12} md={4}>
          <InputField
            type="text"
            label="City"
            nameAttr="officeCity"
            value={officeAddress.city}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setOfficeAddressErrors({ ...officeAddressErrors, city: null });
              setOfficeAddress({ ...officeAddress, city: val });
            }}
            error={officeAddressErrors.city && officeAddressErrors.city}
          />
        </Col>
        <Col className="mb-4 mb-md-0" sm={12} md={4}>
          <InputField
            type="select"
            label="State"
            nameAttr="officeState"
            options={nigeriaStates}
            value={officeAddress.state}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setOfficeAddressErrors({ ...officeAddressErrors, state: null });
              setOfficeAddress({ ...officeAddress, state: val });
            }}
            error={officeAddressErrors.state && officeAddressErrors.state}
          />
        </Col>
        <Col sm={12} md={4}>
          <InputField
            type="select"
            label="Local Govt Area"
            nameAttr="officeLga"
            options={lgaOptions}
            value={officeAddress.lga}
            handleKeyPress={(e) => handleSubmitWithKeyPress(e)}
            changed={(val) => {
              setOfficeAddressErrors({ ...officeAddressErrors, lga: null });
              setOfficeAddress({ ...officeAddress, lga: val });
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
  );
};

export default EmployerInfoForm;

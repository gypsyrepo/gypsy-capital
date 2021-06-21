import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import styles from "./AccountSetupModal.module.scss";
import { Modal, Row, Col } from "react-bootstrap";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { validateInput } from "../../utils/validateInput";
import { nigeriaStates } from "../../utils/nigeriaStates";
import { Context as BankContext } from "../../context/BankCotext";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import FileUploadButton from "../FileUploadButton/FileUploadButton";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import { FaCheckCircle } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";

export const VerifyBvn = ({ submit }) => {
  const [bvn, setBvn] = useState("");
  const {
    state: { loading },
  } = useContext(UserContext);

  const submitBvn = () => {
    if (bvn) {
      submit(bvn);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Verify BVN</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <Row>
            <Col>
              <InputField
                type="text"
                nameAttr="otp"
                label="Enter Client's BVN"
                value={bvn}
                changed={(val) => {
                  setBvn(val);
                }}
              />
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.body}>
        <Button
          fullWidth
          bgColor="#741763"
          size="lg"
          clicked={submitBvn}
          color="#EBEBEB"
          loading={loading}
          disabled={loading}
        >
          Verify
        </Button>
        <p className={styles.hint}>To get your BVN, Dial *565*0#</p>
      </Modal.Footer>
    </>
  );
};

export const PersonalInfo = ({ submit }) => {
  const {
    state: { userDetails },
    getClientDetails,
  } = useContext(UserContext);
  const {
    state: { currentAddedUser },
  } = useContext(AuthContext);

  const [biodata, setBiodata] = useState({
    fullName: "",
    dateOfBirth: "",
    bvnPhoneNo: "",
    email: "",
    phoneNo: "",
    altPhone: "",
    gender: "",
  });

  const [biodataErrors, setBiodataErrors] = useState({
    fullName: null,
    dateOfBirth: null,
    bvnPhoneNo: null,
    email: null,
    phoneNo: null,
    altPhone: null,
    gender: null,
  });

  useEffect(() => {
    const { user_id } = currentAddedUser;
    getClientDetails(user_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userDetails) {
      const { bioData } = userDetails;
      setBiodata({
        ...biodata,
        fullName: `${bioData.firstName} ${bioData.lastName}`,
        email: bioData.email,
        phoneNo: bioData.phoneNumber.replace("234", "0"),
        dateOfBirth: bioData.DOB,
        bvnPhoneNo: bioData.bvnPhoneNumber,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddedUser, userDetails]);

  const addPersonalInfo = () => {
    const validated = validateInput(biodata, setBiodataErrors);
    if (validated) {
      submit(biodata);
    }
  };
  if (!userDetails) {
    return <Loader />;
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Personal Info</h2>
        </Modal.Title>
        {/* <p className={styles.subtitle}>Personal Info</p> */}
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <Row className="mb-4">
            <Col>
              <InputField
                label="Full name"
                type="text"
                nameAttr="fullname"
                value={biodata.fullName}
                changed={(val) => {
                  setBiodataErrors({ ...biodataErrors, fullName: null });
                  setBiodata({ ...biodata, fullName: val });
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
                  setBiodataErrors({ ...biodataErrors, dateOfBirth: null });
                  setBiodata({ ...biodata, dateOfBirth: val });
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
                  setBiodataErrors({ ...biodataErrors, bvnPhoneNo: null });
                  setBiodata({ ...biodata, bvnPhoneNo: val });
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
                  setBiodataErrors({ ...biodataErrors, email: null });
                  setBiodata({ ...biodata, email: val });
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
                  setBiodataErrors({ ...biodataErrors, phoneNo: null });
                  setBiodata({ ...biodata, phoneNo: val });
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
                  setBiodataErrors({ ...biodataErrors, altPhone: null });
                  setBiodata({ ...biodata, altPhone: val });
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
                options={["Female", "Male", "Other"]}
                nameAttr="gender"
                value={biodata.gender}
                changed={(val) => {
                  setBiodataErrors({ ...biodataErrors, gender: null });
                  setBiodata({ ...biodata, gender: val });
                }}
                error={biodataErrors.gender && biodataErrors.gender}
              />
            </Col>
          </Row>
          <Modal.Footer>
            <Button
              className="mt-4"
              clicked={addPersonalInfo}
              fullWidth
              bgColor="#741763"
              size="lg"
              color="#EBEBEB"
            >
              Save & Continue
            </Button>
          </Modal.Footer>
        </div>
      </Modal.Body>
    </>
  );
};

export const Residence = ({ submit }) => {
  const [residentialInfo, setResidentialInfo] = useState({
    street: "",
    city: "",
    state: "",
  });

  const [residentialErrors, setResidentialErrors] = useState({
    street: null,
    city: null,
    state: null,
  });

  const addResidence = () => {
    const validated = validateInput(residentialInfo, setResidentialErrors);
    if (validated) {
      submit(residentialInfo);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Residential Address</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <Row className="mb-4">
            <Col>
              <InputField
                label="Street"
                type="text"
                nameAttr="residentStreet"
                value={residentialInfo.street}
                changed={(val) => {
                  setResidentialErrors({ ...residentialErrors, street: null });
                  setResidentialInfo({ ...residentialInfo, street: val });
                }}
                error={residentialErrors.street && residentialErrors.street}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField
                label="City"
                type="text"
                nameAttr="city"
                value={residentialInfo.city}
                changed={(val) => {
                  setResidentialErrors({ ...residentialErrors, city: null });
                  setResidentialInfo({ ...residentialInfo, city: val });
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
                  setResidentialErrors({ ...residentialErrors, state: null });
                  setResidentialInfo({ ...residentialInfo, state: val });
                }}
                error={residentialErrors.state && residentialErrors.state}
              />
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.body}>
        <Button
          className="mt-4"
          clicked={addResidence}
          fullWidth
          bgColor="#741763"
          size="lg"
          color="#EBEBEB"
        >
          Save & Continue
        </Button>
      </Modal.Footer>
    </>
  );
};

export const NextOfKin = ({ submit }) => {
  const [kinInfo, setKinInfo] = useState({
    fullName: "",
    relationship: "",
    email: "",
    phoneNo: "",
    address: "",
  });

  const [kinErrors, setKinErrors] = useState({
    fullName: null,
    relationship: null,
    email: null,
    phoneNo: null,
    address: null,
  });

  const addNextOfKin = () => {
    const validated = validateInput(kinInfo, setKinErrors);
    if (validated) {
      submit(kinInfo);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Next of Kin Info</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <Row className="mb-4">
            <Col>
              <InputField
                label="Full name"
                type="text"
                nameAttr="kinFullname"
                value={kinInfo.fullName}
                changed={(val) => {
                  setKinErrors({ ...kinErrors, fullName: null });
                  setKinInfo({ ...kinInfo, fullName: val });
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
                  setKinErrors({ ...kinErrors, relationship: null });
                  setKinInfo({ ...kinInfo, relationship: val });
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
                  setKinErrors({ ...kinErrors, email: null });
                  setKinInfo({ ...kinInfo, email: val });
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
                  setKinErrors({ ...kinErrors, phoneNo: null });
                  setKinInfo({ ...kinInfo, phoneNo: val });
                }}
                error={kinErrors.phoneNo && kinErrors.phoneNo}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField
                label="Residential Address"
                type="text"
                nameAttr="kinAddress"
                placeholder="Street address to the nearest bus stop"
                value={kinInfo.address}
                changed={(val) => {
                  setKinErrors({ ...kinErrors, address: null });
                  setKinInfo({ ...kinInfo, address: val });
                }}
                error={kinErrors.address && kinErrors.address}
              />
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.body}>
        <Button
          className="mt-4"
          clicked={addNextOfKin}
          fullWidth
          bgColor="#741763"
          size="lg"
          color="#EBEBEB"
        >
          Save & Continue
        </Button>
      </Modal.Footer>
    </>
  );
};

export const BankInfo = ({ submit }) => {
  const {
    state: { loading },
  } = useContext(UserContext);

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    accountName: "",
  });

  const [bankInfoErrors, setBankInfoErrors] = useState({
    bankName: null,
    accountType: null,
    accountNumber: null,
    accountName: null,
  });

  const {
    state: { bankList, userBankDetails, bankLoading },
    getBankList,
    verifyBankInfo,
  } = useContext(BankContext);

  useEffect(() => {
    getBankList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bankNames = useMemo(() => {
    return bankList ? bankList.map((bank) => bank.name) : [];
  }, [bankList]);

  useEffect(() => {
    if (bankInfo.accountNumber.length === 10 && bankInfo.bankName) {
      const bank = bankList.find(
        (bank) => bank.name.toLowerCase() === bankInfo.bankName
      );
      const bankCode = bank.code;
      verifyBankInfo(bankInfo.accountNumber, bankCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankInfo.accountNumber, bankInfo.bankName]);

  useEffect(() => {
    if (userBankDetails) {
      setBankInfo({ ...bankInfo, accountName: userBankDetails.account_name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userBankDetails]);

  const addBankInfo = () => {
    const validated = validateInput(bankInfo, setBankInfoErrors);
    if (validated) {
      submit(bankInfo);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Bank Info</h2>
          <p className={styles.subtitle}>
            Add a bank account where we can send investment proceeds or loan
            requests to.
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <Row className="mb-4">
            <Col>
              <InputField
                type="select"
                label="Bank"
                options={bankNames}
                nameAttr="bank"
                value={bankInfo.bankName}
                changed={(val) => {
                  setBankInfoErrors({ ...bankInfoErrors, bankName: null });
                  setBankInfo({ ...bankInfo, bankName: val });
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
                  setBankInfoErrors({ ...bankInfoErrors, accountType: null });
                  setBankInfo({ ...bankInfo, accountType: val });
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
                  setBankInfoErrors({ ...bankInfoErrors, accountNumber: null });
                  setBankInfo({ ...bankInfo, accountNumber: val });
                }}
                error={
                  bankInfoErrors.accountNumber && bankInfoErrors.accountNumber
                }
              />
            </Col>
            <Col>
              {!bankLoading ? (
                <InputField
                  label="Account Name"
                  type="text"
                  nameAttr="accountName"
                  value={bankInfo.accountName}
                  changed={(val) => {
                    setBankInfoErrors({ ...bankInfoErrors, accountName: null });
                    setBankInfo({ ...bankInfo, accountName: val });
                  }}
                  error={
                    bankInfoErrors.accountName && bankInfoErrors.accountName
                  }
                />
              ) : (
                <div className={styles.loaderWrapper}>
                  <BeatLoader color="#741763" size={10} />
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.body}>
        <Button
          className="mt-4"
          clicked={addBankInfo}
          fullWidth
          loading={loading}
          disabled={loading}
          bgColor="#741763"
          size="lg"
          color="#EBEBEB"
        >
          Save & Continue
        </Button>
      </Modal.Footer>
    </>
  );
};

export const IdentityForm = ({ submit }) => {
  const {
    state: { loading },
  } = useContext(UserContext);
  const idFileRef = useRef();
  const passportFileRef = useRef();

  const [idType, setIdType] = useState("");

  const addIdentityInfo = () => {
    if (idFileRef.current.files.length > 0) {
      if (passportFileRef.current.files.length > 0) {
        if (idType) {
          const idFile = idFileRef.current.files[0];
          const passportFile = passportFileRef.current.files[0];
          submit(idFile, passportFile, idType);
        }
      } else {
        toast.error("Please upload a passport photograph of yourself");
      }
    } else {
      toast.error("Please upload a verified identification card");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={styles.headerText}>Identity</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <div className={styles.validId}>
            <p className={styles.validID}>
              Upload a valid government issued Identification
            </p>
            <InputField
              type="select"
              options={[
                "International Passport",
                "Driver's License",
                "Voters Card",
                "National Identity Card",
              ]}
              nameAttr="identityType"
              value={idType}
              changed={(val) => setIdType(val)}
            />
            <FileUploadButton
              label="Choose File"
              icon={<FaCloudUploadAlt className="ml-3" size="1.1em" />}
              id="id-upload"
              className="mt-3"
              fileRef={idFileRef}
              fullwidth
            />
          </div>
          <div className={styles.passportVerify}>
            <p className={styles.passportImg}>
              Please upload a clear and resent passport photograph.
            </p>
            <FileUploadButton
              label="Choose File"
              icon={<FaCloudUploadAlt className="ml-3" size="1.1em" />}
              id="passport-upload"
              fileRef={passportFileRef}
              fullwidth
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.body}>
        <Button
          className="mt-4"
          clicked={addIdentityInfo}
          fullWidth
          loading={loading}
          disabled={loading}
          bgColor="#741763"
          size="lg"
          color="#EBEBEB"
        >
          Save & Continue
        </Button>
      </Modal.Footer>
    </>
  );
};

export const OnboardSuccess = ({ close }) => {
  useEffect(() => {
    let closeModalTimer = setTimeout(() => {
      close();
    }, 3000);

    return () => {
      clearTimeout(closeModalTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal.Body>
        <div className={styles.onboard}>
          <FaCheckCircle size="4em" color="#741763" />
          <h4>User successfully onboarded.</h4>
          <Button
            className="mt-4"
            clicked={close}
            bgColor="#741763"
            size="sm"
            color="#EBEBEB"
          >
            Continue
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

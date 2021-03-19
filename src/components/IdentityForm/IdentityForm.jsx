import React, { useContext, useRef, useState } from "react";
import styles from "./IdentityForm.module.scss";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import FileUploadButton from "../FileUploadButton/FileUploadButton";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Context as UserContext } from "../../context/UserContext";

const IdentityForm = ({ submit }) => {
  const idFileRef = useRef();
  const passportFileRef = useRef();

  const [idType, setIdType] = useState(null);
  const {
    state: { loading },
  } = useContext(UserContext);

  const handleSubmit = () => {
    const idFile = idFileRef.current.files[0];
    const passportFile = passportFileRef.current.files[0];
    console.log(idFile, passportFile);
    submit(idFile, passportFile, idType);
  };

  return (
    <div className={styles.identityForm}>
      <div className={styles.identification}>
        <h3>Identification</h3>
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
        />
      </div>
      <div className={styles.passportVerify}>
        <h3>Upload passport photograph</h3>
        <p className={styles.passportImg}>
          Please upload a clear and resent passport photograph.
        </p>
        <FileUploadButton
          label="Choose File"
          icon={<FaCloudUploadAlt className="ml-3" size="1.1em" />}
          id="passport-upload"
          fileRef={passportFileRef}
        />
      </div>
      <Button
        className="mt-4"
        fullWidth
        bgColor="#741763"
        size="lg"
        color="#EBEBEB"
        clicked={handleSubmit}
        disabled={loading}
        loading={loading}
      >
        Save & Continue
      </Button>
      <p className={styles.extraTip}>
        Maximum file size accepted: <span>2mb</span>
      </p>
      <p className={styles.extraTip}>
        Accepted formats: <span>JPG & PNG</span>
      </p>
    </div>
  );
};

export default IdentityForm;

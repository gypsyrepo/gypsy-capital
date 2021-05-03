import React, { useState } from "react";
import styles from "./FileUploadButton.module.scss";
import { GoCheck } from "react-icons/go";
import _ from "lodash";

const FileUploadButton = ({
  label,
  visibleLabel,
  icon,
  id,
  className,
  fileRef,
  fullwidth,
  width,
}) => {
  const [fileName, setFileName] = useState(null);

  const handleInputBtnChange = (e) => {
    const [file] = e.target.files;
    const { name } = file;
    console.log(name);
    setFileName(name);
  };

  return (
    <>
      {visibleLabel && <p className={styles.label}>{visibleLabel}</p>}
      <div
        className={className}
        style={fullwidth ? { width: "100%" } : { width: width }}
      >
        <input
          onChange={(e) => handleInputBtnChange(e)}
          type="file"
          id={id}
          hidden
          ref={fileRef}
        />
        <label
          style={
            fileName
              ? { backgroundColor: "#741763", color: "#fff" }
              : { backgroundColor: "#fff", color: "#741763" }
          }
          className={
            fullwidth
              ? [styles.uploadBtn, styles.fullwidth].join(" ")
              : styles.uploadBtn
          }
          htmlFor={id}
        >
          {fileName
            ? _.truncate(fileName, {
                length: 24,
              })
            : label}
          {!fileName ? (
            icon
          ) : (
            <GoCheck size="19" className={styles.checkIcon} />
          )}
        </label>
      </div>
    </>
  );
};

export default FileUploadButton;

import React from 'react';
import styles from './FileUploadButton.module.scss';


const FileUploadButton = ({ label, icon, id, className, fileRef }) => {
  return (
    <div className={className}>
      <input type="file" id={id} hidden ref={fileRef} />
      <label className={styles.uploadBtn} htmlFor={id}>
        {label}
        {icon}
      </label>
    </div>
  )
}


export default FileUploadButton;
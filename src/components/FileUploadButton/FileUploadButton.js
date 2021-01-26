import React from 'react';
import styles from './FileUploadButton.module.scss';


const FileUploadButton = ({ label, visibleLabel, icon, id, className, fileRef, fullwidth }) => {
  return (
    <>
      {visibleLabel && <p className={styles.label}>{visibleLabel}</p>}
      <div className={className} styles={fullwidth && { width: '100%' }}>
        <input type="file" id={id} hidden ref={fileRef} />
        <label 
          className={ fullwidth ? [styles.uploadBtn, styles.fullwidth].join(' ') : styles.uploadBtn} 
          htmlFor={id}
        >
          {label}
          {icon}
        </label>
      </div>
    </>
  )
}


export default FileUploadButton;
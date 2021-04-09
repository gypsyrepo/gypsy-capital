import React from 'react';
import styles from './FileUploadButton.module.scss';


const FileUploadButton = ({ label, visibleLabel, icon, id, className, fileRef, fullwidth, width }) => {
  return (
    <>
      {visibleLabel && <p className={styles.label}>{visibleLabel}</p>}
      <div className={className} style={fullwidth ? { width: '100%' } : { width: width}}>
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
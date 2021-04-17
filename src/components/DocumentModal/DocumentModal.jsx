import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import styles from "./DocumentModal.module.scss";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const DocumentModal = ({ fileTitle, fileUrl, closeModal }) => {
  const modalBody = () => (
    <div className={styles.documentModal}>
      <div className={styles.header}>
        <p>{fileTitle}</p>
        <Button bgColor="#fff" color="#741763" size="sm" clicked={closeModal}>
          Close
        </Button>
      </div>
      <div className={styles.body}>
        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js">
          <Viewer
            fileUrl={`https://api.withmono.com/statements/WZOVfx7vlOZtFwgAOfUK.pdf`}
          />
        </Worker>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalBody(), document.body);
};

export default DocumentModal;

import React from 'react';
import styles from './ProgressBar.module.scss';
import { FaUnlock, FaUser, FaIdCard, FaCheck } from 'react-icons/fa';


const ProgressBar = ({ className }) => {
  return(
    <div className={[styles.progressBar, className].join(' ')}>
      <div className={styles.circle}>
        <span className={styles.activeStageIcon}>
          <FaUnlock color="#fff" />
        </span>
        <span className={styles.title}>Verify BVN</span>
      </div>
      <span className={styles.bar}></span>
      <div className={styles.circle}>
        <span className={styles.stageIcon}>
          <FaUser color="#606060" />
        </span>
        <span className={styles.title}>Personal</span>
      </div>
      <span className={styles.bar}></span>
      <div className={styles.circle}>
        <span className={styles.stageIcon}>
          <FaIdCard size="1.2em" color="#606060" />
        </span>
        <span className={styles.title}>Identity</span>
      </div>
      <span className={styles.bar}></span>
      <div className={styles.circle}>
        <span className={styles.stageIcon}>
          <FaCheck color="#606060" />
        </span>
        <span className={styles.title}>Complete</span>
      </div>
    </div>
  );
}


export default ProgressBar;
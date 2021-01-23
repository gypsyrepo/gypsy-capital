import React from 'react';
import styles from './ProgressBar.module.scss';
import { FaUnlock, FaUser, FaIdCard, FaCheck } from 'react-icons/fa';


const ProgressBar = ({ className, stage }) => {
  return(
    <div className={[styles.progressBar, className].join(' ')}>
      <div className={styles.circle}>
        <span className={styles.activeStageIcon}>
          <FaUnlock color="#fff" />
        </span>
        <span className={styles.activeTitle}>Verify BVN</span>
      </div>
      <span className={styles.bar}></span>
      <div className={styles.circle}>
        <span className={stage > 0 ? styles.activeStageIcon : styles.stageIcon}>
          <FaUser color={stage > 0 ? "#fff" : "#606060"} />
        </span>
        <span className={stage > 0 ? styles.activeTitle : styles.title}>Personal</span>
      </div>
      <span className={styles.bar}></span>
      <div className={styles.circle}>
        <span className={stage > 1 ? styles.activeStageIcon : styles.stageIcon}>
          <FaIdCard size="1.2em" color={stage > 1 ? "#fff" : "#606060"} />
        </span>
        <span className={stage > 1 ? styles.activeTitle : styles.title}>Identity</span>
      </div>
      <span className={styles.bar}></span>
      <div className={styles.circle}>
        <span className={stage > 2 ? styles.activeStageIcon : styles.stageIcon}>
          <FaCheck color={stage > 2 ? "#fff" : "#606060"} />
        </span>
        <span className={stage > 2 ? styles.activeTitle : styles.title}>Complete</span>
      </div>
    </div>
  );
}


export default ProgressBar;
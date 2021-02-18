import React from 'react';
import styles from './StatBox.module.scss';


const StatBox = ({ icon, title, statData }) => {
  return (
    <div className={styles.statBox}>
      <h5>{title}</h5>
      <div className={styles.statInfo}>
        <img src={icon} alt="stats box" />
        <h3>{statData}</h3>
      </div>
    </div>
  )
}


export default StatBox;
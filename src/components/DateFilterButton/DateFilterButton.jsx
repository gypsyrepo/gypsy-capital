import React from "react";
import styles from "./DateFilterButton.module.scss";
import { AiOutlineCalendar } from "react-icons/ai";

const DateFilterButton = ({ open, setState }) => {
  return (
    <div className={styles.dateFilterBtn}>
      <button onClick={setState}>
        <AiOutlineCalendar className={styles.icon} />
        Last 7 days
      </button>
      {open && (
        <div className={styles.menuDialog}>
          <ul>
            <li>Lifetime</li>
            <li>Last 7 days</li>
            <li>Last Month</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateFilterButton;

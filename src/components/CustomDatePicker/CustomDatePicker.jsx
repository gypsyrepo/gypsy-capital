import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import styles from "./CustomDatePicker.module.scss";

const CustomDatePicker = ({ value, changed, label, error, disable }) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      className={styles.datePicker}
      onClick={onClick}
      value={value}
      ref={ref}
      disabled={disable}
    />
  ));
  return (
    <>
      <label>{label}</label>
      <DatePicker
        selected={value}
        onChange={(date) => {
          console.log(date);
          changed(date);
        }}
        customInput={<CustomInput />}
        dateFormat="dd/MM/yyyy"
      />
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default CustomDatePicker;

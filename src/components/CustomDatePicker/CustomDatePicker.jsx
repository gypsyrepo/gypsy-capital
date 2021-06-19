import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import styles from "./CustomDatePicker.module.scss";
import { getYear, getMonth } from "date-fns";
import _ from "lodash";

const CustomDatePicker = ({ value, changed, label, error, disable }) => {
  const years = _.range(1900, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{ margin: 10, display: "flex", justifyContent: "center" }}
          >
            <button
              style={{
                backgroundColor: "#741763",
                border: "none",
                color: "#fff",
                padding: "4px 10px",
              }}
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              {"<"}
            </button>
            <select
              style={{ padding: "5px 7px" }}
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              style={{
                backgroundColor: "#741763",
                border: "none",
                color: "#fff",
                padding: "4px 10px",
              }}
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              {">"}
            </button>
          </div>
        )}
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

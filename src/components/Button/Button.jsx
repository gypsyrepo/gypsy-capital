import { getDefaultNormalizer } from "@testing-library/react";
import React from "react";
import styles from "./Button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Button = ({
  children,
  className,
  fullWidth,
  clicked,
  bgColor,
  size,
  color,
  disabled,
  loading,
}) => {
  const buttonStyle = {
    width: fullWidth ? "100%" : getDefaultNormalizer,
    backgroundColor: bgColor,
    padding: size === "lg" ? "12px 28px" : "8px 28px",
    color: color,
  };

  return (
    <button
      className={[className, styles.button].join(" ")}
      style={buttonStyle}
      onClick={clicked}
      disabled={disabled}
    >
      {loading && <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-3" />}
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;

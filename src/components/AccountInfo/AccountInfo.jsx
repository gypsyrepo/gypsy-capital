import React from "react";
import styles from "./AccountInfo.module.scss";

const AccountInfo = ({ info }) => {
  return (
    <>
      <div className={styles.accountInfo}>
        <div className={styles.header}>
          <h3>
            Customer
            <br /> Account Information
          </h3>
        </div>
        <div className={styles.body}>
          {info ? (
            <>
              <div>
                <h4>Customer Name:</h4>
                <p>{info?.name}</p>
              </div>
              <div>
                <h4>Account Number:</h4>
                <p>{info?.accountNumber}</p>
              </div>
              <div>
                <h4>Account Type:</h4>
                <p>{info?.type.replaceAll("_", " ")}</p>
              </div>
              <div>
                <h4>Bank:</h4>
                <p>{info?.institution?.name}</p>
              </div>
              <div>
                <h4>Balance:</h4>
                <p>{`NGN ${info?.balance / 100}`}</p>
              </div>
            </>
          ) : (
            <div>
              <p>Account information not available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountInfo;

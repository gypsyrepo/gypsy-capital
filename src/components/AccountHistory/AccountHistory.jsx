import React, { useState, useEffect } from "react";
import styles from "./AccountHistory.module.scss";
import moment from "moment";
import Button from "../Button/Button";

const transactionsPerPage = 4;
let arrayForHoldingTransactions = [];

const AccountHistory = ({ history }) => {
  const [transactionsToShow, setTransactionsToShow] = useState([]);
  const [next, setNext] = useState(4);

  const sliceAndAdd = (start, end) => {
    const sliced = history.slice(start, end);
    arrayForHoldingTransactions = [...arrayForHoldingTransactions, ...sliced];
    setTransactionsToShow(arrayForHoldingTransactions);
  };

  useEffect(() => {
    sliceAndAdd(0, transactionsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    sliceAndAdd(next, next + transactionsPerPage);
    setNext(next + transactionsPerPage);
  };

  return (
    <>
      <div className={styles.accountHistory}>
        {history.length === 0 && (
          <div className={styles.noTransactions}>
            <p>No transactions available</p>
          </div>
        )}
        {history.length > 0 &&
          transactionsToShow.map((instance) => {
            console.log(transactionsToShow);
            return (
              <div
                className={styles.historyInstance}
                style={
                  instance?.type === "debit"
                    ? { borderLeft: "4px solid #ce4757" }
                    : { borderLeft: "4px solid #78BD62" }
                }
              >
                <div className={styles.narrationInfo}>
                  <p>{moment(instance?.date).format("DD/MM/YYYY")}</p>
                  <h4>{instance?.narration}</h4>
                </div>
                <div className={styles.financeInfo}>
                  <p className={styles.balance}>{`BALANCE: N${(
                    instance?.balance / 100
                  ).toFixed(2)}`}</p>
                  <p
                    className={styles.creditOrDebit}
                    style={
                      instance?.type === "debit"
                        ? { color: "#ce4757" }
                        : { color: "#78BD62" }
                    }
                  >
                    {`${instance?.type === "debit" ? "-" : "+"}${
                      instance?.amount / 100
                    }`}
                    <span>NGN</span>
                  </p>
                </div>
              </div>
            );
          })}
        {history.length > 0 && (
          <Button
            bgColor="#741763"
            color="#fff"
            clicked={handleLoadMore}
            className={styles.loadMoreBtn}
            size="lg"
          >
            Load More...
          </Button>
        )}
      </div>
    </>
  );
};

export default AccountHistory;

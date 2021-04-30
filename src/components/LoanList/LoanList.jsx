import React, { useMemo, useState } from "react";
import styles from "./LoanList.module.scss";
import { numberWithCommas } from "../../utils/nigeriaStates";
import { Pagination, Table } from "react-bootstrap";
import usePagination from "../../hooks/usePagination";
import { TiCancelOutline } from "react-icons/ti";
import moment from "moment";
import InputField from "../InputField/InputField";
import { Link } from "react-router-dom";
import _ from "lodash";

const LoanList = ({ loanList, userRole }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  // eslint-disable-next-line no-unused-vars
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [filterInput, setFilterInput] = useState("all");

  const filteredList = useMemo(() => {
    if (filterInput === "all") {
      return loanList;
    } else if (filterInput === "active loans") {
      return loanList.filter(
        (loanInstance) => loanInstance.status === "approved"
      );
    } else if (filterInput === "pending loans") {
      return loanList.filter(
        (loanInstance) => loanInstance.status === "pending"
      );
    } else if (filterInput === "declined loans") {
      return loanList.filter(
        (loanInstance) => loanInstance.status === "declined"
      );
    } else if (filterInput === "expired loans") {
      return loanList.filter(
        (loanInstance) => loanInstance.status === "expired"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanList, filterInput]);

  console.log(loanList);

  const {
    currentList,
    items,
    goToPrevPage,
    goToNextPage,
    decrementBtn,
    incrementBtn,
  } = usePagination(
    currentPage,
    postsPerPage,
    filteredList,
    setCurrentPage,
    styles,
    maxPageNumberLimit,
    minPageNumberLimit,
    setmaxPageNumberLimit,
    setminPageNumberLimit,
    pageNumberLimit
  );

  const detailRoutePrefix = useMemo(() => {
    if (userRole === "sales") {
      return "sales-agent";
    } else if (userRole === "super") {
      return "super-admin";
    } else {
      return userRole;
    }
  }, [userRole]);

  return (
    <>
      <div className={styles.welcomeGroup}>
        <div>
          <h2>Loans</h2>
          <p className={styles.currentDate}>
            Today is {moment().format("dddd Do[,] MMMM")}.
          </p>
        </div>
      </div>
      <div className={styles.loansTable}>
        <div className={styles.filterInput}>
          <p>Filter</p>
          <div className={styles.inputWrapper}>
            <InputField
              type="select"
              options={[
                "All",
                "Active Loans",
                "Pending Loans",
                "Declined Loans",
                "Expired Loans",
              ]}
              nameAttr="filterInput"
              value={filterInput}
              changed={(val) => setFilterInput(val)}
            />
          </div>
        </div>
        <div className={styles.cardTable}>
          <Table striped>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Client Name</th>
                <th>Monthly Repayment</th>
                <th>Tenure</th>
                <th>Status</th>
                <th>Repayment Source</th>
                <th>Loan Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            {currentList && currentList.length > 0 ? (
              <tbody>
                {currentList.map((loan) => {
                  let loanBalance = loan?.repayment
                    .filter((repaid) => {
                      return repaid.status === true;
                    })
                    .reduce((acc, curr) => {
                      return curr.scheduledAmount + acc;
                    }, 0);

                  loanBalance = loan?.calculatedPayBack - loanBalance;

                  return (
                    <tr>
                      <td className={styles.loanId}>
                        <Link to={`/${detailRoutePrefix}/loan/${loan._id}`}>
                          {loan._id.slice(0, 6)}
                        </Link>
                      </td>
                      <td>{`${loan?.clientInfo[0]?.firstName.split(" ")[0]} ${
                        loan?.clientInfo[0]?.lastName
                      }`}</td>
                      <td>{`N ${numberWithCommas(loan.monthlyRepayment)}`}</td>
                      <td>{loan.paymentPeriod}</td>
                      <td>{_.capitalize(loan.status)}</td>
                      <td>{"Salary"}</td>
                      <td>{`N ${numberWithCommas(loan.amount)}`}</td>
                      <td>{`N ${numberWithCommas(loanBalance)}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            ) : null}
          </Table>
          {currentList && currentList.length === 0 ? (
            <div className={styles.nullList}>
              <TiCancelOutline size="6em" color="rgba(116, 23, 99, 0.6)" />
            </div>
          ) : null}
          {currentList && currentList.length > 0 ? (
            <div className={styles.tableFooter}>
              <div className={styles.rowsInput}>
                <p>Rows per page: </p>
                <select
                  onChange={(e) =>
                    setPostsPerPage(Number(e.currentTarget.value))
                  }
                >
                  <option value={5} selected>
                    5
                  </option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={10}>25</option>
                  <option value={30}>30</option>
                </select>
              </div>
              <Pagination className={styles.pagination}>
                <Pagination.Prev onClick={goToPrevPage} />
                {decrementBtn}
                {items}
                {incrementBtn}
                <Pagination.Next onClick={goToNextPage} />
              </Pagination>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default LoanList;

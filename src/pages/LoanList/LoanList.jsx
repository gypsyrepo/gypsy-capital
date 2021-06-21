import React, { useState, useContext, useEffect, useMemo } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import styles from "./LoanList.module.scss";
import { useLocation, Link } from "react-router-dom";
import { routes } from "../../routes/sidebarRoutes";
import InputField from "../../components/InputField/InputField";
import moment from "moment";
import { Table, Pagination } from "react-bootstrap";
import { numberWithCommas } from "../../utils/nigeriaStates";
import usePagination from "../../hooks/usePagination";
import { Context as LoanContext } from "../../context/LoanContext";
import _ from "lodash";
import Loader from "../../components/Loader/Loader";
import { TiCancelOutline } from "react-icons/ti";

const LoanList = () => {
  const {
    state: { loans, loading },
    retrieveClientLoans,
  } = useContext(LoanContext);

  useEffect(() => {
    retrieveClientLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useLocation();
  const salesRoutes = routes[1];
  const [filterInput, setFilterInput] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  // eslint-disable-next-line no-unused-vars
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const filteredList = useMemo(() => {
    if (filterInput === "all") {
      return loans;
    } else if (filterInput === "active loans") {
      return loans.filter((loanInstance) => loanInstance.status === "approved");
    } else if (filterInput === "pending loans") {
      return loans.filter((loanInstance) => loanInstance.status === "pending");
    } else if (filterInput === "declined loans") {
      return loans.filter((loanInstance) => loanInstance.status === "declined");
    } else if (filterInput === "expired loans") {
      return loans.filter((loanInstance) => loanInstance.status === "expired");
    }
  }, [loans, filterInput]);

  const {
    currentList,
    items,
    goToPrevPage,
    goToNextPage,
    incrementBtn,
    decrementBtn,
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

  return (
    <Dashboard sidebarRoutes={salesRoutes} location={location}>
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
        {!loading ? (
          <div className={styles.cardTable}>
            <Table striped>
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Monthly Repayment</th>
                  <th>Tenure</th>
                  <th>Status</th>
                  <th>Repayment Source</th>
                  <th>Loan Amount</th>
                  <th>DTI</th>
                  <th>Balance</th>
                </tr>
              </thead>
              {currentList && currentList.length > 0 ? (
                <tbody>
                  {currentList.map((loan, idx) => {
                    let loanBalance = loan?.repayment
                      .filter((repaid) => {
                        return repaid.status === true;
                      })
                      .reduce((acc, curr) => {
                        return curr.scheduledAmount + acc;
                      }, 0);

                    loanBalance = loan?.calculatedPayBack - loanBalance;

                    return (
                      <tr key={idx}>
                        <td className={styles.loanId}>
                          <Link to={`/sales-agent/loan/${loan._id}`}>
                            {loan._id.slice(0, 6)}
                          </Link>
                        </td>
                        <td>{`N ${numberWithCommas(
                          loan.monthlyRepayment
                        )}`}</td>
                        <td>{loan.paymentPeriod}</td>
                        <td>{_.capitalize(loan.status)}</td>
                        <td>{"Salary"}</td>
                        <td>{`N${numberWithCommas(
                          loan?.approvedAmount || loan?.amount
                        )}`}</td>
                        <td>{`${loan?.DTI}%`}</td>
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
        ) : (
          <Loader />
        )}
      </div>
    </Dashboard>
  );
};

export default LoanList;

import React, { useState } from "react";
import styles from "./ReportsTable.module.scss";
import { Table, Pagination } from "react-bootstrap";
import { TiCancelOutline } from "react-icons/ti";
import usePagination from "../../hooks/usePagination";

const ReportsTable = ({ tableHeader, list }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  // eslint-disable-next-line no-unused-vars
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const {
    currentList,
    decrementBtn,
    goToNextPage,
    goToPrevPage,
    incrementBtn,
    items,
  } = usePagination(
    currentPage,
    postsPerPage,
    list,
    setCurrentPage,
    styles,
    maxPageNumberLimit,
    minPageNumberLimit,
    setmaxPageNumberLimit,
    setminPageNumberLimit,
    pageNumberLimit
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.reportsTable}>
        <Table striped>
          <thead>
            <tr>
              {tableHeader.map((header) => (
                <th key={header.replaceAll(" ", "")}>{header}</th>
              ))}
            </tr>
          </thead>
          {currentList && currentList.length > 0 ? (
            <tbody>
              {currentList.map((listItem) => {
                const arrayOfValues = Object.values(listItem);
                return (
                  <tr key={listItem?.loanId}>
                    {arrayOfValues.map((value) => (
                      <td>{value || "_____"}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          ) : null}
        </Table>
        {!currentList || currentList.length === 0 ? (
          <div className={styles.nullList}>
            <TiCancelOutline size="6em" color="rgba(116, 23, 99, 0.6)" />
          </div>
        ) : null}
      </div>
      {currentList && currentList.length > 0 ? (
        <div className={styles.tableFooter}>
          <div className={styles.rowsInput}>
            <p>Rows per page: </p>
            <select
              onChange={(e) => setPostsPerPage(Number(e.currentTarget.value))}
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
  );
};

export default ReportsTable;

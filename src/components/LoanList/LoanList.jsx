import React, { useMemo, useState } from 'react';
import styles from './LoanList.module.scss';
import { numberWithCommas } from '../../utils/nigeriaStates';
import { Pagination, Table } from 'react-bootstrap';
import usePagination from '../../hooks/usePagination'
import moment from 'moment';
import InputField from '../InputField/InputField';
import { Link } from 'react-router-dom';
import _ from 'lodash';



const LoanList = ({ loanList, userRole }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [filterInput, setFilterInput] = useState('');

  const {  
    currentList,
    items,
    goToPrevPage,
    goToNextPage
  } = usePagination(currentPage, postsPerPage, loanList, setCurrentPage, styles);

  const detailRoutePrefix = useMemo(() => {
    if(userRole === "sales") {
      return "sales-agent"
    } else {
      return userRole
    }
  }, [userRole])

  return (
    <>
      <div className={styles.welcomeGroup}>
        <div>
          <h2>Loans</h2>
          <p className={styles.currentDate}>Today is {moment().format('dddd Do[,] MMMM')}.</p>
        </div>
      </div>
      <div className={styles.loansTable}>
        <div className={styles.filterInput}>
          <p>Filter</p>
          <div className={styles.inputWrapper}>
            <InputField 
              type="select"
              options={['Active Loans', 'Pending Loans', 'Declined Loans', 'Expired Loans']}
              nameAttr='filterInput'
              value={filterInput}
              changed={(val) => setFilterInput(val)}
            />
          </div>
        </div>
        <div className={styles.cardTable}>
          <Table>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Monthly Repayment</th>
                <th>Tenure</th>
                <th>Status</th>
                <th>Repayment Source</th>
                <th>Loan Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              { currentList.map((loan, idx) => (
                <tr>
                  <td className={styles.loanId}>
                    <Link to={`/${detailRoutePrefix}/loan/${loan._id}`}>
                      {loan._id.slice(0,6)}
                    </Link>
                  </td>
                  <td>{`N ${numberWithCommas(loan.monthlyRepayment)}`}</td>
                  <td>{loan.paymentPeriod}</td>
                  <td>{_.capitalize(loan.status)}</td>
                  <td>{'Salary'}</td>
                  <td>{`N ${numberWithCommas(loan.amount)}`}</td>
                  <td>______</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className={styles.tableFooter}>
            <div className={styles.rowsInput}>
              <p>Rows per page: </p>
              <select onChange={(e) => setPostsPerPage(Number(e.currentTarget.value))}>
                <option value={5} selected>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={10}>25</option>
                <option value={30}>30</option>
              </select>
            </div>
            <Pagination className={styles.pagination}>
              <Pagination.Prev onClick={goToPrevPage}/>
              {items}
              <Pagination.Next onClick={goToNextPage} />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  )
}


export default LoanList;
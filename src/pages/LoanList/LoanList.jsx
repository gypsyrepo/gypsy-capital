import React, { useState, useMemo } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './LoanList.module.scss';
import { useLocation } from 'react-router-dom';
import { routes } from '../../routes/sidebarRoutes';
import InputField from '../../components/InputField/InputField';
import moment from 'moment';
import { Table, Pagination } from 'react-bootstrap';
import { loanList } from '../../utils/dummyData';


const LoanList = () => {

  const location = useLocation();
  const salesRoutes = routes[1];

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLastLoan = useMemo(() => {
    return currentPage * postsPerPage
  }, [currentPage, postsPerPage]);

  const indexOfFirstLoan = useMemo(() => {
    return indexOfLastLoan - postsPerPage
  }, [indexOfLastLoan, postsPerPage]);

  const currentLoans = useMemo(() => {
    return loanList.slice(indexOfFirstLoan, indexOfLastLoan);
  }, [indexOfLastLoan, indexOfFirstLoan])

  const goToPage = (event) => {
    if(event.target.text) {
      setCurrentPage(Number(event.target.text));
    }
  }

  let items = [];

  for (let i=1; i <= Math.ceil(loanList.length / postsPerPage); i++) {
    items.push(
      <Pagination.Item onClick={goToPage} key={i} active={i === currentPage}>
        {i}
      </Pagination.Item>
    )
  }

  const goToPrevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const goToNextPage = () => {
    if(currentPage < Math.ceil(loanList.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <Dashboard sidebarRoutes={salesRoutes} location={location}>
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
              options={['Status', 'Tenure']}
              nameAttr='filterInput'
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
              { currentLoans.map((loan, idx) => (
                <tr>
                  <td className={styles.loanId}>
                    {loan.loanId}
                  </td>
                  <td>{loan.monthlyRepayment}</td>
                  <td>{loan.tenure}</td>
                  <td>{loan.status}</td>
                  <td>{loan.repaymentSource}</td>
                  <td>{loan.loanAmt}</td>
                  <td>{loan.balance}</td>
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
    </Dashboard>
  )
}


export default LoanList;
import React, { useState } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './ProcessorClients.module.scss';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation, Link } from 'react-router-dom';
import moment from 'moment'
import { Table, Pagination } from 'react-bootstrap';
import usePagination from '../../hooks/usePagination';
import { clientList } from '../../utils/dummyData';


const ProcessorClients = () => {

  const processorRoute = routes[2];
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const { 
    currentList, 
    items, 
    goToNextPage, 
    goToPrevPage 
  } = usePagination(currentPage, postsPerPage, clientList, setCurrentPage, styles);

  return (
    <Dashboard sidebarRoutes={processorRoute} location={location}>
      <div className={styles.welcomeGroup}>
        <div>
          <h2>Clients</h2>
          <p className={styles.currentDate}>Today is {moment().format('dddd Do[,] MMMM')}.</p>
        </div>
      </div>
      <div className={styles.overview}>
        <div className={styles.overviewBox}>
          <h3>Clients Overview</h3>
          <Table className={styles.table}>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Client ID</th>
                <th>Phone Number</th>
                <th>BVN</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              { currentList.map((client, idx) => (
                <tr>
                  <td>{client.clientName}</td>
                  <td className={styles.loanId}>
                    <Link to='/sales-agent/client/general'>{client.loanId}</Link>
                  </td>
                  <td>{client.phoneNo}</td>
                  <td>{client.bvn}</td>
                  <td>{client.dateCreated}</td>
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


export default ProcessorClients;
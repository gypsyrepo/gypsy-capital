import React, { useContext, useEffect, useMemo, useState } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './ClientListPage.module.scss';
import { routes } from '../../routes/sidebarRoutes';
import { useLocation,Link } from 'react-router-dom';
import moment from 'moment';
import  Button from '../../components/Button/Button';
import { Table, Pagination } from 'react-bootstrap';
import usePagination from '../../hooks/usePagination';
import ModalForm from '../../components/ModalForm/ModalForm';
import { Context as UserContext } from '../../context/UserContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { TiCancelOutline } from 'react-icons/ti';
import _ from 'lodash';
import Loader from '../../components/Loader/Loader';


const ClientListPage = () => {

  const location = useLocation();
  const salesRoute = routes[1];

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);

  const { state: { clients, loading }, getClientList, clearErrors } = useContext(UserContext);
  const { state: { user } } = useContext(AuthContext);

  useEffect(() => {
    clearErrors();
    getClientList();
  }, []);

  const salesClients = useMemo(() => {
    if(clients && clients.length > 0) {
      return clients.filter(client => client.addedBy === user.user_id )
    } else {
      return []
    }
  }, [clients]);

  // console.log(salesClients);

  const { 
    currentList, 
    items, 
    goToNextPage, 
    goToPrevPage 
  } = usePagination(currentPage, postsPerPage, salesClients, setCurrentPage, styles);


  const onboardStart = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    getClientList();
    setModalOpen(false);
  }


  return (
    <Dashboard sidebarRoutes={salesRoute} location={location}>
      <div className={styles.welcomeGroup}>
        <div>
          <h2>Clients</h2>
          <p className={styles.currentDate}>Today is {moment().format('dddd Do[,] MMMM')}.</p>
        </div>
        <Button
          size="sm" 
          bgColor="#741763" 
          color="#fff"
          clicked={onboardStart}
        >
          Onboard New Client
        </Button>
      </div>
      { !loading ? <div className={styles.overview}>
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
            { currentList && currentList.length > 0 ? <tbody>
              { currentList.map((client, idx) => (
                <tr>
                  <td>{_.capitalize(client.firstName)} {_.capitalize(client.lastName)}</td>
                  <td className={styles.loanId}>
                    <Link to={`/sales-agent/client/${client._id}`}>{client._id.substr(0,6)}</Link>
                  </td>
                  <td>{client.phoneNumber.replace('234', '0')}</td>
                  <td>{client.bvn}</td>
                  <td>{moment(client.createdAt).format('lll')}</td>
                </tr>
              ))}
            </tbody> : null }
          </Table>
          { currentList && currentList.length === 0 ? <div className={styles.nullList}>
            <TiCancelOutline size="6em" color="rgba(116, 23, 99, 0.6)" />
          </div> : null }
          { currentList && currentList.length > 0 ? <div className={styles.tableFooter}>
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
          </div> : null }
        </div>
      </div> : <Loader /> }
      <ModalForm openState={modalOpen} closeHandler={closeModal} />
    </Dashboard>
  )
}


export default ClientListPage;
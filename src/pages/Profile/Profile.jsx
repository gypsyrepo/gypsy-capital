import React from 'react';
import styles from './Profile.module.scss';
import { Row, Col } from 'react-bootstrap';
import Logo from '../../assets/logo-white.png';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import pageUrl from '../../routes/pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';


const Profile = ({ location }) => {

  console.log(location);

  return(
    <div className={styles.container}>
      <Row>
        <Col className={styles.menuPanel} sm={3}>
          <div className={styles.header}>
            <img src={Logo} alt="Gypsy Logo" width={150} />
          </div>
          <div className={styles.menuList}>
            <ul>
              <li className="mb-4">
                <FiLayers size="1.3em" color="#fff" />
                <Link to={pageUrl.DASHBOARD_HOMEPAGE}>Dashboard</Link>
              </li>
              <li className="mb-4">
                <GiTakeMyMoney size="1.3em" color="#fff" />
                <Link to={pageUrl.CONSUMER_CREDIT_PAGE}>Consumer Credit</Link>
              </li>
              <li className="mb-4">
                <BiCreditCard  size="1.3em" color="#fff" />
                <Link to={pageUrl.CREDIT_REPORT_PAGE}>Credit Report</Link>
              </li>
              <li className="mb-4">
                <AiOutlineUser  size="1.3em" color="#fff" />
                <Link to={pageUrl.PROFILE_PAGE}>Profile</Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col sm={9} className={styles.mainPanel}>
          <div className={styles.header}>
            <FontAwesomeIcon icon={faBell} size="2x" className="mr-5" color="#741763" />
            <Button size="sm" bgColor="#A0208931" color="#212121">Log out</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}


export default Profile;
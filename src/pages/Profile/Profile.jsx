import React from 'react';
import styles from './Profile.module.scss';
import { Row, Col } from 'react-bootstrap';
import Logo from '../../assets/logo-white.png';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';


const Profile = () => {
  return(
    <div className={styles.container}>
      <Row>
        <Col className={styles.menuPanel} sm={3}>
          <div className={styles.header}>
            <img src={Logo} alt="Gypsy Logo" width={150} />
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
import React from 'react';
import styles from './Dashboard.module.scss';
import { Row, Col } from 'react-bootstrap';
import Logo from '../../assets/logo-white.png';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { MdNotificationsNone } from 'react-icons/md';


const Dashboard = ({ children, sidebarRoutes, location }) => {

  console.log(location)

  return(
    <div className={styles.container}>
      <Row className={styles.header}>
        <Col className={styles.logoGrid} sm={3}>
          <img src={Logo} alt="Gypsy Logo" width={150} />
        </Col>
        <Col className={styles.navGrid} sm={9}>
          <MdNotificationsNone size="2em" className="mr-5" color="#741763" />
          <Button size="sm" bgColor="#A0208931" color="#212121">Log out</Button>
        </Col>
      </Row>
      <Row>
        <Col className={styles.menuPanel} sm={3}>
          <div className={styles.menuList}>
            <ul>
              { sidebarRoutes.map(route => {
                if(location.pathname === route.link) {
                  return (
                    <li className={[styles.activeMenu, "mb-4"].join(' ')}>
                      <route.icon size="1.3em" color="#741763" />
                      <Link className={styles.activeLink} to={route.link}>{route.label}</Link>
                    </li>
                  )
                } else {
                  return (
                    <li className="mb-4">
                      <route.icon size="1.3em" color="#fff" />
                      <Link to={route.link}>{route.label}</Link>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </Col>
        <Col sm={9} className={styles.mainPanel}>
          <div className={styles.mainContent}>
            {children}
          </div>
        </Col>
      </Row>
    </div>
  );
}


export default Dashboard;
import React, { useContext, useState } from 'react';
import styles from './Dashboard.module.scss';
import { Row, Col } from 'react-bootstrap';
import Logo from '../../assets/logo-white.png';
import Button from '../../components/Button/Button';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdNotificationsNone } from 'react-icons/md';
import { Context as AuthContext } from '../../context/AuthContext';
import placeholderAvatar from '../../assets/placeholder.png';
import { FiLogOut } from 'react-icons/fi';


const Dashboard = ({ children, sidebarRoutes, location }) => {

  console.log(location)

  const { state: { user }, logout } = useContext(AuthContext);
  const signout = () => {
    logout();
  }

  // const role = "sales";

  const [searchTerm, setSearchTerm] = useState('');

  if(!user){
    return null;
  }

  return(
    <div className={styles.container}>
      <Row className={styles.header}>
        <Col className={styles.logoGrid} sm={3}>
          <img src={Logo} alt="Gypsy Logo" width={150} />
        </Col>
        <Col className={ user.role === "client" ? styles.navGrid : styles.altNavGrid} sm={9}>
          { user.role && user.role === "client" ? 
          <>
            <MdNotificationsNone size="2em" className="mr-5" color="#741763" />
            <Button clicked={signout} size="sm" bgColor="#A0208931" color="#212121">Log out</Button>
          </> : null
          }
          {
            user.role && user.role !== "client" ?
            <>
              <div className={styles.searchBar}>
                <FaSearch className={styles.searchIcon} />
                <input 
                  type="text"
                  name="searchTerm"
                  placeholder="Search for customer by  name, number or BVN"
                  className={styles.searchTerm}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.currentTarget.value)
                  }}
                />
              </div>
              <div className={styles.profileGroup}>
                <MdNotificationsNone style={{ display: "block" }} size="2em" className="mr-5" color="#741763" />
                <div className={styles.profileAvi}>
                  <img src={placeholderAvatar} alt="Profile Picture" />
                  <div className={styles.userInfo}>
                    <p>Moses Emmanuel</p>
                    <p>Sales agent</p>
                  </div>
                </div>
              </div>
            </> : null
          }
        </Col>
      </Row>
      <Row>
        <Col className={styles.menuPanel} sm={3}>
          <div className={styles.menuList}>
            <ul>
              { sidebarRoutes.map(route => {
                if(location.pathname.includes(route.rootLink)) {
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
            { user.role && user.role !== "client" ? 
              <ul className={styles.authGroup}>
                <li onClick={signout}>
                  <FiLogOut className="mr-3" size="1.3em" color="#fff" />
                  Log out
                </li>
              </ul> :
              null
            }
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
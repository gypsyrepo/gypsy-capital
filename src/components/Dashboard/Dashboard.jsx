import React, { useContext, useState } from "react";
import styles from "./Dashboard.module.scss";
import { Row, Col } from "react-bootstrap";
import Logo from "../../assets/logo-white.png";
import Button from "../../components/Button/Button";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { Link } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import { Context as AuthContext } from "../../context/AuthContext";
import placeholderAvatar from "../../assets/placeholder.png";
import { FiLogOut } from "react-icons/fi";
import _ from "lodash";

const Dashboard = ({ children, sidebarRoutes, location }) => {
  // console.log(location)

  const {
    state: { user },
    logout,
  } = useContext(AuthContext);
  const signout = () => {
    logout();
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Row className={styles.header}>
        <Col className={styles.logoGrid} sm={3}>
          <img src={Logo} alt="Gypsy Logo" />
        </Col>
        <Col
          className={
            user.role === "client" ? styles.navGrid : styles.altNavGrid
          }
          sm={9}
        >
          {user.role && user.role === "client" ? (
            <>
              <MdNotificationsNone
                size="2em"
                className="mr-5"
                color="#741763"
              />
              <Button
                clicked={signout}
                size="sm"
                bgColor="#A0208931"
                color="#212121"
              >
                Log out
              </Button>
            </>
          ) : null}
          {user.role && user.role !== "client" ? (
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
                    setSearchTerm(e.currentTarget.value);
                  }}
                />
              </div>
              <div className={styles.profileGroup}>
                <MdNotificationsNone
                  style={{ display: "block" }}
                  size="2em"
                  className="mr-5"
                  color="#741763"
                />
                <div className={styles.profileAvi}>
                  {user.profilePhoto.length === 0 ? (
                    <div className={styles.avatarWrapper}>
                      <FaUser size="1.4em" color="gray" />
                    </div>
                  ) : (
                    <img src={placeholderAvatar} alt="Profile Picture" />
                  )}
                  <div className={styles.userInfo}>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <p>
                      {_.capitalize(user.role)}{" "}
                      {user.role === "sales" && "agent"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </Col>
      </Row>
      <Row className={styles.responsiveHeader}>
        <Col className={styles.headerCol}>
          <div className={styles.headerGrid}>
            <div className={styles.wrapper}>
              <IoMdMenu
                onClick={() => setMenuOpen(!menuOpen)}
                color="#fff"
                className="mr-4"
                size="1.8rem"
              />
              <img src={Logo} alt="Gypsy Logo" />
            </div>
            <MdNotificationsNone
              style={{ display: "block" }}
              size="1.8em"
              color="#fff"
            />
          </div>
        </Col>
        <div
          className={
            !menuOpen
              ? ["styles.navOverlay", "styles.inactive"].join(" ")
              : styles.navOverlay
          }
          onClick={() => setMenuOpen(!menuOpen)}
        ></div>
        <div
          className={
            !menuOpen
              ? styles.responsiveSideBar
              : [styles.responsiveSideBar, styles.visible].join(" ")
          }
        >
          <div className={styles.menuWrapper}>
            <ul>
              {sidebarRoutes.map((route, idx) => {
                return (
                  <li key={idx} className="mb-4">
                    <route.icon size="1.3em" color="rgb(46, 46, 46)" />
                    <Link to={route.link}>{route.label}</Link>
                  </li>
                );
              })}
            </ul>
            <div className={styles.footer}>
              <button>
                <CgLogOut className="mr-2" size="1.3em" color="#f00" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <Col className={styles.menuPanel} sm={3}>
          <div className={styles.menuList}>
            <ul>
              {sidebarRoutes.map((route) => {
                if (location.pathname.includes(route.rootLink)) {
                  return (
                    <li className={[styles.activeMenu, "mb-4"].join(" ")}>
                      <route.icon size="1.3em" color="#741763" />
                      <Link className={styles.activeLink} to={route.link}>
                        {route.label}
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li className="mb-4">
                      <route.icon size="1.3em" color="#fff" />
                      <Link to={route.link}>{route.label}</Link>
                    </li>
                  );
                }
              })}
            </ul>
            {user.role && user.role !== "client" ? (
              <ul className={styles.authGroup}>
                <li onClick={signout}>
                  <FiLogOut className="mr-3" size="1.3em" color="#fff" />
                  Log out
                </li>
              </ul>
            ) : null}
          </div>
        </Col>
        <Col sm={12} lg={9} className={styles.mainPanel}>
          <div className={styles.mainContent}>{children}</div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

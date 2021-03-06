import React, { useState } from 'react';
import styles from './NavBar.module.scss';
import Logo from '../../assets/logo.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import pageUrl from '../../routes/pageUrl';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiCloseFill } from 'react-icons/ri';

const NavBar = () => {

  const location = useLocation();
  const history = useHistory();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navContainer}>
      <Link to={pageUrl.HOMEPAGE}><img src={Logo} alt="Gypsy Logo" /></Link>
      <div className={styles.navGroup}>
        <ul className={styles.mainNav}>
          <li>
            <Link 
              className={location === pageUrl.PRODUCTS_PAGE ? styles.activeMenu : null} 
              to='/products/consumer-credit'
            >
              Our Products
            </Link>
          </li>
          <li>
            <Link 
              to={pageUrl.ABOUT_US_PAGE}
              className={location === pageUrl.ABOUT_US_PAGE ? styles.activeMenu : null}
            >
                About Us
            </Link>
          </li>
          <li>
            <Link 
              to={pageUrl.CONTACT_PAGE}
              className={location === pageUrl.CONTACT_PAGE ? styles.activeMenu : null}
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <ul className={styles.authNav}>
          <li><Link to={pageUrl.SIGNIN_PAGE}>Log In</Link></li>
          <button 
            className={styles.menuBtn}
            onClick={() => history.push(pageUrl.SIGNUP_PAGE)}
          >
            Sign Up
          </button>
        </ul>
      </div>
      <GiHamburgerMenu 
        size="1.8em" 
        className={styles.menuIcon} 
        onClick={() => setMenuOpen(true)}
        color="#A02089"
      />
      <div className={styles.mobileNav} style={{width: menuOpen ? '100%' : 0}}>
        <RiCloseFill 
          size="2em" 
          className={styles.closeIcon} 
          onClick={() => setMenuOpen(false)}
        />
        <Link style={{opacity: menuOpen ? 1 : 0}} to={`/products/consumer-credit`}>Our Products</Link>
        <Link style={{opacity: menuOpen ? 1 : 0}} to={pageUrl.ABOUT_US_PAGE}>About Us</Link>
        <Link style={{opacity: menuOpen ? 1 : 0}} to={pageUrl.CONTACT_PAGE}>Contact Us</Link>
        <Link style={{opacity: menuOpen ? 1 : 0}} to={pageUrl.SIGNIN_PAGE}>Log In</Link>
        <Link style={{opacity: menuOpen ? 1 : 0}} to={pageUrl.SIGNUP_PAGE}>Sign Up</Link>
      </div>
    </nav>
  )
}


export default NavBar
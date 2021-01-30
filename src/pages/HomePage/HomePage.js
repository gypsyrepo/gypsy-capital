import React from 'react';
import styles from './HomePage.module.scss';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import pageUrl from '../../routes/pageUrl';


const HomePage = () => {
  return (
    <nav className={styles.navContainer}>
      <Link to={pageUrl.HOMEPAGE}><img src={Logo} alt="Gypsy Logo" /></Link>
      <div className={styles.navGroup}>
        <ul className={styles.mainNav}>
          <li><Link to={pageUrl.PRODUCTS_PAGE}>Our Products</Link></li>
          <li><Link to={pageUrl.ABOUT_US_PAGE}>About Us</Link></li>
          <li><Link to={pageUrl.CONTACT_PAGE}>Contact Us</Link></li>
        </ul>
        <ul className={styles.authNav}>
          <li><Link to={pageUrl.SIGNIN_PAGE}>Log In</Link></li>
          <li><Link to={pageUrl.SIGNUP_PAGE}>Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  )
}


export default HomePage;
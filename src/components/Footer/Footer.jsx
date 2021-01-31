import React from 'react';
import styles from './Footer.module.scss';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import PlainLogo from '../../assets/logo-white.png';
import { Link } from 'react-router-dom';
import pageUrl from '../../routes/pageUrl';


const Footer = () => {
  return (
    <div className={styles.footerSection}>
      <div className={styles.container}>
        <img src={PlainLogo} alt="Gypsy Logo" />
        <div className={styles.socialLinks}>
          <Link><FaFacebookF size="1.4em" /></Link>
          <Link><FaTwitter size="1.4em" /></Link>
          <Link><FaInstagram size="1.4em" /></Link>
          <Link><FaLinkedin size="1.4em" /></Link>
        </div>
        <div className={styles.footerLinks}>
          <ul>
            <li><Link to={pageUrl.PRIVACY_POLICY_PAGE}>Privacy Policy</Link></li>
            <li><Link to={pageUrl.TERMS_CONDITIONS_PAGE}>Terms & Conditions</Link></li>
          </ul>
        </div>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} Gypsy Capital. All Rights Reserved</p>
      </div>
    </div>
  )
}


export default Footer;
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import styles from './ContactPage.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';


const ContactPage = ({ history, location }) => {
  return (
    <>
      <NavBar history={history} location={location} />
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h2>Contact Us</h2>
        </div>
        <div className={styles.bgOverlay}></div>
      </div>
      <div classname={styles.mapSection}>
        <div className={styles.container}>
          <iframe
            className={styles.map}
            
          >
          </iframe>
        </div>
      </div>
    </>
  )
}


export default ContactPage;
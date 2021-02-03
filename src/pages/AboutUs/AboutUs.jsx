import React from 'react';
import {Row, Col} from 'react-bootstrap';
import styles from './AboutUs.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import AboutCard from './AboutCard';


const AboutUs = ({ history, location }) => {
  return (
    <>
      <NavBar history={history} location={location} />
      <div className={styles.heroSection}>
        <div className={styles.container}>
          
        </div>
      </div>
    </>
  )
}

export default AboutUs

import React from 'react';
import styles from './Faqs.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import FaqSection from '../../components/FaqSection/FaqSection';
import { useHistory, useRouteMatch } from 'react-router';
import Footer from '../../components/Footer/Footer';


const Faqs = () => {

  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <>
      <NavBar history={history} location={url} />
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h2>FAQs</h2>
        </div>
        <div className={styles.bgOverlay}></div>
      </div>
      <FaqSection returnNumber="all" />
      <Footer />
    </>
  )
}


export default Faqs;
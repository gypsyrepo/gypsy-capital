import React from 'react';
import styles from './Faqs.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import { useHistory, useRouteMatch } from 'react-router';


const Faqs = () => {

  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <>
      <NavBar history={history} location={url} />
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h2>Contact Us</h2>
        </div>
        <div className={styles.bgOverlay}></div>
      </div>
    </>
  )
}


export default Faqs;
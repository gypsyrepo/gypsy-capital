import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './Loader.module.scss';


const Loader = () => {
  return <div className={styles.loadingStyle}><Spinner animation="grow" /></div>
}

export default Loader;
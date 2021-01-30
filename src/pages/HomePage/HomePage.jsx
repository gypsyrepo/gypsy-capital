import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import styles from './HomePage.module.scss';
import { Row, Col } from 'react-bootstrap';
import ExcitedCustomer from  '../../assets/excitement.jpeg';
import ExcitedCustomerMinor from '../../assets/excitement-2.jpg';
import Clients from '../../assets/clients.jpg'
import Circle from '../../assets/circle.svg';
import Pattern from '../../assets/pattern.svg';
import AboutImg from '../../assets/about.png';
import { FaMoneyBillWaveAlt, FaStopwatch, FaFileAlt } from 'react-icons/fa';


const HomePage = ({ history }) => {

  const [loanAmt, setLoanAmt] = useState('');

  return (
    <>
      <NavBar history={history} />
      <div className={styles.heroSection}>
        <Row className={styles.container}>
          <Col md={6} sm={12} className={styles.mainCopy}>
            <div className={styles.copyGroup}>
              <h1>Access Quick Loans At Flexible Rates.</h1>
              <h3>No collaterals needed, get funded within 24 hours</h3>
              <input 
                type="text" 
                name="loanAmt" 
                value={loanAmt} 
                placeholder="How much do you need?"
                onChange={(e) => setLoanAmt(e.currentTarget.value)} 
              />
              <button>
                Get Started
              </button>
              <img 
                src={Pattern}
                className={styles.pattern}
                alt="pattern"
              />
            </div>
          </Col>
          <Col md={6} sm={12} className={styles.imageGroup}>
            <div className={styles.imgContainer}>
              <img 
                className={styles.mainImg} 
                src={ExcitedCustomer} 
                alt="An excited customer" 
              />
              <img 
                className={styles.minorImg}
                src={ExcitedCustomerMinor}
                alt="An excited customer"
              />
              <img 
                className={styles.minorImg2}
                src={Clients}
                alt="Excited customers"
              />
              <img 
                src={Circle}
                className={styles.firstCircle}
                alt="presentation"
              />
              <img 
                src={Circle}
                className={styles.secondCircle}
                alt="presentation"
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.featureSection}>
        <Row className={styles.container}>
          <Col>
            <div className={styles.featureBox}>
              <FaStopwatch size="3.5em" color="#741763" />
              <h2>Fast</h2>
              <p>Funding in as soon as 24 hours</p>
            </div>
          </Col>
          <Col>
            <div className={styles.featureBox}>
              <FaFileAlt size="3.5em" color="#741763" />
              <h2>Simple</h2>
              <p>Short & Quick Application</p>
            </div>
          </Col>
          <Col>
            <div className={styles.featureBox}>
              <FaMoneyBillWaveAlt size="3.5em" color="#741763" />
              <h2>Funding</h2>
              <p>Up to 200% of your avg monthly salary</p>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.aboutSection}>
        <Row className={styles.container}>
          <Col>
            <h5>About Gypsy Capital</h5>
            <h2>Creating impactful value-driven financial services in Nigeria.</h2>
            <p>Gypsy Capital is a financial solutions service company, with a sole commitment to helping individuals achieve personal goals through financial intermediation.</p>
            <p>We are committed to a life of financial freedom, for individuals seeking the power to do more. We offer simple and smart solutions, you can trust.</p>
            <p>Our core vision is to impact and empower our environment and creating a life of financial freedom for individuals seeking the power to do more.</p>
            <p className={styles.founderQuote}>“No matter what your personal goals may be, at Gypsy, we are invested in you, if you have the credible financial data”.</p>
            <p className={styles.quoter}><span>Ayo M.,</span> CEO Gypsy Capital</p>
            <button>
              Learn More
            </button>
          </Col>
          <Col className={styles.imageGroup}>
            <div className={styles.imageContainer}>
              <img src={AboutImg} alt="About Gypsy" />
              <div className={styles.rect}></div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}


export default HomePage;
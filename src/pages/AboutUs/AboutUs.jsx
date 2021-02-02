import React from 'react';
import {Row, Col} from 'react-bootstrap';

import styles from './AboutUs.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import AboutCard from './AboutCard';


const titles = ['Vision', 'Mission', 'Focus' ]
const texts = [
    'To grow into a long term successful global financial services and investment firm, delivering exceptional value to the market we serve.',
    'We are driven by a strong will to become the leading investment brokerage firm locally and aspire to be one of the leading global firm that drives prospect across the emerging market in Nigeria and Africa.'    
    ]
const AboutUs = () => {
    return (
        <>
        <div className={styles.heroSection}>
            <NavBar />
            <h3>About Us</h3>
        </div>
        <Row className={styles.aboutCapitalSection}>
            <Col className={styles.aboutCapital}>
                <h3>About Gypsy Capital</h3>
                <h5>We are a dynamic team of creative people with innovative mind</h5>
                <p>Gypsy capital is a financial solutions service company, with a set commitment to helping individuals achieve their personal goals through financial intermediation.</p>
                <p>“No matter what your personal goals may be, at Gypsy, we are invested in you, if you have the credible financial data.”</p>
            </Col>
            <Col className={styles.aboutCapitalGroup}>
            </Col>
        </Row>
        <section className={styles.aboutCardSection}>
            <AboutCard title={titles[0]} text={texts[0]} borderBottom='colorOne'/>
            <AboutCard title={titles[1]} text={texts[0]} borderBottom='colorTwo'/>
            <AboutCard title={titles[2]} text={texts[1]} borderBottom='colorThree'/>
        </section>
        <Footer />
        </>
    )
}

export default AboutUs

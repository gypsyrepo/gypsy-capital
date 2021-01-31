import React, { useState } from 'react';
import styles from './Products.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import Credit from '../../assets/icons/credit.svg';
import Notes from '../../assets/icons/gypsyNotes.svg';
import Advisory from '../../assets/icons/advisory.svg';
import Alternative from '../../assets/icons/alternative.svg';
import { Row, Col } from 'react-bootstrap';
import Button from '../../components/Button/Button';
import { FaAngleDown } from 'react-icons/fa';
import Funding from '../../assets/icons/funding.svg';
import Calendar from '../../assets/icons/calendar.svg';
import Accept from '../../assets/icons/accept.svg';
import Time from '../../assets/icons/races.svg';
import { BiCheckSquare } from 'react-icons/bi';
import Footer from '../../components/Footer/Footer';


const Products = () => {

  const [menuState, setMenuState] = useState('credit');

  return (
    <>
    <NavBar />
    <div className={styles.productsMenu}>
      <div className={styles.container}>
        <Row>
          <Col>
            <div className={styles.menuBox}>
              <div className={styles.iconWrapper}>
                <img src={Credit} alt="Consumer Credit" className={styles.credit} />
              </div>
              <h3>Consumer Credit</h3>
            </div>
          </Col>
          <Col>
            <div className={styles.menuBox}>
              <div className={styles.iconWrapper}>
                <img src={Notes} alt="Gypsy Notes" className={styles.notes} />
              </div>
              <h3>Gypsy Notes</h3>
            </div>
          </Col>
          <Col>
            <div className={styles.menuBox}>
              <div className={styles.iconWrapper}>
                <img src={Advisory} alt="Financial Advisory" className={styles.advisory} />
              </div>
              <h3>Financial Advisory</h3>
            </div>
          </Col>
          <Col>
            <div className={styles.menuBox}>
              <div className={styles.iconWrapper}>
                <img src={Alternative} alt="Alternative Investment" className={styles.alternative} />
              </div>
              <h3>Alternative Investment</h3>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div className={styles.ctaBanner}>
      <div className={styles.container}>
        <div className={styles.bannerBox}>
          <div>
            <h2>Consumer Credit</h2>
            <p>That extra money for all life's personal needs, Why not?</p>
            {/* <button className={styles.textBtn}>Be the first to know when we launch</button> */}
            <Button
              bgColor="#fff"
              color="#741763"
              size="lg"
              className="mt-4"
            >
              Apply Now!
            </Button>
          </div>
          <div className={styles.circleOutlineOne}></div>
          <div className={styles.circleOutlineTwo}></div>
          <div className={styles.firstCircle}></div>
          <div className={styles.secondCircle}></div>
          <div className={styles.thirdCircle}></div>
          <div className={styles.fourthCircle}></div>
          <div className={styles.fifthCircle}></div>
          <div className={styles.sixthCircle}></div>
          <div className={styles.downIcon}>
            <FaAngleDown size="3em" />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.features}>
      <div className={styles.container}>
        <Row>
          <Col>
            <div className={styles.iconWrapper}>
              <img src={Funding} alt="Fast funding" />
            </div>
            <h3>Funding Capacity</h3>
            <p>Up to ₦500,000</p>
          </Col>
          <Col>
            <div className={styles.iconWrapper}>
              <img src={Accept} alt="terms" />
            </div>
            <h3>Term</h3>
            <p>Up to 6 months</p>
          </Col>
          <Col>
            <div className={styles.iconWrapper}>
              <img src={Calendar} alt="schedule" />
            </div>
            <h3>Payment Schedule</h3>
            <p>Monthly</p>
          </Col>
          <Col>
            <div className={styles.iconWrapper}>
              <img src={Time} alt="speed" />
            </div>
            <h3>Speed</h3>
            <p>As fast as 24 hours</p>
          </Col>
        </Row>
      </div>
    </div>
    <div className={styles.howItWorks}>
      <div className={styles.container}>
        <Row>
          <Col sm={7} className={styles.detailed}>
            <h2>Convenient personal and lifestyle loans.</h2>
            <p>We are committed to providing consumer loan services, with efficiency and convenience at the forefront of all we do while ensuring best practices.</p>
            <p>We utilize cutting technological solutions with speed and accurate data capturing, simple and secured.</p>
            <Button
              bgColor="#741763"
              color="#fff"
              className="mt-4"
            >
              Apply Now!
            </Button>
          </Col>
          <Col sm={5} className={styles.steps}>
            <h3>How it Works</h3>
            <div className={styles.stepGroup}>
              <BiCheckSquare color="#A02089" className={styles.icon} />
              <p>Create a free Gypsy account</p>
            </div>
            <div className={styles.stepGroup}>
              <BiCheckSquare color="#A02089" className={styles.icon} />
              <p>Complete our online application</p>
            </div>
            <div className={styles.stepGroup}>
              <BiCheckSquare color="#A02089" className={styles.icon} />
              <p>Receive money within 24 hours if approved.</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <Footer />
    </>
  )
}


export default Products;
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
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';
import { IoLogoWhatsapp } from 'react-icons/io';
import Credit from '../../assets/icons/credit.svg';
import Notes from '../../assets/icons/gypsyNotes.svg';
import Advisory from '../../assets/icons/advisory.svg';
import Alternative from '../../assets/icons/alternative.svg';
import CirclePattern from '../../assets/patternCircle.png';
import InputField from '../../components/InputField/InputField';
import FaqSection from '../../components/FaqSection/FaqSection';
import Footer from '../../components/Footer/Footer';
import { useRouteMatch, useHistory } from 'react-router-dom';


const HomePage = () => {

  const { url } = useRouteMatch();
  const history = useHistory()
  const [loanAmt, setLoanAmt] = useState('');
  const [loanRequest, setLoanRequest] = useState('');

  const [contactInfo, setContactInfo] = useState({
    name: "",
    subject: "",
    email: "",
    message: ""
  });

  return (
    <>
      <NavBar history={history} location={url} />
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
              <button
                onClick={() => history.push({ pathname: '/loan-calculator', state: { loanAmount: loanAmt }})}
              >
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
          <Col sm={12} md={4} className="mb-4">
            <div className={styles.featureBox}>
              <FaStopwatch className={styles.featureIcon} color="#741763" />
              <h2>Fast</h2>
              <p>Funding in as soon as 24 hours</p>
            </div>
          </Col>
          <Col sm={12} md={4} className="mb-4">
            <div className={styles.featureBox}>
              <FaFileAlt className={styles.featureIcon} color="#741763" />
              <h2>Simple</h2>
              <p>Short & Quick Application</p>
            </div>
          </Col>
          <Col sm={12} md={4} className="mb-4">
            <div className={styles.featureBox}>
              <FaMoneyBillWaveAlt className={styles.featureIcon} color="#741763" />
              <h2>Funding</h2>
              <p>Up to 200% of your avg monthly salary</p>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.aboutSection}>
        <Row className={styles.container}>
          <Col sm={12} md={6} className="mb-5">
            <h5>About Gypsy Capital</h5>
            <h2>Creating impactful value-driven financial services in Nigeria.</h2>
            <p>Gypsy Capital is a financial solutions service company, with a sole commitment to helping individuals achieve personal goals through financial intermediation.</p>
            <p>We are committed to a life of financial freedom, for individuals seeking the power to do more. We offer simple and smart solutions, you can trust.</p>
            <p>Our core vision is to impact and empower our environment and creating a life of financial freedom for individuals seeking the power to do more.</p>
            <p className={styles.founderQuote}>“No matter what your personal goals may be, at Gypsy, we are invested in you, if you have the credible financial data”.</p>
            <p className={styles.quoter}><span>Ayo M.,</span> CEO Gypsy Capital</p>
            <button onClick={() => history.push('/about-us')}>
              Learn More
            </button>
          </Col>
          <Col sm={12} md={6} className={styles.imageGroup}>
            <div className={styles.imageContainer}>
              <img src={AboutImg} alt="About Gypsy" />
              <div className={styles.rect}></div>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.productSection}>
        <div className={styles.container}>
          <h5>Our Products</h5>
          <h2>Creating impactful value-driven financial services in Nigeria.</h2>
          <Row>
            <Col sm={12} lg={6} className="mb-5">
              <div className={styles.productBox} style={{borderBottom: "4px solid #1F8DE8"}}>
                <div className={styles.iconWrapper}>
                  <img src={Credit} alt="Consumer Credit" className={styles.credit} />
                </div>
                <h3>Consumer Credit</h3>
                <p>Access convenient personal and lifestyle loans. We are committed to providing consumer loan services, with efficiency and convenience at the forefront of all we do while ensuring best practices.</p>
              </div>
            </Col>
            <Col sm={12} lg={6}>
              <div className={styles.productBox} style={{borderBottom: "4px solid #841FE8"}}>
                <div className={styles.iconWrapper}>
                  <img src={Notes} alt="Gypsy Notes" className={styles.notes} />
                </div>
                <h3>Gypsy Notes</h3>
                <p>Earn more with us. Our investment arm is driven by our interest in real estate financing, financial services, agriculture and hospitality projects. We are focused on delivering solutions that inspire global possibilities that drive value and growth.</p>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={12} lg={6} className="mb-5">
              <div className={styles.productBox} style={{borderBottom: "4px solid #FF5800"}}>
                <div className={styles.iconWrapper}>
                  <img src={Advisory} alt="Financial Advisory" className={styles.advisory} />
                </div>
                <h3>Financial Advisory</h3>
                <p>We provide expert financial advisory and wealth management services to individual lifestyle needs. With a diverse range of industry experts, global knowledge and insight we achieve ranging clientele needs.</p>
              </div>
            </Col>
            <Col sm={12} lg={6} className="mb-5">
              <div className={styles.productBox} style={{borderBottom: "4px solid #015514"}}>
                <div className={styles.iconWrapper}>
                  <img src={Alternative} alt="Alternative Investment" className={styles.alternative} />
                </div>
                <h3>Alternative Investment</h3>
                <p>We offer annual returns up to 13% Per Annum which are tiered according to individual preferences with a minimum investment amount of N1million for a minimum tenor of 100 days.</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <FaqSection returnNumber={4} />
      <div className={styles.repeatSection}>
        <div className={styles.container}>
          <div className={styles.styledBox}>
            <Row>
              <Col sm={12} lg={6} className={styles.access}>
                <h2>Access Up to ₦2,000,000 Within 24 Hours</h2>
              </Col>
              <Col sm={12} lg={6}>
                <input 
                  type="text"
                  name="loanRequest"
                  placeholder="How much do you need?"
                  value={loanRequest}
                  onChange={(e) => setLoanRequest(e.currentTarget.value)}
                />
                <button
                  onClick={() => history.push({ pathname: '/loan-calculator', state: { loanAmount: loanRequest }})}
                >
                  Apply Now
                </button>
              </Col>
            </Row>
            <img src={CirclePattern} alt="pattern" className={styles.circlePatternOne} />
            <img src={CirclePattern} alt="pattern" className={styles.circlePatternTwo} />
            <div className={[styles.firstCircle, styles.circle].join(' ')}></div>
            <div className={[styles.secondCircle, styles.circle].join(' ')}></div>
            <div className={[styles.thirdCircle, styles.circle].join(' ')}></div>
            <div className={[styles.fourthCircle, styles.circle].join(' ')}></div>
            <div className={[styles.fifthCircle, styles.circle].join(' ')}></div>
            <div className={[styles.sixthCircle, styles.circle].join(' ')}></div>
            <div className={[styles.seventhCircle, styles.circle].join(' ')}></div>
            <div className={[styles.eigthCircle, styles.circle].join(' ')}></div>
            <div className={[styles.ninthCircle, styles.circle].join(' ')}></div>
          </div>
        </div>
      </div>
      <div className={styles.contactSection}>
        <div className={styles.container}>
          <h2>Contact</h2>
          <Row className={styles.contactContainer }>
            <Col className={styles.addressCol}>
              <div className={styles.addressDetails}>
                <h3>Get In Touch</h3>
                <div className={styles.contactGroup}>
                  <HiLocationMarker className={styles.icon} size="4em" />
                  <p>Landmark Towers, 5B Water Corporation Rd,Oniru Rd, Victoria Island 101241, Lagos</p>
                </div>
                <div className={styles.contactGroup}>
                  <HiMail className={styles.icon} size="1.8em" />
                  <p>hello@gypsycapital.com</p>
                </div>
                <div className={styles.contactGroup}>
                  <HiPhone className={styles.icon} size="1.8em" />
                  <p>+234 809 9907 888</p>
                </div>
                <div className={styles.contactGroup}>
                  <IoLogoWhatsapp className={styles.icon} size="1.8em" />
                  <p>+234 809 9907 888</p>
                </div>
              </div>
            </Col>
            <Col>
              <div className={styles.contactForm}>
                <h3>Send Us A Message</h3>
                <div className={styles.inputWrapper}>
                  <InputField 
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={contactInfo.name}
                    changed={(val) => setContactInfo({...contactInfo, name: val})}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <InputField 
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={contactInfo.email}
                    changed={(val) => setContactInfo({...contactInfo, email: val})}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <InputField 
                    placeholder="Subject"
                    name="subject"
                    type="text"
                    value={contactInfo.subject}
                    changed={(val) => setContactInfo({...contactInfo, subject: val})}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <InputField 
                    type="textarea"
                    nameAttr="message"
                    placeholder="Message"
                    value={contactInfo.message}
                    changed={(val) => setContactInfo({ ...contactInfo, message: val })}
                  />
                </div>
                <button>
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className={styles.subFooter}></div>
      <Footer />
    </>
  )
}


export default HomePage;
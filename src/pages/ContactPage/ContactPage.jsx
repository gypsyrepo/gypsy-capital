import React, { useState } from 'react';
import {Row, Col} from 'react-bootstrap';
import styles from './ContactPage.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';
import { IoLogoWhatsapp } from 'react-icons/io';
import Footer from '../../components/Footer/Footer';
import InputField from '../../components/InputField/InputField';


const ContactPage = ({ history, location }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  return (
    <>
      <NavBar history={history} location={location} />
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h2>Contact Us</h2>
        </div>
        <div className={styles.bgOverlay}></div>
      </div>
      <div className={styles.mapSection}>
        <div className={styles.container}>
          <iframe
              className={styles.map}
              frameBorder={0}
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?hl=en&amp;q=Landmark%20Towers,%205B%20Water%20Corporation%20Rd,Oniru%20Rd,%20Victoria%20Island%20101241,%20Lagos+(Gypsy%20Capital)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
            </iframe>
        </div>
      </div>
      <div className={styles.contactSection}>
        <div className={styles.container}>
          <Row>
            <Col md={7}>
              <div className={styles.contactForm}>
                <h3>Send Us A Message</h3>
                <Row className="mb-4">
                  <Col>
                    <InputField 
                      type="text"
                      placeholder="Name"
                      nameAttr="name"
                      value={formData.name}
                      changed={(val) => setFormData({ ...formData, name: val })}
                    />
                  </Col>
                  <Col>
                    <InputField 
                      type="email"
                      placeholder="Email"
                      nameAttr="email"
                      value={formData.email}
                      changed={(val) => setFormData({ ...formData, email: val })}
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <InputField 
                      type="text"
                      placeholder="Subject"
                      nameAttr="subject"
                      value={formData.subject}
                      changed={(val) => setFormData({ ...formData, subject: val })}
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <InputField 
                      type="textarea"
                      placeholder="Message"
                      nameAttr="message"
                      value={formData.message}
                      changed={(val) => setFormData({ ...formData, message: val })}
                    />
                  </Col>
                </Row>
                <button>
                  Submit
                </button>
              </div>
            </Col>
            <Col md={5}>
              <div className={styles.addressBox}>
                <h3>Get In Touch</h3>
                <div className={styles.addressGroup}>
                  <HiLocationMarker className={styles.icon} size="4em" />
                  <p>Landmark Towers, 5B Water Corporation Rd,Oniru Rd, Victoria Island 101241, Lagos</p>
                </div>
                <div className={styles.addressGroup}>
                  <HiMail className={styles.icon} size="1.8em" />
                  <p>hello@gypsycapital.com</p>
                </div>
                <div className={styles.addressGroup}>
                  <HiPhone className={styles.icon} size="1.8em" />
                  <p>+234 809 9907 888</p>
                </div>
                <div className={styles.addressGroup}>
                  <IoLogoWhatsapp className={styles.icon} size="1.8em" />
                  <p>+234 809 9907 888</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>

  )
}


export default ContactPage;
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import styles from './AboutUs.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Illustration from '../../assets/illustration.png';
import Vision from '../../assets/icons/target.svg';
import Focus from '../../assets/icons/focus.svg';
import Mission from '../../assets/icons/flag.svg';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import CEO from '../../assets/ceo.png';
import Partner from '../../assets/partner.png';
import Director1 from '../../assets/director.png';
import Director2 from '../../assets/director-2.png';
import { useRouteMatch } from 'react-router-dom';


const ValueBox = ({ title, children, icon, borderColor }) => {
  return (
    <div className={styles.valueBox} style={{borderBottom: `5px solid ${borderColor}`}}>
      <div className={styles.header}>
        <img src={icon} alt={`Gypsy's ${title}`} />
        <h3>{title}</h3>
      </div>
      <p>{children}</p>
    </div>
  )
}

const TeamDisplay = ({ memberImg, name, title, fbLink, twitterLink, linkedIn, children }) => {
  return (
    <>
      <Row className={styles.row}>
        <Col xs={12} sm={12} md={5} lg={4} className={styles.firstCol}>
          <div className={styles.imageContainer}>
            <img src={memberImg} alt={title} />
            <div className={styles.nameTag}>
              <h5>{name}</h5>
              <p>{title}</p>
            </div>
            <div className={styles.mobileBio}>
              <p>{children}</p>
            </div>
            <div className={styles.socialIcons}>
              <a href="">
                <FaFacebookF className={styles.icon} />
              </a>
              <a href="">
                <FaTwitter className={styles.icon} />
              </a>
              <a href="">
                <FaLinkedinIn className={styles.icon} />
              </a>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={7} lg={8} className={styles.secondCol}>
          <div className={styles.bio}>
            <p>{children}</p>
          </div>
        </Col>
      </Row>
    </>
  )
}

const AboutUs = ({ history }) => {

  const { url } = useRouteMatch();

  return (
    <>
      <NavBar history={history} location={url} />
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h2>About Us</h2>
        </div>
        <div className={styles.bgOverlay}></div>
      </div>
      <div className={styles.moreInfo}>
        <div className={styles.container}>
          <Row className="align-items-center">
            <Col xs={12} sm={12} md={6} lg={6} className={[styles.copyCol, 'mb-4'].join(' ')}>
              <div>
                <h4>About Gypsy Capital</h4>
                <h2>We are a dynamic team of creative people with innovative mind</h2>
                <p>Gypsy capital is a financial solutions service company, with a set commitment to helping individuals achieve their personal goals through financial intermediation.</p>
                <p>“No matter what your personal goals may be, at Gypsy, we are invested in you, if you have the credible financial data.”</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <div className={styles.box}>
                <img src={Illustration} alt="A dynamic team" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className={styles.companyValues}>
        <div className={styles.container}>
          <Row>
            <Col sm={12} md={4} className="mb-5">
              <ValueBox
                title="Vision"
                borderColor="#1F8DE8"
                icon={Vision}
              >
                To grow into a long term successful global financial services and investment firm, delivering exceptional value to the market we serve.
              </ValueBox>
            </Col>
            <Col sm={12} md={4} className="mb-5">
              <ValueBox
                title="Mission"
                icon={Mission}
                borderColor="#841FE8"
              >
                To grow into a long term successful global financial services and investment firm, delivering exceptional value to the market we serve.
              </ValueBox>
            </Col>
            <Col sm={12} md={4} className="mb-5">
              <ValueBox
                title="Focus"
                icon={Focus}
                borderColor="#015514"
              >
                We are driven by a strong will to become the leading investment brokerage firm locally and aspire to be one of the leading global firm that drives prospect across the emerging market in Nigeria and Africa.
              </ValueBox>
            </Col>
          </Row>
        </div>
      </div>
      <div className={styles.teamSection}>
        <div className={styles.container}>
          <h2>Meet Our Dynamic Team</h2>
          <TeamDisplay
            title="Managing Director/CEO"
            memberImg={CEO}
            name="Ayodeji Mekuleyi"
          > 
            With a wealth of experience spanning up to 10years in business management, Ayo is constantly looking for innovative ways to drive financial inclusion, value and possibilities for today’s personal and business ecosystems.
          </TeamDisplay>
          <TeamDisplay
            title="Managing Partner / Director"
            memberImg={Partner}
            name="Valentine Ndianefo"
          > 
            He is fondly referred to as the numbers expert hinged on his profound knowledge in accounting attained from his work experience in the banking sector.
          </TeamDisplay>
          <TeamDisplay
            title="Non-Executive Director"
            memberImg={Director1}
            name="Magaret Hall"
          > 
            Apart from earning her stripes as a seasoned and exceptionally skilled business strategy & management personnel, she is an accomplished entrepreneur with a distinctive academic background stemming from international exposure.
          </TeamDisplay>
          <TeamDisplay
            title="Non-Executive Director"
            memberImg={Director2}
            name="Senator Hosea Ehinlanwo (phd.)"
          > 
            A seasoned and distinguished public administrator with over 35 years of business, academic and administrative experience.
          </TeamDisplay>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutUs

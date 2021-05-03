import React, { useState } from "react";
import styles from "./Products.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import Credit from "../../assets/icons/credit.svg";
import Notes from "../../assets/icons/gypsyNotes.svg";
import Advisory from "../../assets/icons/advisory.svg";
import Alternative from "../../assets/icons/alternative.svg";
import { Row, Col } from "react-bootstrap";
import Button from "../../components/Button/Button";
import { FaAngleDown } from "react-icons/fa";
import Funding from "../../assets/icons/funding.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Accept from "../../assets/icons/accept.svg";
import Time from "../../assets/icons/races.svg";
import { BiCheckSquare } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import Footer from "../../components/Footer/Footer";
import Customer from "../../assets/excited-customer.jpeg";
import Investor from "../../assets/excited-investor.jpg";
import {
  useRouteMatch,
  Link,
  useHistory,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import WaitListModal from "../../components/WaitListModal/WaitListModal";
import LazyLoad from "react-lazyload";

const ProductBanner = ({ productTitle, btnType, copy, btnText, btnAction }) => {
  return (
    <div className={styles.ctaBanner}>
      <div className={styles.container}>
        <div className={styles.bannerBox}>
          <div>
            <h2>{productTitle}</h2>
            <p>{copy}</p>
            {btnType === "textButton" && (
              <button
                className={styles.textBtn}
                onClick={() => btnAction && btnAction()}
              >
                Be the first to know when we launch
              </button>
            )}
            {btnType === "normal" && (
              <Button
                bgColor="#fff"
                color="#741763"
                size="lg"
                className={["mt-4", styles.customBtn].join(" ")}
                clicked={() => btnAction && btnAction()}
              >
                {btnText}
              </Button>
            )}
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
            <FaAngleDown className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = ({
  children,
  mainTitle,
  minorTitle,
  steps,
  imageCopy,
  btnText,
  productName,
  btnType,
  btnAction,
}) => {
  return (
    <div className={styles.howItWorks}>
      <div className={styles.container}>
        <Row>
          <Col xs={12} md={7} className={styles.detailed}>
            <h2>{mainTitle}</h2>
            {children}
            {btnType === "normal" && (
              <Button
                clicked={() => btnAction && btnAction()}
                bgColor="#741763"
                color="#fff"
                className="mt-4"
              >
                {btnText}
              </Button>
            )}
            {btnType === "textBtn" && (
              <button
                className={styles.textBtn}
                onClick={() => btnAction && btnAction()}
              >
                Be the first to know when we launch
              </button>
            )}
          </Col>
          <Col
            xs={12}
            md={5}
            className={imageCopy ? styles.imageCopy : styles.steps}
          >
            {!imageCopy && (
              <>
                <h3>{minorTitle}</h3>
                {steps.map((step, index) => (
                  <div key={index} className={styles.stepGroup}>
                    <BiCheckSquare color="#A02089" className={styles.icon} />
                    <p>{step}</p>
                  </div>
                ))}
              </>
            )}
            {imageCopy && (
              <LazyLoad offset={100} height={200} once>
                <img
                  src={imageCopy}
                  alt={productName}
                  className={styles.imgCopy}
                />
              </LazyLoad>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

const EmailSubscription = ({ title }) => {
  const [subscribeEmail, setSubscribeEmail] = useState("");

  return (
    <div className={styles.subscribeEmail}>
      <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.emailInput}>
          <input
            type="email"
            name="subscribeEmail"
            value={subscribeEmail}
            onChange={(e) => setSubscribeEmail(e.currentTarget.value)}
            placeholder="Enter your email"
          />
          <button>
            Subscribe
            <RiSendPlaneFill size="1.2em" className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuBox = ({ icon, menuTitle, linkUrl, linkPath }) => {
  return (
    <Link to={linkUrl} className={styles.boxLink}>
      <div
        className={linkUrl === linkPath ? styles.activeMenu : styles.menuBox}
      >
        <div className={styles.iconWrapper}>
          <LazyLoad offset={100} height={200} once>
            <img
              src={icon}
              alt="Consumer Credit"
              className={
                menuTitle === "Gypsy Notes" ? styles.notes : styles.credit
              }
            />
          </LazyLoad>
        </div>
        <h3>{menuTitle}</h3>
      </div>
    </Link>
  );
};

const Products = () => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const startApplication = () => {
    history.push("/signin");
  };

  return (
    <>
      <NavBar history={history} location={url} />
      <div className={styles.productsMenu}>
        <div className={styles.container}>
          <Row>
            <Col className={styles.customCol} sm={3} lg={3} xs={3}>
              <MenuBox
                icon={Credit}
                menuTitle="Consumer Credit"
                linkUrl="/products/consumer-credit"
                linkPath={location.pathname}
              />
            </Col>
            <Col className={styles.customCol} sm={3} lg={3} xs={3}>
              <MenuBox
                icon={Notes}
                menuTitle="Gypsy Notes"
                linkUrl="/products/gypsy-notes"
                linkPath={location.pathname}
              />
            </Col>
            <Col className={styles.customCol} sm={3} lg={3} xs={3}>
              <MenuBox
                icon={Advisory}
                menuTitle="Financial Advisory"
                linkUrl="/products/financial-advisory"
                linkPath={location.pathname}
              />
            </Col>
            <Col className={styles.customCol} sm={3} lg={3} xs={3}>
              <MenuBox
                icon={Alternative}
                menuTitle="Alternative Investment"
                linkUrl="/products/alternative-investment"
                linkPath={location.pathname}
              />
            </Col>
          </Row>
        </div>
      </div>
      <Switch>
        <Route path={`${path}/consumer-credit`}>
          <ProductBanner
            productTitle="Consumer Credit"
            copy="The extra money for all life's personal needs, Why not?"
            btnType="normal"
            btnText="Apply Now!"
            btnAction={startApplication}
          />
          <div className={styles.features}>
            <div className={styles.container}>
              <Row>
                <Col sm={12} md={3} className="mb-4">
                  <div className={styles.iconWrapper}>
                    <LazyLoad offset={100} height={200} once>
                      <img src={Funding} alt="Fast funding" />
                    </LazyLoad>
                  </div>
                  <h3>Funding Capacity</h3>
                  <p>Up to ₦500,000</p>
                </Col>
                <Col sm={12} md={3} className="mb-4">
                  <div className={styles.iconWrapper}>
                    <LazyLoad offset={100} height={200} once>
                      <img src={Accept} alt="terms" />
                    </LazyLoad>
                  </div>
                  <h3>Term</h3>
                  <p>Up to 6 months</p>
                </Col>
                <Col sm={12} md={3} className="mb-4">
                  <div className={styles.iconWrapper}>
                    <LazyLoad offset={100} height={200} once>
                      <img src={Calendar} alt="schedule" />
                    </LazyLoad>
                  </div>
                  <h3>Payment Schedule</h3>
                  <p>Monthly</p>
                </Col>
                <Col sm={12} md={3} className="mb-4">
                  <div className={styles.iconWrapper}>
                    <LazyLoad offset={100} height={200} once>
                      <img src={Time} alt="speed" />
                    </LazyLoad>
                  </div>
                  <h3>Speed</h3>
                  <p>As fast as 24 hours</p>
                </Col>
              </Row>
            </div>
          </div>
          <HowItWorks
            mainTitle="Convenient personal and lifestyle loans."
            minorTitle="How It Works"
            btnText="Apply Now!"
            btnType="normal"
            btnAction={startApplication}
            productName="Consumer Credit"
            steps={[
              "Create a free Gypsy account",
              "Complete our online application",
              "Receive money within 24 hours if approved.",
            ]}
          >
            <p>
              We are committed to providing consumer loan services, with
              efficiency and convenience at the forefront of all we do while
              ensuring best practices.
            </p>
            <p>
              We utilize cutting technological solutions with speed and accurate
              data capturing, simple and secured.
            </p>
          </HowItWorks>
        </Route>
        <Route path={`${path}/gypsy-notes`}>
          <ProductBanner
            productTitle="Gypsy Notes"
            copy="Enjoy capital retention and attractive returns on your investment"
            btnType="textButton"
            btnAction={handleModalToggle}
          />
          <HowItWorks
            mainTitle="Enjoy capital retention and attractive returns on your investment"
            btnText="Apply Now!"
            btnType="normal"
            imageCopy={Customer}
            productName="Gypsy Notes"
            btnAction={handleModalToggle}
          >
            <p>
              Enjoy capital retention and attractive returns on your investment
            </p>
            <p>
              We offer annual returns up to 13% Per Annum which are tiered
              according to individual preferences with a minimum investment
              amount of N1million for a minimum tenor of 100 days.
            </p>
            <p>
              At Gypsy, we recognize the dynamic nature of the market and help
              our clientele better manage liquidity with our flexible tenor and
              structured fixed income services.
            </p>
          </HowItWorks>
          <EmailSubscription title="Be The First to Know When We Launch Gypsy Notes" />
        </Route>
        <Route path={`${path}/financial-advisory`}>
          <ProductBanner
            productTitle="Financial Advisory"
            copy="Optimum advice on a wide range of strategic and financial goals"
            btnType="normal"
            btnText="Book an Appointment"
          />
          <HowItWorks
            mainTitle="Optimum advice on a wide range of strategic and financial goals"
            btnText="Book an Appointment"
            btnType="normal"
            imageCopy={Investor}
            productName="Financial Advisory"
          >
            <p>
              We provide expert financial advisory and wealth management
              services to individual lifestyle needs. With a diverse range of
              industry experts, global knowledge and insight we achieve ranging
              clientele needs.
            </p>
            <p>
              Our understanding of the sub-Saharan market avails us the
              opportunity to forge possibilities and create values for our
              interested client’s seeking to explore the market.
            </p>
          </HowItWorks>
        </Route>
        <Route path={`${path}/alternative-investment`}>
          <ProductBanner
            productTitle="Alternative Investment"
            copy="For investors who seek greater rewards"
            btnType="textButton"
            btnAction={handleModalToggle}
          />
          <HowItWorks
            mainTitle="Earn More…"
            btnType="textBtn"
            productName="Alternative Investment"
            minorTitle="We Primarily Invest Across:"
            steps={[
              "Real estate brokerage, development and financing.",
              "Agriculture and agro-financing.",
              "Hospitality and retail.",
            ]}
            btnAction={handleModalToggle}
          >
            <p>
              This investment arm is driven by our interest in real estate
              financing, financial services, agriculture and hospitality
              projects. We are focused on delivering solutions that inspire
              global possibilities that drive value and growth.
            </p>
            <p>
              While we focus our effort on those sectors that are closely geared
              to our core themes, we are open to investments prospects across
              other sectors. We select our investment opportunities via
              expert-led insights and reviews delivered by our network of
              experienced investment brokers, allowing us to invest in viable
              opportunities.
            </p>
            <p>
              We support our clients at operational and strategic levels,
              offering day to day advisory services, tailored to their lifestyle
              needs.
            </p>
          </HowItWorks>
          <EmailSubscription title="Be The First to Know When We Launch Alternative Investment" />
        </Route>
      </Switch>
      <Footer />
      <WaitListModal open={modalOpen} toggleModal={handleModalToggle} />
    </>
  );
};

export default Products;

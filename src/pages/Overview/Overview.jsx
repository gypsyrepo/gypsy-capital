import React from 'react';
import styles from './Overview.module.scss';
import pageUrl from '../../routes/pageUrl';
import { FiLayers } from 'react-icons/fi';
import { BiCreditCard } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import Dashboard from '../../components/Dashboard/Dashboard';
import Button from '../../components/Button/Button';
import gypsyNote from '../../assets/icons/gypsyNotes.svg';
import altInvestment from '../../assets/icons/alternative.svg';
import { Col, Row } from 'react-bootstrap';


const Overview = ({ location }) => {
  const sidebarRoutes = [
    {
      label: "Dashboard",
      link: pageUrl.DASHBOARD_HOMEPAGE,
      icon: FiLayers
    },
    {
      label: "Consumer Credit",
      link: pageUrl.CONSUMER_CREDIT_PAGE,
      icon: GiTakeMyMoney
    },
    {
      label: "Credit Report",
      link: pageUrl.CREDIT_REPORT_PAGE,
      icon: BiCreditCard
    },
    {
      label: "Profile",
      link: pageUrl.PROFILE_PAGE,
      icon: AiOutlineUser
    },
  ]

  return (
    <Dashboard sidebarRoutes={sidebarRoutes} location={location}>
      <div className={styles.welcomeGroup}>
        <h2>Hey, Daniel</h2>
        <p className={styles.currentDate}>Today is Wednesday 13, January.</p>
      </div>
      <div className={styles.loanStatus}>
        <div className={styles.mainContent}>
          <h3>Active Loan</h3>
          <p>Sorry you currently have no active loan</p>
          <Button
            bgColor="#741763"
            size="sm"
            color="#fff"
            className="mt-4"
          >
            Apply for loan
          </Button>
        </div>
        <div className={styles.illustration}>

        </div>
      </div>
      <div className={styles.otherProducts}>
        <Row>
          <Col sm={12} md={6}>
            <div className={[styles.product, styles.borderClass].join(' ')}>
              <div className={styles.productIcon}>
                <img src={gypsyNote} alt="Gypsy Notes" width="25" />
              </div>
              <h3 className={styles.productTitle}>Gypsy Notes</h3>
              <p className="mt-2">Let your money work for you and enjoy high interest rates on your money. Start a Gypsy Fixed Income Note today and earn more.</p>
              <button className={[styles.productBtn, "mt-3"].join(' ')}>
                Be the first to know when we launch
              </button>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className={[styles.product, styles.border2Class].join(' ')}>
              <div className={styles.productIcon}>
                <img src={altInvestment} alt="Alternative Investment" width="40" />
              </div>
              <h3 className={styles.productTitle}>Alternative Investment</h3>
              <p className="mt-2">Are you an investor who seek greater rewards? Our Alternative Investment service is here to help you earn more.</p>
              <button className={[styles.productBtn, "mt-3"].join(' ')}>
                Be the first to know when we launch
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </Dashboard>
  )
}


export default Overview;
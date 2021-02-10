import React, {useState} from 'react';
import styles from './FaqSection.module.scss';
import { useAccordionToggle, Accordion, Card, AccordionCollapse } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';


const CustomToggle = ({ children, eventKey }) => {

  const [open, setOpen] = useState(false);

  const customOnClick = useAccordionToggle(eventKey, () => {
    setOpen(!open);
  })

  return (
    <div
      className={styles.customAccordionHeader}
      onClick={customOnClick}
    >
      { open ? 
        <FaMinus size="1.2em" className={styles.icon} color="#741763" /> : 
        <FaPlus size="1.2em" className={styles.icon} color="#741763" />
      }
      {children}
    </div>
  )
}

const FaqSection = () => {
  return (
    <div className={styles.faqSection}>
      <div className={styles.container}>
        <h2>Frequently Asked Questions</h2>
        <Accordion>
          <Card className={styles.accordionTab}>
            <Card.Header>
              <CustomToggle eventKey="0">
                Am I eligible for a Gypsy Capital Loan?/ Why am I not qualified?
              </CustomToggle>
            </Card.Header>
            <AccordionCollapse eventKey="0">
              <Card.Body>
                <p>To qualify for a loan, you must be:</p>
                <ul>
                  <li>Be between 25 – 59 years old</li>
                  <li>Have a verifiable source of income</li>
                  <li>Live and work in cities where we operate</li>
                  <li>Have a savings or current bank account with any commercial bank</li>
                </ul>
              </Card.Body>
            </AccordionCollapse>
          </Card>
          <Card className={styles.accordionTab}>
            <Card.Header>
              <CustomToggle eventKey="1">
                How much can I borrow and for how long?
              </CustomToggle>
            </Card.Header>
            <AccordionCollapse eventKey="1">
              <Card.Body>
                  You can borrow N250,000 for 3 months.
              </Card.Body>
            </AccordionCollapse>
          </Card>
          <Card className={styles.accordionTab}>
            <Card.Header>
              <CustomToggle eventKey="2">
                How do I apply?
              </CustomToggle>
            </Card.Header>
            <AccordionCollapse eventKey="2">
              <Card.Body>
                Please visit our website www.gypsycapital.com to apply or call +2349038406446.
              </Card.Body>
            </AccordionCollapse>
          </Card>
          <Card className={styles.accordionTab}>
            <Card.Header>
              <CustomToggle eventKey="3">
                How long does it take to process a loan?
              </CustomToggle>
            </Card.Header>
            <AccordionCollapse eventKey="3">
              <Card.Body>
              Your loan process can be completed in 24 hours provided all documents are valid & presented on application.
              </Card.Body>
            </AccordionCollapse>
          </Card>
          <Card className={styles.accordionTab}>
            <Card.Header>
              <CustomToggle eventKey="4">
                What documents do I need to apply for a loan? How long does it take to process a loan?
              </CustomToggle>
            </Card.Header>
            <AccordionCollapse eventKey="4">
              <Card.Body>
                Your loan process can be completed in 24 hours provided all documents are valid & presented on application.
              </Card.Body>
            </AccordionCollapse>
          </Card>
          <Card className={styles.accordionTab}>
            <Card.Header>
              <CustomToggle eventKey="4">
                Why does Gypsy Capital Need my BVN? 
              </CustomToggle>
            </Card.Header>
            <AccordionCollapse eventKey="4">
              <Card.Body>
              This is a CBN policy applicable to financial institutions as part of KYC requirements.
              </Card.Body>
            </AccordionCollapse>
          </Card>
        </Accordion>
        <button>
          View All
        </button>
      </div>
    </div>
  );
}


export default FaqSection;
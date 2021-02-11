import React, {useEffect, useState} from 'react';
import styles from './FaqSection.module.scss';
import { useAccordionToggle, Accordion, Card, AccordionCollapse } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { limitFaqContent } from '../../utils/nigeriaStates';


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

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    setFaqs(limitFaqContent(4))
  }, [])

  if(faqs.length === 0) {
    return null
  }

  return (
    <div className={styles.faqSection}>
      <div className={styles.container}>
        <h2>Frequently Asked Questions</h2>
        <Accordion>
          { faqs.map((faq, index) => (
            <Card className={styles.accordionTab}>
              <Card.Header>
                <CustomToggle eventKey={index+1}>
                  {faq.title}
                </CustomToggle>
              </Card.Header>
              <AccordionCollapse eventKey={index+1}>
                <Card.Body className={styles.cardBody}>
                  {faq.bodyContent()}
                </Card.Body>
              </AccordionCollapse>
            </Card>
          ))}
        </Accordion>
        <button>
          View All
        </button>
      </div>
    </div>
  );
}


export default FaqSection;
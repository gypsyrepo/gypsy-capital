import React, { useEffect, useState } from "react";
import styles from "./FaqSection.module.scss";
import {
  useAccordionToggle,
  Accordion,
  Card,
  AccordionCollapse,
} from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { limitFaqContent, faqContent } from "../../utils/nigeriaStates";
import { useHistory } from "react-router";

const CustomToggle = ({ children, eventKey }) => {
  const [open, setOpen] = useState(false);

  const customOnClick = useAccordionToggle(eventKey, () => {
    setOpen(!open);
  });

  return (
    <div className={styles.customAccordionHeader} onClick={customOnClick}>
      {open ? (
        <FaMinus size="1.2em" className={styles.icon} color="#741763" />
      ) : (
        <FaPlus size="1.2em" className={styles.icon} color="#741763" />
      )}
      {children}
    </div>
  );
};

const FaqSection = ({ returnNumber }) => {
  const [faqs, setFaqs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (typeof returnNumber === "number") {
      setFaqs(limitFaqContent(returnNumber));
    } else if (typeof returnNumber === "string" && returnNumber === "all") {
      setFaqs(faqContent);
    }
  }, []);

  if (faqs.length === 0) {
    return null;
  }

  return (
    <div className={styles.faqSection}>
      <div className={styles.container}>
        {returnNumber !== "all" && <h2>Frequently Asked Questions</h2>}
        <Accordion>
          {faqs.map((faq, index) => (
            <Card className={styles.accordionTab} key={index}>
              <Card.Header>
                <CustomToggle eventKey={index + 1}>{faq.title}</CustomToggle>
              </Card.Header>
              <AccordionCollapse eventKey={index + 1}>
                <Card.Body className={styles.cardBody}>
                  {faq.bodyContent()}
                </Card.Body>
              </AccordionCollapse>
            </Card>
          ))}
        </Accordion>
        {returnNumber !== "all" && (
          <button onClick={() => history.push("/frequently-asked-questions")}>
            View All
          </button>
        )}
      </div>
    </div>
  );
};

export default FaqSection;

import React from 'react'
import {Card} from 'react-bootstrap';

import styles from './AboutUs.module.scss';
const AboutCard = ({title, text, borderBottom}) => {
    return (
        <>
        {
            borderBottom === 'colorOne' ? (
                <Card className={styles.cards} style={{borderBottom: '5px solid #1F8DE8'}}>
                    <Card.Body>
                        <Card.Title className={styles.cardTitle}>{title}</Card.Title>
                        <Card.Text className={styles.cardText}>{text}</Card.Text>
                    </Card.Body>
                </Card>  
            )
            : borderBottom === 'colorTwo' ? (
                <Card className={styles.cards} style={{borderBottom: '5px solid #841FE8'}}>
                    <Card.Body>
                        <Card.Title className={styles.cardTitle}>{title}</Card.Title>
                        <Card.Text className={styles.cardText}>{text}</Card.Text>
                    </Card.Body>
                </Card>  
            )
            : borderBottom === 'colorThree' ? (
                <Card className={styles.cards} style={{borderBottom: '5px solid #015514'}}>
                    <Card.Body>
                        <Card.Title className={styles.cardTitle}>{title}</Card.Title>
                        <Card.Text className={styles.cardText}>{text}</Card.Text>
                    </Card.Body>
                </Card>  
            )
            :
            <Card className={styles.cards}>
                <Card.Body>
                    <Card.Title className={styles.cardTitle}>{title}</Card.Title>
                    <Card.Text className={styles.cardText}>{text}</Card.Text>
                </Card.Body>
            </Card>  
        }  
        </>
    )
}

export default AboutCard

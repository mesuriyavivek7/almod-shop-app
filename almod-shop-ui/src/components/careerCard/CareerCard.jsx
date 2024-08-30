import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import styles from "./careerCard.module.css"
import { ExpandMore } from '@mui/icons-material'

const CareerCard = ({ title, category, description, requirement }) => {
  return (
    <div className={styles.container}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          <p className={styles.titleContainer}>
            <div className={`${styles.careerTitle} ${styles.sansSerif}`}>
              {title}
            </div>
            <div className={styles.sansSerif}>
              {category}
            </div>
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.contentContainer}>
            <p>
              <b className={styles.sansSerif}>
                Job Description:
              </b>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: description }}
              >
              </div>
            </p>
            <p>
              <b className={styles.sansSerif}>
                Job Requirements:
              </b>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: requirement }}
              >
              </div>
            </p>
          </div>
        </AccordionDetails>

      </Accordion>

    </div>
  )
}

export default React.memo(CareerCard)
import React, { useEffect } from 'react'
import { useAccordionButton } from 'react-bootstrap';
import styles from './styles.module.css'

const CustomToggle = ({ children, eventKey, bg = 'transparent', closeAll}) => {
    const decoratedOnClick = useAccordionButton(eventKey, (e) =>
    {},
  );

  return (
    <div 
    className={styles.custom_toggle}     
      style={{        
        background:bg,
     }}
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  )
}

export default CustomToggle
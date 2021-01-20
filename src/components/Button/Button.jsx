import { getDefaultNormalizer } from '@testing-library/react';
import React from 'react';
import styles from './Button.module.scss';


const Button = ({ children, className, fullWidth, clicked, bgColor, size, color }) => {

  const buttonStyle = {
    width: fullWidth ? '100%' : getDefaultNormalizer,
    backgroundColor: bgColor,
    padding: size === 'lg' ? '12px 28px' : '8px 28px',
    color: color
  }

  return (
    <button 
      className={[className, styles.button].join(' ')}
      style={buttonStyle}
      onClick={clicked}
    >
      {children}
    </button>
  )
}


export default Button;
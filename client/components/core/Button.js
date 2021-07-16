import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/modules/Button.module.scss';

const Button = (props) => {
  const { children } = props;

  return (
    <motion.button
      className={`${styles.button} ${styles[props.type]}`}
      onClick={props.onClick}
      whileTap={{ scale: 0.95 }}>
      {children}
    </motion.button>
  );
};

export default Button;

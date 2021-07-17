import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/modules/Register.module.scss';

import AuthCode from './../components/auth/AuthCode';

const Register = () => {
  const handleCodeChange = (code, inputIndex) => {
    if (code.length === 6 && inputIndex === 5) {
      console.log('Selected Code is: ' + code);
      if (code !== '123456') {
        setAnimationPlaying(true);

        setTimeout(() => {
          setAnimationPlaying(false);
        }, 500);
      }
    }
  };

  const [animationPlaying, setAnimationPlaying] = useState(false);

  const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);
  const randomDuration = () => Math.random() * 0.07 + 0.23;

  const shakeVariants = {
    start: (i) => ({
      translateX: [5, -5, 0],
      transition: {
        delay: getRandomDelay(),
        repeat: Infinity,
        duration: randomDuration(),
      },
    }),
    reset: {
      translateX: 0,
    },
  };
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.welcome}>
          <div className={styles.cover}>
            <img src="./intro.jpg" />
          </div>
          <div className={styles.content}>
            <div className={styles.welcomeMessage}>
              <h1>Welcome to Lagoon!</h1>
              <span>
                To get started enter the code given to you by your teacher in
                the fields below.
              </span>
            </div>
          </div>
          <div className={styles.code}>
            <span>Registration Code</span>
            <motion.div
              variants={shakeVariants}
              animate={animationPlaying ? 'start' : 'reset'}>
              <AuthCode onValueChange={handleCodeChange} />
            </motion.div>
          </div>
        </div>
        <div className={styles.register}>HI</div>
      </div>
    </div>
  );
};

export default Register;

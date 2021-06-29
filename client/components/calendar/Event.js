import React, { useState, useEffect } from 'react';
import styles from '../../styles/calendar/Lesson.module.scss';
import { User, MapPin } from 'react-feather';
import { motion } from 'framer-motion';
import moment from 'moment';

const Event = (props) => {
  const { date } = props;

  const [color, setColor] = useState('lagoon');

  useEffect(() => {
    if (moment().diff(date) > 0) {
      setColor('black');
    }
  }, [date]);
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className={`${styles.lesson} ${styles[color]}`}
      style={{ height: props.height }}>
      <span className={styles.duration}>{props.duration}</span>
      <h1 className={styles.name}>
        {props.name}
        {props.exam && props.exam === true ? ' (Exam)' : ''}
      </h1>
      <div className={styles.infos}>
        <div className={styles.info}>
          <User className={styles.icon} size={15} />
          <span>{props.teacher}</span>
        </div>
        <div className={styles.info}>
          <MapPin className={styles.icon} size={15} />
          <span>{props.location}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Event;

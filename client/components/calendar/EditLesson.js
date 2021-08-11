import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import { User, MapPin } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import { clearLesson } from '../../store/features/editLessonSlice';

import styles from '../../styles/calendar/Detail.module.scss';

const EditLesson = () => {
  const [open, setOpen] = useState(false);

  const lesson = useSelector((state) => state.lesson.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(lesson).length !== 0) {
      setOpen(true);
    }
  }, [lesson]);

  const closeDetail = () => {
    dispatch(clearLesson());
    setOpen(false);
  };

  if (!open) {
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={closeDetail}
      className={styles.modal}>
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
        }}
        animate={{ scale: [0.7, 1.05, 1] }}
        transition={{ duration: 0.3 }}
        className={`${styles.modalBody} ${styles[lesson.course.color]}`}>
        <h1 className={styles.title}>{lesson.name}</h1>
        <div className={styles.info}>
          <User className={styles.icon} size={20} />
          <p>{lesson.course ? lesson.course.teacher : lesson.teacher}</p>
        </div>
        <div className={styles.info}>
          <MapPin className={styles.icon} size={20} />
          <p>{lesson.location}</p>
        </div>
        <p>
          {lesson.startTime} - {lesson.endTime}
        </p>
        <p className={styles.description}>{lesson.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default EditLesson;

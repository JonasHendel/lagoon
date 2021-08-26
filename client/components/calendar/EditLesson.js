import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import { User, MapPin } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import { clearLesson } from '@/store/features/editLessonSlice';

import styles from '@/styles/calendar/Detail.module.scss';

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
        className={`${styles.modalBody} ${
          lesson.course ? styles[lesson.course.color] : styles.lagoon
        }`}>
        <input defaultValue={lesson.course.name} className="input" />
        <select
          name="grade"
          className={`input ${styles.input}`}>
          <option value="" selected>
            Select grade
          </option>
          <option value="Grade 11">Grade 11</option>
          <option value="Grade 12">Grade 12</option>
          <option value="Grade 13">Grade 13</option>
        </select>
        <div className={styles.info}>
          <User className={styles.icon} size={20} />
          <input
            className="input"
            defaultValue={
              lesson.course ? lesson.course.teacher : lesson.teacher
            }
          />
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

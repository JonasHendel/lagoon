import styles from '../../styles/calendar/Month.module.scss';
import moment from 'moment';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setLesson } from '../../store/features/editLessonSlice';

const MonthDay = ({ day, startOfMonth, events }) => {
  const dispatch = useDispatch();
  console.log(events);
  return (
    <>
      {day.diff(moment(startOfMonth)) < 0 ? (
        <div className={styles.overlapContainer}>
          <div className={styles.cell}>
            <span></span>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.cell}>
            {day.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? (
              <div className={styles.currentDateDiv}>
                <p className={styles.currentDate}>{moment(day).format('DD')}</p>
              </div>
            ) : (
              <p className={styles.date}>{moment(day).format('DD')}</p>
            )}

            {day.diff(moment(startOfMonth)) >= 0 &&
              events &&
              events.map((event, index) => {
                {
                  /* First condition makes sure event isnt displayed on overlap next month */
                }
                if (
                  moment(day).isBetween(
                    event.startTime,
                    event.endTime,
                    'days',
                    '[]'
                  )
                ) {
                  return (
                    <motion.div
                      key={index}
                      whileTap={{ scale: 0.97 }}
                      className={`${styles.event} ${
                        styles[
                          moment().diff(event.endTime) > 0 ? 'black' : 'lagoon'
                        ]
                      }`}
                      onClick={() => {
                        dispatch(setLesson(event));
                      }}>
                      <p>{event.name}</p>
                    </motion.div>
                  );
                }
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default MonthDay;

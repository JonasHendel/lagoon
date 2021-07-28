import { useState, useLayoutEffect, useRef } from 'react';
import moment, { min } from 'moment';
import Lesson from './Lesson';

import styles from '../../styles/calendar/Calendar.module.scss';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const WeekView = ({ timetable, events }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const totalMins = 480;
  const minuteHeight = height / totalMins;

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  });

  // Current built-in time constraint: 8:00 - 17:00
  const timeToPosition = (time) => {
    time = time.split(':').map((item) => {
      return parseInt(item);
    });

    time[0] -= 8;

    return (time[0] * 60 + time[1]) * minuteHeight;
  };

  const durationToHeight = (duration) => {
    return duration * minuteHeight;
  };

  // Temporary; To be replaced by generation based on necessary range to show all events
  let timeRange = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ];

  const getPos = (e, day) => {
    const clickPosition = e.clientY - col.current.offsetTop;

    const tempTime = clickPosition / minuteHeight / 60 + 7;

    const time = Math.round(tempTime * 4) / 4;

    const timeArr = time.toString().split('.');

    const hour = timeArr[0];
    const min = timeArr[1];
  };

  const col = useRef(null);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.calendarCard}
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -500, opacity: 0 }}
        transition={{ duration: 0.3 }}>
        <div className={styles.timeCol}>
          <div className={styles.day}>
            <h1 className={styles.hidden}>ok</h1>
          </div>
          <div className={styles.timeWrap}>
            {timeRange.map((time) => (
              <span
                className={styles.absolute}
                style={{ top: timeToPosition(time) - 12 }}>
                {/* 12 is height of span/2 */}
                {time}
              </span>
            ))}
          </div>
        </div>
        {Object.keys(timetable).map((day, index) => (
          <div
            className={styles.column}
            onClick={(e) => getPos(e, day)}
            ref={col}>
            {day === moment().format('YYYY-MM-DD') ? (
              <div className={styles.day}>
                <h1>
                  {moment(day).format('ddd')}{' '}
                  <span className={styles.currentDay}>
                    {moment(day).format('DD')}
                  </span>
                </h1>
              </div>
            ) : (
              <div className={styles.day}>
                <h1>{moment(day).format('ddd DD')}</h1>
              </div>
            )}
            <div className={styles.dayContainer} ref={ref}>
              {timetable[day] &&
                timetable[day].map((lesson) => (
                  <div
                    className={styles.itemWrap}
                    style={{ top: timeToPosition(lesson.startTime) }}>
                    <Lesson
                      detail={lesson}
                      color={lesson.course ? lesson.course.color : lesson.color}
                      name={lesson.course ? lesson.course.name : lesson.name}
                      duration={`${lesson.startTime} - ${lesson.endTime}`}
                      teacher={
                        lesson.course ? lesson.course.teacher : lesson.teacher
                      }
                      location={lesson.location}
                      height={durationToHeight(lesson.duration)}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default WeekView;

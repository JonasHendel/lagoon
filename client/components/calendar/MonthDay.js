import styles from '../../styles/calendar/Month.module.scss';
import moment from 'moment';
import { useState } from 'react';

const MonthDay = ({ day, startOfMonth, events }) => {
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
                  <p className={styles.currentDate}>
                    {moment(day).format('DD')}
                  </p>
                </div>
              ) : (
                <p className={styles.date}>{moment(day).format('DD')}</p>
              )}

            {day.diff(moment(startOfMonth)) > 0 &&
              events &&
              events.map((event) => {
                {
                  /* First one makes sure event isnt displayed on overlap next month */
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
                    <div className={styles.event}>
                      <p>{event.eventName}</p>
                    </div>
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

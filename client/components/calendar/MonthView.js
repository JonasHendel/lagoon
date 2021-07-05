import { useState, useEffect } from 'react';
import moment from 'moment';
import styles from '../../styles/calendar/Month.module.scss';

import Day from './MonthDay';
import { AnimatePresence, motion } from 'framer-motion';

const MonthView = ({ events, date }) => {
  const [days, setDays] = useState();
  const [weekDays, setWeekDays] = useState();
  const [startOfMonth, setStartOfMonth] = useState();

  let daysInMonth = moment(date).daysInMonth();
  let arrMonthDays = [];
  let arrWeekDays = [];

  useEffect(() => {
    for (let i = 1; i <= 7; i++) {
      arrWeekDays.push(moment(date).day(i).format('dddd'));
    }
    setWeekDays(arrWeekDays);

    while (daysInMonth) {
      var current = moment(date).date(daysInMonth);
      arrMonthDays.push(current);
      daysInMonth--;
    }

    const firstDate = moment(date).startOf('month');
    setStartOfMonth(firstDate);

    let delay;
    if (firstDate.day() !== 0) {
      delay = firstDate.day() - 1;
    } else {
      delay = firstDate.day() + 6;
    }

    while (delay) {
      arrMonthDays.push(moment(firstDate).add(-delay, 'days'));
      delay--;
    }

    setDays(arrMonthDays.reverse());
  }, [date]);

  return (
    <AnimatePresence>
      <motion.div initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 500, opacity: 0 }}>
        <div className={styles.card}>
          {weekDays &&
            weekDays.map((weekday) => (
              <>
                <div className={styles.column}>
                  <p className={styles.weekDay}>{weekday}</p>
                  {days &&
                    days.map((day) => {
                      if (day.format('dddd') === weekday) {
                        return (
                          <Day
                            day={day}
                            events={events}
                            startOfMonth={startOfMonth}
                          />
                        );
                      }
                    })}
                </div>
              </>
            ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MonthView;

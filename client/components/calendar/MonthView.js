import { useState, useEffect } from 'react';
import moment from 'moment';
import styles from '../../styles/calendar/Month.module.scss';

import Day from './MonthDay';

const MonthView = ({ events, date }) => {
  const [days, setDays] = useState();
  const [weekDays, setWeekDays] = useState();
  const [startOfMonth, setStartOfMonth] = useState();
  var daysInMonth = moment(date).daysInMonth();

  let arrDays = [];
  let arrWeekDays = [];

  useEffect(() => {
    for (let i = 1; i <= 7; i++) {
      arrWeekDays.push(moment(date).day(i).format('dddd'));
    }
    setWeekDays(arrWeekDays);
  }, []);

  useEffect(() => {
    while (daysInMonth) {
      var current = moment(date).date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    const first = moment(date).startOf('month').day();
    const firstDate = moment(date).startOf('month');

    let delay;
    if (first !== 0) {
      delay = first - 1;
    } else {
      delay = first + 6;
    }

    setStartOfMonth(firstDate);

    while (delay) {
      arrDays.push(moment(firstDate).add(-delay, 'days'));
      delay--;
    }

    setDays(arrDays.reverse());
  }, [date]);

  return (
    <div>
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
    </div>
  );
};

export default MonthView;

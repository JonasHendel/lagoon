import { useState, useEffect } from 'react';
import moment from 'moment';

const MonthView = ({ events, date }) => {
  const [days, setDays] = useState();
  const [weekDays, setWeekDays] = useState();
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

    while (delay) {
      arrDays.push(moment(firstDate).add(-delay, 'days'));
      delay--;
    }

    console.log(arrDays);
    setDays(arrDays.reverse());
  }, [date]);

  return (
    <div>
      <div className="flex w-800 justify-between">
        {weekDays &&
          weekDays.map((weekday) => (
            <div>
              <h1>{weekday}</h1>
              {days &&
                days.map((day) => {
                  if (day.format('dddd') === weekday) {
                    return <h1>{moment(day).format('DD')}</h1>;
                  }
                })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MonthView;

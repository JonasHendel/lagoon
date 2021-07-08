import Head from 'next/head';
import { useEffect, useState } from 'react';
import moment from 'moment';

import { getData } from '../utils/fetchData';
import styles from '../styles/calendar/Calendar.module.scss';
import DateSelect from '../components/calendar/DateSelect';
import ViewSelect from '../components/core/Select';
import WeekView from '../components/calendar/WeekView';
import MonthView from '../components/calendar/MonthView';
import YearView from '../components/calendar/YearView';
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import { useSelector, useDispatch } from 'react-redux';

const Calendar = () => {
  const [lessons, setLessons] = useState();
  const [events, setEvents] = useState();
  const [timetable, setTimetable] = useState({});
  const [date, setDate] = useState(moment());
  const [view, setView] = useState('Month');
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  useEffect(async () => {
    const res = await getData(`calendar/?userId=${auth.user.id}`);
    setLessons(res.lessons);
    setEvents(res.events);
  }, [auth, date]);

  let days = [];

  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      days.push(moment(date).day(i).format('YYYY-MM-DD'));
    }
    let tempTimetable = {};
    if (lessons && events) {
      lessons.sort((a, b) => {
        return (
          parseInt(a.startTime.split(':')[0]) -
          parseInt(b.startTime.split(':')[0])
        );
      });

      days.map((day, index) => {
        tempTimetable[day] = [];
        lessons.map((lesson) => {
          if (lesson.day !== index + 1) {
            return null;
          }

          const { course } = lesson;

          const lessonDateStartTime = moment(
            moment(date).day(lesson.day).format('YYYY-MM-DD') +
              ' ' +
              lesson.startTime
          );
          const lessonDateEndTime = moment(
            moment(date).day(lesson.day).format('YYYY-MM-DD') +
              ' ' +
              lesson.endTime
          );

          events.map((event) => {
            if (
              moment(lessonDateEndTime).isBetween(
                moment(event.startTime),
                moment(event.endTime),
                'hours',
                '[]'
              )
            ) {
              tempTimetable[day].push({
                ...event,
                color: moment().diff(event.endTime) > 0 ? 'black' : 'lagoon',
                day: moment(date).day(lesson.day).format('YYYY-MM-DD'),
                duration:
                  day === moment(event.endTime).format('YYYY-MM-DD')
                    ? moment(event.endTime).diff(
                        moment(event.endTime).set('hour', 8),
                        'minutes'
                      )
                    : day === moment(event.startTime).format('YYYY-MM-DD')
                    ? moment(event.startTime)
                        .set('hour', 16)
                        .diff(moment(event.startTime), 'minutes')
                    : moment(event.startTime)
                        .set('hour', 16)
                        .diff(
                          moment(event.startTime).set('hour', 8),
                          'minutes'
                        ),
                startTime:
                  day === moment(event.startTime).format('YYYY-MM-DD')
                    ? moment(event.startTime).format('HH:mm')
                    : '08:00',
                startTimeUnformatted: moment(event.startTime),
                endTime: moment(event.endTime),
                type: 'event',
              });
            } else {
              tempTimetable[day].push({
                ...lesson,
                day: moment(date).day(lesson.day).format('YYYY-MM-DD'),
                course: {
                  ...course,
                  color:
                    moment().diff(lessonDateEndTime) > 0
                      ? 'black'
                      : lesson.course.color,
                },
                duration: moment(lessonDateEndTime).diff(
                  lessonDateStartTime,
                  'minutes'
                ),
              });
            }
          });
        });
      });
      setTimetable(tempTimetable);
    }
  }, [lessons]);

  if (auth.token.length <= 0) {
    return null;
  }

  console.log(timetable)
  return (
    <>
      <Head>
        <title>Lagoon Calendar</title>
      </Head>
      <div className={styles.calendarWrap}>
        <div className={styles.container}>
          <div className={styles.selector}>
            <DateSelect date={date} setDate={setDate} view={view} />
            <ViewSelect
              list={['Week', 'Month']}
              onChange={(selected) => {
                setDate(moment());
                setView(selected);
              }}
            />
          </div>
          {view === 'Week' && (
            <WeekView timetable={timetable} events={events} />
          )}
          {view === 'Month' && <MonthView events={events} date={date} />}
          {view === 'Year' && <YearView date={date} events={events} />}
        </div>
      </div>
    </>
  );
};

export default Calendar;

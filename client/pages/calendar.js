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


const Calendar = () => {
	const [lessons, setLessons] = useState();
	const [events, setEvents] = useState();
	const [timetable, setTimetable] = useState({});
	const [date, setDate] = useState(moment());
	const [view, setView] = useState('Month');

	useEffect(async () => {
		const res = await getData('calendar');
		setLessons(res.lessons);
		setEvents(res.events);
	}, [date]);

	let days = [];

	useEffect(() => {
		for (let i = 1; i <= 5; i++) {
			days.push(moment(date).day(i).format('YYYY-MM-DD'));
		}
	});

	useEffect(() => {
		let tempTimetable = {};
		if (lessons !== undefined) {
			lessons.sort((a, b) => {
				return parseInt(a.startTime.split(':')[0]) - parseInt(b.startTime.split(':')[0]);
			});
			days.map((day, index) => {
				tempTimetable[day] = [];
				lessons.map((lesson) => {
					if (lesson.day !== index + 1) {
						return;
					}

					const { course, startTime } = lesson;

					const lessonDate = moment(date).day(lesson.day).format('YYYY-MM-DD');

					const lessonDateTime = moment(lessonDate + ' ' + lesson.endTime);

					if (moment().diff(lessonDateTime) > 0) {
						tempTimetable[day].push({
							...lesson,
							day: moment(date).day(lesson.day).format('YYYY-MM-DD'),
							course: { ...course, color: 'black' }
						});
					} else {
						tempTimetable[day].push({
							...lesson,
							day: moment(date).day(lesson.day).format('YYYY-MM-DD')
						});
					}
				});
			});
			setTimetable(tempTimetable);
		}
	}, [lessons]);


	return (
		<>
			<Head>
				<title>Lagoon Calendar</title>
			</Head>
			<div className={styles.calendarWrap}>
				<div className={styles.container}>
					<div className={styles.selector}>
          <DateSelect date={date} setDate={setDate} view={view}/>
						<ViewSelect
							list={['Week', 'Month', 'Year']}
							onChange={(selected) => {
                setDate(moment())
								setView(selected);
							}}
						/>
					</div>
					{view === 'Week' && <WeekView timetable={timetable} events={events}/>}
					{view === 'Month' && <MonthView events={events} date={date}/>}
					{view === 'Year' && <YearView date={date}/>}
				</div>
			</div>
		</>
	);
};

export default Calendar;

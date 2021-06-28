import { getData } from '../utils/fetchData';
import { useEffect, useState } from 'react';
import styles from '../styles/calendar/Calendar.module.scss';
import { ArrowLeft, ArrowRight } from 'react-feather';
import Head from 'next/head';
import { motion } from 'framer-motion';

import ViewSelect from '../components/core/Select';

import moment from 'moment';
import WeekView from '../components/calendar/WeekView';


const Calendar = () => {
	const [lessons, setLessons] = useState();
	const [events, setEvents] = useState();
	const [timetable, setTimetable] = useState({});
	const [date, setDate] = useState(moment());

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


	const timeToAbs = (time) => {
		const columnHeight = 710;
		const totalMins = (17 - 8) * 60;

		const timeFrame = [0, totalMins]

		// console.log(columnHeight / totalMins);

	}
	timeToAbs("8:00");

	const timeToPosition = (time) => {
		switch (time) {
			case '8:00':
				return 'one';
				break;
			case '9:45':
				return 'two';
				break;
			case '11:55':
				return 'three';
				break;
			case '13:40':
				return 'four';
				break;
			case '15:30':
				return 'five';
				break;
		}
	};

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
							course: { ...course, color: 'black' },
							position: timeToPosition(startTime),
						});
					} else {
						tempTimetable[day].push({
							...lesson,
							day: moment(date).day(lesson.day).format('YYYY-MM-DD'),
							position: timeToPosition(startTime),
						});
					}
				});
			});
			setTimetable(tempTimetable);
		}
	}, [lessons]);

	const nextDate = () => {
		setDate(moment(date).add(7, 'days').day(1));
	};

	const previousDate = () => {
		setDate(moment(date).add(-7, 'days').day(1));
	};

	return (
		<>
			<Head>
				<title>Lagoon Calendar</title>
			</Head>
			<div className={styles.calendarWrap}>
				<div className={styles.container}>
					<div className={styles.selector}>
						<div className={styles.dateSelect}>
            <div className="cursor-pointer">
							<ArrowLeft onClick={previousDate} size={25} />
            </div>
							<p className={styles.selectText}>
								{moment(date).day(1).format('MMMM DD ')}-{moment(date).day(5).format(' DD, YYYY')}
							</p>
            <div className="cursor-pointer">

							<ArrowRight onClick={nextDate} size={25} />
              </div>
						</div>
						<ViewSelect
							list={['Week', 'Month', 'Year']}
							onChange={(selected) => {
								console.log(selected);
							}}
						/>
					</div>
            <WeekView timetable={timetable} events={events}/>
				</div>
			</div>
		</>
	);
};

export default Calendar;

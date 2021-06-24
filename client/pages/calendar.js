import { getData } from '../utils/fetchData';
import { useEffect, useState } from 'react';
import styles from '../styles/calendar/Calendar.module.scss';
import { ArrowLeft, ArrowRight } from 'react-feather';
import Head from 'next/head';
import { motion } from 'framer-motion';

import ViewSelect from '../components/core/Select';

import moment from 'moment';
import Lesson from '../components/calendar/Lesson';
import Event from '../components/calendar/Event';

const Calendar = () => {
	const [lessons, setLessons] = useState();
	const [events, setEvents] = useState();
	const [timetable, setTimetable] = useState({});
	const [exam, setExam] = useState(false);
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

		console.log(columnHeight / totalMins);

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
		if (events) {
			events.map((event) => {
				console.log(moment(event.date + ' ' + event.startTime));
				lessons.map((lesson) => {
					if (moment(event.date).format('YYYY-MM-DD') === moment(date).day(lesson.day).format('YYYY-MM-DD')) {
					}
				});
			});
		}
	}, [events]);

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
							<ArrowLeft onClick={previousDate} size={25} />
							<p className={styles.selectText}>
								{moment(date).day(1).format('MMMM DD ')}-{moment(date).day(5).format(' DD, YYYY')}
							</p>
							<ArrowRight onClick={nextDate} size={25} />
						</div>
						<ViewSelect
							list={['Week', 'Month', 'Year']}
							onChange={(selected) => {
								console.log(selected);
							}}
						/>
					</div>
					<div className={styles.calendarCard}>
						<div className={styles.timeCol}>
							<div className={styles.one}>
								<p>08:00</p>
								<p>09:30</p>
							</div>
							<div className={styles.two}>
								<p>09:45</p>
								<p>11:15</p>
							</div>
							<div className={styles.three}>
								<p>11:55</p>
								<p>13:25</p>
							</div>
							<div className={styles.four}>
								<p>13:40</p>
								<p>15:10</p>
							</div>
							<div className={styles.five}>
								<p>15:30</p>
								<p>17:00</p>
							</div>
						</div>
						{Object.keys(timetable).map((day, index) => (
							<div className={styles.column}>
								{day === moment().format('YYYY-MM-DD') ? (
									<div className={styles.day}>
										<h1>{moment(day).format('ddd')} <span className={styles.currentDay}>{moment(day).format('DD')}</span></h1>
									</div>
								) : (
									<div className={styles.day}>
										<h1>{moment(day).format('ddd DD')}</h1>
									</div>
								)}
								{timetable[day] &&
									timetable[day].map((lesson) => (
										<div className={styles[lesson.position]}>
											{events &&
												events.map((event) => {
													if (moment(event.date + ' ' + event.startTime).format('YYYY-MM-DD-HH-MM') === moment(lesson.day + ' ' + lesson.startTime).format('YYYY-MM-DD-HH-MM')) {
														return (
                              <Event
                                date={event.date}
																name={event.eventName}
																duration={`${event.startTime} - ${event.endTime}`}
																teacher={event.teacher}
																location={lesson.location}
																exam={exam}
															/>
														);
													} else {
														return (
															<Lesson
																color={lesson.course.color}
																name={lesson.course.name}
																duration={`${lesson.startTime} - ${lesson.endTime}`}
																teacher={lesson.course.teacher}
																location={lesson.location}
																exam={exam}
															/>
														);
													}
												})}
										</div>
									))}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Calendar;

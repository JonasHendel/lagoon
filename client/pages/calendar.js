import { getData } from '../utils/fetchData';
import { useEffect, useState } from 'react';
import styles from '../styles/calendar/Calendar.module.scss';
import {ChevronLeft, ChevronRight} from 'react-feather'

import moment from 'moment';
import Lesson from '../components/calendar/Lesson';

const Calendar = () => {
	const [lessons, setLessons] = useState();
	const [timetable, setTimetable] = useState({});
	const [exam, setExam] = useState(false);
	const [date, setDate] = useState(moment());

	useEffect(async () => {
		const res = await getData('calendar');
		setLessons(res);
	}, [date]);

	let days = [];

	useEffect(() => {
		for (let i = 1; i <= 5; i++) {
			days.push(moment(date).day(i).format('ddd-DD'));
		}
	});

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
				return (
					parseInt(a.startTime.split(':')[0]) -
					parseInt(b.startTime.split(':')[0])
				);
			});
			days.map((day, index) => {
				tempTimetable[day] = [];
				lessons.map((lesson) => {
					if (lesson.day !== index + 1) {
						return;
					}

					const { course, startTime } = lesson;

					const lessonDate = moment(date)
						.day(lesson.day)
						.format('YYYY-MM-DD');

					const lessonDateTime = moment(
						lessonDate + ' ' + lesson.endTime
					);

					if (moment().diff(lessonDateTime) > 0) {
						tempTimetable[day].push({
							...lesson,
							day: moment(date)
								.day(lesson.day)
								.format('YYYY-MM-DD'),
							course: { ...course, color: 'black' },
							position: timeToPosition(startTime),
						});
					} else {
						tempTimetable[day].push({
							...lesson,
							day: moment(date)
								.day(lesson.day)
								.format('YYYY-MM-DD'),
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
			<div className={styles.container}>
				<div className={styles.selector}>
					<div className={styles.dateSelect}>
						<ChevronLeft onClick={previousDate}/>
						<p>
							{moment(date).day(1).format('MMMM DD ')}-
							{moment(date).day(5).format(' DD, YYYY')}
						</p>
						<ChevronRight onClick={nextDate}/>
					</div>
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
							<h1 className={styles.day}>{`${day}`}</h1>
							{timetable[day] &&
								timetable[day].map((lesson) => (
									<div className={styles[lesson.position]}>
										<Lesson
											color={lesson.course.color}
											name={lesson.course.name}
											duration={`${lesson.startTime} - ${lesson.endTime}`}
											teacher={lesson.course.teacher}
											location={lesson.location}
											exam={exam}
										/>
									</div>
								))}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Calendar;

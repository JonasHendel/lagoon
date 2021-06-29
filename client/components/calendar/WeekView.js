import { useState, useLayoutEffect, useRef } from 'react';
import moment, { min } from 'moment';
import Lesson from './Lesson';
import Event from './Event';

import styles from '../../styles/calendar/Calendar.module.scss';

const WeekView = ({timetable, events}) => {
	const [height, setHeight] = useState(0);
	const ref = useRef(null);

	const totalMins = (17 - 8) * 60;
	const minuteHeight = height / totalMins;

	useLayoutEffect(() => {
		setHeight(ref.current.clientHeight);
	});

	// Current built-in time constraint: 8:00 - 17:00
	const timeToPosition = (time) => {
		time = time.split(":").map(item => {
			return parseInt(item);
		})

		time[0] -= 8;

		return (((time[0]) * 60) + time[1]) * minuteHeight;
	};

	const durationToHeight = (duration) => {
		return duration * minuteHeight;
	}

	// Temporary; To be replaced by generation based on necessary range to show all events
	let timeRange = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

	return (
		<div className={styles.calendarCard}>
			<div className={styles.timeCol}>
				<div className={styles.day}>
					<h1 className={styles.hidden}>ok</h1>
				</div>
				<div className={styles.timeWrap}>
					{timeRange.map(time => (
						<span className={styles.absolute} style={{top: timeToPosition(time)}}>{time}</span>
					))}			
			</div>

			</div>
			{Object.keys(timetable).map((day, index) => (
				<div className={styles.column}>
					{day === moment().format('YYYY-MM-DD') ? (
						<div className={styles.day}>
							<h1>
								{moment(day).format('ddd')} <span className={styles.currentDay}>{moment(day).format('DD')}</span>
							</h1>
						</div>
					) : (
						<div className={styles.day}>
							<h1>{moment(day).format('ddd DD')}</h1>
						</div>
					)}
					<div className={styles.dayContainer} ref={ ref }>
						{timetable[day] &&
							timetable[day].map((lesson) => (
								<div className={styles.itemWrap} style={{top: timeToPosition(lesson.startTime)}}>
									{events &&
										events.map((event) => {
											if (moment(lesson.day + ' ' + lesson.startTime).isBetween(event.startTime, event.endTime, 'days', '[]')) {
												return (
													<Event
														date={event.date}
														name={event.eventName}
														duration={`${moment(event.startTime).format('HH:mm')} - ${moment(event.endTime).format('HH:mm')}`}
														teacher={event.teacher}
														location={lesson.location}
														height={durationToHeight(90)}
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
														height={durationToHeight(90)}
													/>
												);
											}
										})}
								</div>
							))}
					</div>
				</div>
			))}
		</div>
	);
};

export default WeekView

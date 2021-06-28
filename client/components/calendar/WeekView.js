import moment from 'moment';
import Lesson from './Lesson';
import Event from './Event';

import styles from '../../styles/calendar/Calendar.module.scss';

const WeekView = ({timetable, events}) => {
	return (
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
							<h1>
								{moment(day).format('ddd')} <span className={styles.currentDay}>{moment(day).format('DD')}</span>
							</h1>{' '}
							{/* Highlights current date with red box */}
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
										if (moment(lesson.day + ' ' + lesson.startTime).isBetween(event.startTime, event.endTime, undefined, '[]')) {
											return (
												<Event
													date={event.date}
													name={event.eventName}
													duration={`${moment(event.startTime).format('DD-MM-YY HH:mm')} - ${moment(event.endTime).format('DD-MM-YY HH:mm')}`}
													teacher={event.teacher}
													location={lesson.location}
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
												/>
											);
										}
									})}
							</div>
						))}
				</div>
			))}
		</div>
	);
};

export default WeekView

import React from 'react';
import styles from '../../styles/calendar/Lesson.module.scss';
import { User, MapPin } from 'react-feather';

const Lesson = (props) => {
	let color = props.exam && props.exam === true ? 'lagoon' : props.color;
	return (
		<div className={`${styles.lesson} ${styles[color]}`}>
			<span className={styles.duration}>{props.duration}</span>
			<h1 className={styles.name}>
				{props.name}
				{props.exam && props.exam === true ? ' (Exam)' : ''}
			</h1>
			<div className={styles.infos}>
				<div className={styles.info}>
					<User className={styles.icon} size={15} />
					<span>{props.teacher}</span>
				</div>
				<div className={styles.info}>
					<MapPin className={styles.icon} size={15} />
					<span>{props.location}</span>
				</div>
			</div>
		</div>
	);
};

export default Lesson;

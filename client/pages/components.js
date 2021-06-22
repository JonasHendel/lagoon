import styles from '../styles/components.module.scss';

import Input from '../components/core/Input';
import Button from '../components/core/Button';
import Select from '../components/core/Select';

import Lesson from '../components/calendar/Lesson';

const Components = () => {
	return (
		<>
			<div className='p-10'>
				<Input placeholder='Max Mustermann' />
				<br />
				<Button type='primary'>Button</Button>
				<br />
				<Button type='secondary'>Button</Button>
				<br />
				<Button type='danger'>Button</Button>
				<br />
				<Lesson
					color='blue'
					name='Englisch'
					duration='8:00 - 9:30'
					teacher='Pommee, Daniel'
					location='P5'
				/>
				<br />
				<Lesson
					name='Deutsch'
					duration='8:00 - 9:30'
					teacher='Blum, Johanna'
					location='P5'
					exam={true}
				/>
				<br />
				<div className={styles.selectWrap}>
					<Select list={['Week', 'Month', 'Year']} onChange={(selected) => {console.log(selected)}}/>
				</div>
			</div>
		</>
	);
};

export default Components;

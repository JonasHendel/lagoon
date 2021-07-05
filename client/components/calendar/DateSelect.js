import styles from '../../styles/calendar/Calendar.module.scss';
import { ArrowLeft, ArrowRight } from 'react-feather';
import moment from 'moment';
import { motion } from 'framer-motion';

const DateSelect = ({ date, setDate, view }) => {
  const nextDate = () => {
    switch (view) {
      case 'Week':
        setDate(moment(date).add(7, 'days').day(1));
        break;
      case 'Month':
        setDate(moment(date).add(1, 'months').startOf('month'));
        break;
      case 'Year':
        setDate(moment(date).add(1, 'years').startOf('year'));
        break;
    }
  };

  const previousDate = () => {
    switch (view) {
      case 'Week':
        setDate(moment(date).add(-7, 'days').day(1));
        break;
      case 'Month':
        setDate(moment(date).add(-1, 'months').startOf('month'));
        break;
      case 'Year':
        setDate(moment(date).add(-1, 'years').startOf('month'));
        break;
    }
  };
  return (
    <div className={styles.dateSelect}>
      <div className="cursor-pointer">
        <ArrowLeft onClick={previousDate} size={25} />
      </div>
      {view === 'Week' && (
        <motion.p
          className={styles.selectText}
          transition={{ ease: 'easeOut', duration: 2 }}>
          {moment(date).day(1).format('MMMM DD ')}-
          {moment(date).day(5).format(' DD, YYYY')}
        </motion.p>
      )}
      {view === 'Month' && (
        <p className={styles.selectText}>
          {moment(date).startOf('month').format('MMMM YYYY')}
        </p>
      )}
      {view === 'Year' && (
        <p className={styles.selectText}>{moment(date).format('YYYY')}</p>
      )}

      <div className="cursor-pointer">
        <ArrowRight onClick={nextDate} size={25} />
      </div>
    </div>
  );
};

export default DateSelect;

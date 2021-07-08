import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import moment from 'moment';
import { motion } from 'framer-motion';
import { User, MapPin } from 'react-feather';

import styles from '../../styles/calendar/Detail.module.scss';
import { postData } from '../../utils/fetchData';

const EditModal = () => {
  const [open, setOpen] = useState(false);
  // const { state, dispatch } = useContext(DataContext);
  // const { event } = state;
  // const { course } = { event };

  const initialState = {
    name: '',
    startTime: '',
    endTime: '',
    date: '',
    teacher: '',
    location: '',
    type: '',
    description: '',
  };

  const [eventInfo, setEventInfo] = useState(initialState);

  // useEffect(() => {
  //   if (Object.keys(event).length !== 0) {
  //     setOpen(true);
  //   }
  //   setEventInfo(event);
  // }, [event]);

  const closeDetail = () => {
    // dispatch({ type: 'ADD_EVENT', payload: {} });
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  const createEvent = async () => {
    await postData('calendar', { ...eventInfo });
  };

  if (!open) {
    return null;
  }
  return (
    <div></div>
    // <motion.div
    //   initial={{ opacity: 0.5 }}
    //   animate={{ opacity: 1 }}
    //   transition={{ duration: 0.3 }}
    //   onClick={closeDetail}
    //   className={styles.modal}>
    //   <motion.div
    //     onClick={(e) => {
    //       e.stopPropagation();
    //     }}
    //     animate={{ scale: [0.7, 1.05, 1] }}
    //     transition={{ duration: 0.3 }}
    //     className={styles.modalBody}>
    //     <h1>Edit</h1>
    //     <input
    //       className={styles.title}
    //       value={eventInfo.name}
    //       name="name"
    //       onChange={handleChange}
    //     />
    //     <div className={styles.info}>
    //       <User className={styles.icon} size={20} />
    //       <input
    //         value={eventInfo.teacher}
    //         name="teacher"
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className={styles.info}>
    //       <MapPin className={styles.icon} size={20} />
    //       <input
    //         value={eventInfo.location}
    //         name="location"
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <p>
    //       {moment(
    //         course ? course.startTime : event.startTimeUnformatted
    //       ).format('HH:mm DD.MM.YYYY')}{' '}
    //       -{' '}
    //       {moment(course ? course.endTime : event.endTime).format(
    //         'HH:mm DD.MM.YYYY'
    //       )}
    //     </p>
    //     <input
    //       type="datetime-local"
    //       name="startTime"
    //       value={eventInfo.startTime}
    //       onChange={handleChange}
    //     />
    //     <input
    //       type="datetime-local"
    //       name="endTime"
    //       value={eventInfo.endTime}
    //       onChange={handleChange}
    //     />
    //     <textarea
    //       value={eventInfo.description}
    //       name="description"
    //       onChange={handleChange}
    //     />
    //     <button onClick={createEvent}>Create Event</button>
    //   </motion.div>
    // </motion.div>
  );
};

export default EditModal;

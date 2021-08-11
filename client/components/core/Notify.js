import { useContext } from 'react';
import Toast from './Toast';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotify } from '../../store/features/notifySlice';

const Notify = () => {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notify);

  return (
    <>
        <>
      {notify.loading && <Loading/>}
      {notify.error && <Toast message={{error: true, msg: notify.error}} handleShow={()=>{dispatch(clearNotify())}}/>}
      {notify.success && <Toast message={{error: false, msg: notify.success}} handleShow={()=>{dispatch(clearNotify())}}/>}
    </>
    </>
  );
};

export default Notify

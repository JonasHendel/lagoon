import { useContext } from 'react';
import Toast from './Toast';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotify } from '../../store/features/notifySlice';

const Notify = () => {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notify);

  console.log(notify);

  if (notify.success || notify.error || notify.loading) {
    setTimeout(() => {
      dispatch(clearNotify());
    }, 3000);
  }

  return (
    <>
      <>
        {notify.loading && <Loading />}
        {notify.error && <Toast message={{ error: true, msg: notify.error }} />}
        {notify.success && (
          <Toast message={{ error: false, msg: notify.success }} />
        )}
      </>
    </>
  );
};

export default Notify;

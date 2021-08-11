import { useDispatch } from 'react-redux';
import {success} from '../../store/features/notifySlice'

const FileViewer = () => {
  const dispatch = useDispatch();

  const notify = () => {
    dispatch(success('Test'));
  };

  return (
    <div>
      <button onClick={notify}>Notify</button>
    </div>
  );
};

export default FileViewer;

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {success} from '../store/features/notifySlice'

const Test = () => {
  const dispatch = useDispatch();

  const path = ['jonas', 'harvey', 'paul']
  
  console.log(path.filter((item)=> item !== 'harvey'))
  const notify = () => {
    
  };

  return (
    <div>
      <button onClick={()=>dispatch(success('Mindfs'))}>Notify</button>
      <button onClick={()=>dispatch(success('Tets'))}>Notify</button>
    </div>
  );
};

export default Test;

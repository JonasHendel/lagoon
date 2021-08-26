import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { success } from '@/store/features/notifySlice';
import { getData } from '@/utils/fetchData';
import DD from '@/components/core/DropDownSearch';

const Test = () => {
  const dispatch = useDispatch();

  const [teachers, setTeachers] = useState([]);

  const [teacher, setTeacher] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const res = await getData('user/teachers');
      setTeachers(res);
    };

    getUsers();
  }, []);

  if(teacher) console.log(teacher.name);



  return (
    <div>
      <button onClick={() => dispatch(success('Mindfs'))}>Notify</button>
      <button onClick={() => dispatch(success('Tets'))}>Notify</button>
      <DD
        title={'Select Teachers'}
        options={teachers}
        onChange={(selected) => {
          setTeacher(selected);
        }}
      />
    </div>
  );
};

export default Test;

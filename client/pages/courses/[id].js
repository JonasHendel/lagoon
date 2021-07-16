import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/fetchData';

const Course = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState();

  useEffect(async () => {
    if (id) {
      const res = await getData(`courses/?courseId=${id}`);
      setCourse(res);
    }
  }, [id]);

  if(!course) {
    return null;
  }
  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.teacher}</p>
    </div>
  );
};

export default Course;

import { useEffect, useState } from 'react';
import { getData } from '../../utils/fetchData';
import Link from 'next/link';

const Courses = () => {
  const [courses, setCourses] = useState();

  useEffect(async () => {
    const res = await getData('courses');
    console.log(res);
    setCourses(res);
  },[]);


  if (!courses) return null;
  return (
    <>
        {courses &&
          courses.map((course) => (
            <Link href={`/courses/${course._id}`}>
            <div>
              <p>{course.name}</p>
              <p>{course.teacher}</p>
              <p>Grade: {course.grade}</p>
            </div>
            </Link>
          ))}
    </>
  );
};

export default Courses;

import { useEffect, useState } from 'react';
import { getData } from '../../utils/fetchData';
import Link from 'next/link';

const Courses = () => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    const getCourses = async () => {
      const res = await getData('courses');
      setCourses(res);
    };
    getCourses();
  }, []);

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

import styles from '../../styles/course/CourseNav.module.scss';
import Link from 'next/link';
import { DivideCircle } from 'react-feather';

const CourseNav = ({ course }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.courseInfo}>
        <p className={styles.infoText}>{course.grade}</p>
        <p className={styles.infoText}>{course.name}</p>
      </div>
      <div className={styles.linkDiv}>
        <Link href={`/courses/${course._id}`}>
          <a>Home</a>
        </Link>
        <Link href={`/courses/${course._id}/resources`}>
          <a>Resources</a>
        </Link>
        <Link href={`/courses/${course._id}/tasks`}>
          <a>Tasks</a>
        </Link>
        <Link href={`/courses/${course._id}/tasks`}>
          <a>Plans</a>
        </Link>
      </div>
    </div>
  );
};

export default CourseNav;

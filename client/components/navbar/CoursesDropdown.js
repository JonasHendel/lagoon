import { useEffect, useState } from 'react';
import { useHover } from '../../utils/hover';
import { getData } from '../../utils/fetchData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../../styles/modules/CoursesDropdown.module.scss';

export default function CoursesDropdown(props) {
  const [courses, setCourses] = useState();
  const [dropdownRef, isHovered] = useHover();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log(courses);
  let toggleDropdown = () => {
    setDropdownOpen((status) => !status);
  };

  useEffect(() => {
    if (!isHovered) {
      setTimeout(() => {
        setDropdownOpen(false);
      }, 100);
    } else {
      setDropdownOpen(true);
    }
  });

  useEffect(async () => {
    const res = await getData('courses');
    console.log(res);
    setCourses(res);
  }, []);

  const dropdownVariants = {
    enter: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 0.25,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      translateY: -10,
      transition: {
        duration: 0.2,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.coursesDropdown} ${props.className}`}>
      <span className={styles.navName} onClick={toggleDropdown}>
        Courses
      </span>
      <motion.div
        className={styles.dropdown}
        variants={dropdownVariants}
        initial="exit"
        animate={dropdownOpen ? 'enter' : 'exit'}>
        <div className={styles.courses}>
          {courses &&
            courses.map((course) => (
              <Link href={`/courses/${course._id}`}>
                <div
                  className={`${styles.course} ${styles.color} ${
                    styles[course.color]
                  }`}>
                  <span className={styles.courseName}>{course.name}</span>
                  <span className={styles.teacher}>{course.teacher}</span>
                </div>
              </Link>
            ))}
        </div>
      </motion.div>
    </div>
  );
}

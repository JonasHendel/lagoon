import styles from '../../styles/course/CourseNav.module.scss';
import Link from 'next/link';
import { DivideCircle } from 'react-feather';
import { useState, useEffect } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { changeEdit } from '../../store/features/editSlice';
import { useRouter } from 'next/router'
import courseQueries from '../../utils/courseQueries';

const CourseNav = ({ course, onChange, list }) => {
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState(parseInt(router.query.page) || 0); // if query.page is not set, default to 0
  const dispatch = useDispatch();
  
  // sets page to selectedItem and changes the page
  useEffect(() => {
    courseQueries({router, page: parseInt(selectedItem)+1})
    onChange(list[router.query.page])
  }, [selectedItem]);




  return (
    <div className={`${styles.navbar} ${styles[course.color]}`}>
      <div className={styles.courseInfo}>
        <p className={styles.infoText}>{course.grade}</p>
        <p className={styles.infoText}>{course.name}</p>
      </div>
      <AnimateSharedLayout>
        <div className={styles.select}>
          {/* {auth.user && auth.user.role === 'admin' && ( */}
          {list.map((item, index) => {
            const isActive = index === selectedItem;
            return (
              <motion.div
                key={item}
                whileTap={isActive ? { scale: 0.95 } : {}}
                onClick={() => setSelectedItem(index)}
                className={isActive ? styles.activeSelectItem : styles.selectItem}>
                {isActive && (
                  <motion.div
                    layoutId="SelectActive"
                    className={styles.active}
                  />
                )}
                <span className={styles.selectText}>{item}</span>
              </motion.div>
            );
          })}
        </div>
      </AnimateSharedLayout>
    </div>
  );
};

export default CourseNav;

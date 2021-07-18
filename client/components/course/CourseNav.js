import styles from '../../styles/course/CourseNav.module.scss';
import Link from 'next/link';
import { DivideCircle } from 'react-feather';
import { useState, useEffect } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { changeEdit } from '../../store/features/editSlice';
import { useRouter } from 'next/router'

const CourseNav = ({ course, onChange, list }) => {
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState(0);
  const dispatch = useDispatch();

  useEffect(()=>{setSelectedItem(0)} , [router.query]);

  useEffect(() => {
    onChange(list[selectedItem]);
  }, [selectedItem]);
  return (
    <div className={styles.navbar}>
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
                className={styles.selectItem}>
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

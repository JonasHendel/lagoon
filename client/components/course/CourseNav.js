import styles from '@/styles/course/CourseNav.module.scss';
import Link from 'next/link';
import { DivideCircle } from 'react-feather';
import { useState, useEffect } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { changeEdit } from '@/store/features/editSlice';
import { setPage } from '@/store/features/querySlice';
import { useRouter } from 'next/router';
import courseQueries from '@/utils/courseQueries';

const CourseNav = ({ course, setPrevPage, list }) => {
  const page = useSelector((state) => state.query.page);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(router.query.page || 'Home'));
  }, []);

  const changePage = (item) => {
    setPrevPage(router.query.page);
    dispatch(setPage(item));
    courseQueries({ router, page: item });
  };

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
            const isActive = item === page;
            return (
              <motion.div
                key={item}
                whileTap={isActive ? { scale: 0.95 } : {}}
                onClick={() => changePage(item)}
                className={
                  isActive ? styles.activeSelectItem : styles.selectItem
                }>
                {isActive && (
                  <motion.div
                    layoutId="SelectActive"
                    className={`${styles.active} ${styles[course.color]}`}
                  />
                )}
                <span
                  className={`${styles.selectText} ${isActive && styles[course.color]}`}>
                  {item}
                </span>
              </motion.div>
            );
          })}
        </div>
      </AnimateSharedLayout>
    </div>
  );
};

export default CourseNav;

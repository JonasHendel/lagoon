import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getData } from '@/utils/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import { setPost } from '@/store/features/postSlice';
import { setResources } from '@/store/features/resourceSlice';
import { setPage } from '@/store/features/querySlice';
import CourseNav from '@/components/course/CourseNav';
import styles from '@/styles/course/Course.module.scss';
import PostPage from '@/components/course/PostPage';
import ResourcePage from '@/components/course/ResourcePage';
import withAuth from '@/utils/withAuth';
import { AnimatePresence, motion } from 'framer-motion';

const Course = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState();
  const [prevPage, setPrevPage] = useState();
  const auth = useSelector((state) => state.auth);
  const page = useSelector((state) => state.query.page);

  const dispatch = useDispatch();

  const { user } = auth;

  // Get the resources and posts from the server and set them in the redux store
  useEffect(() => {
    const getCourse = async () => {
      if (id) {
        const courseRes = await getData(`courses/?courseId=${id}`);
        setCourse(courseRes);
        getData(`resources/${courseRes._id}`).then((res) => {
          dispatch(
            setResources({
              [courseRes.name]: { folders: res.folders, files: res.files },
            })
          );
        });
        getData(`post/${id}`).then((res) => {
          dispatch(setPost({ [courseRes.name]: res }));
        });
      }
    };
    getCourse();
  }, [id]);

  const posts = useSelector(
    (state) => state.posts.courses && course && state.posts.courses[course.name]
  );

  // check if course and posts are available, to prevent rendering while being undefined
  if (!course || !posts) {
    return null;
  }

  const animationVariants = {
    fromResourceInitial: {
      x: 500,
      opacity: 0,
    },
    fromResourceAnimate: {
      x: 500,
      opacity: 0,
      x: 0,
      opacity: 1,
    },
    fromResourceExit: {
      x: -500,
      opacity: 0,
    },
  };

  console.log(prevPage === 'Home')

  return (
    <div className={styles.container}>
      {/*  */}
      <CourseNav
        course={course}
        setPrevPage={setPrevPage}
        list={['Home', 'Tasks', 'Resources']}
      />
      <div className={styles.content}>
        <div className={styles.posts}>
          {page === 'Home' && (
            <AnimatePresence>
              <motion.div
                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -500, opacity: 0 }}>
                <PostPage user={user} posts={posts} course={course} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className={styles.upcoming}></div>
        {page === 'Tasks' && (
          <AnimatePresence>
            <motion.div
              initial={{ x: prevPage === 'Home' ? -500 : 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: prevPage === 'Home' ? 500 : -500, opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <h1>Tasks</h1>
            </motion.div>
          </AnimatePresence>
        )}
        {page === 'Resources' && (
          <AnimatePresence>
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 500, opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <ResourcePage user={user} posts={posts} course={course} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default withAuth(Course);

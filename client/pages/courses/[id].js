import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/fetchData';
import { useSelector } from 'react-redux';
import CreatePost from '../../components/course/CreatePost';
import Post from '../../components/course/Post';
import CourseNav from '../../components/course/CourseNav';
import styles from '../../styles/course/Course.module.scss';

const Course = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState();
  const [posts, setPosts] = useState();
  const auth = useSelector((state) => state.auth);

  const { user } = auth;
  useEffect(async () => {
    if (id) {
      const coursesRes = await getData(`courses/?courseId=${id}`);
      setCourse(coursesRes);
      const postsRes = await getData(`post/${id}`);
      setPosts(postsRes);
    }
  }, [id]);

  if (!course) {
    return null;
  }

  return (
    <div className={styles.container}>
      <CourseNav course={course} />
      <div className={styles.content}>
        <div className={styles.posts}>
          {user.role === 'teacher' && (
            <CreatePost course={course} author={auth.user.id} />
          )}
          {posts &&
            posts.map((post, index) => <Post key={index} post={post} />)}
        </div>
        <div className={styles.upcoming}></div>
      </div>
    </div>
  );
};

export default Course;

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/fetchData';
import { useSelector } from 'react-redux';
import CreatePost from '../../components/course/CreatePost';
import Post from '../../components/course/Post';
import CourseNav from '../../components/course/CourseNav';
import styles from '../../styles/course/Course.module.scss';
import PostPage from '../../components/course/PostPage';
import ResourcePage from '../../components/course/ResourcePage';

const Course = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState();
  const [posts, setPosts] = useState();
  const [view, setView] = useState('Home');
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
      <CourseNav
        course={course}
        onChange={(selected) => {
          setView(selected);
        }}
        list={['Home', 'Tasks', 'Resources', 'Plans']}
      />
      <div className={styles.content}>
        <div className={styles.posts}>
          {view === 'Home' && (
            <PostPage user={user} posts={posts} course={course} />
          )}
          {view === 'Resources' && (
            <ResourcePage user={user} posts={posts} course={course} />
          )}
        </div>
        <div className={styles.upcoming}></div>
      </div>
    </div>
  );
};

export default Course;

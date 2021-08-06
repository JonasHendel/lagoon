import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import { setPost } from '../../store/features/postSlice';
import { setResources } from '../../store/features/resourceSlice';
import {setPage} from '../../store/features/querySlice'
import CourseNav from '../../components/course/CourseNav';
import styles from '../../styles/course/Course.module.scss';
import PostPage from '../../components/course/PostPage';
import ResourcePage from '../../components/course/ResourcePage';

const Course = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState();
  const auth = useSelector((state) => state.auth);
  const page = useSelector((state) => state.query.page);

  const dispatch = useDispatch();

  const { user } = auth;

  // Get the resources and posts from the server and set them in the redux store
  useEffect(() => {
    const getCourse = async () => {
      if (id) {
        const courseRes = await getData(`courses/?courseId=${id}`);
        setCourse(courseRes)
        getData(`resources/${courseRes._id}`).then((res) => {
          dispatch(
            setResources({
              [courseRes.name]: { folders: res.folders, files: res.files },
            })
          );
        });
        getData(`post/${id}`).then((res) => {
          dispatch(setPost({ [courseRes.name]: res  }));
        });
      }
    };
    getCourse();
  }, [id]);

  const posts = useSelector(state => state.posts.courses && course && state.posts.courses[course.name]);

  // check if course and posts are available, to prevent rendering while being undefined
  if (!course || !posts) {
    return null;
  }

  return (
    <div className={styles.container}>
    {/*  */}
      <CourseNav
        course={course}
        onChange={(selected) => {
          dispatch(setPage(selected))
        }}
        list={['Home', 'Tasks', 'Resources', 'Plans']}
      />
      <div className={styles.content}>
        <div className={styles.posts}>
          {page === 'Home' &&
            
               <PostPage user={user} posts={posts} course={course} />
            }
        </div>
        <div className={styles.upcoming}></div>
        {page === 'Resources' &&
            <ResourcePage user={user} posts={posts} course={course} />
          }
      </div>
    </div>
  );
};

export default Course;

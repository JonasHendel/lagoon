import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from '../../styles/course/Post.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setPath,setPage } from '../../store/features/querySlice';
import Link from 'next/link';

const Post = ({ post, course }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const fromNow = (date) => {
    return moment(date).fromNow();
  };
  const [pathString, setPathString] = useState('');

  console.log(router.pathname);
  console.log(router.query.id);

  const resources = useSelector(
    (state) => state.resources.courses[course.name]
  );

  const { folders } = resources;

  useEffect(() => {
    const file = post.files;
    if (post.type === 'files') {
      folders.map((folder) => {
        if (folder._id === file.parent_id) {
          setPathString(folder.path);
          console.log(pathString);
        }
      });
    }
  }, [post]);

  const showFile = () => {
    dispatch(setPath(pathString))
    dispatch(setPage('Resources'))
  }

  return (
    <div className={styles.post}>
      <div className={styles.postContainer}>
        <div className={styles.postInfo}>
          <p className={styles.postAuthor}>{post.author.name}</p>
          <p className={styles.postDate}>{fromNow(post.createdAt)}</p>
        </div>
        <div className={styles.divider}></div>
        {post.files && (
            <div className={styles.resource} onClick={()=>showFile()}>
              <img src="/file.svg" alt="file icon" width="50" />
              <p>{post.files.title}</p>
            </div>
        )}
        <div className={styles.postContent}>
          <p>{post.text}</p>
        </div>
        <form className={styles.commentDiv}>
          <input className={styles.commentInput} placeholder="Add a comment" />
        </form>
      </div>
    </div>
  );
};

export default Post;

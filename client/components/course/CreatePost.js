import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { postData } from '../../utils/fetchData';
import styles from '../../styles/course/Post.module.scss';
import Button from '../core/Button';
const createPost = ({ course }) => {
  const [text, setText] = useState('');

  const user = useSelector(state => state.auth.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    postData('post/create', { type: 'text', text: text, course: course._id, author: user.id });
  };
  if(!user) return null
  return (
    <>
      <div className={styles.createPost}>
        <form onSubmit={handleSubmit} className={styles.postContainer}>
        <div className={styles.postInfo}>
          <p className={styles.postAuthor}>{user.name}</p>
        </div>
          <textarea
            className={styles.createPostInput}
            placeholder="Type your post here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className={styles.createPostButtonDiv}>
            <div className={styles.createPostButton}>
              <Button class="secondary" onClick={handleSubmit}>
                Add File
              </Button>
            </div>
            <div className={styles.createPostButton}>
              <Button class="primary" onClick={handleSubmit}>
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default createPost;

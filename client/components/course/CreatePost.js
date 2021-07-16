import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { postData } from '../../utils/fetchData';
import styles from '../../styles/course/Post.module.scss';
import Button from '../core/Button';
const createPost = ({ course, author }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    postData('post/create', { content: content, course: course._id, author });
  };

  return (
    <>
      <div className={styles.createPost}>
        <form onSubmit={handleSubmit} className={styles.postContainer}>
          <textarea
            className={styles.createPostInput}
            placeholder="Type your post here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className={styles.createPostButtonDiv}>
            <div className={styles.createPostButton}>
              <Button type="secondary" onClick={handleSubmit}>
                Add File
              </Button>
            </div>
            <div className={styles.createPostButton}>
              <Button type="primary" onClick={handleSubmit}>
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

import moment from 'moment';
import styles from '../../styles/course/Post.module.scss';

const Post = ({ post }) => {
  const fromNow = (date) => {
    return moment(date).fromNow();
  };
  return (
    <div className={styles.post}>
      <div className={styles.postContainer}>
        <div className={styles.postInfo}>
          <p className={styles.postAuthor}>{post.author.name}</p>
          <p className={styles.postDate}>{fromNow(post.date)}</p>
        </div>
        <div className={styles.postContent}>
          <p>{post.content}</p>
        </div>
        <form className={styles.commentDiv}>
          <input className={styles.commentInput} placeholder="Add a comment.." />
        </form>
      </div>
    </div>
  );
};

export default Post;

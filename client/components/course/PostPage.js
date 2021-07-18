
import { useEffect } from 'react/cjs/react.development';
import { getData } from '../../utils/fetchData';
import CreatePost from './CreatePost';
import Post from './Post';

const PostPage = ({ user, posts, course}) => {
  return (
    <>
      {user.role === 'teacher' && (
        <CreatePost course={course} author={user.id} />
      )}
      {posts && posts.map((post, index) => <Post key={index} post={post} />)}
    </>
  );
};
export default PostPage;

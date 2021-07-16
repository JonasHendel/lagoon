import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { postData } from '../../utils/fetchData';
const createPost = ({course, author}) => {
  const [content, setContent] = useState('');


  const handleSubmit = () => {
    postData('post/create', {content: content, course: course._id, author, });
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>
    </>
  );
};

export default createPost;

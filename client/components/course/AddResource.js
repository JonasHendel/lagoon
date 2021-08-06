import { useState, useCallback } from 'react';
import { postData } from '../../utils/fetchData';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { addFile } from '../../store/features/resourceSlice';
import { addPost } from '../../store/features/postSlice';
import Input from '../core/Input';
import Button from '../core/Button';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

import styles from '../../styles/course/AddResource.module.scss';

const AddResource = ({
  setResourceType,
  course,
  currentFolder,
  path,
  files,
}) => {
  const [file, setFile] = useState(undefined);
  const [text, setText] = useState();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log(currentFolder);

  const posts = useSelector(state => state.posts.courses[course.name])

  const addResource = async (e) => {
    e.preventDefault();
    if (file !== undefined) {
      const data = new FormData();
      data.append('file', file);
      data.append('course', JSON.stringify(course));
      await axios({
        method: 'post',
        url: `http://localhost:8000/resources/file/upload/${course._id},${currentFolder}`,
        data,
      }).then(async (res) => {
        await postData('resources/create/file/post', {
          post: {
            type: 'files',
            text: text || null,
            course: course._id,
            author: user.id,
          },
          file: {
            title: res.data.key,
            url: res.data.location,
            course: course._id,
            parent_id: currentFolder,
            path,
          },
        }).then((res) => {
          dispatch(
            addFile({
              course: course.name,
              files: [...files, res.newFile],
            })
          );
          dispatch(
            addPost({
              course: course.name,
              post: res.newPost,
            })
          );
          setResourceType('');
        });
      });
    } else {
      console.log('No file selected');
    }
  };

  const closeDetail = () => {
    setResourceType('');
  };

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={closeDetail}
      className={styles.modal}>
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
        }}
        animate={{ scale: [0.7, 1.05, 1] }}
        transition={{ duration: 0.3 }}
        className={styles.modalBody}>
        <form className={styles.content} onSubmit={addResource}>
          <p className={styles.title}>Upload your files</p>
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={styles.fileInput}
            {...getRootProps()}>
            {isDragActive ? (
              <p>Drop your file here</p>
            ) : (
              <p>Drag and drop your files or select them by clicking here</p>
            )}
            <input {...getInputProps()} />
          </motion.div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.postInput}
            placeholder="Add a comment to the resources"></textarea>
          {file !== undefined && <p>{file.name}</p>}
          <div className={styles.buttonDiv}>
            <Button type="submit" class="primary">
              Add file
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddResource;

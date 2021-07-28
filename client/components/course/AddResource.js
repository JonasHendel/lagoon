import { useState, useCallback } from 'react';
import { postData } from '../../utils/fetchData';
import { motion } from 'framer-motion';
import Input from '../core/Input';
import Button from '../core/Button';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

import styles from '../../styles/course/AddResource.module.scss';

const AddResource = ({
  setFetch,
  fetch,
  setResourceType,
  course,
  currentFolder,
}) => {
  const [file, setFile] = useState(undefined);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log(file)

  const addResource = async (e) => {
    e.preventDefault()
    if (file !== undefined) {
      const data = new FormData();
      data.append('file', file);
      // console.log(res);
      await axios.post(
        `http://localhost:8000/resources/file/upload/${course._id},${currentFolder}`,
        data,
        {}
      )
      setResourceType('')
      setFetch(!fetch);
    }else {
      console.log('No file selected')
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
            {...getRootProps()}
            >
            {isDragActive ? (
              <p>Drop your file here</p>
            ) : (
              <p>Drag and drop your files or select them by clicking here</p>
            )}
            <input {...getInputProps()} />
          </motion.div>
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

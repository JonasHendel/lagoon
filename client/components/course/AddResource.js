import { useState } from 'react';
import { postData } from '../../utils/fetchData';
import { motion } from 'framer-motion';
import Input from '../core/Input';
import Button from '../core/Button';
import axios from 'axios';

import styles from '../../styles/course/AddResource.module.scss';

const AddResource = ({ resourceType, setResourceType, course, currentFolder }) => {
  const [folderTitle, setFolderTitle] = useState();
  const [file, setFile] = useState()
  const addResource = async (e) => {
    if (resourceType === 'folder') {
      await postData('resources/folder/create', {
        title: folderTitle,
        course: course._id,
        parent_id: currentFolder,
      }).then((res) => console.log(res));
    }
    if (resourceType === 'file') {
      const data = new FormData();
      data.append('file', file);
      // console.log(res);
      axios.post(
        `http://localhost:8000/resources/file/upload/${course._id},${currentFolder}`,
        data,
        {}
      );
    }
  };


  const closeDetail = () => {
    // dispatch({ type: 'ADD_EVENT', payload: {} });
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
          <label className={styles.fileInputLabel}>
            <motion.div whileTap={{ scale: 0.95 }} className={styles.fileInput}>
              <p>Drag and drop your files or select them by clicking here</p>
            </motion.div>
            <input
              type="file"
              name="upload"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          {file !== undefined && <p>{file.name}</p>}
          <div className={styles.buttonDiv}>
            <Button type="submit" class="primary">
              Add files
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddResource;

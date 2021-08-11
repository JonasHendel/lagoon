import styles from '../../styles/course/Resource.module.scss';
import { ChevronRight, ArrowLeft } from 'react-feather';
import { motion } from 'framer-motion';
import Button from '../core/Button';

const ResourceNav = ({
  path,
  folders,
  setCurrentFolder,
  setResourceType,
  setViewFile,
  viewFile,
  edit,
  setEdit,
}) => {
  return (
    <div className={styles.resourceNav}>
      <div className={styles.pathDiv}>
        <motion.p
          whileHover={{ scale: 0.92 }}
          className={styles.pathItem}
          onClick={() => {
            setCurrentFolder('root');
            setViewFile('');
          }}>
          {viewFile.length !== 0 && (
            <div onClick={() => setViewFile('')}>
              <ArrowLeft />
            </div>
          )}
          Mathe
        </motion.p>
        {path.map((folderId) =>
          folders.map((folder) => {
            if (folder._id === folderId) {
              return (
                <>
                  <span>
                    <ChevronRight />
                  </span>
                  <motion.p
                    whileHover={{ scale: 0.92 }}
                    className={styles.pathItem}
                    onClick={() => {
                      setCurrentFolder(folder._id);
                      setViewFile('');
                    }}>
                    <img
                      className={styles.pathIcon}
                      src="/folder.svg"
                      alt="folder icon"
                      width="20"
                    />
                    {folder.title}
                  </motion.p>
                </>
              );
            }
          })
        )}
      </div>
      <div className={styles.buttonDiv}>
        <div className={styles.button}>
          <Button
            onClick={() => setEdit(!edit)}
            class={edit ? 'danger' : 'secondary'}>
            Edit
          </Button>
        </div>
        <div className={styles.button}>
          <Button
            class="secondary"
            onClick={(e) => {
              e.stopPropagation();
              setResourceType('folder');
            }}>
            <img src="/add_folder.svg" alt="add folder icon" width="20" /> Add
            folder
          </Button>
        </div>
        <div className={styles.button}>
          <Button
            class="secondary"
            onClick={(e) => {
              e.stopPropagation();
              setResourceType('file');
            }}>
            <img src="/add_file.svg" alt="add folder icon" width="20" /> Add
            file
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceNav;

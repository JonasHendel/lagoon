import styles from '../../styles/course/Resource.module.scss';
import { FilePlus, FolderPlus } from 'react-feather';

const ResourceNav = ({ path, folders, setCurrentFolder, setResourceType }) => {
  console.log(path);
  return (
    <div className={styles.resourceNav}>
      <div className={styles.pathDiv}>
        <p className={styles.pathItem} onClick={() => setCurrentFolder('root')}>
          Mathe
        </p>
        {path.map((folderId) =>
          folders.map((folder) => {
            if (folder._id === folderId) {
              return (
                <>
                  <span>/</span>
                  <p
                    className={styles.pathItem}
                    onClick={() => setCurrentFolder(folder._id)}>
                    {folder.title}
                  </p>
                </>
              );
            }
          })
        )}
      </div>
      <div className={styles.buttonDiv}>
        <button onClick={()=>setResourceType('folder')}>
          <FolderPlus /> Add Folder{' '}
        </button>
        <button onClick={()=>setResourceType('file')}>
          <FilePlus /> Add File
        </button>
      </div>
    </div>
  );
};

export default ResourceNav;

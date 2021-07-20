import { useState, useEffect } from 'react';
import { Folder, FolderPlus } from 'react-feather';
import { getData,postImage } from '../../utils/fetchData';
import axios from 'axios';
import styles from '../../styles/course/Resource.module.scss'
import courseQueries from '../../utils/courseQueries';
import {useRouter} from 'next/router'

const ResourcePage = () => {
  const router = useRouter();
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [addFolder, setAddFolder] = useState(false);
  const [addFile, setAddFile ] = useState();
  useEffect(async () => {
    const res = await getData('resources');
    setFolders(res.folders);
    setFiles(res.files);
  }, []);

  const handleClick = async (folderId) => {
    const subfolderRes = await getData(`resources/${folderId}`);
    setFolders(subfolderRes.folders);
  };

  const upload = async  (e) => {
    e.preventDefault();
    const data = new FormData() 
    data.append('file', addFile)
    console.log(data)
    axios.post("http://localhost:8000/resources/file/upload", data, { 
  })
}

  return (
    <div className="resource-page">
      {folders.map((folder) => (
        <div className={styles.folder} onClick={() => handleClick(folder._id)}>
          <Folder />
          <p>{folder.title}</p>
        </div>
      ))}
      {files.map((file) => (
        <p>{file.title}</p>
      ))}
      <FolderPlus onClick={() => setAddFolder(true)} />
      {addFolder && (
        <form>
          <input placeholder="folder title" />
        </form>
      )}
      <form onSubmit={upload}>
        <input type="file" name="upload" onChange={(e)=>setAddFile(e.target.files[0])}/>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ResourcePage;

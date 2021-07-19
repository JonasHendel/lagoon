import { useState, useEffect } from 'react';
import { Folder, FolderPlus } from 'react-feather';
import { getData,postImage } from '../../utils/fetchData';
import axios from 'axios';

const ResourcePage = () => {
  const [folders, setFolders] = useState([]);
  const [addFolder, setAddFolder] = useState(false);
  const [file, setFile ] = useState();
  useEffect(async () => {
    const folderRes = await getData('resources/folders');
    setFolders(folderRes);
  }, []);

  const handleClick = async (folderId) => {
    const subfolderRes = await getData(`resources/folders/${folderId}`);
    setFolders(subfolderRes);
  };

  const upload = async  (e) => {
    e.preventDefault();
    const data = new FormData() 
    data.append('file', file)
    console.log(data)
    axios.post("http://localhost:8000/resources/file/upload", data, { 
  })
}

  return (
    <div className="resource-page">
      <h2>Resources</h2>
      {folders.map((folder) => (
        <div onClick={() => handleClick(folder._id)}>
          <Folder />
          <p>{folder.title}</p>
        </div>
      ))}
      <FolderPlus onClick={() => setAddFolder(true)} />
      {addFolder && (
        <form>
          <input placeholder="folder title" />
        </form>
      )}
      <form onSubmit={upload}>
        <input type="file" name="upload" onChange={(e)=>setFile(e.target.files[0])}/>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ResourcePage;

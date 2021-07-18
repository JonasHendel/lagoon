import { useState, useEffect } from 'react';
import { Folder } from 'react-feather';
import { getData } from '../../utils/fetchData';

const ResourcePage = () => {
  const [folders, setFolders] = useState([]);
  useEffect(async () => {
    const folderRes = await getData('resources/folders');
    setFolders(folderRes);
  },[]);

  const handleClick = async (folderId) => {
    const subfolderRes = await getData(`resources/folders/${folderId}`);
    setFolders(subfolderRes);
  }
    
  return (
    <div className="resource-page">
      <h2>Resources</h2>
      {folders.map((folder) => (
        <div onClick={()=>handleClick(folder._id)}>
        <Folder/>
        <p>{folder.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ResourcePage;

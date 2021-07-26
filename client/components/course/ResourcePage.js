import { useState, useEffect } from 'react';
import { Folder, FolderPlus, File, FilePlus } from 'react-feather';
import axios from 'axios';
import { useRouter } from 'next/router';
import { current } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { getData, postData } from '../../utils/fetchData';
import styles from '../../styles/course/Resource.module.scss';
import courseQueries from '../../utils/courseQueries';
import { addResources } from '../../store/features/resourceSlice';
import ResourceNav from './ResourceNav'
import AddResource from './AddResource'

const ResourcePage = ({ course, user }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [resourceType, setResourceType] = useState('');
  const [addFile, setAddFile] = useState();
  const [folderTitle, setFolderTitle] = useState('');
  const [path, setPath] = useState(
    router.query.path ? router.query.path.split('/') : ['root']
  );
  const [currentFolder, setCurrentFolder] = useState(
    path[path.length - 1] === 'root' ? 'root' : path[path.length - 1]
  )

  useEffect(async () => {
    const res = await getData(`resources/${course._id}`);
    dispatch(
      addResources({
        [course.name]: { folders: res.folders, files: res.files },
      })
    );
  }, []);

  useEffect(() => {
    const i = path.indexOf(currentFolder);
    const newPath = path.slice(0, i + 1)
    const pathString = newPath.join('/');
    courseQueries({ router, folderPath: pathString });
    setPath(newPath);
  }, [currentFolder]);


  const handleClick = async (folderId) => {
    if (!path.includes(folderId)) {
      path.push(folderId);
    }
    setCurrentFolder(
      path[path.length - 1] === 'root' ? 'root' : path[path.length - 1]
    );
  };

  const resources = useSelector((state) => state.resources.value[course.name]);
  if (!resources) return null;
  const { files, folders } = resources;


  const uploadResource = async (e) => {
    const data = new FormData();
    data.append('file', addFile);
    axios.post(
      `http://localhost:8000/resources/file/upload/${course._id},${currentFolder}`,
      data,
      {}
    );
  };

  const createFolder = async (e) => {
    await postData('resources/folder/create', {
      title: folderTitle,
      course: course._id,
      parent_id: currentFolder,
    }).then((res) => console.log(res));
  };

  return (
      <div className={styles.resources}>
      <ResourceNav setCurrentFolder={setCurrentFolder} path={path} setResourceType={setResourceType} folders={folders}  />
      {resourceType.length > 0 && <AddResource currentFolder={currentFolder} resourceType={resourceType} setResourceType={setResourceType} course={course}/>}
        {folders &&
          folders.map((folder) => {
            if (folder.parent_id === currentFolder)
              return (
                <div
                  className={styles.resource}
                  onClick={() => handleClick(folder._id)}>
                  <Folder width="50px" height="50px" />
                  <p>{folder.title}</p>
                </div>
              );
            else return null;
          })}
        {files &&
          files.map((file) => {
            if (file.parent_id === currentFolder) {
              return (
                <div className={styles.resource}>
                  <File width="50px" height="50px" />
                  <p>{file.title}</p>
                </div>
              );
            }
          })}
    </div>
  );
};

export default ResourcePage;

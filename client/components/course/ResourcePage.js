import { useState, useEffect } from 'react';
import { Folder, FolderPlus, File, FilePlus, ArrowLeft } from 'react-feather';
import axios from 'axios';
import { useRouter } from 'next/router';
import { current } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../core/Input';

import { deleteData, getData, postData } from '../../utils/fetchData';
import styles from '../../styles/course/Resource.module.scss';
import courseQueries from '../../utils/courseQueries';
import { addResources } from '../../store/features/resourceSlice';
import ResourceNav from './ResourceNav';
import AddResource from './AddResource';

const ResourcePage = ({ course, user }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [fetch, setFetch] = useState(false);
  const [resourceType, setResourceType] = useState('');
  const [folderTitle, setFolderTitle] = useState('');
  const [viewFile, setViewFile] = useState('');
  const [path, setPath] = useState(
    router.query.path ? router.query.path.split('/') : ['root']
  );
  const [currentFolder, setCurrentFolder] = useState(path[path.length - 1]);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    const getResources = async () => {
      const res = await getData(`resources/${course._id}`);
      dispatch(
        addResources({
          [course.name]: { folders: res.folders, files: res.files },
        })
      );
    };

    getResources();
  }, [fetch]);

  useEffect(() => {
    const i = path.indexOf(currentFolder);
    const newPath = path.slice(0, i + 1);
    const pathString = newPath.join('/');
    courseQueries({ router, folderPath: pathString });
    setPath(newPath);
  }, [currentFolder]);

  const handleClick = async (folderId) => {
    if (!path.includes(folderId)) {
      path.push(folderId);
    }
    setCurrentFolder(path[path.length - 1]);
  };

  const resources = useSelector((state) => state.resources.value[course.name]);
  if (!resources) return null;
  const { files, folders } = resources;

  const createFolder = async (e) => {
    e.preventDefault();
    await postData('resources/folder/create', {
      title: folderTitle,
      course: course._id,
      parent_id: currentFolder,
    }).then(() => {
      setResourceType('');
      setFetch(!fetch);
    });
  };

  const deleteFile = async ( fileId ) => {
    await deleteData(`resources/file/${fileId}`).then((res) =>
      console.log(res)
    );
  };

  return (
    <div
      className={styles.resources}
      onClick={() => {
        setResourceType('');
      }}>
      <ResourceNav
        setViewFile={setViewFile}
        viewFile={viewFile}
        setCurrentFolder={setCurrentFolder}
        path={path}
        setResourceType={setResourceType}
        folders={folders}
      />
      {resourceType === 'file' && (
        <AddResource
          fetch={fetch}
          setFetch={setFetch}
          currentFolder={currentFolder}
          setResourceType={setResourceType}
          course={course}
        />
      )}
      {viewFile.length === 0 && (
        <>
          {folders &&
            folders.map((folder, index) => {
              if (folder.parent_id === currentFolder)
                return (
                  <div
                    key={index}
                    className={styles.resource}
                    onClick={() => handleClick(folder._id)}>
                    <img src="/folder.svg" alt="folder icon" width="50" />
                    <p>{folder.title}</p>
                  </div>
                );
              else return null;
            })}
          {files &&
            files.map((file, index) => {
              if (file.parent_id === currentFolder) {
                return (
                  <div
                    key={index}
                    className={styles.resource}
                    onClick={() =>
                      edit ? deleteFile(file._id) : setViewFile(file.url)
                    }>
                    <img src="/file.svg" alt="file icon" width="50" />
                    <p>{file.title}</p>
                  </div>
                );
              }
            })}
          {resourceType === 'folder' && (
            <form
              onSubmit={createFolder}
              className={styles.resource}
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <img src="/add_folder.svg" alt="file icon" width="50" />
              <Input
                type="primary"
                value={folderTitle}
                onChange={(e) => {
                  setFolderTitle(e.target.value);
                }}
                placeholder="folder title"
              />
            </form>
          )}
        </>
      )}
      {viewFile.length !== 0 && (
        <>
          <embed src={viewFile} className={styles.file} />
        </>
      )}
    </div>
  );
};

export default ResourcePage;

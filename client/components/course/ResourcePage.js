import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../core/Input';
import { useOuterClick } from '../../utils/outerclick';

import { deleteData, getData, postData } from '../../utils/fetchData';
import styles from '../../styles/course/Resource.module.scss';
import courseQueries from '../../utils/courseQueries';
import { setResources, addFolder } from '../../store/features/resourceSlice';
import {addFolderToPath,  setPath } from '../../store/features/querySlice';
import ResourceNav from './ResourceNav';
import AddResource from './AddResource';

const ResourcePage = ({ course, user }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const path = useSelector((state) => state.query.path);

  const [fetch, setFetch] = useState(false);
  const [resourceType, setResourceType] = useState('');
  const [folderTitle, setFolderTitle] = useState('');
  const [viewFile, setViewFile] = useState('');
  // const [path, setPath] = useState(
  //   router.query.path ? router.query.path.split('/') : ['root']
  // );
  const [currentFolder, setCurrentFolder] = useState(path[path.length - 1]);
  const [edit, setEdit] = useState(false);

  

  useEffect(() => {
    console.log('click', path)
    const i = path.indexOf(currentFolder);
    const newPath = path.slice(0, i + 1);
    const pathString = newPath.join('/');
    courseQueries({ router, folderPath: pathString });
    dispatch(setPath(newPath));
  }, [currentFolder]);

  const handleClick = async (folderId) => {
    if (!path.includes(folderId)) {
      dispatch(await addFolderToPath(folderId));
    }
    setCurrentFolder(folderId);
  };

  const createFolderRef = useOuterClick((click) => {
    setResourceType('');
  });

  const resources = useSelector(
    (state) => state.resources.courses[course.name]
  );
  if (!resources) return null;
  const { files, folders } = resources;

  const createFolder = async (e) => {
    e.preventDefault();
    await postData('resources/folder/create', {
      title: folderTitle,
      course: course._id,
      parent_id: currentFolder,
      path: path,
    }).then((res) => {
      dispatch(addFolder({ course: course.name, folders: [...folders, res] }));
      setResourceType('');
    });
  };

  const deleteFile = async (fileId) => {
    await deleteData(`resources/file/${fileId}`).then((res) =>
      console.log(res)
    );
  };

  return (
    <div className={styles.resources}>
      <ResourceNav
        edit={edit}
        setEdit={setEdit}
        setViewFile={setViewFile}
        viewFile={viewFile}
        setCurrentFolder={setCurrentFolder}
        path={path}
        setResourceType={setResourceType}
        folders={folders}
      />
      {resourceType === 'file' && (
        <AddResource
          files={files}
          path={path}
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
              ref={createFolderRef}
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

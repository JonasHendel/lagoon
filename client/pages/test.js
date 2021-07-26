import { useEffect, useState } from 'react';
import { getData } from '../utils/fetchData';
import ResourceNav from '../components/course/ResourceNav'

const Test = () => {
  return (
    <div className="test">
      <ResourceNav path={['folder1', 'folder2']}/>
      
      
    </div>
  );
};

export default Test;
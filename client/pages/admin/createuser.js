import React, { useState, useEffect } from 'react';
import { postData } from '../../utils/fetchData';

const CreateUser = () => {
  const initialState = {
    name: '',
    role: '',
    grade: '',
  };
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const createUser = () => {
    postData('user/create', user);
  };

  return (
    <div>
      <form onSubmit={createUser}>
        <input
          value={user.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <select name="grade" onChange={handleChange}>
          <option value="" disabled selected>
            Select grade
          </option>
          <option value="Grade 11">Grade 11</option>
          <option value="Grade 12">Grade 12</option>
          <option value="Grade 13">Grade 13</option>
        </select>
        <select name="role" onChange={handleChange}>
          <option value="" disabled selected>
            Select role
          </option>
          <option value="student">student</option>
          <option value="teacher">teacher</option>
          <option value="parent">parent</option>
          <option value="other">other</option>
        </select>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;

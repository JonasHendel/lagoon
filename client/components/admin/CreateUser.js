import React, { useState, useEffect } from 'react';
import { postData } from '@/utils/fetchData';
import styles from '@/styles/admin/createUser.module.scss';

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

  const createUser = (e) => {
    e.preventDefault();
    postData('user/create', user);
  };

  return (
    <form onSubmit={(e)=>createUser(e)} className={styles.card}>
    <h3>Create User</h3>
      <input
        value={user.name}
        name="name"
        placeholder="Username"
        onChange={handleChange}
        className={`input ${styles.input}`}
      />
      <select name="grade" onChange={handleChange} className={`input ${styles.input}`}>
        <option value="" selected>
          Select grade
        </option>
        <option value="Grade 11">Grade 11</option>
        <option value="Grade 12">Grade 12</option>
        <option value="Grade 13">Grade 13</option>
      </select>
      <select name="role" onChange={handleChange} className={`input ${styles.input}`}>
        <option value="" selected>
          Select role
        </option>
        <option value="student">student</option>
        <option value="admin">admin</option>
        <option value="teacher">teacher</option>
        <option value="parent">parent</option>
        <option value="other">other</option>
      </select>
      <button type="submit" className="button primary">
        Create User
      </button>
    </form>
  );
};

export default CreateUser;

import styles from '../../styles/admin/createUser.module.scss';
import { useOuterClick } from '../../utils/outerclick';
import { patchData } from '../../utils/fetchData';
import { useEffect, useState } from 'react/cjs/react.development';

const EditUser = ({ editUser, setEditUser, setUsers, users }) => {
  const { name, email, role, grade } = editUser;
  const [index, setIndex] = useState();

  useEffect(() => {
    setIndex(users.indexOf(editUser));
  }, []);
  console.log(index);

  let userArr = users

  const updateUser = async (e) => {
    e.preventDefault();
    const res = await patchData('user/update', { editUser });

    console.log(res.newUser);
    
    userArr.splice(0, 1, res.newUser)

    console.log(userArr);

    setUsers(userArr);


    setEditUser({});
  };

  const createEditRef = useOuterClick((click) => {
    setEditUser('');
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className={styles.modalContainer}>
      <div ref={createEditRef} className={styles.modal}>
        <h1>Edit User</h1>
        <form className={styles.modalForm} onSubmit={(e) => updateUser(e)}>
          <label for="name">Name:</label>
          <input
            value={name}
            name="name"
            onChange={handleChange}
            className={`input ${styles.modalInput}`}
            placeholder="Name"
          />
          <label for="email">Email:</label>
          <input
            value={email}
            type="email"
            name="email"
            onChange={handleChange}
            className={`input ${styles.modalInput}`}
            placeholder="Email"
          />
          <label for="password">Password:</label>
          <input
            type="password"
            name="password"
            className={`input ${styles.modalInput}`}
            placeholder="Password"
          />
          <label for="grade">Grade:</label>
          <select
            name="grade"
            onChange={handleChange}
            className={`input ${styles.modalInput}`}>
            <option value="" selected>
              Select grade
            </option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
            <option value="Grade 13">Grade 13</option>
          </select>
          <label for="role">Role:</label>
          <select
            name="role"
            onChange={handleChange}
            className={`input ${styles.input}`}>
            <option value="" selected>
              Select role
            </option>
            <option value="student">student</option>
            <option value="teacher">teacher</option>
            <option value="parent">parent</option>
            <option value="other">other</option>
          </select>
          <button className="button primary">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

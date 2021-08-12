import styles from '../../styles/admin/createUser.module.scss';

const UserSearch = ({ filter, setFilter }) => {
  const {search} = filter
  return (
    <div className={styles.userSearch}>
      <input
        value={search}
        name="search"
        autoComplete="off"
        placeholder="Username"
        onChange={(e) => setFilter({...filter, search: e.target.value})}
        className={`input ${styles.searchInput}`}
      />
      <select
        name="grade"
        onChange={e => setFilter({...filter, grade: e.target.value})}
        className={`input ${styles.searchDropdown}`}>
        <option value="" selected>
          Select grade
        </option>
        <option value="Grade 11">Grade 11</option>
        <option value="Grade 12">Grade 12</option>
        <option value="Grade 13">Grade 13</option>
      </select>
      <select
        name="role"
        onChange={e => setFilter({...filter, role: e.target.value})}
        className={`input ${styles.searchDropdown}`}>
        <option value="" selected>
          Select role
        </option>
        <option value="student">student</option>
        <option value="teacher">teacher</option>
        <option value="parent">parent</option>
        <option value="other">other</option>
      </select>
    </div>
  );
};

export default UserSearch;

import { useEffect,useState } from 'react';
import CreateUser from '../../components/admin/CreateUser';
import UserTable from '../../components/admin/UserTable';
import UserSearch from '../../components/admin/UserSearch';
import styles from '../../styles/admin/createUser.module.scss';

const Create = () => {
  const filterState = {
    search: '',
    grade: '',
    role: '',
    active: Boolean,
  }


  const [filter, setFilter] = useState(filterState);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <CreateUser />
        </div>
        <div>
          <UserSearch filter={filter} setFilter={setFilter} />
          <UserTable filter={filter}/>
        </div>
      </div>
    </div>
  );
};

export default Create;

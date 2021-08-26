import { useEffect, useState } from 'react';
import CreateUser from '@/components/admin/CreateUser';
import UserTable from '@/components/admin/UserTable';
import UserSearch from '@/components/admin/UserSearch';
import EditUser from '@/components/admin/EditUser';
import styles from '@/styles/admin/createUser.module.scss';
import {getData} from '@/utils/fetchData'

const filterState = {
  search: '',
  grade: '',
  role: '',
  status: '',
};

const Create = () => {
  const [filter, setFilter] = useState(filterState);

  const [editUser, setEditUser] = useState({});

  const [users, setUsers]= useState()
  
  useEffect(()=>{
    const getUsers = async () => {
      const res = await getData('user/users')
      setUsers(res)
    }

    getUsers()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {Object.keys(editUser).length > 0 && <EditUser setEditUser={setEditUser} editUser={editUser} setUsers={setUsers} users={users} />}
        <div>
          <CreateUser />
        </div>
        <div>
          <UserSearch filter={filter} setFilter={setFilter} />
          {users && <UserTable users={users} filter={filter} setEditUser={setEditUser} editUser={editUser}/>}
        </div>
      </div>
    </div>
  );
};

export default Create;

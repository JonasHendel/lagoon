import styles from '../../styles/admin/createUser.module.scss';
import Avatar from 'boring-avatars';
import {useState, useEffect} from 'react';
import {getData} from '../../utils/fetchData'


const UserTable = ({filter, setEditUser, users, editUser}) => {

  const {search, grade, role, status} = filter
  const [filteredUsers, setFilteredUsers] = useState()

  useEffect(()=>{
      setFilteredUsers(users)
  },[users])
  
  if(users) console.log(users.indexOf(editUser))

  // filter search
  useEffect(()=>{
    users && setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(search.toLowerCase())))
  },[search])

  // filter grade
  useEffect(()=>{
    users && setFilteredUsers(users.filter(user => user.grade.toLowerCase().includes(grade.toLowerCase())))
  },[grade])

  // filter role
  useEffect(()=>{
    users && setFilteredUsers(users.filter(user => user.role.toLowerCase().includes(role.toLowerCase())))
  },[role])
  // useEffect(()=>{
  //   if(status === 'active') users && setFilteredUsers(users.filter(user => user.code.toLowerCase().includes('none'.toLowerCase())))
  // },[status])

  return (
    <div>
      <div className={styles.tableDiv}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Grade</th>
              <th scope="col">Status</th>
              <th scope="col">Role</th>
              <th scope="col">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {filteredUsers && filteredUsers.map((user) => (
              <tr className={styles.tableRow}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <div className={styles.avatar}>
                      <Avatar
                        size={30}
                        name={user.name}
                        variant="marble"
                        colors={[
                          '#83F1D5',
                          '#48BFE3',
                          '#5E60CE',
                          '#64DFDF',
                          '#7400b8',
                        ]}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.grade}</div>
                  <div className="text-sm text-gray-500">
                    {user.department}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {user.code ===  "none" || user.code === undefined ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>

                ): <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {user.code}
                  </span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td onClick={()=>setEditUser(user)} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;

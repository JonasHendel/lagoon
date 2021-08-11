import CreateUser from '../../components/admin/CreateUser';
import styles from '../../styles/admin/create.module.scss';

const Create = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CreateUser />
      </div>
    </div>
  );
};

export default Create;

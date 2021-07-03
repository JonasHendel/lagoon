import { ChevronDown } from 'react-feather';
import styles from '../../styles/modules/Account.module.scss';

export default function account() {
  return (
    <div className={styles.account}>
      <img className={styles.profilePicture} src="./icon.svg" />
      <span className={styles.name}>Aron Buzinkay</span>
      <ChevronDown />
    </div>
  );
}

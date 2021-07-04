import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOuterClick } from '../../utils/outerclick';
import { ChevronDown } from 'react-feather';
import styles from '../../styles/modules/Account.module.scss';

export default function account() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let toggleDropdown = () => {
    setDropdownOpen((status) => !status);
  };

  const accountRef = useOuterClick((click) => {
    setDropdownOpen(false);
  });

  const dropdownVariants = {
    enter: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 0.25,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      translateY: -10,
      transition: {
        duration: 0.2,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <div ref={accountRef} className={styles.accountWrap}>
      <div className={styles.account} onClick={toggleDropdown}>
        <img className={styles.profilePicture} src="./icon.svg" />
        <span className={styles.name}>Aron Buzinkay</span>
        <ChevronDown />
      </div>
      <motion.div
        className={styles.dropdown}
        variants={dropdownVariants}
        initial="exit"
        animate={dropdownOpen ? 'enter' : 'exit'}>
        <div className={styles.items}>
          <div className={styles.accountActions}>
            <span className={styles.accountItem}>Account</span>
            <span className={styles.accountItem}>Profile</span>
            <span className={styles.accountItem}>Grades</span>
            <span className={styles.accountItem}>Settings</span>
          </div>
          <div className={styles.accountActions}>
            <span className={styles.signout}>Sign Out</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

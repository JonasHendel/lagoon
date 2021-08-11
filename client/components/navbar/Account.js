import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOuterClick } from '../../utils/outerclick';
import { ChevronDown } from 'react-feather';
import styles from '../../styles/modules/Account.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '../../store/features/authSlice';
import { success } from '../../store/features/notifySlice';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Avatar from 'boring-avatars';

export default function account() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  let toggleDropdown = () => {
    setDropdownOpen((status) => !status);
  };

  const accountRef = useOuterClick((click) => {
    setDropdownOpen(false);
  });

  const handleLogout = () => {
    Cookie.remove('refreshtoken');
    localStorage.removeItem('firstLogin');
    localStorage.removeItem('accessToken');
    dispatch(clearAuth());
    dispatch(success('Logged out!'));
    router.push('/login');
  };

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
        <div className={styles.profilePicture}>
          <Avatar
            size={30}
            name={auth.user.name}
            variant="marble"
            colors={['#83F1D5', '#48BFE3', '#5E60CE', '#64DFDF', '#7400b8']}
          />
        </div>
        <span className={styles.name}>{auth.user.name}</span>
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
            <span onClick={handleLogout} className={styles.signout}>
              Sign Out
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
